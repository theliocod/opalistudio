/* =========================================================
   LAME DE CENDRES — La peau
   Les modèles sculptés par Meshy, posés sur notre squelette.
   Notre squelette (rig.js) continue de tout calculer ; à chaque
   pose, chaque os du modèle recopie l'orientation de
   l'articulation qui lui correspond.
   ========================================================= */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import MODELS from './models.js';

/* Notre articulation → l'os Meshy qui la suit. Spine01, les clavicules,
   la main gauche et les pieds gardent leur pose de repos. */
const BONES = {
  hips: 'Hips', spine: 'Spine02', chest: 'Spine', neck: 'neck', head: 'Head',
  shL: 'LeftArm', elL: 'LeftForeArm', shR: 'RightArm', elR: 'RightForeArm', wrR: 'RightHand',
  hipL: 'LeftUpLeg', knL: 'LeftLeg', hipR: 'RightUpLeg', knR: 'RightLeg'
};
/* L'os dont la direction de repos sert à redresser chaque membre */
const AIM = { shL: 'LeftForeArm', elL: 'LeftHand', shR: 'RightForeArm', elR: 'RightHand', wrR: 'RightHand', hipL: 'LeftLeg', knL: 'LeftFoot', hipR: 'RightLeg', knR: 'RightFoot' };
const HIPS_Y = 0.98;   // la hauteur des hanches de notre squelette

const loaded = {};
export const modelsReady = Promise.all(Object.entries(MODELS).map(async ([kind, bytes]) => {
  try {
    loaded[kind] = await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), '');
  } catch (e) {
    console.warn(`modèle ${kind} illisible, formes simples à la place`, e);
  }
}));

const _q = new THREE.Quaternion(), _m = new THREE.Matrix4(), _v = new THREE.Vector3();

/* Habille un squelette de rig.js avec le modèle de ce personnage.
   Renvoie null si le modèle n'est pas (encore) disponible. */
export function dress(kind, rig) {
  const gltf = loaded[kind];
  if (!gltf) return null;
  const model = clone(gltf.scene);
  const bones = {};
  let mesh = null;
  model.traverse(o => {
    if (o.isBone) bones[o.name] = o;
    if (o.isSkinnedMesh) mesh = o;
  });
  if (!mesh || !Object.values(BONES).every(n => bones[n])) return null;

  /* même taille de hanches que notre squelette : les poses restent justes */
  const holder = new THREE.Group();
  holder.add(model);
  rig.root.add(holder);
  rig.root.updateMatrixWorld(true);
  const toRoot = m => _m.copy(rig.root.matrixWorld).invert().multiply(m);
  const hipsAt = new THREE.Vector3().setFromMatrixPosition(toRoot(bones.Hips.matrixWorld));
  holder.scale.setScalar(HIPS_Y / hipsAt.y);
  holder.updateMatrixWorld(true);

  /* Les os dans l'ordre parent d'abord, avec leur orientation de repos
     dans l'espace du personnage */
  const order = [];
  const rest = new Map();
  const restQ = o => { toRoot(o.matrixWorld).decompose(_v, _q, new THREE.Vector3()); return _q.clone(); };
  const top = bones.Hips.parent;
  const topQ = restQ(top);
  bones.Hips.traverse(o => { if (o.isBone) { order.push(o); rest.set(o, restQ(o)); } });
  const pos = o => new THREE.Vector3().setFromMatrixPosition(toRoot(o.matrixWorld));

  /* Nos membres pendent tout droit au repos ; ceux de Meshy sont en A.
     Pour chaque os : la rotation qui passe de sa direction de repos à la
     nôtre, puis son orientation de repos. */
  const map = new Map();
  for (const [joint, name] of Object.entries(BONES)) {
    const b = bones[name];
    let fix = new THREE.Quaternion();
    if (AIM[joint]) {
      const from = joint === 'wrR' ? bones.RightForeArm : b;
      const dir = pos(bones[AIM[joint]]).sub(pos(from)).normalize();
      fix.setFromUnitVectors(dir, new THREE.Vector3(0, -1, 0));
    }
    map.set(b, { joint, base: fix.multiply(rest.get(b)) });
  }
  const parentOf = {};
  for (const k of Object.keys(BONES)) {
    let p = rig.joints[k].parent;
    parentOf[k] = Object.keys(BONES).find(n => rig.joints[n] === p) || null;
  }
  const hipsRest = bones.Hips.position.clone();
  const hipsUnit = 1 / new THREE.Vector3().setFromMatrixScale(toRoot(bones.Hips.parent.matrixWorld)).x;

  const W = {}, cur = new Map();
  function sync() {
    /* l'orientation de chacune de nos articulations dans l'espace du personnage */
    for (const k of Object.keys(BONES)) {
      W[k] = (W[k] || new THREE.Quaternion()).copy(rig.joints[k].quaternion);
      if (parentOf[k]) W[k].premultiply(W[parentOf[k]]);
    }
    for (const b of order) {
      const parentQ = b.parent === top ? topQ : cur.get(b.parent);
      const m = map.get(b);
      const q = cur.get(b) || new THREE.Quaternion();
      if (m) {
        q.copy(W[m.joint]).multiply(m.base);
        b.quaternion.copy(parentQ).invert().multiply(q);
      } else {
        q.copy(parentQ).multiply(b.quaternion);
      }
      cur.set(b, q);
    }
    bones.Hips.position.copy(hipsRest);
    bones.Hips.position.y += (rig.joints.hips.position.y - HIPS_Y) * hipsUnit;
  }

  /* Le sabre passe dans la vraie main, tenu comme dans notre squelette :
     on se met dans notre pose de repos et on garde le même placement. */
  const saved = rig.joints.wrR.quaternion.clone();
  for (const k of Object.keys(BONES)) rig.joints[k].quaternion.identity();
  sync();
  holder.updateMatrixWorld(true);
  const hand = bones.RightHand;
  const grip = pos(hand).add(_v.set(0, -0.08, 0.01));
  const sword = rig.blade.group;
  sword.removeFromParent();
  hand.add(sword);
  sword.matrix.copy(toRoot(hand.matrixWorld).invert().multiply(new THREE.Matrix4().makeTranslation(grip)));
  sword.matrix.decompose(sword.position, sword.quaternion, sword.scale);
  rig.joints.wrR.quaternion.copy(saved);

  /* La peau remplace les formes simples */
  rig.joints.hips.traverse(o => { if (o.isMesh) o.visible = false; });
  const material = mesh.material.clone();
  mesh.material = material;
  mesh.castShadow = true;
  mesh.frustumCulled = false;

  /* Les yeux des damnés brûlent toujours, devant le visage du modèle */
  if (kind !== 'player') {
    const head = pos(bones.Head);
    const front = faceFront(mesh, head, toRoot(mesh.matrixWorld).clone());
    const eyeR = kind === 'oni' ? 0.014 : 0.011;
    const headInv = toRoot(bones.Head.matrixWorld).clone().invert();
    [-1, 1].forEach(s => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(eyeR, 8, 6), rig.mats.eye);
      eye.applyMatrix4(new THREE.Matrix4().makeTranslation(s * 0.032, front.y, front.z).premultiply(headInv));
      bones.Head.add(eye);
    });
  }
  return { sync, material };
}

/* Le devant du visage : le point le plus avancé du maillage, au milieu,
   un peu au dessus de la base de la tête */
function faceFront(mesh, head, toRoot) {
  const p = mesh.geometry.attributes.position, v = new THREE.Vector3();
  const y = head.y + 0.08, out = new THREE.Vector3(0, y, 0.08);
  let best = -Infinity;
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i).applyMatrix4(toRoot);
    if (Math.abs(v.x) < 0.05 && Math.abs(v.y - y) < 0.03 && v.z > best) best = v.z;
  }
  if (best > -Infinity) out.z = best + 0.004;
  return out;
}

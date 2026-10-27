/* Convertit une animation Mixamo (FBX) en animation de notre samouraï.
   Tourne dans un navigateur, piloté par tools/bake-mixamo.mjs.

   Le corps, la tête et la main recopient l'orientation de l'os Mixamo
   correspondant. Les bras et les jambes recopient seulement la direction
   de l'os, puisque nos membres n'ont pas la même pose de repos. */
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const ORDER = ['hips', 'spine', 'chest', 'neck', 'head', 'shL', 'elL', 'shR', 'elR', 'wrR', 'hipL', 'knL', 'hipR', 'knR'];
const PARENT = { spine: 'hips', chest: 'spine', neck: 'chest', head: 'neck', shL: 'chest', elL: 'shL', shR: 'chest', elR: 'shR', wrR: 'elR', hipL: 'hips', knL: 'hipL', hipR: 'hips', knR: 'hipR' };
const ORIENT = { hips: 'Hips', spine: 'Spine', chest: 'Spine2', neck: 'Neck', head: 'Head', wrR: 'RightHand' };
const DIRECT = {
  shL: ['LeftArm', 'LeftForeArm'], elL: ['LeftForeArm', 'LeftHand'],
  shR: ['RightArm', 'RightForeArm'], elR: ['RightForeArm', 'RightHand'],
  hipL: ['LeftUpLeg', 'LeftLeg'], knL: ['LeftLeg', 'LeftFoot'],
  hipR: ['RightUpLeg', 'RightLeg'], knR: ['RightLeg', 'RightFoot']
};
/* Notre main a le bras le long de -y et la lame vers +z ; dans la pose de
   repos Mixamo, le bras droit part vers -x. On passe de l'une à l'autre. */
const HAND_FIX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2);
const DOWN = new THREE.Vector3(0, -1, 0);

window.bake = async (url, fps = 30, clipName = '') => {
  const buf = await (await fetch(url)).arrayBuffer();
  let obj, clips;
  if (url.endsWith('.glb')) {
    const gltf = await new GLTFLoader().parseAsync(buf, '');
    obj = gltf.scene; clips = gltf.animations;
  } else {
    obj = new FBXLoader().parse(buf, ''); clips = obj.animations;
  }
  /* un fichier peut contenir plusieurs animations : on prend celle demandée */
  const clip = clipName ? clips.find(a => a.name === clipName) : clips.find(a => a.tracks.length);
  if (!clip) throw new Error(`animation « ${clipName} » absente : ${clips.map(a => a.name).join(', ')}`);
  const bones = {};
  let skinned = null;
  obj.traverse(o => {
    if (o.isBone) bones[o.name.replace(/^mixamorig\d*:?/, '')] = o;
    if (o.isSkinnedMesh && !skinned) skinned = o;
  });

  /* La pose de liaison (T-pose), lue dans le squelette du maillage */
  obj.updateMatrixWorld(true);
  const bindQ = {}, bindP = {};
  const m = new THREE.Matrix4(), s = new THREE.Vector3();
  skinned.skeleton.bones.forEach((b, i) => {
    m.copy(skinned.skeleton.boneInverses[i]).invert().premultiply(skinned.matrixWorld);
    const q = new THREE.Quaternion(), p = new THREE.Vector3();
    m.decompose(p, q, s);
    const k = b.name.replace(/^mixamorig\d*:?/, '');
    bindQ[k] = q; bindP[k] = p;
  });
  /* Les .glb (en centimètres sous une armature réduite) : la hauteur de repos
     des hanches se lit dans la scène elle-même, dans les mêmes unités que l'animation */
  if (url.endsWith('.glb')) bones.Hips.getWorldPosition(bindP.Hips = new THREE.Vector3());
  const scale = 0.98 / bindP.Hips.y;

  const mixer = new THREE.AnimationMixer(obj);
  mixer.clipAction(clip).play();
  const frames = [];
  const n = Math.round(clip.duration * fps);
  const wq = new THREE.Quaternion(), wp = new THREE.Vector3(), wp2 = new THREE.Vector3();
  for (let f = 0; f <= n; f++) {
    mixer.setTime(f / fps);
    obj.updateMatrixWorld(true);
    const W = {}, out = [];
    for (const j of ORDER) {
      const parent = PARENT[j] ? W[PARENT[j]] : new THREE.Quaternion();
      let w;
      if (ORIENT[j]) {
        const k = ORIENT[j];
        bones[k].getWorldQuaternion(wq);
        w = wq.clone().multiply(bindQ[k].clone().invert());
        if (j === 'wrR') w.multiply(HAND_FIX);
      } else {
        const [a, b] = DIRECT[j];
        bones[a].getWorldPosition(wp); bones[b].getWorldPosition(wp2);
        const d = wp2.sub(wp).normalize().applyQuaternion(parent.clone().invert());
        w = parent.clone().multiply(new THREE.Quaternion().setFromUnitVectors(DOWN, d));
      }
      W[j] = w;
      const local = parent.clone().invert().multiply(w);
      out.push(...local.toArray().map(x => +x.toFixed(4)));
    }
    bones.Hips.getWorldPosition(wp);
    frames.push({
      q: out,
      y: +((wp.y - bindP.Hips.y) * scale).toFixed(4),
      x: +((wp.x - bindP.Hips.x) * scale).toFixed(4),
      z: +((wp.z - bindP.Hips.z) * scale).toFixed(4)
    });
  }
  return { fps, duration: +clip.duration.toFixed(3), joints: ORDER, frames };
};

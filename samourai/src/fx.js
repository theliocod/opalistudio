/* =========================================================
   LAME DE CENDRES — Les effets
   Étincelles, sang d'encre, braises de mort, et la traînée
   lumineuse que laisse la lame.
   ========================================================= */
import * as THREE from 'three';

/* Une réserve de particules : on en réveille quand il faut, elles
   retombent sous la gravité et s'éteignent. */
export function particlePool(scene, max = 900) {
  const pos = new Float32Array(max * 3), col = new Float32Array(max * 3);
  const vel = new Float32Array(max * 3), life = new Float32Array(max), maxLife = new Float32Array(max);
  const grav = new Float32Array(max), base = new Float32Array(max * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({ size: 0.09, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  scene.add(pts);
  let next = 0;
  for (let i = 0; i < max; i++) pos[i * 3 + 1] = -100;

  function emit(at, n, { color = 0xffc070, speed = 6, up = 2, gravity = 14, lifeTime = 0.45, spread = 1, intensity = 3 } = {}) {
    const c = new THREE.Color(color).multiplyScalar(intensity);
    for (let k = 0; k < n; k++) {
      const i = next; next = (next + 1) % max;
      pos[i * 3] = at.x; pos[i * 3 + 1] = at.y; pos[i * 3 + 2] = at.z;
      const a = Math.random() * Math.PI * 2, e = (Math.random() - 0.3) * spread;
      const s = speed * (0.3 + Math.random() * 0.9);
      vel[i * 3] = Math.cos(a) * s; vel[i * 3 + 1] = up + e * s; vel[i * 3 + 2] = Math.sin(a) * s;
      life[i] = maxLife[i] = lifeTime * (0.5 + Math.random() * 0.8);
      grav[i] = gravity;
      base[i * 3] = c.r; base[i * 3 + 1] = c.g; base[i * 3 + 2] = c.b;
    }
  }

  function update(dt) {
    for (let i = 0; i < max; i++) {
      if (life[i] <= 0) continue;
      life[i] -= dt;
      const f = Math.max(0, life[i] / maxLife[i]);
      vel[i * 3 + 1] -= grav[i] * dt;
      vel[i * 3] *= 1 - 1.5 * dt; vel[i * 3 + 2] *= 1 - 1.5 * dt;
      pos[i * 3] += vel[i * 3] * dt; pos[i * 3 + 1] += vel[i * 3 + 1] * dt; pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
      if (pos[i * 3 + 1] < 0.02) { pos[i * 3 + 1] = 0.02; vel[i * 3 + 1] *= -0.3; }
      col[i * 3] = base[i * 3] * f; col[i * 3 + 1] = base[i * 3 + 1] * f; col[i * 3 + 2] = base[i * 3 + 2] * f;
      if (life[i] <= 0) pos[i * 3 + 1] = -100;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
  }

  return { emit, update };
}

/* La traînée : un ruban tendu entre le talon et la pointe de la lame,
   qui garde en mémoire leurs dernières positions et s'efface. */
export function slashTrail(scene, color = 0xbfe6ff, segments = 12) {
  const n = segments;
  const pos = new Float32Array(n * 2 * 3), alpha = new Float32Array(n * 2);
  const idx = [];
  for (let i = 0; i < n - 1; i++) {
    const a = i * 2, b = a + 1, c = a + 2, d = a + 3;
    idx.push(a, b, c, b, d, c);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('alpha', new THREE.BufferAttribute(alpha, 1));
  geo.setIndex(idx);
  const c = new THREE.Color(color);
  const mat = new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Vector3(c.r, c.g, c.b) }, uGain: { value: 0 } },
    vertexShader: `attribute float alpha; varying float vA;
      void main() { vA = alpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform vec3 uColor; uniform float uGain; varying float vA;
      void main() { gl_FragColor = vec4(uColor * 1.5, vA * vA * vA * uGain * 0.75); }`,
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  scene.add(mesh);

  const hist = [];
  const a = new THREE.Vector3(), b = new THREE.Vector3();
  let gain = 0;

  return {
    /* active : la lame est en train de frapper */
    update(baseObj, tipObj, active, dt) {
      baseObj.getWorldPosition(a); tipObj.getWorldPosition(b);
      hist.unshift([a.clone(), b.clone()]);
      if (hist.length > n) hist.pop();
      gain += ((active ? 1 : 0) - gain) * Math.min(1, dt * (active ? 30 : 9));
      mat.uniforms.uGain.value = gain;
      for (let i = 0; i < n; i++) {
        const h = hist[Math.min(i, hist.length - 1)];
        const p0 = h[0], p1 = h[1];
        /* le ruban s'étire surtout vers la pointe */
        const mid = p0.clone().lerp(p1, 0.6);
        pos.set([mid.x, mid.y, mid.z, p1.x, p1.y, p1.z], i * 6);
        const f = 1 - i / (n - 1);
        alpha[i * 2] = f * 0.25; alpha[i * 2 + 1] = f;
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.alpha.needsUpdate = true;
      mesh.visible = gain > 0.01;
    }
  };
}

// A sprout comes up under him and lifts him on a leaf, past the clouds; he dozes off at the top with the stem swaying.
(() => {
  const { D, xf, FACE, boil, openPath, closedPath, kit } = window.__lump;
  const { CREAM, GREEN, GREY, WHITE } = kit, k = kit.clip('sprout_b');
  const DEEP = '#2E9E5B', SOIL = '#1C150C', H = 900, WIDE = 0.45;
  const ss = u => u * u * (3 - 2 * u);
  // he never moves: the ground falls away by h and the camera sits at zoom z with his feet at screen height ty
  const cam = (z, ty) => kit.view(z, [128, 201], [128 - 8 * (1 - z) / (1 - WIDE), ty]);
  const cloud = (c, x, y, s, w, seed) => {
    closedPath(c, boil([[-60, 10], [-52, -8], [-30, -14], [-18, -30], [8, -34], [26, -22], [46, -20], [62, -4], [58, 12], [0, 16]].map(([px, py]) => [x + px * s, y + py * s]), seed, 2));
    c.fillStyle = WHITE; c.fill(); c.strokeStyle = GREY; c.lineWidth = w(3); c.stroke();
  };
  // everything but him: ground h below, the stem (its top swayed sx), its leaves, the clouds, and the leaf he stands on
  const world = (h, sx, z, ty, leafK = 1) => (c, d, seed) => {
    const w = n => n / Math.sqrt(z), bottom = 201 + (240 - ty) / z + 20, ground = 201 + h, end = Math.min(ground, bottom);
    const X = y => 128 + sx * Math.exp(-(y - 210) / 260) + Math.sin((ground - y) / 90) * 10 * Math.min(1, (y - 210) / 60);
    c.save(); c.lineCap = c.lineJoin = 'round';
    [[-10, 430, 1.4], [300, 640, 1.2], [252, H + 62, 1]].forEach(([x, alt, s], i) => { const y = ground - alt; if (y > -340 && y < bottom + 40) cloud(c, x, y, s, w, seed + i); });
    if (ground < bottom) {
      c.fillStyle = SOIL; c.fillRect(-400, ground, 1100, bottom - ground + 30);
      c.strokeStyle = CREAM; c.lineWidth = w(2.6); c.globalAlpha = 0.6; c.beginPath(); c.moveTo(-400, ground); c.lineTo(700, ground); c.stroke(); c.globalAlpha = 1;
    }
    if (end > 222) {
      const P = []; for (let y = 210; y < end; y += 60) P.push([X(y), y]); P.push([X(end), end]);
      c.strokeStyle = CREAM; c.lineWidth = w(13); openPath(c, P); c.stroke();
      c.strokeStyle = GREEN; c.lineWidth = w(8); openPath(c, P); c.stroke();
      c.fillStyle = GREEN; c.strokeStyle = CREAM; c.lineWidth = w(2.6);
      for (let alt = 90, n = 0; alt < h - 50; alt += 150, n++) {
        const y = ground - alt, x = X(y), side = n % 2 ? 1 : -1; if (y < 250 || y > bottom) continue;
        closedPath(c, boil([[x, y], [x + side * 26, y - 17], [x + side * 58, y - 7], [x + side * 30, y + 9]], seed + n, 1.5)); c.fill(); c.stroke();
      }
    }
    closedPath(c, boil([[-92, 1], [-48, -6], [0, -7], [48, -6], [92, 1], [48, 11], [0, 14], [-48, 11]].map(([px, py]) => [128 + sx + px * leafK, 203 + py]), seed + 9, 1.5));
    c.fillStyle = GREEN; c.fill(); c.strokeStyle = CREAM; c.lineWidth = w(3); c.stroke();
    c.strokeStyle = DEEP; c.lineWidth = w(2.6); c.beginPath(); c.moveTo(128 + sx - 74 * leafK, 205); c.lineTo(128 + sx + 74 * leafK, 205); c.stroke();
    c.restore();
  };
  const on = (base, sx, face, z, ty, h, more = {}, o = {}) => xf(base, { dx: sx, ...o, ...(face ? { face } : {}), extra: { view: cam(z, ty), back: world(h, sx, z, ty, more.leafK), ...more } });
  const down = kit.look(0, 6, 'o');

  k.add('hm', 4, xf(D.N, { face: down }));
  [[-4, 0.8], [0, 0.8], [-7, 0.92]].forEach(([dy, leafK], i) => k.add('bump' + i, 2, on(D.N, 0, i === 1 ? down : FACE.shock, 1, 201, 0, { leafK }, { dy, ky: dy ? 1.03 : 0.97 })));

  for (let i = 1; i <= 32; i++) {
    const h = H * ss(i / 32), z = 1 - (1 - WIDE) * ss(Math.min(1, h / 220)), ty = Math.max(201 - h * z, 164 * z + 26), flap = i % 2;
    k.add('grow' + i, 2, on(D.N, 0, h < 80 ? FACE.shock : kit.faces.worried, z, ty, h, { arm: [[90, 140], [62, flap ? 122 : 136]], arm2: [[166, 140], [194, flap ? 136 : 122]] }));
  }
  const top = 164 * WIDE + 26;
  [22, 10, -16, -28, -12, 12, 22, 8].forEach((sx, i) => k.add('sway' + i, 2, on(D.N, sx, kit.look(0, 6, 'wobble'), WIDE, top, H, { arm: [[90 + sx, 140], [64 + sx, 132]], arm2: [[166 + sx, 140], [192 + sx, 132]] })));
  const closer = kit.steps(WIDE, 1, 9).slice(1), drift = [-6, -14, -12, -4, 5, 8, 5, 1];
  closer.forEach((z, i) => k.add('near' + i, 2, on(D.N, drift[i], i < 4 ? kit.look(0, 3, 'flat') : kit.look(0, 0, 'smile'), z, top + (201 - top) * (z - WIDE) / (1 - WIDE), H)));
  k.add('nod', 6, on(D.T1, -2, null, 1, 201, H));
  k.add('tip', 6, on(D.T2, -4, null, 1, 201, H));
  [-4, 4, 7, 2, -6, 0].forEach((sx, i) => k.add('rock' + i, 6, on(D.S1, sx, null, 1, 201, H, { fxm: 'idle' })));
  k.done({ doze: false });
})();

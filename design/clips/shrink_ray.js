// Shrink ray: a ray gun zaps him tiny and he scurries about. The zap to undo it overshoots, and for a moment he is enormous.
// group: nonsense
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', GREEN = '#58D68D', YELLOW = '#FFD23F', GUN = [200, 34], S = 0.4;
  const big = (dx, dy = 0) => [['dot',114 + dx,108 + dy,7], ['dot',142 + dx,106 + dy,7], ['stroke',[[121 + dx,126],[128 + dx,129],[135 + dx,126]],4]];   // eyes that still read when he is tiny
  const squeak = [['dot',114,106,7], ['dot',142,104,7], ['mouth',[[119,121],[137,120],[138,134],[128,139],[118,134]]]];
  const smug = [['stroke',[[108,110],[116,104],[124,110]],3], ['stroke',[[132,108],[140,102],[148,108]],3], ['stroke',[[116,121],[128,128],[140,121]],3]];
  // the gun in the top corner, aimed at (tx, ty); colour: the beam it is firing, if any; out: how far it has pulled back
  const gun = (tx, ty, colour, out = 0) => (c, _, seed) => {
    const a = Math.atan2(ty - GUN[1], tx - GUN[0]), len = Math.hypot(tx - GUN[0], ty - GUN[1]) / 1.3 - 22;
    c.save(); c.lineJoin = c.lineCap = 'round'; c.translate(GUN[0] + out, GUN[1] - out); c.rotate(a); c.scale(1.3, 1.3);
    if (colour) {
      c.strokeStyle = colour; c.lineWidth = 4.5; c.beginPath(); c.moveTo(18, 0);
      for (let i = 1; i < 6; i++) c.lineTo(18 + len * i / 6, ((i + seed) % 2 ? 7 : -7));
      c.lineTo(22 + len, 0); c.stroke();
      c.lineWidth = 3; c.beginPath();
      for (let i = 0; i < 5; i++) { const b = 1.2 + i * 0.95; c.moveTo(22 + len + Math.cos(b) * 10, Math.sin(b) * 10); c.lineTo(22 + len + Math.cos(b) * 19, Math.sin(b) * 19); }
      c.stroke();
    }
    c.fillStyle = '#9FB0C4'; c.strokeStyle = CREAM; c.lineWidth = 2.4;
    c.beginPath(); c.moveTo(0, -5); c.lineTo(11, -10); c.lineTo(11, 10); c.lineTo(0, 5); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.roundRect(-34, -9, 34, 18, 5); c.fill(); c.stroke();
    c.fillStyle = colour || '#17161A'; c.beginPath(); c.arc(15, 0, 4.5, 0, Math.PI * 2); c.fill(); c.stroke();
    c.restore();
  };
  const dust = (x, dir) => (c, _, seed) => {             // kicked up behind him as he runs
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.2; c.lineCap = 'round'; c.globalAlpha = 0.7; c.beginPath();
    [[26, 196, 5], [38, 190, 4], [34, 199, 3]].forEach(([u, y, r], i) => { const px = x - dir * (u + (seed + i) % 2 * 3); c.moveTo(px + r, y); c.arc(px, y, r, 0, Math.PI * 2); });
    c.stroke(); c.restore();
  };
  const aim = k => [134, 201 - 124 * k];
  const zap = (k, dx, colour, face) => xf(D.N, { k, dx, face, extra: { front: gun(...aim(k), colour) } });
  const run = (dx, dir, i) => xf(D.N, { k: S, dx, rot: dir * 0.16 * (i % 2 ? 1 : 0.4), dy: i % 2 ? -5 : 0, face: big(dir * 9), extra: { front: dust(128 + dx, dir) } });
  D.shrink_ray_1 = xf(D.N, { face: FACE.lookr, extra: { front: gun(...aim(1), null, 40) } });
  D.shrink_ray_2 = xf(D.N, { face: FACE.lookup, extra: { front: gun(...aim(1)), fxm: 'alert', fx: [128, 52] } });
  [1, 0.84, 0.68, 0.54, 0.43, S].forEach((k, i) => { D['shrink_ray_z' + i] = zap(k, i % 2 ? 2 : -2, GREEN, FACE.shock); });
  D.shrink_ray_3 = xf(D.N, { k: S, face: big(0), extra: { front: gun(...aim(S)) } });
  D.shrink_ray_4 = xf(D.N, { k: S, face: big(-9), extra: { front: gun(...aim(S)) } });
  D.shrink_ray_5 = xf(D.N, { k: S, face: big(9), extra: { front: gun(...aim(S)) } });
  D.shrink_ray_6 = xf(D.N, { k: S, dy: -10, ky: 1.1, face: squeak, shadowK: 0.7, extra: { front: gun(...aim(S)) } });
  const path = [-22, -46, -70, -90, -62, -32, -2, 28, 58, 86, 60, 32, 8];
  path.forEach((dx, i) => { D['shrink_ray_r' + i] = run(dx, i < 4 ? -1 : i < 10 ? 1 : -1, i); });
  D.shrink_ray_7 = xf(D.N, { k: S, dx: -94, face: big(-10) });
  D.shrink_ray_8 = xf(D.N, { k: S, dx: 92, face: big(10) });
  D.shrink_ray_9 = xf(D.N, { k: S, face: big(8, -8), extra: { front: gun(...aim(S)) } });
  [S, 0.7, 1.1, 1.5].forEach((k, i) => { D['shrink_ray_g' + i] = zap(k, i % 2 ? 2 : -2, YELLOW, i < 3 ? FACE.shock : smug); });
  D.shrink_ray_10 = xf(D.N, { k: 1.5, face: smug });
  D.shrink_ray_11 = xf(D.N, { k: 1.52, ky: 0.98, face: smug });
  D.shrink_ray_12 = xf(D.N, { k: 1.22, ky: 0.94, face: FACE.puff });
  D.shrink_ray_13 = xf(D.N, { ky: 0.95, kx: 1.04, face: FACE.sheep });
  D.shrink_ray_14 = xf(D.N, { face: FACE.sheep });
  const each = (p, n, t) => Array.from({ length: n }, (_, i) => [p + i, t]);
  const r = (a, b) => path.slice(a, b).map((_, i) => ['shrink_ray_r' + (a + i), 2]);
  CLIPS.shrink_ray = { home: 'idle', seq: [...WAKE, ['shrink_ray_1', 3], ['shrink_ray_2', 6], ...each('shrink_ray_z', 6, 2), ['shrink_ray_3', 6], ['shrink_ray_4', 4], ['shrink_ray_5', 4],
    ['shrink_ray_6', 3], ['shrink_ray_3', 3], ...r(0, 4), ['shrink_ray_7', 4], ...r(4, 10), ['shrink_ray_8', 4], ...r(10, 13), ['shrink_ray_9', 5],
    ...each('shrink_ray_g', 4, 2), ['shrink_ray_10', 4], ['shrink_ray_11', 4], ['shrink_ray_10', 4], ['shrink_ray_12', 2], ['shrink_ray_13', 3], ['shrink_ray_14', 8], ...DOZE] };
})();

// Parachute: he drifts down from the top under a parachute, touches down gently, and the canopy settles over him.
(() => {
  const { D, xf, FACE, boil, closedPath, kit } = window.__lump, k = kit.clip('parachute'), { CREAM, RED, YELLOW, TAU } = kit;
  const UPP = [[62, 62], [70, 42], [98, 28], [128, 24], [158, 28], [186, 42], [194, 62]];
  const OVER = [[58, 201], [66, 122], [94, 78], [128, 66], [162, 78], [190, 122], [198, 201]];
  const mix = t => UPP.map(([x, y], i) => [x + (OVER[i][0] - x) * t, y + (OVER[i][1] - y) * t]);
  const canopy = (c, pts, seed, dx = 0, dy = 0, cords, a = 1) => kit.fade(c, a, () => {
    c.translate(dx, dy); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.8;
    if (cords) { c.beginPath(); cords.forEach(([p, s]) => { c.moveTo(pts[p][0], pts[p][1]); c.lineTo(s[0] - dx, s[1] - dy); }); c.stroke(); }
    c.fillStyle = RED; closedPath(c, boil(pts, seed, 1.4)); c.fill(); c.stroke();
    const top = pts[3], l = pts[0], r = pts[6];
    c.beginPath(); [1 / 3, 2 / 3].forEach(f => { c.moveTo(top[0], top[1]); c.lineTo(l[0] + (r[0] - l[0]) * f, Math.max(l[1], r[1]) - 3); }); c.stroke();
    c.fillStyle = YELLOW; c.beginPath(); c.arc(top[0], top[1], 6, 0, TAU); c.fill(); c.stroke();
  });
  const hang = (n, t, dy, sway, face, more = {}) => {
    const o = { k: 0.85, dx: sway, dy, ...more }, a = kit.pt(o, [84, 132]), b = kit.pt(o, [172, 132]);
    k.add(n, t, xf(D.N, { ...o, face, shadowK: Math.max(0, 1 + dy / 200), extra: { front: (c, d, seed) => canopy(c, UPP, seed, sway, dy, [[0, a], [6, b]]) } }));
  };
  kit.steps(-228, 0, 11).slice(0, 10).forEach((dy, i) => hang('fall' + i, 2, dy, [5, 0, -5, 0][i % 4], i < 6 ? FACE.happy : FACE.lookr));
  hang('land', 2, 0, 0, FACE.happy, { ky: 0.93, kx: 1.05 });
  hang('stand', 6, 0, 0, FACE.happy);
  [0.3, 0.65].forEach((t, i) => k.add('sag' + i, 2, xf(D.N, { k: 0.85, face: FACE.lookup, extra: { front: (c, d, seed) => canopy(c, mix(t), seed) } })));
  const under = (n, t, kx) => k.add(n, t, xf(D.N, { k: 0.85, face: [], extra: { front: (c, d, seed) => { canopy(c, mix(1).map(([x, y]) => [128 + (x - 128) * kx, y]), seed); kit.mark(c, '?', 128, 52, 1); } } }));
  under('over1', 6, 1); under('over2', 4, 1.05); under('over3', 4, 0.97);
  [0.65, 0.3].forEach((a, i) => k.add('out' + i, 2, xf(D.N, { k: 0.85, face: FACE.grump, extra: { front: (c, d, seed) => canopy(c, mix(1), seed, 0, 0, null, a) } })));
  k.add('end', 4, xf(D.N, { k: 0.85, face: FACE.grump }));
  k.done();
})();

// Close on his face while one drop of water takes six seconds to fall on his head: curious, braced, squinting, flinching, plip, shrug.
// group: odd
(() => {
  const { D, xf, FACE, kit } = window.__lump, { TAU, CREAM, WHITE, BLUE } = kit;
  const k = kit.clip('slow_motion'), V = kit.view(1.5, [128, 112], [120, 170]), N = 72;
  const ramp = (f, a, b) => { const t = Math.max(0, Math.min(1, (f - a) / (b - a))); return t * t * (3 - 2 * t); };
  const pose = f => ({ ky: 1 - 0.14 * ramp(f, 24, 70), kx: 1 + 0.06 * ramp(f, 24, 70), rot: 0.08 * ramp(f, 40, 70) });
  const land = kit.pt(pose(N - 1), [112, 72]), R = 8;
  const brows = [['stroke', [[108, 96], [120, 93]], 2.6], ['stroke', [[136, 91], [148, 94]], 2.6]], wobble = kit.look(0, 0, 'wobble')[2];
  const face = f => f < 8 ? kit.look(0, 0, 'smile') : f < 14 ? kit.look(-2, -5, 'flat') : f < 24 ? kit.look(-2, -6, 'o')
    : f < 40 ? [...kit.look(-2, -5, 'wobble'), ...brows]
    : f < 56 ? [['stroke', [[110, 105], [116, 108], [122, 105]], 3], ['dot', 138, 103, 4], ...brows, wobble] : FACE.aah;
  const water = (c, x, y, r) => {
    c.save(); c.lineJoin = 'round'; c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 1.6;
    c.beginPath(); c.moveTo(x, y - r * 1.9); c.quadraticCurveTo(x + r * 1.5, y, x, y + r); c.quadraticCurveTo(x - r * 1.5, y, x, y - r * 1.9); c.fill(); c.stroke();
    c.strokeStyle = WHITE; c.lineWidth = 1.6; c.lineCap = 'round'; c.beginPath(); c.arc(x, y, r * 0.42, 2.2, 3.4); c.stroke(); c.restore();
  };
  // the plip: the drop flattens on his head and three small beads hop off it
  const plip = (c, [x, y], t) => {
    c.save(); c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 1.4;
    if (t < 2) { c.beginPath(); c.ellipse(x, y - 1, 11 - t * 3, 3.5 - t, 0, 0, TAU); c.fill(); c.stroke(); }
    [[-1, 0.6], [0.2, 1], [1, 0.7]].forEach(([sx, up]) => { c.beginPath(); c.arc(x + sx * (7 + t * 6), y - up * (8 + t * 5) + t * t * 2.5, 3.4 - t * 0.5, 0, TAU); c.fill(); c.stroke(); });
    c.restore();
  };
  const shot = (o, face, front, extra = {}) => xf(D.N, { ...o, face, extra: { view: V, front, ...extra } });

  kit.steps(0, 1, 4).forEach((t, i) => k.add('in' + i, 2, xf(D.N, { face: kit.look(0, 0, 'smile'), extra: { view: kit.cam(t, kit.HOME, V) } })));
  for (let f = 0; f < N; f++) {
    const y = -10 + (land[1] - R + 10) * f / (N - 1);
    k.add('d' + f, 2, shot(pose(f), face(f), c => water(c, land[0], y, R)));
  }
  [[0.86, 1.08], [1.03, 0.98], [1, 1]].forEach(([ky, kx], t) => {
    const o = { ky, kx, rot: 0.08 * (1 - t / 2) };
    k.add('plip' + t, 2, shot(o, t < 2 ? FACE.aah : kit.look(-2, -5, 'flat'), c => plip(c, kit.pt(o, [112, 72]), t)));
  });
  k.add('blank', 12, shot({}, kit.look(-2, -5, 'flat')));
  k.add('shrug0', 2, shot({ ky: 1.02 }, kit.look(0, 0, 'flat'), null, { arm: [[90, 140], [66, 142]], arm2: [[166, 140], [190, 142]] }));
  k.add('shrug', 14, shot({ ky: 1.04 }, kit.faces.closed, null, { arm: [[90, 138], [62, 122]], arm2: [[166, 138], [194, 122]] }));
  k.add('shrug0', 2);
  kit.steps(0, 1, 4).forEach((t, i) => k.add('out' + i, 2, xf(D.N, { face: kit.look(0, 0, 'smile'), extra: { view: kit.cam(t, V, kit.HOME) } })));
  k.done();
})();

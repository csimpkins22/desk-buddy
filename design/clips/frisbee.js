// Frisbee: a frisbee glides in; he leaps and catches it in his mouth, and lands looking very pleased with himself.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('frisbee'), { CREAM, RED, YELLOW, TAU } = kit;
  const disc = (c, x, y, t = 0, alpha = 1) => kit.fade(c, alpha, () => {
    c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6; c.fillStyle = RED;
    c.beginPath(); c.ellipse(x, y, 24, 7, t, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = YELLOW; c.lineWidth = 3; c.beginPath(); c.ellipse(x, y - 1, 14, 2.5, t, 0, TAU); c.stroke();
  });
  const f = (o, face, at, alpha, extra = {}) => {
    const [x, y, t] = at || [...kit.pt(o, [128, 126]), 0];
    return xf(D.N, { ...o, face, extra: { front: c => disc(c, x, y, t, alpha), ...extra } });
  };

  k.add('see', 6, xf(D.N, { face: FACE.lookr }));
  [[254, 56], [234, 57], [214, 58], [196, 60], [180, 61], [166, 62]].forEach(([x, y], i) =>
    k.add('glide' + i, 2, f(i < 4 ? {} : { ky: i === 4 ? 0.92 : 0.86, kx: 1.06 }, i < 2 ? FACE.lookr : FACE.lookup, [x, y, -0.1])));
  k.add('leap0', 2, f({ dy: -22, ky: 1.12, dx: 4, shadowK: 0.8 }, FACE.aah, [154, 62, -0.06]));
  k.add('leap1', 2, f({ dy: -46, ky: 1.1, dx: 8, shadowK: 0.65 }, FACE.aah, [145, 62, -0.03]));
  k.add('catch', 4, f({ dy: -58, ky: 1.06, dx: 10, shadowK: 0.55 }, FACE.happy));
  k.add('fall', 2, f({ dy: -30, ky: 1.08, dx: 10, shadowK: 0.7 }, FACE.happy));
  k.add('land', 2, f({ ky: 0.86, kx: 1.08, dx: 10 }, FACE.happy));
  k.add('settle', 2, f({ ky: 1.05, dx: 10 }, FACE.happy));
  k.add('proud', 10, f({ dx: 10 }, FACE.happy, null, 1, { fxm: 'done' }));
  k.add('p0', 4, f({ dx: 10, ky: 1.04 }, FACE.happy, null, 1, { fxm: 'done' }));
  k.add('p1', 4, f({ dx: 10, ky: 0.97 }, FACE.happy, null, 1, { fxm: 'done' }));
  k.add('p0', 4); k.add('p1', 4);
  k.add('out0', 2, f({ dx: 6 }, FACE.happy, null, 0.6));
  k.add('out1', 2, f({ dx: 2 }, FACE.happy, null, 0.3));
  k.done();
})();

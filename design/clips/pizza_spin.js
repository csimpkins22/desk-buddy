// Pizza spin: he tosses dough that grows with each toss until it lands over his head like a hat.
(() => {
  const { D, xf, FACE, boil, closedPath, kit } = window.__lump, k = kit.clip('pizza_spin');
  const DOUGH = '#E9C877';
  const ink = c => { c.lineJoin = c.lineCap = 'round'; c.fillStyle = DOUGH; c.strokeStyle = kit.CREAM; c.lineWidth = 2.8; };
  const dough = (c, y, rx, a) => {
    c.save(); ink(c);
    c.beginPath(); c.ellipse(128, y, rx, rx * 0.2, 0, 0, kit.TAU); c.fill(); c.stroke();
    c.fillStyle = kit.BROWN; c.beginPath(); c.arc(128 + Math.cos(a) * rx * 0.6, y + Math.sin(a) * rx * 0.1, 3.5, 0, kit.TAU); c.fill();
    c.restore();
  };
  const HAT = [[62, 96], [68, 76], [98, 60], [128, 56], [158, 60], [188, 76], [194, 96], [178, 92], [161, 100], [144, 92], [128, 99], [112, 92], [95, 100], [78, 92]];
  const hat = (c, seed, dy) => { c.save(); ink(c); closedPath(c, boil(HAT.map(([x, y]) => [x, y + dy]), seed, 1)); c.fill(); c.stroke(); c.restore(); };
  const arms = hy => ({ arm: [[90, 140], [88, hy]], arm2: [[166, 140], [168, hy]] });
  const pose = (o, hy, y, rx, a) => xf(D.N, { ...o, extra: { ...(hy ? arms(hy) : {}), front: c => dough(c, y, rx, a) } });

  k.add('hold', 6, pose({ face: FACE.happy }, 72, 58, 40, 0));
  const toss = (n, r0, r1, top) => {
    k.add('dip' + n, 2, pose({ face: FACE.happy, ky: 0.94 }, 80, 66, r0, 0));
    [...kit.steps(50, top, 3), ...kit.steps(top, 54, 3).slice(1)].forEach((y, i) =>
      k.add('fly' + n + i, 2, pose({ face: FACE.lookup }, 72, y, r0 + (r1 - r0) * i / 4, 1 + i * 1.3)));
  };
  toss(0, 40, 50, 30);
  toss(1, 50, 62, 26);
  k.add('dip2', 2, pose({ face: FACE.happy, ky: 0.92 }, 82, 68, 62, 0));
  kit.steps(48, 26, 3).forEach((y, i) => k.add('up' + i, 2, pose({ face: FACE.lookup }, 72, y, 62 + i * 5, 1 + i * 1.3)));
  k.add('down0', 2, pose({ face: FACE.shock }, 0, 42, 72, 5));
  k.add('down1', 2, pose({ face: FACE.shock }, 0, 58, 72, 6.3));
  k.add('plop', 4, xf(D.N, { face: FACE.shock, ky: 0.94, kx: 1.04, extra: { front: (c, d, seed) => hat(c, seed, 7) } }));
  k.add('hat', 14, xf(D.N, { face: FACE.happy, extra: { front: (c, d, seed) => hat(c, seed, 0) } }));
  [0.7, 0.4, 0.15].forEach((a, i) => k.add('out' + i, 2, xf(D.N, { face: FACE.happy, extra: { front: (c, d, seed) => kit.fade(c, a, () => hat(c, seed, 0)) } })));
  k.done();
})();

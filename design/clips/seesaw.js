// Seesaw: he sits on one end of a seesaw; a second Lump drops onto the other end and launches him up off the screen.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('seesaw'), { CREAM, BROWN, GREY } = kit;
  const plank = (c, t) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.8;
    c.fillStyle = GREY; c.beginPath(); c.moveTo(114, 201); c.lineTo(142, 201); c.lineTo(128, 184); c.closePath(); c.fill(); c.stroke();
    c.translate(128, 183); c.rotate(t); c.fillStyle = BROWN; c.beginPath(); c.roundRect(-100, -4, 200, 8, 3); c.fill(); c.stroke(); c.restore();
  };
  const T = { happy: xf(D.N, { k: 0.6, face: FACE.happy }), hit: xf(D.N, { k: 0.6, ky: 0.85, kx: 1.08, face: FACE.shock }), up: xf(D.N, { k: 0.6, face: FACE.lookup }) };
  const sit = { k: 0.7, dx: -62, dy: -13 };
  const f = (o, face, { a = 1, t = -0.13, tw } = {}) => xf(D.N, { ...o, face, extra: { front: (c, d, seed) => kit.fade(c, a, () => {
    plank(c, t); if (tw) kit.twin(c, T[tw[0]], seed, 62, tw[1]);
  }) } });

  const ks = kit.steps(1, 0.7, 3), xs = kit.steps(0, -62, 3), ys = kit.steps(0, -13, 3);
  ks.forEach((s, i) => k.add('in' + i, 2, f({ k: s, dx: xs[i], dy: ys[i] }, FACE.happy, { a: [0.35, 0.7, 1][i] })));
  k.add('sit', 10, f(sit, FACE.lookr));
  [-230, -165, -100, -48].forEach((y, i) => k.add('drop' + i, 2, f(sit, i < 2 ? FACE.lookr : FACE.lookup, { tw: ['happy', y] })));
  k.add('hit', 2, f({ ...sit, dy: -21, ky: 0.9 }, FACE.shock, { t: 0, tw: ['hit', -20] }));
  [-60, -105, -155, -210, -270].forEach((y, i) => k.add('fly' + i, 2, f({ ...sit, dy: y, ky: 1.15, shadowK: 0 }, FACE.shock, { t: 0.13, tw: ['happy', -13] })));
  k.add('alone', 16, f({ ...sit, dy: -320, shadowK: 0 }, FACE.shock, { t: 0.13, tw: ['up', -13] }));
  [0.6, 0.3].forEach((a, i) => k.add('out' + i, 2, f({ ...sit, dy: -320, shadowK: 0 }, FACE.shock, { a, t: 0.13, tw: ['up', -13] })));
  [-230, -140, -60].forEach((y, i) => k.add('fall' + i, 2, xf(D.N, { dy: y, ky: 1.1, face: FACE.shock, shadowK: 0.4 + i * 0.2 })));
  k.add('land', 2, xf(D.N, { ky: 0.84, kx: 1.1, face: FACE.spiral }));
  k.add('settle', 4, xf(D.N, { ky: 1.04, face: FACE.spiral }));
  k.done();
})();

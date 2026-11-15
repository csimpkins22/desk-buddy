// Boomerang: he throws a boomerang off one side, waits, shrugs, and it comes back and bonks him from behind.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('boomerang'), { CREAM, YELLOW } = kit;
  const rang = (c, x, y, a = 0, alpha = 1) => kit.fade(c, alpha, () => {
    c.save(); c.translate(x, y); c.rotate(a); c.lineCap = c.lineJoin = 'round';
    c.beginPath(); c.moveTo(-15, 9); c.lineTo(0, -8); c.lineTo(15, 9);
    c.strokeStyle = CREAM; c.lineWidth = 12; c.stroke(); c.strokeStyle = '#C98A3A'; c.lineWidth = 6.5; c.stroke(); c.restore();
  });
  const f = (o, face, { r, hand, shrug, q, star, stars } = {}) => xf(D.N, { ...o, face, extra: {
    ...(hand ? { arm2: [kit.pt(o, [166, 140]), hand] } : {}),
    ...(shrug ? { arm: [[90, 140], [60, 126]], arm2: [[166, 140], [196, 126]] } : {}),
    front: c => {
      if (r) rang(c, ...r);
      if (q) kit.mark(c, '?', 128, 58);
      if (star) kit.sparkle(c, 74, 92, 13, YELLOW);
      if (stars) { kit.sparkle(c, 104, 56, 8, YELLOW); kit.sparkle(c, 150, 52, 7, YELLOW); }
    } } });

  [0.35, 0.7, 1].forEach((a, i) => k.add('in' + i, 2, f({}, FACE.happy, { r: [204, 148, 0.4, a], hand: [194, 152] })));
  k.add('antic', 4, f({ rot: -0.08, ky: 0.97 }, FACE.happy, { r: [200, 96, -0.6], hand: [192, 104] }));
  k.add('throw', 2, f({ rot: 0.1, ky: 1.03 }, FACE.happy, { r: [224, 116, 1], hand: [204, 132] }));
  k.add('fly0', 2, f({ rot: 0.06 }, FACE.lookr, { r: [252, 106, 2.4], hand: [200, 144] }));
  k.add('fly1', 2, f({}, FACE.lookr, { hand: [190, 156] }));
  k.add('wait', 10, f({}, FACE.lookr));
  k.add('shrug', 10, f({ ky: 0.96 }, FACE.grump, { shrug: true, q: true }));
  [[-22, 0], [12, 1.6], [42, 3.2]].forEach(([x, a], i) => k.add('ret' + i, 2, f({ ky: 0.96 }, FACE.grump, { shrug: true, q: true, r: [x, 98, a] })));
  k.add('bonk', 2, f({ rot: 0.12, kx: 0.95, dx: 6 }, FACE.shock, { r: [60, 96, 4.4], star: true }));
  [[46, 70, 5.2, 0.1], [36, 104, 6, 0.08], [34, 150, 6.8, 0.04], [36, 190, 7.4, 0]].forEach(([x, y, a, rot], i) => k.add('drop' + i, 2, f({ rot, dx: 4 }, FACE.spiral, { r: [x, y, a], stars: i > 1 })));
  k.add('dz0', 4, f({ rot: 0.06 }, FACE.spiral, { r: [36, 192, 0.3], stars: true }));
  k.add('dz1', 4, f({ rot: -0.05 }, FACE.spiral, { r: [36, 192, 0.3], stars: true }));
  k.add('dz0', 4); k.add('dz1', 4);
  [0.6, 0.3].forEach((a, i) => k.add('out' + i, 2, f({}, FACE.spiral, { r: [36, 192, 0.3, a] })));
  k.done();
})();

// Trampoline: he bounces higher each time until he goes off the top, and comes back down a beat late.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('trampoline');
  const tramp = (c, sag, a = 1) => kit.fade(c, a, () => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 3.2;
    c.beginPath(); c.moveTo(64, 187); c.lineTo(58, 200); c.moveTo(192, 187); c.lineTo(198, 200); c.stroke();
    c.beginPath(); c.moveTo(60, 186); c.quadraticCurveTo(128, 186 + sag * 2, 196, 186);
    c.lineWidth = 9; c.stroke(); c.strokeStyle = kit.BLUE; c.lineWidth = 5; c.stroke();
    c.restore();
  });
  // h is how far he is above the mat, sag how far the mat dips under him
  const T = (o, h, sag = 0, a = 1) => xf(D.N, { k: 0.85, dy: -17 + sag - h, shadowK: Math.max(0.3, 1 - h / 160), ...o, extra: { front: c => tramp(c, sag, a) } });
  const air = (name, hs, face, o = {}) => hs.forEach((h, i) => k.add(name + i, 2, T({ face, ...o }, h)));

  [[1, -6, 0.35], [0.92, -12, 0.7]].forEach(([s, dy, a], i) => k.add('on' + i, 2, T({ k: s, dy, face: FACE.happy }, 0, 0, a)));
  k.add('c1', 2, T({ face: FACE.happy, ky: 0.88, kx: 1.05 }, 0, 6));
  air('a', [16, 28, 16], FACE.happy);
  k.add('c2', 2, T({ face: FACE.happy, ky: 0.84, kx: 1.08 }, 0, 9));
  air('b', [30, 52, 60, 52, 30], FACE.ah);
  k.add('c3', 2, T({ face: FACE.puff, ky: 0.74, kx: 1.14 }, 0, 14));
  air('up', [50, 100, 150], FACE.aah, { ky: 1.08, kx: 0.95 });
  k.add('e0', 2, T({ dy: -400, shadowK: 0 }, 0, -4));
  k.add('e1', 2, T({ dy: -400, shadowK: 0 }, 0, 2));
  k.add('e2', 12, T({ dy: -400, shadowK: 0 }, 0, 0));
  air('dn', [150, 100, 50], FACE.shock);
  k.add('land', 2, T({ face: FACE.shock, ky: 0.7, kx: 1.2 }, 0, 16));
  k.add('reb', 2, T({ face: FACE.spiral }, 8, -3));
  k.add('set', 2, T({ face: FACE.spiral, ky: 0.95 }, 0, 4));
  k.add('dazed', 14, T({ face: FACE.spiral }, 0, 2));
  [[0.9, -12, 0.7], [0.95, -6, 0.4], [1, 0, 0.15]].forEach(([s, dy, a], i) => k.add('off' + i, 2, T({ k: s, dy, face: FACE.spiral }, 0, 0, a)));
  k.done();
})();

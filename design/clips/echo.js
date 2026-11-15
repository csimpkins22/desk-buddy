// Echo: he shouts across a canyon, waits, and the echo comes back as rings big enough to bowl him over.
(() => {
  const { D, xf, FACE, boil, kit } = window.__lump, k = kit.clip('echo');
  const { CREAM, BROWN } = kit;
  const tw = (a, b, n) => kit.steps(a, b, n + 1).slice(1);
  const pose = t => ({ k: 1 - 0.1 * t, dx: -30 * t }), O = pose(1), mouth = kit.pt(O, [128, 124]);
  const cliff = (c, seed, a) => kit.fade(c, a, () => {
    c.lineCap = c.lineJoin = 'round'; c.fillStyle = BROWN; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    const p = boil([[204, 116], [196, 132], [201, 201]], seed, 1.2);
    c.beginPath(); c.moveTo(240, 112); p.forEach(([x, y]) => c.lineTo(x, y)); c.lineTo(240, 201); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(210, 150); c.lineTo(228, 146); c.moveTo(212, 178); c.lineTo(232, 174); c.stroke();
  });
  // n arcs centred near (x, y), opening the way they travel (dir 1 right, -1 left)
  const rings = (c, x, y, r, dir, a) => kit.fade(c, a, () => {
    c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3.5;
    for (let i = 0; i < 3; i++) { const m = dir > 0 ? 0 : Math.PI; c.beginPath(); c.arc(x + dir * i * (dir > 0 ? 12 : 14), y, r + i * (dir > 0 ? 10 : 12), m - 0.8, m + 0.8); c.stroke(); }
  });
  const L = (face, o, s = {}) => xf(D.N, { ...o, face, extra: {
    back: (c, d, seed) => cliff(c, seed, s.a ?? 1),
    front: (c) => { if (s.out !== undefined) rings(c, mouth[0] + 16 + 50 * s.out, mouth[1], 8 + 6 * s.out, 1, 1 - 0.7 * s.out); if (s.back !== undefined) rings(c, 215 - 80 * s.back, mouth[1], 18 + 26 * s.back, -1, s.ba ?? 1); },
  } });
  const fall = [{ ...O, rot: -0.5, dx: -10, dy: -24 }, { ...O, rot: -1.0, dx: 8, dy: -42 }, { ...O, rot: -1.45, dx: 24, dy: -50 }];

  tw(0, 1, 3).forEach((t, i) => k.add('go' + i, 2, L(FACE.lookr, pose(t), { a: t })));
  k.add('breath', 4, L(FACE.ah, { ...O, ky: 1.06, rot: -0.06 }));
  tw(0, 1, 4).forEach((t, i) => k.add('shout' + i, 2, L(FACE.aah, { ...O, rot: 0.1, ky: 0.98 }, { out: t })));
  k.add('wait', 10, L(FACE.lookr, O));
  k.add('wait2', 8, L(FACE.grump, O));
  tw(0, 1, 3).forEach((t, i) => k.add('back' + i, 2, L(i < 2 ? FACE.lookr : FACE.shock, O, { back: t })));
  fall.forEach((o, i) => k.add('fall' + i, 2, L(FACE.shock, o, i ? {} : { back: 1, ba: 0.4 })));
  k.add('flat', 14, L(FACE.spiral, fall[2]));
  k.add('up0', 2, L(FACE.spiral, { ...fall[1], k: 0.93 }, { a: 0.66 }));
  k.add('up1', 2, L(FACE.grump, { ...fall[0], k: 0.97, dx: 2 }, { a: 0.33 }));
  k.add('up2', 2, L(FACE.grump, {}, { a: 0 }));
  k.done();
})();

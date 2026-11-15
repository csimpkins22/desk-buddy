// Tightrope: he wobbles along a rope with a balancing pole, nearly tips, recovers, and takes a bow that almost tips him again.
(() => {
  const { D, xf, FACE, openPath, kit } = window.__lump, k = kit.clip('tightrope');
  const { CREAM, BROWN } = kit;
  const tw = (a, b, n) => kit.steps(a, b, n + 1).slice(1);
  const rope = (c, a, x) => kit.fade(c, a, () => {
    c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3; openPath(c, [[20, 184], [x, 204], [220, 184]]); c.stroke();
    c.fillStyle = BROWN; c.lineWidth = 2.4; c.beginPath(); c.rect(14, 178, 9, 23); c.rect(217, 178, 9, 23); c.fill(); c.stroke();
  });
  const pole = (c, x, y, ang) => {
    c.save(); c.translate(x, y); c.rotate(ang); c.lineCap = 'round';
    c.strokeStyle = CREAM; c.lineWidth = 7.5; c.beginPath(); c.moveTo(-78, 0); c.lineTo(78, 0); c.stroke();
    c.strokeStyle = BROWN; c.lineWidth = 3.5; c.beginPath(); c.moveTo(-76, 0); c.lineTo(76, 0); c.stroke(); c.restore();
  };
  // s.a: rope opacity; s.py: how far above his hands the pole is (undefined: no pole); s.tilt: extra pole tilt; s.arms false: arms down
  const T = (face, o, s = {}) => {
    const a = s.a ?? 1, pc = kit.pt(o, [128, 152]), ang = (o.rot || 0) * 1.2 + (s.tilt || 0), u = [Math.cos(ang) * 52, Math.sin(ang) * 52];
    const arms = s.py === undefined || s.arms === false ? {} : { arm: [kit.pt(o, [90, 140]), [pc[0] - u[0], pc[1] - u[1]]], arm2: [kit.pt(o, [166, 140]), [pc[0] + u[0], pc[1] + u[1]]] };
    return xf(D.N, { ...o, face, shadowK: 1 - a, extra: { ...arms,
      back: c => rope(c, a, 128 + (o.dx || 0)),
      front: c => { if (s.py !== undefined) pole(c, pc[0], pc[1] + s.py, ang); } } });
  };

  tw(0, 1, 3).forEach((t, i) => k.add('rope' + i, 2, T(FACE.lookr, {}, { a: t })));
  tw(-170, 0, 3).forEach((py, i) => k.add('pole' + i, 2, T(i < 2 ? FACE.lookup : FACE.happy, {}, { py })));
  [-0.1, 0.1, -0.12, 0.12, -0.08, 0.08].forEach((rot, i) => k.add('walk' + i, 4, T(i % 2 ? FACE.lookr : FACE.grump, { rot, dx: -10 + i * 3 }, { py: 0, tilt: -rot * 2.4 })));
  [0.2, 0.36, 0.5].forEach((rot, i) => k.add('tip' + i, i < 2 ? 2 : 6, T(FACE.shock, { rot, dx: 2 }, { py: 0 })));
  [0.2, -0.08, 0].forEach((rot, i) => k.add('save' + i, 2, T(i < 2 ? FACE.shock : FACE.happy, { rot, dx: 0 }, { py: 0 })));
  k.add('phew', 4, T(FACE.happy, { ky: 1.03 }, { py: 0 }));
  k.add('bow0', 2, T(FACE.happy, { rot: 0.2, dx: -4 }, { py: 0, tilt: -0.24 }));
  k.add('bow1', 6, T(FACE.happy, { rot: 0.38, dx: -4 }, { py: 0, tilt: -0.46 }));
  k.add('over0', 2, T(FACE.shock, { rot: 0.55, dx: -4 }, { py: 0, tilt: -0.3 }));
  k.add('over1', 4, T(FACE.shock, { rot: 0.62, dx: -4 }, { py: 0 }));
  k.add('back', 2, T(FACE.shock, { rot: 0.3, dx: -2 }, { py: 0 }));
  k.add('safe', 10, T(FACE.happy, { ky: 1.02 }, { py: 0 }));
  tw(0, 1, 3).forEach((t, i) => k.add('off' + i, 2, T(FACE.happy, {}, { a: 1 - t, py: -170 * t, arms: t < 1 })));
  k.done();
})();

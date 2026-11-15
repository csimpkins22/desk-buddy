// Someone picks his cube up off the desk and tips it. He slides into the low corner and braces; it tips the other way and he slides across; it is set down and he staggers upright.
(() => {
  const { D, xf, FACE, kit } = window.__lump;
  const k = kit.clip('tilt'), Z = 0.74, GLASS = '#7C8A9C', DESK = '#3D3514';
  // the cube, drawn in the scene so it tips with him
  const cube = (c, a) => {
    c.save(); c.globalAlpha = a; c.lineJoin = c.lineCap = 'round'; c.strokeStyle = GLASS; c.lineWidth = 4;
    c.beginPath(); c.roundRect(3, 3, 234, 234, 16); c.stroke(); c.beginPath(); c.moveTo(4, 205); c.lineTo(236, 205); c.stroke();
    c.lineWidth = 3; c.beginPath(); c.moveTo(22, 46); c.lineTo(46, 22); c.moveTo(22, 66); c.lineTo(34, 54); c.stroke();
    c.restore();
  };
  // t: how far the view has pulled back; lift: how far off the desk the cube is; turn: how far it is tipped. The desk stays level.
  const shot = (o, t, lift = 0, turn = 0) => xf(D.N, { ...o, extra: { ...(o.extra || {}), view: kit.view(1 + (Z - 1) * t, [120, 120], [120, Math.round(120 + 21.4 * t - lift)], turn),
    back: c => { c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = DESK; c.fillRect(0, Math.round(240 - 12 * t), 240, 14); c.restore(); cube(c, Math.min(1, t * 1.5)); } } });
  const lean = turn => -turn * 0.5;

  k.add('hm', 3, xf(D.N, { face: kit.look(0, 0, 'flat') }));
  kit.steps(0.17, 1, 6).forEach((t, i) => k.add('wide' + i, 2, shot({ face: kit.look(i % 2 ? 5 : -5, -2, 'o') }, t)));
  k.add('what', 6, shot({ face: kit.look(0, -5, 'flat') }, 1));
  [[8, 0.03], [16, -0.02], [22, 0.03], [26, 0.05]].forEach(([lift, turn], i) => k.add('lift' + i, 2, shot({ ky: 0.95, kx: 1.03, face: FACE.shock }, 1, lift, turn)));

  // tipped to the right: he slides down into the corner
  kit.steps(0.05, 0.34, 7).forEach((turn, i) => k.add('tip' + i, 2, shot({ dx: Math.round(48 * (i / 6) ** 2), rot: lean(turn), face: i < 3 ? FACE.shock : FACE.aah }, 1, 26, turn)));
  k.add('bump', 2, shot({ dx: 48, kx: 0.9, ky: 1.05, rot: lean(0.34), face: FACE.aah }, 1, 26, 0.34));
  const R = { dx: 48, rot: lean(0.34) }, rs = kit.pt(R, [166, 140]);
  k.add('brace', 26, shot({ ...R, face: kit.faces.worried, extra: { arm2: [rs, [233, rs[1] - 8]], front: (c, d, s) => kit.sweat(c, 150, 70, s, -1) } }, 1, 26, 0.34));

  // and back the other way: he hangs on, then goes
  kit.steps(0.34, -0.34, 10).forEach((turn, i) => {
    const u = Math.max(0, (i - 3) / 6), o = { dx: Math.round(48 - 104 * u * u), rot: lean(turn) }, s = kit.pt(o, [166, 140]);
    k.add('over' + i, 2, shot({ ...o, face: i < 4 ? kit.faces.worried : FACE.aah, extra: i < 2 ? { arm2: [s, i ? [s[0] + 10, s[1] + 4] : [233, s[1] - 8]] } : {} }, 1, 26, turn));
  });
  k.add('thud', 2, shot({ dx: -56, kx: 0.88, ky: 1.06, rot: lean(-0.34), face: FACE.aah }, 1, 26, -0.34));
  const LL = { dx: -54, rot: lean(-0.34) }, ls = kit.pt(LL, [90, 140]);
  k.add('pressed', 22, shot({ ...LL, face: FACE.spiral, extra: { arm: [ls, [8, ls[1] - 8]] } }, 1, 26, -0.34));

  // set down again
  kit.steps(0, 1, 5).forEach((t, i) => k.add('down' + i, 2, shot({ dx: -54, rot: lean(-0.34 * (1 - t)), face: FACE.spiral }, 1, Math.round(26 * (1 - t)), -0.34 * (1 - t))));
  k.add('thunk0', 2, shot({ dx: -54, dy: -8, shadowK: 0.85, face: FACE.spiral }, 1, 3));
  k.add('thunk1', 2, shot({ dx: -54, ky: 0.93, kx: 1.05, face: FACE.spiral }, 1));
  [0.14, -0.12, 0.1, -0.08, 0.05, -0.03, 0].forEach((rot, i) => k.add('stagger' + i, 4, shot({ dx: Math.round(-54 * (1 - (i + 1) / 7)), rot, face: i < 4 ? FACE.spiral : FACE.puff }, 1 - (i + 1) / 7)));
  k.add('phew', 16, xf(D.N, { face: kit.look(0, 0, 'wobble') }));
  k.done();
})();

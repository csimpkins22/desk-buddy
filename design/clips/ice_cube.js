// Ice cube: he sits frozen inside a block of ice; it cracks, melts into a puddle, and he shivers with chattering teeth.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('ice_cube'), { CREAM, BLUE, WHITE, TAU } = kit;
  const o = { k: 0.9 };
  const ink = (c, w = 2.8) => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = w; };
  const block = (c, a, top = 64, hw = 70, cracks = 0) => {
    kit.fade(c, a * 0.3, () => { c.fillStyle = BLUE; c.beginPath(); c.roundRect(128 - hw, top, hw * 2, 203 - top, 12); c.fill(); });
    kit.fade(c, a, () => {
      ink(c, 3); c.beginPath(); c.roundRect(128 - hw, top, hw * 2, 203 - top, 12); c.stroke();
      if (top < 100) { c.strokeStyle = WHITE; c.lineWidth = 3.4; c.beginPath(); c.moveTo(72, 96); c.lineTo(72, 78); c.lineTo(88, 76); c.stroke(); }
      ink(c, 3.2);
      if (cracks > 0) { c.beginPath(); c.moveTo(150, 64); c.lineTo(140, 88); c.lineTo(158, 104); c.lineTo(146, 128); c.stroke(); }
      if (cracks > 1) { c.beginPath(); c.moveTo(58, 150); c.lineTo(84, 142); c.lineTo(96, 162); c.lineTo(120, 152); c.moveTo(146, 128); c.lineTo(170, 150); c.lineTo(162, 176); c.stroke(); }
    });
  };
  const puddle = (c, a, rx = 84) => kit.fade(c, a, () => { ink(c, 2.6); c.fillStyle = BLUE; c.beginPath(); c.ellipse(128, 200, rx, 6, 0, 0, TAU); c.fill(); c.stroke(); });
  const iced = (n, t, a, cracks = 0, more = {}) => k.add(n, t, xf(D.N, { ...o, ...more, face: FACE.shock, extra: { front: c => block(c, a, 64, 70, cracks) } }));
  iced('in0', 2, 0.35); iced('in1', 2, 0.7);
  iced('ice', 8, 1);
  iced('try1', 2, 1, 0, { dx: -3 }); iced('try2', 2, 1, 0, { dx: 3 }); k.add('try1', 2); k.add('try2', 2);
  iced('crack1', 4, 1, 1); iced('crack2', 4, 1, 2, { ky: 1.03 });
  [[96, 76, 30], [134, 82, 52], [170, 86, 70]].forEach(([top, hw, rx], i) => k.add('melt' + i, 2, xf(D.N, { ...o, face: FACE.lookup, extra: { back: c => puddle(c, 1, rx), front: c => block(c, 1 - i * 0.2, top, hw) } })));
  const teeth = (c, [x, y], gap) => {
    ink(c, 2.4); c.fillStyle = WHITE; c.beginPath(); c.roundRect(x - 14, y - 7, 28, 13 + gap, 3); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(x - 14, y - 0.5 + gap / 2); c.lineTo(x + 14, y - 0.5 + gap / 2);
    [-7, 0, 7].forEach(dx => { c.moveTo(x + dx, y - 7); c.lineTo(x + dx, y + 6 + gap); }); c.stroke();
  };
  const shiver = (n, dx, gap, a = 1) => { const p = { ...o, dx, kx: 0.97 };
    k.add(n, 2, xf(D.N, { ...p, face: FACE.chooEyes, extra: { arm: [kit.pt(p, [90, 140]), kit.pt(p, [112, 160])].map((q, i) => i ? [q[0] - 34, q[1]] : q), arm2: [kit.pt(p, [166, 140]), kit.pt(p, [178, 160])],
      back: c => puddle(c, a), front: (c, d, seed) => { teeth(c, kit.pt(p, [128, 126]), gap); if (a === 1) kit.sweat(c, 196 + dx, 100, seed, 1); } } })); };
  shiver('brr1', -3, 0); shiver('brr2', 3, 3);
  for (let i = 0; i < 5; i++) { k.add('brr1', 2); k.add('brr2', 2); }
  shiver('out0', -3, 0, 0.65); shiver('out1', 3, 3, 0.3);
  k.done();
})();

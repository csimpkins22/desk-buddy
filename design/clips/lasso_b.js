// He plays with the screen: whirls a lasso, throws it at us so the loop runs round the border, and each of three tugs pulls the view in on him. Then it goes slack and falls over him in coils.
(() => {
  const { D, xf, FACE, kit } = window.__lump;
  const { YELLOW, TAU, steps, pt, look } = kit;
  const k = kit.clip('lasso_b');
  const FOCUS = [128, 118], ROPE = YELLOW, ID = kit.view(1, [120, 120], [120, 120]);
  // draw in screen pixels whatever the view is doing: the loop stays on the border while the view closes in
  const pen = (c, v) => {
    const z = v[0], X = x => v[1] + (x - v[3]) / z, Y = y => v[2] + (y - v[4]) / z;
    return { X, Y, m: (x, y) => c.moveTo(X(x), Y(y)), l: (x, y) => c.lineTo(X(x), Y(y)), q: (cx, cy, x, y) => c.quadraticCurveTo(X(cx), Y(cy), X(x), Y(y)), w: n => { c.lineWidth = n / z; } };
  };
  const rope = c => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = ROPE; };
  // the loop round the edge of the screen, and the rope back to his hands
  const border = (v, hands, { inset = 5, r = 28, w = 6, taut = false, dip = 0 } = {}) => c => {
    const p = pen(c, v), a = inset, b = 240 - inset; rope(c); p.w(w);
    c.beginPath(); p.m(a + r, a);
    if (dip) p.q(120, a + dip, b - r, a); else p.l(b - r, a);
    p.q(b, a, b, a + r); p.l(b, b - r); p.q(b, b, b - r, b); p.l(a + r, b); p.q(a, b, a, b - r); p.l(a, a + r); p.q(a, a, a + r, a); c.stroke();
    if (hands) {
      c.beginPath(); c.moveTo(hands[0], hands[1]);
      if (taut) p.l(120, b); else c.quadraticCurveTo(hands[0] - 16 / v[0], (hands[1] + p.Y(b)) / 2 + 14 / v[0], p.X(120), p.Y(b));
      c.stroke();
    }
  };
  // a loop in the air at (cx, cy), and the rope from his hand to its knot
  const loop = (cx, cy, rx, ry, rot, hand, a, w = 4) => c => {
    rope(c); c.lineWidth = w; c.beginPath(); c.ellipse(cx, cy, rx, ry, rot, 0, TAU); c.stroke();
    c.beginPath(); c.moveTo(hand[0], hand[1]); c.quadraticCurveTo((hand[0] + cx) / 2 + 10, (hand[1] + cy) / 2 + 8, cx + Math.cos(a) * rx, cy + Math.sin(a) * ry); c.stroke();
  };
  // coils round him: the far half behind, the near half in front
  const coils = (list, alpha = 1) => ({
    back: c => kit.fade(c, alpha, () => { rope(c); c.lineWidth = 4; list.forEach(([y, rx, ry]) => { c.beginPath(); c.ellipse(128, y, rx, ry, 0, Math.PI, TAU); c.stroke(); }); }),
    front: c => kit.fade(c, alpha, () => { rope(c); c.lineWidth = 4; list.forEach(([y, rx, ry]) => { c.beginPath(); c.ellipse(128, y, rx, ry, 0, 0, Math.PI); c.stroke(); }); }),
  });
  const grit = [...FACE.aahEyes, ['stroke', [[120, 125], [136, 125]], 3]];
  const both = (o, y = 164) => ({ arm: [pt(o, [90, 140]), pt(o, [108, y])], arm2: [pt(o, [166, 140]), pt(o, [148, y])] });

  // whirl
  [10, 20, 30, 40, 46, 46, 46, 46, 46].forEach((rx, i) => {
    const a = i * 2.1, o = { rot: 0.03 * Math.sin(a) }, hand = [186 + 4 * Math.cos(a), 100 + 3 * Math.sin(a)];
    k.add('whirl' + i, 2, xf(D.N, { ...o, face: look(0, -4, 'smile'), extra: { arm2: [pt(o, [166, 140]), hand], front: loop(128 + 6 * Math.cos(a), 40 + 2 * Math.sin(a), rx, Math.max(5, rx * 0.3), 0.18 * Math.sin(a), hand, a) } }));
  });
  const wind = { rot: -0.1, ky: 0.95 };
  k.add('wind', 2, xf(D.N, { ...wind, face: look(0, -2, 'flat'), extra: { arm2: [pt(wind, [166, 140]), [176, 94]], front: loop(104, 44, 46, 16, -0.3, [176, 94], 0.4) } }));
  // throw it at us
  const thr = { rot: 0.06, ky: 1.04 }, hand = [178, 152];
  [[126, 62, 62, 36, 4], [123, 88, 86, 64, 4.5], [121, 108, 106, 92, 5]].forEach(([cx, cy, rx, ry, w], i) =>
    k.add('throw' + i, 2, xf(D.N, { ...thr, face: FACE.happy, extra: { arm2: [pt(thr, [166, 140]), hand], front: loop(cx, cy, rx, ry, 0, hand, Math.PI / 2, w) } })));
  k.add('throw3', 2, xf(D.N, { ...thr, face: FACE.happy, extra: { arm2: [pt(thr, [166, 140]), hand], front: border(ID, hand, { inset: 10, r: 70, w: 5.5 }) } }));
  k.add('caught', 6, xf(D.N, { face: FACE.happy, extra: { ...both({}), front: border(ID, [128, 166]) } }));

  // three tugs, each pulling the view in
  const Z = [1, 1.3, 1.65, 2];
  const tug = (name, ticks, z, o, face, y, b, extra) => {
    const v = kit.zoom(z, FOCUS);
    k.add(name, ticks, xf(D.N, { ...o, face, extra: { view: v, ...both(o, y), front: (c, d, seed) => { border(v, pt(o, [128, y + 2]), b)(c); if (extra) extra(c, seed); } } }));
  };
  for (let j = 0; j < 3; j++) {
    tug('ant' + j, 2, Z[j], { ky: 1.03, rot: 0.04 }, look(0, 4, 'flat'), 166, {});
    tug('pulla' + j, 2, (Z[j] + Z[j + 1]) / 2, { ky: 0.93, kx: 1.05, rot: -0.07 }, grit, 154, { inset: 9, r: 44, taut: true });
    tug('pullb' + j, 2, Z[j + 1], { ky: 0.88, kx: 1.08, rot: -0.12 }, grit, 150, { inset: 13, r: 56, taut: true });
    tug('set' + j, 2, Z[j + 1], {}, look(0, 3, 'o'), 164, { inset: 6, r: 30 });
  }
  tug('strain', 6, 2, { ky: 0.88, kx: 1.08, rot: -0.12 }, grit, 150, { inset: 13, r: 56, taut: true }, (c, seed) => kit.sweat(c, 170, 98, seed, 1));

  // slack: it falls over him as the view eases back
  const ZF = steps(2, 1, 6).slice(1), up = look(0, -5, 'o');
  k.add('fall0', 2, xf(D.N, { face: up, extra: { view: kit.zoom(ZF[0], FOCUS), front: border(kit.zoom(ZF[0], FOCUS), null, { inset: 6, r: 30, dip: 90 }) } }));
  [[[70, 104, 50], [96, 104, 50], [122, 104, 50]], [[104, 86, 30], [128, 86, 30], [152, 86, 30]], [[136, 72, 16], [156, 72, 16], [176, 72, 16]], [[150, 66, 12], [168, 66, 12], [186, 66, 12]]].forEach((list, i) =>
    k.add('fall' + (i + 1), 2, xf(D.N, { ky: i === 3 ? 0.95 : 1, face: i < 2 ? up : kit.faces.wide, extra: { view: kit.zoom(ZF[i + 1], FOCUS), ...coils(list) } })));
  k.add('wrapped', 12, xf(D.N, { kx: 0.96, face: FACE.sheep, extra: coils([[151, 66, 12], [168, 67, 12], [185, 66, 12]]) }));
  k.add('drop0', 2, xf(D.N, { face: FACE.sheep, extra: coils([[188, 70, 9], [194, 72, 9], [199, 74, 9]]) }));
  k.add('drop1', 2, xf(D.N, { face: look(0, 4, 'smile'), extra: coils([[196, 74, 8], [200, 76, 8]], 0.6) }));
  k.add('drop2', 2, xf(D.N, { face: look(0, 2, 'smile'), extra: coils([[200, 78, 8]], 0.3) }));
  k.done();
})();

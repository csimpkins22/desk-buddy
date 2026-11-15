// Golf putt: he lines up a putt, taps the ball, it circles the rim of the hole twice and drops in.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('golf_putt'), { CREAM, DARK, WHITE, GREY, RED, TAU } = kit;
  const o = { k: 0.9, dx: -40 }, sh = kit.pt(o, [166, 140]), HX = 194, HY = 197;
  const props = (c, a, club, ball, br = 6) => kit.fade(c, a, () => {
    c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.fillStyle = DARK; c.beginPath(); c.ellipse(HX, HY, 15, 5, 0, 0, TAU); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(HX + 22, HY); c.lineTo(HX + 22, HY - 52); c.stroke();
    c.fillStyle = RED; c.beginPath(); c.moveTo(HX + 22, HY - 52); c.lineTo(HX + 5, HY - 44); c.lineTo(HX + 22, HY - 36); c.closePath(); c.fill(); c.stroke();
    if (club) {
      const [h, e] = club;
      c.lineWidth = 3.4; c.beginPath(); c.moveTo(h[0], h[1] - 6); c.lineTo(e[0], e[1]); c.stroke();
      c.lineWidth = 2.4; c.fillStyle = GREY; c.beginPath(); c.roundRect(e[0] - 2, e[1] - 5, 13, 9, 3); c.fill(); c.stroke();
    }
    if (ball) { c.fillStyle = WHITE; c.beginPath(); c.arc(ball[0], ball[1], br, 0, TAU); c.fill(); c.stroke(); }
  });
  const shot = (face, hand, head, ball, a = 1, br, more = {}) => xf(D.N, { ...o, ...more, face, extra: { arm2: [sh, hand], front: c => props(c, a, [hand, head], ball, br) } });
  const AIM = [[146, 170], [150, 192]], BACK = [[136, 168], [130, 188]], HIT = [[150, 170], [156, 192]], B0 = [168, 194];
  k.add('in0', 2, shot(FACE.lookr, ...AIM, B0, 0.3));
  k.add('in1', 2, shot(FACE.lookr, ...AIM, B0, 0.65));
  k.add('aim', 8, shot(FACE.lookr, ...AIM, B0));
  k.add('back', 4, shot(FACE.lookr, ...BACK, B0, 1, 6, { rot: -0.05 }));
  k.add('hit', 2, shot(FACE.lookr, ...HIT, B0, 1, 6, { rot: 0.04 }));
  k.add('roll', 2, shot(FACE.lookr, ...HIT, [174, 194]));
  const rim = i => [HX - 15 * Math.cos(i * TAU / 6), HY - 5 - 5 * Math.sin(i * TAU / 6)];
  for (let i = 0; i < 6; i++) k.add('rim' + i, 2, shot(FACE.shock, ...HIT, rim(i)));
  for (let i = 0; i < 6; i++) k.add('rim' + i, 2);
  k.add('drop0', 2, shot(FACE.shock, ...HIT, [HX - 7, HY - 4], 1, 5));
  k.add('drop1', 2, shot(FACE.shock, ...HIT, [HX, HY - 1], 1, 3.5));
  k.add('in', 12, xf(D.N, { ...o, ky: 1.04, face: FACE.happy, extra: { arm2: [sh, [150, 112]], fxm: 'done', front: c => props(c, 1, [[150, 112], [170, 84]]) } }));
  k.add('out0', 2, shot(FACE.happy, [150, 130], [164, 104], null, 0.65));
  k.add('out1', 2, shot(FACE.happy, [148, 150], [158, 126], null, 0.3));
  k.done();
})();

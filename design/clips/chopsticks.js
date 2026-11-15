// Chopsticks: he chases a single pea round a plate with chopsticks, finally lifts it, and it pings away.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('chopsticks'), { CREAM, WHITE, GREEN, YELLOW, TAU } = kit;
  const o = { k: 0.9, dx: -42 }, sh = kit.pt(o, [166, 140]), HAND = [146, 132];
  const ink = (c, w = 2.8) => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = w; };
  const set = (c, seed, a, tip, pea, hand = HAND) => kit.fade(c, a, () => {
    kit.table(c, 186, seed, { y: 170, w: 72 });
    ink(c, 2.6); c.fillStyle = WHITE; c.beginPath(); c.ellipse(186, 164, 30, 7, 0, 0, TAU); c.fill(); c.stroke();
    if (pea) { c.fillStyle = GREEN; c.beginPath(); c.arc(pea[0], pea[1], 6.5, 0, TAU); c.fill(); c.stroke(); }
    if (tip) { ink(c, 3.4); c.strokeStyle = YELLOW; c.beginPath(); c.moveTo(hand[0] - 6, hand[1] - 10); c.lineTo(tip[0] - 2, tip[1] + 3); c.moveTo(hand[0] - 2, hand[1] - 16); c.lineTo(tip[0] + 3, tip[1] - 3); c.stroke(); }
  });
  const shot = (face, tip, pea, a = 1, more = {}, hand = HAND) => xf(D.N, { ...o, ...more, face, extra: { arm2: [sh, hand], front: (c, d, seed) => set(c, seed, a, tip, pea, hand) } });
  const P = [[176, 158], [200, 159], [184, 156], [206, 158]], UPT = [170, 150];
  k.add('in0', 2, shot(FACE.lookr, UPT, P[0], 0.3)); k.add('in1', 2, shot(FACE.lookr, UPT, P[0], 0.65));
  k.add('eye', 4, shot(FACE.lookr, UPT, P[0]));
  for (let i = 0; i < 3; i++) {
    k.add('stab' + i, 4, shot(FACE.lookr, P[i], P[i + 1], 1, { rot: 0.07 }));
    k.add('lift' + i, 2, shot(i === 2 ? FACE.grump : FACE.lookr, [P[i][0] - 4, P[i][1] - 16], P[i + 1]));
  }
  k.add('got', 4, shot(FACE.grump, P[3], P[3], 1, { rot: 0.1 }));
  const UP = [[196, 142], [186, 126], [178, 112]], H2 = [148, 118];
  UP.forEach((t, i) => k.add('rise' + i, 2, shot(FACE.happy, t, t, 1, {}, i ? H2 : HAND)));
  k.add('proud', 6, shot(FACE.happy, UP[2], UP[2], 1, { ky: 1.04 }, H2));
  [[150, 78], [104, 44], [48, 16]].forEach((p, i) => k.add('ping' + i, 2, shot(FACE.shock, UP[2], p, 1, {}, H2)));
  k.add('empty', 12, xf(D.N, { ...o, face: FACE.shock, ky: 0.97, extra: { arm2: [sh, H2], fxm: 'alert', fx: [60, 60], front: (c, d, seed) => set(c, seed, 1, UP[2], null, H2) } }));
  k.add('out0', 2, shot(FACE.grump, [174, 130], null, 0.65, {}, HAND)); k.add('out1', 2, shot(FACE.grump, UPT, null, 0.3));
  k.done();
})();

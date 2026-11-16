// Trophy: one bigger than he is comes down into his hands. He holds it up, wobbles, and it takes him over with it.
// group: celebrations
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', GOLD = '#FFD23F';
  const eager = [['dot',118,103,4], ['dot',142,101,4], ['stroke',[[121,119],[129,124],[137,118]],2.8]];
  const proud = [...FACE.aahEyes, ['stroke',[[118,122],[128,128],[138,122]],2.8]];
  const strained = [...FACE.chooEyes, ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6]];
  const worried = [['dot',116,108,4.2], ['dot',140,106,4.2], ['stroke',[[121,126],[128,123],[135,126]],2.8], ['stroke',[[106,98],[120,94]],2.4], ['stroke',[[136,92],[150,96]],2.4]];
  // (x, y) is the middle of its foot; it stands 98 tall
  const trophy = (c, x, y, rot = 0) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.lineJoin = c.lineCap = 'round';
    c.strokeStyle = GOLD; c.lineWidth = 7; c.beginPath(); c.arc(-40, -70, 14, 0, Math.PI * 2); c.moveTo(54, -70); c.arc(40, -70, 14, 0, Math.PI * 2); c.stroke();
    c.fillStyle = GOLD; c.strokeStyle = CREAM; c.lineWidth = 3;
    c.beginPath(); c.rect(-6, -32, 12, 22); c.fill(); c.stroke();
    c.beginPath(); c.roundRect(-25, -12, 50, 12, 3); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-38, -98); c.lineTo(38, -98); c.bezierCurveTo(38, -52, 20, -32, 0, -32); c.bezierCurveTo(-20, -32, -38, -52, -38, -98); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = '#17161A'; c.lineWidth = 4.5; c.beginPath(); c.moveTo(-6, -76); c.lineTo(2, -84); c.lineTo(2, -52); c.stroke();
    c.restore();
  };
  // holding it overhead, squashed to `ky` under the weight and leaning `rot` about his feet
  const hold = (face, ky, rot = 0, extra = {}) => {
    const top = 201 - 131 * ky, R = ([x, y]) => [128 + (x - 128) * Math.cos(rot) - (y - 201) * Math.sin(rot), 201 + (x - 128) * Math.sin(rot) + (y - 201) * Math.cos(rot)];
    const [tx, ty] = R([128, top - 2]);
    return xf(D.N, { face, ky, kx: 1 + (1 - ky) * 0.4, rot, extra: { arm: [R([94, top + 44]), R([102, top + 4])], arm2: [R([162, top + 44]), R([154, top + 4])], front: c => trophy(c, tx, ty, rot), ...extra } });
  };
  const UP = { arm: [[96, 118], [100, 76]], arm2: [[160, 118], [156, 76]] };
  D.trophy_1 = xf(D.N, { face: eager, extra: { ...UP, front: c => trophy(c, 128, 8) } });
  D.trophy_2 = xf(D.N, { face: eager, extra: { ...UP, front: c => trophy(c, 128, 40) } });
  D.trophy_3 = hold(FACE.shock, 0.6);
  D.trophy_4 = hold(strained, 0.66);
  D.trophy_5 = hold(proud, 0.71, 0, { fxm: 'done', fx: [128, 52] });
  D.trophy_6 = hold(worried, 0.71, -0.09);
  D.trophy_7 = hold(worried, 0.71, 0.1);
  D.trophy_8 = hold(FACE.shock, 0.74, 0.34);
  D.trophy_9 = hold(FACE.shock, 0.8, 0.8);
  const down = (face, rot, tx, ty, trot, extra = {}) => xf(D.N, { face, rot, oy: 135, dx: 36, dy: 7, extra: { front: c => trophy(c, tx, ty, trot), ...extra } });
  D.trophy_10 = down(FACE.spiral, 1.5, 62, 172, -0.25);
  D.trophy_11 = down(FACE.spiral, 1.52, 56, 201, 0, { fxm: 'done', fx: [56, 96] });
  D.trophy_12 = down(FACE.spiral, 1.46, 56, 201, 0, { fxm: 'done', fx: [56, 96] });
  CLIPS.trophy = { home: 'idle', seq: [...WAKE, ['trophy_1', 4], ['trophy_2', 4], ['trophy_3', 3], ['trophy_4', 5], ['trophy_5', 12], ['trophy_6', 5], ['trophy_7', 5], ['trophy_6', 4], ['trophy_7', 4],
    ['trophy_8', 3], ['trophy_9', 2], ['trophy_10', 3], ['trophy_11', 5], ['trophy_12', 5], ['trophy_11', 5], ['trophy_12', 5], ...DOZE] };
})();

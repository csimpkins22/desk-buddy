// Gravity off: he and a ball drift up off the floor and he bumps the ceiling. Gravity comes back, and so does the ball, onto his head.
// group: nonsense
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  const down = [['dot',114,115,4.2], ['dot',138,113,4.2], ['mouth',[[122,125],[132,125],[133,132],[127,135],[121,131]]]];
  const wow = [['dot',116,106,4.6], ['dot',140,104,4.6], ['mouth',[[123,119],[133,118],[134,126],[128,129],[122,126]]]];
  const ouch = [...FACE.chooEyes, ['stroke',[[120,126],[124,123],[128,126],[132,123],[136,126]],2.8]];
  const ball = (x, y, bonk) => c => {
    c.save(); c.lineCap = 'round'; c.fillStyle = '#5AB8FF'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.arc(x, y, 10, 0, Math.PI * 2); c.fill(); c.stroke();
    c.lineWidth = 2; c.beginPath(); c.arc(x, y, 5.5, -2.6, -1.5); c.stroke();
    if (bonk) { c.lineWidth = 3; c.beginPath(); [[-1, -0.5], [-0.6, -1.1], [0.6, -1.1], [1, -0.5]].forEach(([u, v]) => { c.moveTo(bonk[0] + u * 26, bonk[1] + v * 14); c.lineTo(bonk[0] + u * 40, bonk[1] + v * 24); }); c.stroke(); }
    c.restore();
  };
  // floating: turning about his middle, arms out for balance (flail 1 or -1), shadow shrinking as he rises
  const up = (dy, rot, face, bx, by, flail) => xf(D.N, { ox: 128, oy: 140, rot, dy, shadowK: Math.max(0.35, 1 + dy / 100), face, extra: {
    ...(flail ? { arm: [[90, 140 + dy], [64, 134 + dy - flail * 12]], arm2: [[166, 140 + dy], [192, 132 + dy + flail * 12]] } : {}), front: ball(bx, by) } });
  D.gravity_off_0 = xf(D.N, { face: FACE.lookr, extra: { front: ball(234, 190) } });
  D.gravity_off_1 = xf(D.N, { face: FACE.lookr, extra: { front: ball(208, 190) } });
  D.gravity_off_2 = up(-4, 0, down, 208, 188);
  D.gravity_off_3 = { ...up(-11, 0, down, 207, 182), fxm: 'alert', fx: [150, 50] };
  D.gravity_off_4 = up(-21, -0.07, wow, 209, 168, 1);
  D.gravity_off_5 = up(-32, 0.06, wow, 211, 146, -1);
  D.gravity_off_6 = up(-43, -0.06, wow, 213, 120, 1);
  D.gravity_off_7 = up(-54, 0.05, wow, 213, 92, -1);
  D.gravity_off_8 = up(-62, 0, FACE.lookup, 211, 62, 1);
  D.gravity_off_9 = xf(D.N, { oy: 70, ky: 0.78, kx: 1.14, dy: -68, shadowK: 0.35, face: ouch, extra: { front: ball(206, 36, [128, 14]) } });
  D.gravity_off_10 = up(-54, 0.05, FACE.spiral, 197, 16);
  D.gravity_off_11 = up(-61, -0.04, FACE.spiral, 183, 11);
  D.gravity_off_12 = up(-58, 0, down, 168, 12);
  D.gravity_off_13 = xf(D.N, { dy: -28, ky: 1.12, kx: 0.92, shadowK: 0.7, face: FACE.shock, extra: { front: ball(163, 11) } });
  D.gravity_off_14 = xf(D.N, { ky: 0.72, kx: 1.22, face: ouch, extra: { front: ball(162, 14) } });
  D.gravity_off_15 = xf(D.N, { ky: 1.06, kx: 0.97, face: FACE.spiral, extra: { front: ball(156, 30) } });
  D.gravity_off_16 = xf(D.N, { face: FACE.lookup, extra: { front: ball(148, 48) } });
  D.gravity_off_17 = xf(D.N, { ky: 0.88, kx: 1.07, face: ouch, extra: { front: ball(144, 74, [140, 70]) } });
  D.gravity_off_18 = xf(D.N, { face: FACE.spiral, extra: { front: ball(176, 52) } });
  D.gravity_off_19 = xf(D.N, { face: FACE.spiral, extra: { front: ball(202, 112) } });
  D.gravity_off_20 = xf(D.N, { face: FACE.grump, extra: { front: ball(214, 190) } });
  D.gravity_off_21 = xf(D.N, { face: FACE.grump, extra: { front: ball(234, 190) } });
  D.gravity_off_22 = xf(D.N, { face: FACE.grump });
  const hold = [3, 6, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 7, 2, 3, 2, 2, 4, 2, 2, 7, 2, 4];
  CLIPS.gravity_off = { home: 'idle', seq: [...WAKE, ...hold.map((n, i) => ['gravity_off_' + i, n]), ...DOZE] };
})();

// Tin can phone: he listens hopefully. The string twangs! Then it goes slack and the other can clatters in with nobody on it.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, openPath } = window.__lump;
  const CREAM = '#FFF1DC', X = -24, EAR = [166, 106], TWANG = 57;
  const listening = [['dot',122,110,3.6], ['dot',146,108,3.6], ['stroke',[[112,99],[124,97]],2.4], ['stroke',[[140,95],[152,96]],2.4], ['stroke',[[124,124],[130,126],[136,124]],2.6]];
  const straining = [['stroke',[[111,110],[121,110]],2.8], ['stroke',[[135,108],[145,108]],2.8], ['stroke',[[112,100],[124,97]],2.4], ['stroke',[[140,95],[152,97]],2.4], ['stroke',[[124,124],[134,123]],2.6]];
  const thrilled = [['dot',118,107,4.6], ['dot',142,105,4.6], ['mouth',[[120,119],[138,118],[136,129],[129,133],[122,129]],[129,130,5,3]]];
  const sad = [['dot',122,113,3.6], ['dot',146,111,3.6], ['stroke',[[110,103],[122,99]],2.4], ['stroke',[[140,97],[152,100]],2.4], ['stroke',[[124,127],[130,124],[136,127]],2.6]];
  const sadBlink = [['stroke',[[117,113],[127,113]],2.8], ['stroke',[[141,111],[151,111]],2.8], ...sad.slice(2)];
  const can = (c, x, y, a) => {                       // open end towards -x, string out of the other
    c.save(); c.translate(x, y); c.rotate(a); c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.2;
    c.fillStyle = '#9FB0C4'; c.beginPath(); c.roundRect(-11, -10, 22, 20, 2); c.fill(); c.stroke();
    c.fillStyle = '#17161A'; c.beginPath(); c.ellipse(-11, 0, 3.5, 10, 0, 0, Math.PI * 2); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-3, -10); c.lineTo(-3, 10); c.moveTo(4, -10); c.lineTo(4, 10); c.globalAlpha = 0.5; c.stroke();
    c.restore();
  };
  const string = (c, P) => { c.save(); c.strokeStyle = CREAM; c.lineWidth = 1.8; c.lineCap = 'round'; c.globalAlpha = 0.85; openPath(c, P); c.stroke(); c.restore(); };
  const taut = c => { string(c, [[EAR[0] + 11, EAR[1]], [244, 92]]); can(c, ...EAR, -0.12); };
  const twang = (c, d, seed, tick) => {
    const t = Math.floor((tick - TWANG) / 2);
    string(c, Array.from({ length: 9 }, (_, i) => [EAR[0] + 11 + i * 8.4, EAR[1] - i * 1.75 + Math.sin(i * 1.6 + t * 2.2) * Math.sin(i / 8 * Math.PI) * 7]));
    can(c, ...EAR, -0.12);
  };
  // the far can: [x, y, turn]; the string hangs loose between the two
  const slack = (hx, hy, [x, y, a]) => c => {
    string(c, [[hx + 11, hy], [(hx + x) / 2 + 8, Math.min(198, Math.max(hy, y) + 22)], [x - 4, y - 4]]);
    can(c, hx, hy, -0.12); can(c, x, y, a);
  };
  const HOLD = { arm2: [[142, 140], [162, 121]] };
  D.tin_can_phone_in = xf(D.N, { dx: X / 2 });
  D.tin_can_phone_1 = xf(D.N, { dx: X, rot: 0.04, face: listening, extra: { ...HOLD, front: taut } });
  D.tin_can_phone_2 = xf(D.N, { dx: X, rot: 0.07, face: straining, extra: { ...HOLD, front: taut } });
  D.tin_can_phone_3 = xf(D.N, { dx: X, rot: 0.04, face: thrilled, extra: { ...HOLD, front: twang, fxm: 'alert', fx: [116, 54] } });
  D.tin_can_phone_4 = xf(D.N, { dx: X, rot: 0.04, ky: 1.04, face: thrilled, extra: { ...HOLD, front: twang, fxm: 'alert', fx: [116, 50] } });
  [[248, 118, 0.6], [230, 156, 1.6], [216, 188, 2.6], [208, 174, 3.5], [200, 190, 4.4]].forEach((far, i) => {
    D['tin_can_phone_' + (5 + i)] = xf(D.N, { dx: X, rot: 0.04, face: i < 2 ? thrilled : FACE.lookr, extra: { ...HOLD, front: slack(...EAR, far) } });
  });
  const LOW = { arm2: [[142, 142], [164, 152]], front: slack(170, 142, [196, 191, 4.9]) };
  D.tin_can_phone_10 = xf(D.N, { dx: X, face: sad, ky: 0.97, extra: LOW });
  D.tin_can_phone_11 = xf(D.N, { dx: X, face: sadBlink, ky: 0.96, extra: LOW });
  CLIPS.tin_can_phone = { home: 'idle', seq: [...WAKE, ['tin_can_phone_in', 3], ['tin_can_phone_1', 8], ['tin_can_phone_2', 9], ['tin_can_phone_1', 8],
    ['tin_can_phone_3', 4], ['tin_can_phone_4', 4], ['tin_can_phone_3', 4], ['tin_can_phone_4', 4],
    ...[5, 6, 7, 8, 9].map(i => ['tin_can_phone_' + i, 2]), ['tin_can_phone_9', 4], ['tin_can_phone_10', 12], ['tin_can_phone_11', 3], ['tin_can_phone_10', 8], ['tin_can_phone_in', 3], ...DOZE] };
})();

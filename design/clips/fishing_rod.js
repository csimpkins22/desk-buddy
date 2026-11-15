// Fishing rod: he casts, hooks his own cowlick, thinks it's a bite, and reels himself up off the floor.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', DX = -14, SHOULDER = [152, 140];
  const squint = [...FACE.chooEyes, ['stroke',[[122,125],[134,124]],2.8]];
  const puzzled = [['dot',124,110,3.8], ['dot',148,108,3.8], ['stroke',[[127,126],[132,124],[137,126]],2.6], ['stroke',[[140,96],[153,93]],2.4]];
  const strain = [...FACE.chooEyes, ['stroke',[[120,125],[124,122],[128,125],[132,122],[136,125]],2.6]];
  const uhoh = [['dot',120,103,3.8], ['dot',144,101,3.8], ['stroke',[[122,124],[134,123]],2.8]];
  // his cowlick (in the standing drawing's coordinates) as the hook drags it about
  const CURL = { right: [[128,71],[131,61],[139,54],[150,50]], up: [[128,71],[129,60],[131,50],[133,40]], taut: [[128,71],[129,58],[131,46],[133,36]], sprung: [[128,71],[121,63],[133,57],[122,50],[131,44]] };
  // rod from his hand to its tip, bowed by bend; the line runs to `to` (or to the tip of his cowlick), sagging by slack
  const rod = (hand, tip, { bend = 0, to, slack = 0 } = {}) => (c, d, seed) => {
    const end = to || d.curl[d.curl.length - 1], mx = (hand[0] + tip[0]) / 2, my = (hand[1] + tip[1]) / 2;
    const len = Math.hypot(tip[0] - hand[0], tip[1] - hand[1]), ux = (tip[0] - hand[0]) / len, uy = (tip[1] - hand[1]) / len;
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.strokeStyle = CREAM; c.globalAlpha = 0.9; c.lineWidth = 2; c.beginPath(); c.moveTo(tip[0], tip[1]);
    c.quadraticCurveTo((tip[0] + end[0]) / 2, (tip[1] + end[1]) / 2 + slack, end[0], end[1]); c.stroke(); c.globalAlpha = 1;
    c.beginPath(); c.moveTo(hand[0] - ux * 10, hand[1] - uy * 10); c.quadraticCurveTo(mx + uy * bend, my - ux * bend, tip[0], tip[1]);
    c.lineWidth = 7; c.stroke(); c.strokeStyle = '#6B4A1F'; c.lineWidth = 4; c.stroke();
    c.fillStyle = '#FF5A4D'; c.strokeStyle = CREAM; c.lineWidth = 2; c.beginPath(); c.arc(end[0], end[1], 6, 0, Math.PI * 2); c.fill(); c.stroke();
    if (to) { c.beginPath(); c.moveTo(end[0], end[1] + 6); c.lineTo(end[0], end[1] + 14); c.arc(end[0] - 3, end[1] + 14, 3, 0, Math.PI); c.stroke(); }
    c.restore();
  };
  const lump = (face, hand, gear, o = {}, curl) => xf(curl ? { ...D.N, curl } : D.N, { dx: DX, face, ...o, extra: { arm2: [SHOULDER, hand], front: gear, ...o.extra } });
  D.fishing_rod_1 = lump(FACE.happy, [172, 130], rod([174, 130], [194, 46], { to: [194, 100] }));
  D.fishing_rod_2 = lump(squint, [168, 120], rod([170, 120], [126, 42], { bend: -8, to: [72, 86], slack: 14 }), { rot: -0.05 });
  D.fishing_rod_3 = lump(FACE.lookr, [176, 128], rod([178, 128], [230, 60], { bend: 8 }), {}, CURL.right);
  D.fishing_rod_4 = lump(puzzled, [176, 130], rod([178, 130], [228, 70], { slack: 22 }));
  D.fishing_rod_5 = lump(FACE.happy, [170, 122], rod([172, 122], [192, 36], { bend: 6 }), { extra: { fxm: 'alert', fx: [92, 66] } }, CURL.right);
  D.fishing_rod_6 = lump(strain, [164, 108], rod([164, 108], [130, 24], { bend: 12 }), { ky: 1.04 }, CURL.up);
  D.fishing_rod_7 = lump(strain, [162, 102], rod([162, 102], [128, 14], { bend: 16 }), { ky: 1.08, kx: 0.97 }, CURL.taut);
  D.fishing_rod_8 = lump(uhoh, [160, 84], rod([160, 84], [127, 2], { bend: 16 }), { ky: 1.06, kx: 0.96, dy: -24, shadowK: 0.75, extra: { arm2: [[152, 120], [160, 84]] } }, CURL.up);
  D.fishing_rod_9 = lump(FACE.shock, [178, 150], rod([180, 150], [234, 104], { to: [118, 20], slack: -10 }), { ky: 0.84, kx: 1.1 }, CURL.sprung);
  D.fishing_rod_10 = lump(FACE.sheep, [176, 146], rod([178, 146], [232, 110], { slack: 30 }), { dx: DX / 2, extra: { arm2: [[159, 142], [183, 146]], front: rod([185, 146], [236, 112], { slack: 30 }) } });
  CLIPS.fishing_rod = { home: 'idle', seq: [...WAKE, ['fishing_rod_1', 8], ['fishing_rod_2', 4], ['fishing_rod_3', 3], ['fishing_rod_4', 9], ['fishing_rod_5', 5],
    ['fishing_rod_6', 4], ['fishing_rod_7', 4], ['fishing_rod_6', 4], ['fishing_rod_7', 4], ['fishing_rod_8', 9], ['fishing_rod_9', 4], ['fishing_rod_10', 9], ...DOZE] };
})();

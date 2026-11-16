// Champagne: he shakes the bottle and the cork goes off round the screen, wall to wall, while he watches. It ends between his eyes.
// group: celebrations
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  const shaking = [...FACE.chooEyes, ['stroke',[[120,123],[128,127],[136,123]],2.8]];
  const look = (ex, ey) => [['dot',116 + ex,108 + ey,4.2], ['dot',140 + ex,106 + ey,4.2], ['mouth',[[124,121],[132,121],[133,127],[128,130],[123,127]]]];
  const bang = (c, x, y, r) => {
    c.save(); c.globalAlpha = 1; c.strokeStyle = CREAM; c.lineWidth = 2.8; c.lineCap = 'round'; c.beginPath();
    for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + 0.3; c.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); c.lineTo(x + Math.cos(a) * (r + 9), y + Math.sin(a) * (r + 9)); }
    c.stroke(); c.restore();
  };
  // (x, y) is the middle of the bottle, where he grips it; foam: 0 corked, 1 spraying, 2 dribbling
  const bottle = (c, x, y, tilt, foam) => {
    c.save(); c.translate(x, y); c.rotate(tilt); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = '#58D68D'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.moveTo(-12, 24); c.lineTo(-12, -8); c.quadraticCurveTo(-12, -18, -4.5, -23); c.lineTo(-4.5, -42); c.lineTo(4.5, -42); c.lineTo(4.5, -23); c.quadraticCurveTo(12, -18, 12, -8); c.lineTo(12, 24); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#FFD23F'; c.fillRect(-4.5, -42, 9, 11); c.fillStyle = CREAM; c.fillRect(-8, 0, 16, 13);
    if (!foam) { c.fillStyle = '#C8A26B'; c.beginPath(); c.roundRect(-5, -50, 10, 9, 3); c.fill(); c.stroke(); }
    else { c.fillStyle = CREAM; c.beginPath(); (foam > 1 ? [[0, -44, 6], [6, -36, 5], [8, -26, 4]] : [[0, -46, 7], [-7, -56, 5], [7, -58, 6], [0, -68, 4]]).forEach(([fx, fy, r]) => { c.moveTo(fx + r, fy); c.arc(fx, fy, r, 0, Math.PI * 2); }); c.fill(); }
    c.restore();
  };
  // the cork's trip: from the bottle, off the walls, ceiling and floor, to his forehead. LEG is the ticks each leg takes.
  const PATH = [[211, 92], [234, 36], [150, 6], [8, 70], [72, 196], [234, 128], [178, 6], [134, 88]], LEG = [2, 4, 6, 6, 6, 6, 4];
  const cork = (c, t) => {
    let i = 0; while (i < LEG.length - 1 && t > LEG[i]) t -= LEG[i++];
    const [ax, ay] = PATH[i], [bx, by] = PATH[i + 1], p = Math.min(1, t / LEG[i]), x = ax + (bx - ax) * p, y = ay + (by - ay) * p;
    c.save(); c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3; c.globalAlpha = 0.6; c.beginPath(); c.moveTo(ax, ay); c.lineTo(x, y); c.stroke(); c.globalAlpha = 1;
    if (i && t <= 2) bang(c, ax, ay, 5);
    c.fillStyle = '#C8A26B'; c.beginPath(); c.arc(x, y, 8, 0, Math.PI * 2); c.fill(); c.stroke(); c.restore();
  };
  const HELD = { arm2: [[166, 140], [192, 138]] };
  const setup = [['champagne_1', 8], ...Array.from({ length: 8 }, (_, i) => ['champagne_' + (2 + i % 2), 2])];
  const START = 29 + setup.reduce((n, s) => n + s[1], 0);
  D.champagne_1 = xf(D.N, { face: FACE.happy, extra: { ...HELD, front: c => bottle(c, 201, 134, 0.25, 0) } });
  D.champagne_2 = xf(D.N, { face: shaking, ky: 0.96, extra: { arm2: [[166, 144], [192, 148]], front: c => bottle(c, 201, 146, 0.35, 0) } });
  D.champagne_3 = xf(D.N, { face: shaking, ky: 1.03, extra: { arm2: [[166, 136], [192, 126]], front: c => bottle(c, 201, 120, 0.15, 0) } });
  [[6, -5], [3, -7], [-6, -4], [-6, 3], [6, 1], [4, -7], [1, -5]].forEach(([ex, ey], i) => {
    D['champagne_watch' + i] = xf(D.N, { face: look(ex, ey), ky: i ? 1 : 0.94, extra: { ...HELD, front: (c, d, seed, tick) => {
      bottle(c, 201, 134, 0.25, i < 2 ? 1 : 2); if (!i) bang(c, 211, 88, 10); cork(c, Math.floor((tick - START) / 2) * 2); } } });
  });
  const hit = (face, o, x, y, extra = {}) => xf(D.N, { face, ...o, extra: { ...HELD, front: c => { bottle(c, 201, 134, 0.25, 2); c.strokeStyle = CREAM; c.lineWidth = 3; c.fillStyle = '#C8A26B'; c.beginPath(); c.arc(x, y, 8, 0, Math.PI * 2); c.fill(); c.stroke(); }, ...extra } });
  D.champagne_4 = hit(FACE.chooEyes, { ky: 0.9, kx: 1.05, rot: -0.06 }, 132, 92, { fxm: 'alert', fx: [112, 62] });
  D.champagne_5 = hit(FACE.spiral, { rot: -0.05 }, 104, 150);
  D.champagne_6 = hit(FACE.spiral, { rot: 0.05 }, 86, 195);
  D.champagne_7 = hit(FACE.spiral, { rot: -0.05 }, 86, 195);
  CLIPS.champagne = { home: 'idle', seq: [...WAKE, ...setup, ...[4, 4, 6, 6, 6, 6, 4].map((t, i) => ['champagne_watch' + i, t]),
    ['champagne_4', 4], ['champagne_5', 4], ['champagne_6', 5], ['champagne_7', 5], ['champagne_6', 5], ['champagne_7', 5], ...DOZE] };
})();

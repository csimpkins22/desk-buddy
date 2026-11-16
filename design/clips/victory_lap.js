// Victory lap: a cheer, then he tears off out of the right of the screen. A pause. He comes back in from the left, a lot slower.
// group: celebrations
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  const set = [['dot',122,108,4], ['dot',146,106,4], ['stroke',[[124,122],[132,126],[140,120]],2.8]];
  const spent = [['stroke',[[109,112],[121,108]],2.8], ['stroke',[[135,106],[147,110]],2.8], ['mouth',[[121,119],[135,118],[136,129],[128,133],[120,129]]]];
  const gasp = [['stroke',[[109,112],[121,108]],2.8], ['stroke',[[135,106],[147,110]],2.8], ['stroke',[[122,124],[134,123]],2.8]];
  const lines = (x, y) => c => {                      // speed lines trailing behind him
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round'; c.globalAlpha = 0.7; c.beginPath();
    [[0, 0, 34], [-10, 26, 46], [4, 52, 30]].forEach(([ox, oy, len]) => { c.moveTo(x + ox, y + oy); c.lineTo(x + ox - len, y + oy); });
    c.stroke(); c.restore();
  };
  const sweat = (x, y, k) => c => {                   // drops flying off his brow
    c.save(); c.fillStyle = '#5AB8FF';
    [[-58, -8], [-70, 10], [52, -14]].forEach(([ox, oy], i) => { c.beginPath(); c.ellipse(x + ox * k, y + oy - (k - 1) * 14, 3, 5, i < 2 ? -0.6 : 0.6, 0, Math.PI * 2); c.fill(); });
    c.restore();
  };
  const UP = { arm: [[94, 122], [76, 88]], arm2: [[162, 120], [180, 86]] };
  D.victory_lap_1 = xf(D.P1, { extra: UP });
  D.victory_lap_2 = xf(D.N, { face: set, ky: 0.88, kx: 1.06, rot: -0.1 });
  [36, 88, 150, 220].forEach((dx, i) => { D['victory_lap_out' + i] = xf(D.N, { face: FACE.happy, rot: 0.2, kx: 1.06, dx, dy: i % 2 ? 0 : -10, shadowK: 0.85, extra: { back: lines(dx + 62, 104) } }); });
  D.victory_lap_gone = xf(D.N, { dx: 300, extra: { front: lines(236, 104) } });
  D.victory_lap_empty = xf(D.N, { dx: 300 });
  [-196, -150, -108, -72, -42, -18, 0].forEach((dx, i) => {
    D['victory_lap_in' + i] = xf(D.N, { face: i % 2 ? gasp : spent, rot: 0.07, dx, ky: i % 2 ? 1 : 0.95, extra: { front: sweat(128 + dx, 96, 1 + (i % 2) * 0.3) } });
  });
  D.victory_lap_3 = xf(D.N, { face: spent, ky: 0.93, kx: 1.04, extra: { front: sweat(128, 100, 1) } });
  D.victory_lap_4 = xf(D.N, { face: gasp, ky: 1.02, extra: { front: sweat(128, 96, 1.3) } });
  CLIPS.victory_lap = { home: 'idle', seq: [...WAKE, ['victory_lap_1', 8], ['victory_lap_2', 5], ...[0, 1, 2, 3].map(i => ['victory_lap_out' + i, 2]), ['victory_lap_gone', 3], ['victory_lap_empty', 12],
    ...[0, 1, 2, 3, 4, 5, 6].map(i => ['victory_lap_in' + i, 4]), ['victory_lap_3', 5], ['victory_lap_4', 5], ['victory_lap_3', 5], ['victory_lap_4', 5], ...DOZE] };
})();

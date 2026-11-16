// Tests pass: he holds up a scorecard and three green ticks land on it, one by one.
// group: work
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath } = window.__lump;
  const CREAM = '#FFF1DC';
  const hopeful = [['dot',116,110,4], ['dot',140,108,4], ['stroke',[[122,124],[128,126],[134,124]],2.8]];
  const card = (ticks, lift = 0) => (c, d, seed) => {
    const y = 26 - lift;
    c.save(); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = '#17161A'; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.roundRect(74, y, 108, 44, 7); c.fill(); c.stroke();
    for (let i = 0; i < 3; i++) {
      const x = 94 + i * 34;
      c.strokeStyle = CREAM; c.globalAlpha = 0.45; c.lineWidth = 2; c.beginPath(); c.roundRect(x - 11, y + 11, 22, 22, 4); c.stroke(); c.globalAlpha = 1;
      if (i < ticks) { c.strokeStyle = '#58D68D'; c.lineWidth = 4; openPath(c, boil([[x - 7, y + 22], [x - 2, y + 28], [x + 9, y + 14]], seed + i, 0.8)); c.stroke(); }
    }
    c.restore();
  };
  const UP = { arm: [[96, 118], [86, 74]], arm2: [[160, 118], [170, 74]] };
  [0, 1, 2, 3].forEach(n => { D['pass' + n] = xf(D.N, { face: n < 3 ? hopeful : FACE.happy, ky: n === 3 ? 1.03 : 1, extra: { ...UP, front: card(n) } }); });
  D.pass4 = xf(D.N, { face: FACE.happy, rot: -0.05, extra: { ...UP, front: card(3, 4), fxm: 'done', fx: [128, 30] } });
  D.pass5 = xf(D.N, { face: FACE.happy, rot: 0.05, extra: { ...UP, front: card(3, 4), fxm: 'done', fx: [128, 30] } });
  CLIPS.tests_pass = { home: 'idle', seq: [...WAKE, ['pass0', 10], ['pass1', 8], ['pass2', 8], ['pass3', 8],
    ['pass4', 5], ['pass5', 5], ['pass4', 5], ['pass5', 5], ['pass4', 5], ['pass5', 5], ['C1', 8], ...DOZE] };
})();

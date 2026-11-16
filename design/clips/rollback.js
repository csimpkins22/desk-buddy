// Rollback: he shuffles across, hops and takes a bow, then a rewind mark appears and it all plays backwards to where he began.
// group: work
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  const UP = { arm: [[140, 118], [128, 76]], arm2: [[204, 118], [216, 76]] };
  const baffled = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[123,125],[128,123],[133,125]],2.6], ['stroke',[[108,100],[120,97]],2.4]];
  // the moves, in the order he makes them: [how he is drawn, ticks going forward]
  const moves = [
    [{ dx: 9, rot: 0.06, face: FACE.lookr }, 3], [{ dx: 18, rot: -0.04, face: FACE.lookr }, 3], [{ dx: 27, rot: 0.06, face: FACE.lookr }, 3],
    [{ dx: 36, rot: -0.04, face: FACE.lookr }, 3], [{ dx: 44 }, 4],
    [{ dx: 44, ky: 0.84, kx: 1.08 }, 3], [{ dx: 44, dy: -34, ky: 1.1, kx: 0.95, shadowK: 0.8, face: FACE.happy }, 2], [{ dx: 44, dy: -64, shadowK: 0.6, face: FACE.happy }, 3],
    [{ dx: 44, dy: -70, ky: 0.97, shadowK: 0.55, face: FACE.happy }, 3], [{ dx: 44, dy: -36, ky: 1.06, shadowK: 0.8, face: FACE.happy }, 2], [{ dx: 44, ky: 0.84, kx: 1.08 }, 3],
    [{ dx: 44, face: FACE.happy, extra: { ...UP, fxm: 'done', fx: [172, 44] } }, 10],
  ];
  // two arrowheads pointing back, and tape lines that jump about from frame to frame
  const rewind = i => (c, d, seed) => {
    c.save(); c.fillStyle = CREAM; c.beginPath();
    for (const x of [20, 42]) { c.moveTo(x + 18, 20); c.lineTo(x, 33); c.lineTo(x + 18, 46); c.closePath(); }
    c.fill();
    c.globalAlpha = 0.3;
    for (const y of [(i * 67 + 30) % 190, (i * 41 + 120) % 190]) c.fillRect(0, y + 8, 240, 3);
    c.restore();
  };
  moves.forEach(([o], i) => {
    D['rollback_f' + i] = xf(D.N, o);
    D['rollback_r' + i] = xf(D.N, { ...o, extra: { ...o.extra, front: rewind(i) } });
  });
  D.rollback_huh = xf(D.N, { face: baffled, extra: { front: rewind(12) } });
  D.rollback_what = xf(D.N, { face: baffled });
  const last = moves.length - 1;
  CLIPS.rollback = { home: 'idle', seq: [...WAKE, ...moves.map(([, n], i) => ['rollback_f' + i, n]), ['rollback_r' + last, 6],
    ...moves.map((m, i) => ['rollback_r' + i, 2]).reverse().slice(1), ['rollback_huh', 4], ['rollback_what', 12], ...DOZE] };
})();

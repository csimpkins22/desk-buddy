// Fireworks: he touches a match to his cowlick, it fizzes like a fuse, a rocket shoots off his head and the sky bursts above him.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath } = window.__lump;
  const CREAM = '#FFF1DC', COLOURS = ['#FFD23F', '#FF5A4D', '#5AB8FF', '#58D68D'];
  const eager = [['dot',120,108,4], ['dot',144,106,4], ['stroke',[[122,122],[130,127],[138,121]],2.8]];
  const uhoh = [['dot',119,102,4.2], ['dot',143,100,4.2], ['stroke',[[122,123],[128,121],[134,123]],2.6]];
  const bracing = [...FACE.chooEyes, ['stroke',[[121,126],[125,123],[129,126],[133,123]],2.6]];
  const awed = [['oval',118,101,5.4,6.2], ['oval',142,99,5.4,6.2], ['shine',120,98,2], ['shine',144,96,2], ['mouth',[[122,116],[134,115],[135,125],[128,129],[121,125]]]];
  const spark = (c, x, y, r, turn = 0) => {
    c.save(); c.strokeStyle = '#FFD23F'; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath();
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + turn; c.moveTo(x + Math.cos(a) * r * 0.3, y + Math.sin(a) * r * 0.3); c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); }
    c.stroke(); c.fillStyle = CREAM; c.beginPath(); c.arc(x, y, r * 0.3, 0, Math.PI * 2); c.fill(); c.restore();
  };
  const match = (hx, hy, tx, ty) => c => {
    c.save(); c.lineCap = 'round'; c.strokeStyle = '#6B4A1F'; c.lineWidth = 4; c.beginPath(); c.moveTo(hx, hy); c.lineTo(tx, ty); c.stroke(); c.restore();
    spark(c, tx, ty, 9, 0.3);
  };
  // one shell: stage 0 to 4 is flash, spreading, full bloom, drooping, embers
  const shell = (c, x, y, stage, k, hue) => {
    if (stage < 0 || stage > 4) return;
    const [r0, r1] = [[3, 12], [12, 30], [26, 50], [44, 58], [56, 60]][stage], sag = [0, 0, 2, 9, 20][stage];
    c.save(); c.lineCap = 'round'; c.lineWidth = stage < 3 ? 3.4 : 2.6; c.globalAlpha = [1, 1, 1, 0.75, 0.45][stage];
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * Math.PI * 2 + 0.26, col = COLOURS[(hue + (i % 2)) % 4], ex = x + Math.cos(a) * r1 * k, ey = y + Math.sin(a) * r1 * k + sag;
      c.strokeStyle = c.fillStyle = col;
      if (stage < 4) { c.beginPath(); c.moveTo(x + Math.cos(a) * r0 * k, y + Math.sin(a) * r0 * k + sag); c.lineTo(ex, ey); c.stroke(); }
      if (stage > 1) { c.beginPath(); c.arc(ex, ey, 2.6, 0, Math.PI * 2); c.fill(); }
    }
    if (stage === 0) { c.fillStyle = CREAM; c.beginPath(); c.arc(x, y, 7 * k, 0, Math.PI * 2); c.fill(); }
    c.restore();
  };
  const show = n => c => { shell(c, 128, 52, n, 0.9, 0); shell(c, 46, 62, n - 2, 0.7, 2); shell(c, 204, 56, n - 4, 0.75, 1); };
  const smoke = (c, d, seed) => { c.save(); c.globalAlpha = 0.6; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.lineCap = 'round'; openPath(c, boil([[128, 50], [123, 40], [131, 30], [125, 20]], seed, 2)); c.stroke(); c.restore(); };
  const TIP = [127, 52];
  D.fireworks_1 = xf(D.N, { face: eager, extra: { arm2: [[166, 138], [196, 124]], front: match(198, 122, 206, 102) } });
  D.fireworks_2 = xf(D.N, { face: FACE.lookup, extra: { arm2: [[162, 114], [154, 80]], front: match(153, 78, 131, 55) } });
  D.fireworks_3 = xf(D.N, { face: uhoh, extra: { front: c => spark(c, ...TIP, 9, 0) } });
  D.fireworks_4 = xf(D.N, { face: uhoh, extra: { front: c => spark(c, TIP[0] + 1, TIP[1] + 6, 14, 0.5) } });
  D.fireworks_5 = xf(D.N, { face: bracing, ky: 0.88, kx: 1.05, extra: { front: c => spark(c, 129, 80, 17, 0.2) } });
  D.fireworks_6 = xf(D.N, { face: FACE.shock, ky: 0.8, kx: 1.1, extra: { frizz: 12, front: c => {
    c.save(); c.lineCap = 'round'; c.strokeStyle = '#FFD23F'; c.lineWidth = 5; c.beginPath(); c.moveTo(128, 86); c.lineTo(128, 34); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.moveTo(118, 84); c.lineTo(118, 60); c.moveTo(138, 84); c.lineTo(138, 60); c.stroke(); c.restore(); spark(c, 128, 26, 11, 0.4); } } });
  D.fireworks_7 = xf(D.N, { face: FACE.lookup, ky: 0.84, kx: 1.06, extra: { frizz: 12 } });
  for (let n = 0; n < 9; n++) D['fireworks_show' + n] = xf(D.N, { face: n < 1 ? FACE.lookup : awed, ky: 0.84, kx: 1.06, extra: { frizz: 12, back: show(n) } });
  D.fireworks_8 = xf(D.N, { face: FACE.happy, extra: { frizz: 12, front: smoke } });
  D.fireworks_9 = xf(D.N, { face: FACE.sheep, extra: { frizz: 12, front: smoke } });
  CLIPS.fireworks = { home: 'idle', seq: [...WAKE, ['fireworks_1', 8], ['fireworks_2', 7], ['fireworks_3', 4], ['fireworks_4', 4], ['fireworks_3', 3], ['fireworks_4', 3], ['fireworks_5', 4],
    ['fireworks_6', 2], ['fireworks_7', 4], ...[2, 2, 3, 3, 3, 3, 3, 3, 4].map((t, n) => ['fireworks_show' + n, t]), ['fireworks_8', 8], ['fireworks_9', 10], ...DOZE] };
})();

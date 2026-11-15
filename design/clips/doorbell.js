// Doorbell: he presses a button that isn't there. It rings a little, then more, then far too much.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', X = -20, S = [146, 140];
  const blink = [['stroke',[[111,110],[121,110]],2.8], ['stroke',[[135,108],[145,108]],2.8], ['stroke',[[122,124],[128,126],[134,124]],2.6]];
  const button = c => {
    c.save(); c.strokeStyle = CREAM; c.fillStyle = CREAM; c.lineWidth = 2; c.globalAlpha = 0.75;
    c.setLineDash([4, 4]); c.beginPath(); c.arc(206, 120, 11, 0, Math.PI * 2); c.stroke();
    c.setLineDash([]); c.beginPath(); c.arc(206, 120, 3.5, 0, Math.PI * 2); c.fill();
    c.restore();
  };
  const bell = (x, y, s, tilt, rings) => c => {
    button(c);
    c.save(); c.translate(x, y); c.rotate(tilt); c.scale(s, s); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3 / Math.sqrt(s);
    c.fillStyle = CREAM; c.beginPath(); c.arc(-tilt * 14, 12, 3.6, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#FFD23F'; c.beginPath(); c.moveTo(-14, 9); c.quadraticCurveTo(-9, 5, -9, -4); c.bezierCurveTo(-9, -18, 9, -18, 9, -4); c.quadraticCurveTo(9, 5, 14, 9); c.closePath(); c.fill(); c.stroke();
    c.globalAlpha = 0.8;
    for (let i = 0; i < rings; i++) for (const a of [0, Math.PI]) { c.beginPath(); c.arc(0, -2, 21 + i * 7, a - 0.55, a + 0.55); c.stroke(); }
    c.restore();
  };
  const POISED = { arm2: [S, [184, 127]] }, PRESS = { arm2: [S, [190, 123]] };
  const small = t => bell(204, 84, 0.6, t, 1), medium = t => bell(198, 70, 1.15, t, 2), huge = t => bell(138, 62, 2.6, t, 3);
  D.doorbell_in = xf(D.N, { dx: X / 2 });
  D.doorbell_1 = xf(D.N, { dx: X, face: FACE.lookr, extra: { front: button } });
  D.doorbell_2 = xf(D.N, { dx: X, face: FACE.lookr, extra: { ...POISED, front: button } });
  D.doorbell_3 = xf(D.N, { dx: X, face: FACE.lookr, rot: 0.04, extra: { ...PRESS, front: small(0.25) } });
  D.doorbell_4 = xf(D.N, { dx: X, face: FACE.lookup, extra: { ...POISED, front: small(-0.25) } });
  D.doorbell_5 = xf(D.N, { dx: X, face: FACE.lookup, extra: { ...POISED, front: small(0.2) } });
  D.doorbell_6 = xf(D.N, { dx: X, face: FACE.happy, extra: { ...POISED, front: button } });
  D.doorbell_7 = xf(D.N, { dx: X, face: FACE.happy, rot: 0.05, extra: { ...PRESS, front: medium(0.3) } });
  D.doorbell_8 = xf(D.N, { dx: X, face: FACE.happy, extra: { ...POISED, front: medium(-0.3) } });
  D.doorbell_9 = xf(D.N, { dx: X, face: FACE.happy, ky: 1.02, extra: { ...POISED, front: medium(0.3) } });
  D.doorbell_10 = xf(D.N, { dx: X, face: FACE.cute, rot: -0.07, extra: { arm2: [[142, 138], [168, 110]], front: button } });
  D.doorbell_11 = xf(D.N, { dx: X, face: FACE.shock, rot: 0.1, extra: { arm2: [[150, 140], [194, 122]], front: huge(0) } });
  D.doorbell_12 = xf(D.N, { dx: X - 3, face: FACE.choo, ky: 0.8, kx: 1.1, extra: { front: huge(0.28) } });
  D.doorbell_13 = xf(D.N, { dx: X + 3, face: FACE.choo, ky: 0.78, kx: 1.12, extra: { front: huge(-0.28) } });
  D.doorbell_14 = xf(D.N, { dx: X, face: FACE.sheep, extra: { front: button } });
  D.doorbell_15 = xf(D.N, { dx: X, face: blink, extra: { front: button } });
  const ring = (a, b, n) => Array.from({ length: n }, (_, i) => ['doorbell_' + (i % 2 ? b : a), 3]);
  CLIPS.doorbell = { home: 'idle', seq: [...WAKE, ['doorbell_in', 3], ['doorbell_1', 8], ['doorbell_2', 4], ['doorbell_3', 3], ['doorbell_4', 3], ['doorbell_5', 3], ['doorbell_6', 6],
    ['doorbell_7', 3], ...ring(8, 9, 4), ['doorbell_10', 5], ['doorbell_11', 2], ...ring(12, 13, 6), ['doorbell_14', 7], ['doorbell_15', 3], ['doorbell_14', 6], ['doorbell_in', 3], ...DOZE] };
})();

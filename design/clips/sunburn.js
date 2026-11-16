// Sunburn: he basks under a hot sun, slowly goes red, and ends up fanning himself.
// group: weather
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath } = window.__lump;
  const CREAM = '#FFF1DC';
  const basking = [['stroke',[[110,110],[116,105],[122,110]],3], ['stroke',[[134,108],[140,103],[146,108]],3], ['stroke',[[120,122],[128,127],[136,122]],2.8]];
  const uneasy = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[121,126],[128,124],[135,126]],2.8]];
  const panting = [['stroke',[[109,111],[121,108]],3], ['stroke',[[135,106],[147,109]],3], ['mouth',[[121,120],[135,119],[136,130],[128,134],[120,130]]]];
  const sun = (x, y, r) => (c, d, seed, tick) => {
    const turn = Math.floor(tick / 4) % 2 * 0.39;
    c.save(); c.lineCap = 'round'; c.strokeStyle = '#FFD23F'; c.lineWidth = 5; c.beginPath();
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + turn; c.moveTo(x + Math.cos(a) * (r + 8), y + Math.sin(a) * (r + 8)); c.lineTo(x + Math.cos(a) * (r + 19), y + Math.sin(a) * (r + 19)); }
    c.stroke();
    c.fillStyle = '#FFD23F'; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); c.stroke();
    c.restore();
  };
  // red: how burnt he is, laid over his body colour (and his arm), with his face drawn again on top.
  // sweat: drops on his brow. fan: its tilt, in his hand.
  const burn = (red, sweat = 0, fan) => (c, d, seed) => {
    const redden = () => { c.save(); c.globalAlpha = red; c.fillStyle = '#E0201A'; c.fill(); c.restore(); };
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM;
    c.save(); c.translate(4, 2.5); closedPath(c, boil(d.body, seed + 50, 2.2)); redden(); c.restore();
    c.lineWidth = 4; closedPath(c, boil(d.body, seed, 2.2)); c.stroke();
    c.fillStyle = c.strokeStyle = '#0B0E14';
    d.face.forEach(m => {
      if (m[0] === 'dot') { c.beginPath(); c.arc(m[1], m[2], m[3], 0, Math.PI * 2); c.fill(); }
      else if (m[0] === 'stroke') { openPath(c, m[1]); c.lineWidth = m[2]; c.stroke(); }
      else { closedPath(c, m[1]); c.fill(); }
    });
    c.strokeStyle = CREAM; c.fillStyle = '#5AB8FF'; c.lineWidth = 1.6;
    [[96, 104], [164, 100], [88, 132]].slice(0, sweat).forEach(([x, y]) => { c.beginPath(); c.moveTo(x, y - 8); c.quadraticCurveTo(x + 7, y + 3, x, y + 5); c.quadraticCurveTo(x - 7, y + 3, x, y - 8); c.fill(); c.stroke(); });
    if (fan !== undefined) {
      const [[x0, y0], [x1, y1]] = d.arm2, len = Math.hypot(x1 - x0, y1 - y0);
      c.save(); c.translate(x0, y0); c.rotate(Math.atan2(y1 - y0, x1 - x0)); c.lineWidth = 3;
      closedPath(c, boil([[0, -7], [len * 0.5, -7], [len, -6], [len + 6, 0], [len, 6], [len * 0.5, 7], [0, 7]], seed + 98, 0.8)); redden(); c.stroke(); c.restore();
      c.translate(x1, y1); c.rotate(fan); c.lineWidth = 2.6;
      c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 40, -2.4, -1); c.closePath(); c.fill(); c.stroke();
      c.lineWidth = 1.8; c.beginPath(); [-2.05, -1.7, -1.35].forEach(a => { c.moveTo(0, 0); c.lineTo(Math.cos(a) * 38, Math.sin(a) * 38); }); c.stroke();
    }
    c.restore();
  };
  const P = 'sunburn_', HOLD = { arm2: [[166, 140], [194, 134]] };
  D[P + 1] = xf(D.N, { face: FACE.lookup, extra: { back: sun(22, 20, 24) } });
  D[P + 2] = xf(D.N, { face: basking, extra: { back: sun(46, 44, 26) } });
  D[P + 3] = xf(D.N, { face: basking, extra: { back: sun(46, 44, 28), front: burn(0.2) } });
  D[P + 4] = xf(D.N, { face: uneasy, extra: { back: sun(46, 44, 30), front: burn(0.4, 1) } });
  D[P + 5] = xf(D.N, { face: uneasy, ky: 0.98, extra: { back: sun(46, 44, 32), front: burn(0.6, 2) } });
  D[P + 6] = xf(D.N, { face: panting, ky: 0.95, kx: 1.02, extra: { back: sun(46, 44, 34), front: burn(0.8, 3) } });
  D[P + 7] = xf(D.N, { face: FACE.ah, extra: { ...HOLD, back: sun(46, 44, 34), front: burn(0.8, 2, -0.45) } });
  D[P + 8] = xf(D.N, { face: FACE.ah, extra: { ...HOLD, back: sun(46, 44, 34), front: burn(0.8, 2, -0.05) } });
  D[P + 9] = xf(D.N, { face: FACE.ah, extra: { ...HOLD, back: sun(46, 44, 34), front: burn(0.5, 1, -0.45) } });
  D[P + 10] = xf(D.N, { face: FACE.ah, extra: { ...HOLD, back: sun(46, 44, 34), front: burn(0.5, 1, -0.05) } });
  const fanning = (a, b) => [[P + a, 3], [P + b, 3], [P + a, 3], [P + b, 3], [P + a, 3], [P + b, 3]];
  CLIPS.sunburn = { home: 'idle', seq: [...WAKE, [P + 1, 4], [P + 2, 12], [P + 3, 10], [P + 4, 10], [P + 5, 10], [P + 6, 12], ...fanning(7, 8), ...fanning(9, 10), ...DOZE] };
})();

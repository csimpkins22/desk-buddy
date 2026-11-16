// Pinata: he winds up and whacks it with a stick. It bursts, and instead of sweets it rains tiny Lumps.
// group: celebrations
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, tint } = window.__lump;
  const CREAM = '#FFF1DC';
  const eyeing = [['dot',121,104,4], ['dot',145,102,4], ['stroke',[[123,121],[130,125],[138,120]],2.8]];
  const windup = [['stroke',[[108,101],[121,106]],3], ['stroke',[[136,104],[149,99]],3], ['dot',119,112,3.4], ['dot',145,110,3.4], ['stroke',[[122,125],[128,128],[135,124]],2.8]];
  const amazed = [['dot',117,102,4.6], ['dot',141,100,4.6], ['mouth',[[122,116],[134,115],[136,127],[128,131],[120,127]]]];
  const bang = (c, x, y, r) => {
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath();
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + 0.2, r0 = r + (i % 2) * 6; c.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); c.lineTo(x + Math.cos(a) * (r0 + 12), y + Math.sin(a) * (r0 + 12)); }
    c.stroke(); c.restore();
  };
  // a striped donkey on a string from the top of the screen at x = 196, swung by `swing`; gone: only the string is left
  const donkey = (c, swing, gone) => {
    c.save(); c.translate(196, 0); c.rotate(swing); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.4;
    c.beginPath(); c.moveTo(0, 0); c.lineTo(0, gone ? 20 : 30); c.stroke();
    if (!gone) {
      [[-20, '#5AB8FF'], [-9, '#FF5A4D'], [7, '#5AB8FF'], [18, '#FF5A4D']].forEach(([x, col]) => { c.fillStyle = col; c.beginPath(); c.roundRect(x - 4, 52, 8, 20, 3); c.fill(); c.stroke(); });
      c.fillStyle = '#58D68D'; c.beginPath(); c.moveTo(20, 14); c.lineTo(22, 4); c.lineTo(27, 14); c.fill(); c.stroke(); c.beginPath(); c.roundRect(14, 12, 17, 28, 6); c.fill(); c.stroke();
      c.fillStyle = '#FFD23F'; c.beginPath(); c.roundRect(-27, 30, 54, 28, 9); c.fill();
      c.fillStyle = '#FF5A4D'; c.fillRect(-15, 30, 9, 28); c.fillStyle = '#5AB8FF'; c.fillRect(3, 30, 9, 28);
      c.beginPath(); c.roundRect(-27, 30, 54, 28, 9); c.stroke();
      c.fillStyle = '#17161A'; c.beginPath(); c.arc(24, 22, 2.2, 0, Math.PI * 2); c.fill();
    }
    c.restore();
  };
  const stick = (c, x0, y0, x1, y1) => { c.save(); c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 8; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); c.strokeStyle = '#6B4A1F'; c.lineWidth = 4.5; c.stroke(); c.restore(); };
  // a tiny Lump, standing on (x, y)
  const mini = (c, x, y, squash = 1) => {
    c.save(); c.translate(x, y); c.lineJoin = c.lineCap = 'round'; c.fillStyle = tint(); c.strokeStyle = CREAM; c.lineWidth = 2.4;
    const h = 30 * squash, w = 13.5 / squash;
    c.beginPath(); c.moveTo(-w, 0); c.bezierCurveTo(-w - 2, -h * 0.6, -w * 0.6, -h, 1, -h); c.bezierCurveTo(w * 0.8, -h, w + 1, -h * 0.5, w, 0); c.closePath(); c.fill(); c.stroke();
    c.lineWidth = 2; c.beginPath(); c.moveTo(1, -h); c.quadraticCurveTo(-4, -h - 10, 4, -h - 9); c.stroke();
    c.fillStyle = '#17161A'; c.beginPath(); c.arc(-4, -h * 0.55, 2.2, 0, Math.PI * 2); c.moveTo(8.2, -h * 0.58); c.arc(6, -h * 0.58, 2.2, 0, Math.PI * 2); c.fill();
    c.restore();
  };
  const LANDED = [[20, 201], [202, 201], [100, 201], [144, 77], [52, 201], [228, 201], [158, 201]];
  // each drops in two ticks after the one before and stays where it lands
  const rain = start => (c, d, seed, tick) => {
    const t = Math.floor((tick - start) / 2) * 2;
    LANDED.forEach(([x, y], i) => { const fall = -30 + (t - i * 3) * 13; if (fall > -30) mini(c, x, Math.min(y, fall), fall >= y && fall < y + 26 ? 0.75 : 1); });
  };
  const settled = hop => c => LANDED.forEach(([x, y], i) => mini(c, x, y - (i % 2 === hop ? 5 : 0)));
  const setup = [['pinata_1', 5], ['pinata_2', 5], ['pinata_1', 5], ['pinata_3', 6], ['pinata_4', 2], ['pinata_5', 3], ['pinata_6', 3]];
  const START = 29 + setup.reduce((n, s) => n + s[1], 0);
  const HOLD = { arm2: [[166, 140], [192, 132]] };
  D.pinata_1 = xf(D.N, { face: eyeing, extra: { ...HOLD, front: c => { donkey(c, 0.07); stick(c, 194, 132, 216, 96); } } });
  D.pinata_2 = xf(D.N, { face: eyeing, extra: { ...HOLD, front: c => { donkey(c, -0.07); stick(c, 194, 132, 216, 96); } } });
  D.pinata_3 = xf(D.N, { face: windup, ky: 0.92, kx: 1.04, rot: -0.08, extra: { arm2: [[162, 146], [182, 160]], front: c => { donkey(c, 0); stick(c, 184, 160, 226, 172); } } });
  D.pinata_4 = xf(D.N, { face: windup, ky: 1.05, rot: 0.08, extra: { arm2: [[168, 132], [190, 108]], front: c => {
    donkey(c, 0); stick(c, 191, 106, 198, 80); c.save(); c.strokeStyle = CREAM; c.globalAlpha = 0.6; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.arc(176, 128, 52, -0.2, 0.9); c.stroke(); c.restore(); } } });
  D.pinata_5 = xf(D.N, { face: windup, ky: 1.05, rot: 0.08, extra: { arm2: [[168, 132], [190, 108]], front: c => { donkey(c, -0.3); stick(c, 191, 106, 200, 80); bang(c, 204, 70, 8); } } });
  D.pinata_6 = xf(D.N, { face: FACE.shock, extra: { ...HOLD, front: c => { donkey(c, 0, true); stick(c, 194, 132, 216, 100); bang(c, 196, 46, 16); } } });
  const after = (face, o = {}) => xf(D.N, { face, ...o, extra: { ...HOLD, front: (c, d, seed, tick) => { donkey(c, 0, true); stick(c, 194, 132, 216, 100); rain(START)(c, d, seed, tick); } } });
  D.pinata_7 = after(FACE.lookup);
  D.pinata_8 = after(amazed);
  D.pinata_9 = after(FACE.chooEyes, { ky: 0.93, kx: 1.04 });
  D.pinata_10 = xf(D.N, { face: FACE.lookup, extra: { front: c => { donkey(c, 0, true); settled(0)(c); } } });
  D.pinata_11 = xf(D.N, { face: FACE.cute, extra: { front: c => { donkey(c, 0, true); settled(1)(c); } } });
  D.pinata_12 = xf(D.N, { face: FACE.cute, extra: { front: c => { donkey(c, 0, true); settled(0)(c); } } });
  CLIPS.pinata = { home: 'idle', seq: [...WAKE, ...setup, ['pinata_7', 6], ['pinata_8', 10], ['pinata_9', 4], ['pinata_8', 12], ['pinata_10', 6],
    ['pinata_11', 4], ['pinata_12', 4], ['pinata_11', 4], ['pinata_12', 4], ['pinata_11', 4], ...DOZE] };
})();

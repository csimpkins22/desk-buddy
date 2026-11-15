// Telescope: he scans the horizon, then turns it on you the wrong way round (a tiny eye). He flips it: a giant eye, and he jumps.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, mixHex, tint } = window.__lump;
  const CREAM = '#FFF1DC', BRASS = '#FFD23F', EDGE = '#6B4A1F', DX = -16;
  const at = (k, x, y) => [128 + (x - 128) * k + DX, 201 + (y - 201) * k];       // where a point on him is when he leans in by k
  const smile = ['stroke',[[108,124],[114,127],[120,124]],2.6], oh = ['dot',114,127,2.8];
  const one = mouth => [['dot',116,110,3.8], mouth];                               // his other eye is behind the telescope
  const squint = [['stroke',[[110,108],[116,112],[122,108]],3], smile];
  const puzzled = [['dot',119,111,3.8], ['dot',143,109,3.8], ['stroke',[[122,126],[128,124],[134,126]],2.6], ['stroke',[[134,97],[147,94]],2.4]];
  // seen from the side: three sections, the eyepiece at (x, y), pointing along a
  const side = (x, y, a) => (c, d, seed) => {
    c.save(); c.translate(x, y); c.rotate(a); c.lineJoin = c.lineCap = 'round'; c.fillStyle = BRASS; c.strokeStyle = EDGE; c.lineWidth = 2.4;
    [[-6, 28, 6.5], [20, 28, 9.5], [46, 32, 13]].forEach(([x0, w, h]) => { c.beginPath(); c.roundRect(x0, -h, w, h * 2, 2); c.fill(); c.stroke(); });
    c.restore();
  };
  // pointing at you: the same three sections end on, centred on (x, y). wrong: the thin end is nearest you
  const front = (k, wrong, look = [0, 0]) => (c, d, seed) => {
    const [x, y] = at(k, 146, 106), R = wrong ? [24, 18, 12] : [11, 18, 27];
    c.save(); c.fillStyle = BRASS; c.strokeStyle = EDGE; c.lineWidth = 2.4;
    R.forEach((r, i) => { c.beginPath(); c.arc(x + i * 5 * k, y + i * 6 * k, r * k, 0, Math.PI * 2); c.fill(); c.stroke(); });
    const gx = x + 10 * k, gy = y + 12 * k, g = (wrong ? 8 : 22) * k, e = wrong ? 2.6 : 12 * k;
    c.fillStyle = mixHex(tint(), '#FFFFFF', 0.3); c.beginPath(); c.arc(gx, gy, g, 0, Math.PI * 2); c.fill(); c.stroke();
    c.fillStyle = '#0B0E14'; c.beginPath(); c.ellipse(gx + look[0], gy + look[1], e, e * 1.15, 0, 0, Math.PI * 2); c.fill();
    if (!wrong) { c.fillStyle = CREAM; c.beginPath(); c.arc(gx + look[0] + e * 0.4, gy + look[1] - e * 0.5, e * 0.28, 0, Math.PI * 2); c.fill(); }
    c.restore();
  };
  const lump = (face, extra, o = {}) => xf(D.N, { dx: DX, face, ...o, extra });
  const HOLD = { arm2: [[150, 140], [146, 124]] }, LOW = { arm2: [[150, 142], [172, 150]] };
  D.telescope_1 = lump(one(smile), { arm2: [[150, 138], [160, 112]], front: side(124, 108, -0.3) }, { rot: -0.03 });
  D.telescope_2 = lump(one(smile), { arm2: [[150, 138], [164, 120]], front: side(124, 108, 0) }, { rot: 0.03 });
  D.telescope_3 = lump(FACE.happy, { ...LOW, front: side(160, 146, 0.25) });
  D.telescope_4 = lump(one(smile), { ...HOLD, front: front(1, true) });
  D.telescope_5 = lump(squint, { ...HOLD, front: front(1.08, true) }, { k: 1.08 });
  D.telescope_6 = lump(puzzled, { ...LOW, front: side(160, 146, 0.25) });
  D.telescope_7 = lump(puzzled, { arm2: [[150, 140], [176, 132]], front: side(184, 150, -Math.PI / 2) });
  D.telescope_8 = lump(one(smile), { ...HOLD, front: front(1, false) });
  D.telescope_9 = lump(one(oh), { ...HOLD, front: front(1.1, false, [-4, 0]) }, { k: 1.1 });
  D.telescope_10 = lump(one(oh), { ...HOLD, front: front(1.1, false, [4, 0]) }, { k: 1.1 });
  D.telescope_11 = lump(FACE.shock, { front: side(182, 96, -1.1), fxm: 'alert', fx: [112, 74] }, { ky: 0.86, kx: 1.08 });
  D.telescope_12 = lump(FACE.sheep, { front: side(152, 190, 0) }, { dx: DX / 2 });
  CLIPS.telescope = { home: 'idle', seq: [...WAKE, ['telescope_1', 6], ['telescope_2', 6], ['telescope_1', 5], ['telescope_3', 5], ['telescope_4', 10], ['telescope_5', 8],
    ['telescope_6', 6], ['telescope_7', 3], ['telescope_8', 4], ['telescope_9', 6], ['telescope_10', 6], ['telescope_11', 5], ['telescope_12', 8], ...DOZE] };
})();

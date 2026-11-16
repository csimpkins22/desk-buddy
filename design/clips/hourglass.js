// Hourglass: he flips it and watches the sand. It is very slow. He shakes it, and one more grain falls.
// group: waiting
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', X = -30, GX = 194, GY = 162, START = 42;
  const pleased = [['dot',122,110,3.8], ['dot',146,108,3.8], ['stroke',[[124,123],[131,127],[138,123]],2.8]];
  const bored = [['dot',123,112,3.6], ['dot',147,110,3.6], ['stroke',[[113,105],[127,105]],2.6], ['stroke',[[139,103],[153,103]],2.6], ['stroke',[[124,126],[136,125]],2.8]];
  const really = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[108,103],[122,103]],2.6], ['stroke',[[134,101],[148,101]],2.6], ['stroke',[[122,126],[134,125]],2.8]];
  const shaking = [...FACE.chooEyes, ['stroke',[[119,126],[123,123],[127,126],[131,123],[135,126]],2.6]];
  const blink = [['stroke',[[118,112],[128,112]],2.8], ['stroke',[[142,110],[152,110]],2.8], ['stroke',[[124,126],[136,125]],2.8]];
  // left: how much sand is still in the top (0 to 1)
  const glass = (c, x, y, rot, left, falling) => {
    const bulbs = () => { c.beginPath(); c.moveTo(-16, -31); c.lineTo(16, -31); c.lineTo(3, 0); c.lineTo(16, 31); c.lineTo(-16, 31); c.lineTo(-3, 0); c.closePath(); };
    c.save(); c.translate(x, y); c.rotate(rot); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.4;
    c.fillStyle = '#17161A'; bulbs(); c.fill();
    c.fillStyle = '#FFD23F';
    if (left > 0) { const top = -4 - 23 * left, w = 1.5 - 13 * top / 31; c.beginPath(); c.moveTo(-w, top); c.lineTo(w, top); c.lineTo(2, -2); c.lineTo(-2, -2); c.closePath(); c.fill(); }
    if (left < 1) { c.beginPath(); c.moveTo(-13, 30); c.lineTo(0, 24 - 16 * (1 - left)); c.lineTo(13, 30); c.closePath(); c.fill(); }
    if (falling) c.fillRect(-1, falling > 1 ? 12 : -2, 2, falling > 1 ? 3 : 30);
    bulbs(); c.stroke();
    c.fillStyle = '#8A5A2B'; for (const cy of [-39, 31]) { c.beginPath(); c.roundRect(-21, cy, 42, 8, 3); c.fill(); c.stroke(); }
    c.restore();
  };
  const still = (y, rot, left, falling) => c => glass(c, GX, y, rot, left, falling);
  // running: the top goes down a notch every 8 ticks, which is the joke
  const sandAt = tick => 1 - Math.floor((tick - START) / 8) * 0.012;
  const running = (c, d, seed, tick) => glass(c, GX, GY, 0, sandAt(tick), 1);
  const shaken = rot => (c, d, seed) => {
    glass(c, 190, 128, rot, sandAt(START + 36), 0);
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2; c.lineCap = 'round'; c.globalAlpha = 0.6;
    for (const a of [-0.85, 0.45]) { c.beginPath(); c.arc(190, 128, 50, -Math.PI / 2 + a, -Math.PI / 2 + a + 0.4); c.stroke(); }
    c.restore();
  };
  const me = (face, o = {}, extra = {}) => xf(D.N, { dx: X, face, ...o, extra });
  D.hourglass_in = xf(D.N, { dx: X / 2, extra: { front: still(GY, 0, 0) } });
  D.hourglass_out = xf(D.N, { dx: X / 2, face: really, extra: { front: still(GY, 0, sandAt(START + 44), 0) } });
  D.hourglass_1 = me(FACE.lookr, {}, { front: still(GY, 0, 0) });
  D.hourglass_2 = me(FACE.lookr, { rot: 0.05 }, { arm2: [[138, 142], [174, 158]], front: still(GY, 0, 0) });
  D.hourglass_3 = me(FACE.lookr, { rot: 0.03 }, { arm2: [[138, 140], [172, 146]], front: still(148, 1.1, 0) });
  D.hourglass_4 = me(FACE.lookr, { rot: 0.03 }, { arm2: [[138, 140], [172, 146]], front: still(148, 2.2, 0) });
  D.hourglass_5 = me(pleased, {}, { front: running });
  D.hourglass_6 = me(bored, { ky: 0.97 }, { front: running });
  D.hourglass_7 = me(really, { ky: 0.97 }, { front: running });
  D.hourglass_8 = me(shaking, { rot: 0.06 }, { arm2: [[138, 140], [172, 134]], front: shaken(-0.45) });
  D.hourglass_9 = me(shaking, { rot: 0.02 }, { arm2: [[138, 140], [172, 130]], front: shaken(0.45) });
  D.hourglass_10 = me(bored, {}, { front: still(GY, 0, sandAt(START + 36), 0) });
  D.hourglass_11 = me(bored, {}, { front: still(GY, 0, sandAt(START + 36), 2) });
  D.hourglass_12 = me(blink, { ky: 0.96 }, { front: still(GY, 0, sandAt(START + 44), 0) });
  D.hourglass_13 = me(really, { ky: 0.96 }, { front: still(GY, 0, sandAt(START + 44), 0) });
  const shake = Array.from({ length: 8 }, (_, i) => ['hourglass_' + (8 + i % 2), 2]);
  CLIPS.hourglass = { home: 'idle', seq: [...WAKE, ['hourglass_in', 3], ['hourglass_1', 4], ['hourglass_2', 2], ['hourglass_3', 2], ['hourglass_4', 2],
    ['hourglass_5', 12], ['hourglass_6', 12], ['hourglass_7', 8], ['hourglass_6', 4], ...shake, ['hourglass_10', 8], ['hourglass_11', 3], ['hourglass_12', 3], ['hourglass_13', 12], ['hourglass_out', 3], ...DOZE] };
})();

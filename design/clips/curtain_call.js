// Curtain call: he takes his bows, a rose sails in and he catches it, and then the curtain comes down, right on top of him.
// group: nonsense
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath, tint } = window.__lump;
  const CREAM = '#FFF1DC', RED = '#FF5A4D', DRAPE = '#D8362F', DARK = '#8F1F1B', GREEN = '#58D68D', TAU = Math.PI * 2;
  const bowing = [['stroke',[[108,116],[115,120],[122,116]],3], ['stroke',[[134,114],[141,118],[148,114]],3], ['stroke',[[122,130],[128,132],[134,130]],2.8]];
  const bliss = [...FACE.aahEyes, ['stroke',[[120,122],[128,127],[136,122]],2.8], ['blush',102,120,8,5], ['blush',154,118,8,5]];
  const rose = (c, x, y, a) => {                         // (x, y) is the bloom; the stem trails away at angle a
    c.save(); c.translate(x, y); c.rotate(a); c.lineCap = 'round';
    c.strokeStyle = GREEN; c.lineWidth = 3.4; c.beginPath(); c.moveTo(0, 6); c.lineTo(0, 34); c.stroke();
    c.fillStyle = GREEN; c.beginPath(); c.ellipse(6, 20, 6, 3, -0.6, 0, TAU); c.fill();
    c.fillStyle = RED; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.arc(0, 0, 10, 0, TAU); c.fill(); c.stroke();
    c.lineWidth = 1.8; c.beginPath(); c.arc(0, 0, 4.5, 0.4, 4.4); c.stroke();
    c.restore();
  };
  const stage = c => {                                   // the curtain while it is still up: a drape each side and a swag along the top
    c.save(); c.lineJoin = c.lineCap = 'round'; c.fillStyle = DRAPE; c.lineWidth = 2.6;
    [[0, 1], [240, -1]].forEach(([x, s]) => {
      c.strokeStyle = CREAM; c.beginPath(); c.moveTo(x, 0); c.lineTo(x + s * 24, 0); c.quadraticCurveTo(x + s * 12, 110, x + s * 26, 203); c.lineTo(x, 203); c.closePath(); c.fill(); c.stroke();
      c.strokeStyle = DARK; c.beginPath(); c.moveTo(x + s * 9, 34); c.lineTo(x + s * 10, 196); c.stroke();
    });
    c.strokeStyle = CREAM; c.beginPath(); c.moveTo(0, 0); c.lineTo(240, 0); c.lineTo(240, 14);
    for (let i = 5; i > 0; i--) c.quadraticCurveTo(i * 48 - 24, 40, (i - 1) * 48, 14);
    c.closePath(); c.fill(); c.stroke(); c.restore();
  };
  const falling = (b, tilt) => c => {                    // the whole curtain on its way down, hem at y = b
    c.save(); c.lineJoin = c.lineCap = 'round'; c.translate(120, 0); c.rotate(tilt); c.translate(-120, 0);
    c.fillStyle = DRAPE; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.moveTo(-20, -40); c.lineTo(260, -40); c.lineTo(260, b);
    for (let i = 5; i > 0; i--) c.quadraticCurveTo(i * 56 - 48, b + 20, (i - 1) * 56 - 20, b);
    c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = DARK; c.beginPath(); [22, 70, 118, 166, 214].forEach(x => { c.moveTo(x, -10); c.lineTo(x, b - 4); }); c.stroke(); c.restore();
  };
  // the curtain heaped over him: his own outline, bigger and spread at the floor. peek: 1 eyes open, 2 blinking
  const heap = (k, peek) => (c, _, seed) => {
    const P = D.N.body.map(([x, y]) => { const h = 201 - y; return [128 + (x - 128) * (1.18 + Math.max(0, 40 - h) * 0.013), 203 - h * 1.1 * k]; });
    c.save(); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = tint(); c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.ellipse(212, 132, 12, 7, -0.2, 0, TAU); c.fill(); c.stroke();
    rose(c, 220, 96, 0.1);
    c.fillStyle = DRAPE; c.lineWidth = 3.4; closedPath(c, boil(P, seed, 2)); c.fill(); c.stroke();
    c.strokeStyle = DARK; c.lineWidth = 3; c.beginPath();
    [[98, 96, 66], [164, 100, 192]].forEach(([x, y, x2]) => { c.moveTo(x, 203 - (203 - y) * k); c.quadraticCurveTo(x, 160, x2, 196); });
    if (!peek) { c.moveTo(132, 203 - 70 * k); c.lineTo(128, 196); }
    c.stroke();
    if (peek) {
      c.fillStyle = '#17161A'; c.beginPath(); c.ellipse(128, 114, 30, 15, 0, 0, TAU); c.fill();
      c.fillStyle = c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath();
      if (peek === 1) { c.arc(117, 114, 4.4, 0, TAU); c.arc(139, 113, 4.4, 0, TAU); c.fill(); } else { c.moveTo(112, 114); c.lineTo(122, 114); c.moveTo(134, 113); c.lineTo(144, 113); c.stroke(); }
    }
    c.restore();
  };
  const pile = c => {                                    // shrugged off, in a heap behind him
    c.save(); c.lineJoin = c.lineCap = 'round'; c.fillStyle = DRAPE; c.strokeStyle = CREAM; c.lineWidth = 3;
    c.beginPath(); c.moveTo(30, 203); c.quadraticCurveTo(40, 176, 82, 180); c.quadraticCurveTo(128, 166, 176, 180); c.quadraticCurveTo(216, 176, 226, 203); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = DARK; c.beginPath(); c.moveTo(52, 186); c.lineTo(44, 199); c.moveTo(204, 186); c.lineTo(212, 199); c.stroke(); c.restore();
  };
  const held = (x, y, a = 0.1) => ({ arm2: [[166, 142], [x, y + 30]], front: c => rose(c, x + 2, y, a) });
  const on = (o, face, extra = {}) => xf(D.N, { ...o, face, extra: { back: stage, ...extra } });
  const FLOURISH = { arm: [[90, 150], [62, 140]], arm2: [[166, 150], [194, 140]] };
  D.curtain_call_1 = on({}, FACE.happy);
  D.curtain_call_2 = on({ ky: 0.78, kx: 1.08 }, bowing, FLOURISH);
  [[226, 176, -1.2], [212, 118, -0.6], [202, 84, 0], [200, 92, 0.2]].forEach(([x, y, a], i) => { D['curtain_call_t' + i] = on({}, i < 2 ? FACE.lookr : FACE.shock, { front: c => rose(c, x, y, a) }); });
  D.curtain_call_3 = on({ ky: 1.04 }, FACE.shock, held(200, 96));
  D.curtain_call_4 = on({}, FACE.cute, { ...held(200, 98), fxm: 'done', fx: [128, 56] });
  D.curtain_call_5 = on({ ky: 0.8, kx: 1.07 }, bowing, { arm: FLOURISH.arm, ...held(204, 116, 0.5) });
  D.curtain_call_6 = xf(D.N, { ky: 0.8, kx: 1.07, face: bowing, extra: { ...held(204, 116, 0.5), front: c => { rose(c, 206, 116, 0.5); falling(64, 0.05)(c); } } });
  D.curtain_call_7 = xf(D.N, { face: FACE.lookup, extra: { ...held(204, 110, 0.3), front: c => { rose(c, 206, 110, 0.3); falling(150, -0.04)(c); } } });
  const under = (k, peek, more) => ({ ...xf(D.N, { ky: k, face: [], extra: { front: heap(k, peek), ...more } }), curl: [[128, 120], [128, 120]] });
  D.curtain_call_8 = under(0.86, 0, { fxm: 'alert', fx: [128, 62] });
  D.curtain_call_9 = under(1, 0);
  D.curtain_call_10 = under(1, 1);
  D.curtain_call_11 = under(1, 2);
  D.curtain_call_12 = xf(D.N, { face: FACE.sheep, extra: { back: pile, ...held(200, 98) } });
  D.curtain_call_13 = xf(D.N, { face: bliss, extra: { back: pile, arm2: [[168, 148], [147, 151]], front: c => rose(c, 150, 118, 0.25) } });
  const each = (p, n, t) => Array.from({ length: n }, (_, i) => [p + i, t]);
  CLIPS.curtain_call = { home: 'idle', seq: [...WAKE, ['curtain_call_1', 4], ['curtain_call_2', 6], ['curtain_call_1', 4], ['curtain_call_2', 6], ['curtain_call_1', 3], ...each('curtain_call_t', 4, 2),
    ['curtain_call_3', 3], ['curtain_call_4', 9], ['curtain_call_5', 5], ['curtain_call_6', 2], ['curtain_call_7', 2], ['curtain_call_8', 3], ['curtain_call_9', 6],
    ['curtain_call_10', 6], ['curtain_call_11', 2], ['curtain_call_10', 5], ['curtain_call_12', 7], ['curtain_call_13', 8], ...DOZE] };
})();

// Kart drift: he skids off in a tiny cart of his own, hits a banana peel, and spins out past the chequered flag. The peel lands on his head.
// group: games
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', YELLOW = '#FFD23F', TAU = Math.PI * 2, K = 0.45, P = 'kart_drift_';
  const keen = [['dot',118,108,8], ['dot',148,106,8], ['mouth',[[118,120],[146,119],[143,134],[132,138],[121,134]]], ['stroke',[[106,94],[124,98]],5], ['stroke',[[140,96],[158,91]],5]];
  const yikes = [['dot',113,106,9], ['dot',143,104,9], ['mouth',[[120,120],[136,119],[139,138],[128,144],[117,138]]]];
  const dizzy = [['spiral',112,108,11], ['spiral',144,106,11], ['stroke',[[116,128],[122,124],[128,128],[134,124],[140,128]],5]];
  const peel = (c, x, y, turn) => {
    c.save(); c.translate(x, y); c.rotate(turn); c.lineCap = 'round'; c.strokeStyle = YELLOW; c.lineWidth = 5; c.beginPath();
    [[-11, 5], [0, 7], [11, 5]].forEach(([px, py]) => { c.moveTo(0, -4); c.quadraticCurveTo(px * 0.8, -4, px, py); }); c.stroke();
    c.strokeStyle = '#6B4A1F'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, -5); c.lineTo(0, -9); c.stroke(); c.restore();
  };
  // the flag on its pole, flapping by `amp`
  const flag = (c, seed, amp) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.moveTo(136, 201); c.lineTo(136, 82); c.stroke(); c.lineWidth = 1.6;
    for (let i = 0; i < 4; i++) {
      const y = 86 + Math.sin(i * 1.3 + seed * 2.1) * amp * (i + 1) / 3;
      for (let j = 0; j < 3; j++) { c.fillStyle = (i + j) % 2 ? CREAM : '#17161A'; c.fillRect(138 + i * 9, y + j * 9, 9, 9); }
      c.beginPath(); c.rect(138 + i * 9, y, 9, 27); c.stroke();
    }
    c.restore();
  };
  // the cart at x, facing f (1 right, -1 left, in between as it spins round), with skid lines or spin lines about it
  const cart = (x, f, o) => (c, d, seed) => {
    const w = Math.abs(f);
    c.save(); c.translate(x, 201 - (o.lift || 0)); c.rotate(o.tilt || 0); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.fillStyle = '#5AB8FF'; c.beginPath(); c.roundRect(-32 * w, -31, 64 * w, 20, 6); c.fill(); c.stroke();
    c.fillStyle = YELLOW; c.beginPath(); c.arc(31 * f, -22, 4.5, 0, TAU); c.fill(); c.stroke();
    [-19, 19].forEach(wx => {
      c.fillStyle = '#17161A'; c.beginPath(); c.ellipse(wx * f, -8, Math.max(3.5, 8 * w), 8, 0, 0, TAU); c.fill(); c.stroke();
      c.fillStyle = CREAM; c.beginPath(); c.arc(wx * f, -8, 2, 0, TAU); c.fill();
    });
    c.restore();
    c.save(); c.strokeStyle = CREAM; c.lineCap = 'round'; c.lineWidth = 2.4; c.globalAlpha = 0.7; c.beginPath();
    if (o.skid) [[196, 30], [186, 18], [176, 24]].forEach(([y, n], i) => { const gap = 40 + (seed + i) % 3 * 5; c.moveTo(x - gap, y); c.lineTo(x - gap - n, y); });
    if (o.spin) [0.3, 3.4].forEach(a => { c.moveTo(x + Math.cos(a + o.spin) * 46, 168 + Math.sin(a + o.spin) * 30); c.ellipse(x, 168, 46, 30, 0, a + o.spin, a + o.spin + 1.1); });
    c.stroke(); c.restore();
    if (o.peel) peel(c, ...o.peel);
  };
  const seq = [...WAKE];
  // peel: where it is and how far round, flap: how hard the flag is blowing
  const put = (name, ticks, x, f, face, o = {}) => {
    D[P + name] = xf(D.N, { k: K, kx: f, dx: x - 128, dy: -19 - (o.lift || 0), rot: o.tilt || 0, face, ...o.pose,
      extra: { back: (c, d, seed) => flag(c, seed, o.flap ?? 2), front: cart(x, f, { peel: [106, 194, 0], ...o }), ...o.extra } });
    seq.push([P + name, ticks]);
  };
  put('in1', 3, 88, 1, keen, { pose: { k: 0.75, dy: -30 } });        // an odd hold, so each drawing after it keeps one wobble for its two ticks
  put('in2', 2, 56, 1, keen, { pose: { k: 0.55, dy: -24 } });
  [39, 41, 39, 41].forEach((x, i) => put('rev' + i, 2, x, 1, keen, { skid: i % 2, tilt: i % 2 ? -0.04 : 0 }));
  [50, 64, 82].forEach((x, i) => put('go' + i, 2, x, 1, keen, { skid: 1, tilt: -0.08 }));
  put('slip', 2, 100, 1, yikes, { tilt: 0.16, lift: 6, peel: [102, 180, 0.8], extra: { fxm: 'alert', fx: [124, 104] } });
  // spinning round and round as he slides to a stop; the peel sails over and comes down on his head
  [[120, 0.35], [138, -0.9], [154, -0.35], [168, 0.9], [180, 0.35], [190, -0.9], [198, -0.35], [203, 0.9], [204, 0.35], [204, -1]].forEach(([x, f], i) => {
    const p = (i + 1) / 10;
    put('spin' + i, 2, x, f, i < 4 ? yikes : dizzy, { spin: i < 9 ? i * 1.3 + 0.01 : 0, lift: i < 6 ? 3 : 0, flap: i < 7 ? 7 : 3, peel: [102 + 102 * p, 180 - 300 * p * (1 - p) - 61 * p, 0.8 + p * 5.5] });
  });
  ['a', 'b', 'a', 'b'].forEach((n, i) => put('rest' + i, 5, 204, -1, dizzy, { tilt: n === 'a' ? 0.03 : -0.03, peel: [204, 119, 0] }));
  D[P + 'up'] = xf(D.N, { k: 0.75, dx: 38, face: FACE.spiral });
  D[P + 'd1'] = xf(D.N, { rot: 0.05, face: FACE.spiral }); D[P + 'd2'] = xf(D.N, { rot: -0.05, face: FACE.spiral });
  seq.push([P + 'up', 2], [P + 'd1', 4], [P + 'd2', 4], [P + 'd1', 4], ...DOZE);
  CLIPS.kart_drift = { home: 'idle', seq };
})();

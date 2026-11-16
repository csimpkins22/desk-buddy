// Rock field: he drifts and spins among floating rocks and bumps the big one in two. The halves drift off one edge and back in at the other, and one comes round to get him.
// group: games
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', TAU = Math.PI * 2, K = 0.4, P = 'rock_field_';
  const calm = [['dot',113,108,8], ['dot',143,106,8], ['stroke',[[120,126],[128,130],[136,126]],5]];
  const glad = [['dot',113,108,8], ['dot',143,106,8], ['mouth',[[114,120],[142,119],[139,136],[128,141],[117,136]]]];
  const yikes = [['dot',113,106,9], ['dot',143,104,9], ['mouth',[[120,120],[136,119],[139,138],[128,144],[117,138]]]];
  const wince = [['stroke',[[104,100],[118,108],[104,116]],6], ['stroke',[[152,98],[138,106],[152,114]],6], ['stroke',[[116,128],[122,124],[128,128],[134,124],[140,128]],5]];
  const dizzy = [['spiral',112,108,11], ['spiral',144,106,11], wince[2]];
  const LUMPS = [1, 0.82, 1.06, 0.9, 1, 0.8, 0.96, 1.08], STARS = [[22, 24], [96, 14], [150, 40], [222, 28], [36, 128], [214, 132], [60, 222], [178, 214]];
  // a rock, drawn again at the far edge wherever it hangs over one
  const rock = (c, seed, x, y, r, turn) => {
    const pts = LUMPS.map((l, i) => [Math.cos(i / 8 * TAU + turn) * r * l, Math.sin(i / 8 * TAU + turn) * r * l]);
    x = (x % 240 + 240) % 240; y = (y % 240 + 240) % 240;
    for (const X of [x - 240, x, x + 240]) for (const Y of [y - 240, y, y + 240]) {
      if (X < -r - 3 || X > 243 + r || Y < -r - 3 || Y > 243 + r) continue;
      closedPath(c, boil(pts.map(q => [X + q[0], Y + q[1]]), seed + r, 1.2)); c.fill(); c.stroke();
    }
  };
  const field = t => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = CREAM; c.globalAlpha = 0.5; STARS.forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 1.6, 0, TAU); c.fill(); }); c.globalAlpha = 1;
    c.fillStyle = '#9FB0C4'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    rock(c, seed, 40 - t * 0.8, 40 + t * 0.3, 13, t * 0.05);
    rock(c, seed, 40 - t * 1.1, 200 - t * 0.3, 11, -t * 0.06);
    const s = t - 34;
    if (s < 0) {
      rock(c, seed, 184, 80, 28, 0.2);
      if (t >= 30) { c.strokeStyle = '#17161A'; c.lineWidth = 3; openPath(c, boil([[158, 86], [172, 76], [184, 86], [196, 74], [211, 80]], seed, 1.5)); c.stroke(); }
    } else {
      rock(c, seed, 180 + s * 1.2, 94 + s * 4.5, 17, s * 0.06);                               // off the bottom, back in at the top
      if (s < 22) rock(c, seed, 190 + s * 5.4, 68 + s * 1.18, 17, -s * 0.06);                 // off the right, back in on the left, into him
      else rock(c, seed, 69 - (s - 22) * 2.5, 94 - (s - 22) * 2, 17, 1 + s * 0.06);
    }
    c.restore();
  };
  const burst = (x, y) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.6; c.lineCap = 'round'; c.beginPath();
    for (let k = 0; k < 6; k++) { const a = k * TAU / 6 + 0.3; c.moveTo(x + Math.cos(a) * 7, y + Math.sin(a) * 7); c.lineTo(x + Math.cos(a) * 14, y + Math.sin(a) * 14); }
    c.stroke(); c.restore();
  };
  const seq = [...WAKE];
  const put = (t, o, ticks = 2) => { D[P + t] = xf(D.N, { k: K, shadowK: 0, ...o, extra: { back: field(Math.max(0, t)), ...o.extra } }); seq.push([P + t, ticks]); };
  const fly = (t, x, y, o) => put(t, { ox: 128, oy: 136, dx: x - 128, dy: y - 136, ...o });
  put(-4, { k: 0.75, dy: -16, face: FACE.lookup }, 3);      // an odd hold, so each drawing after it keeps one wobble for its two ticks
  put(-2, { k: 0.55, dy: -30, face: calm });
  for (let t = 0; t < 84; t += 2) {
    const s = t / 30, back = Math.pow(0.6, (t - 34) / 2), n = (t - 56) / 2;
    if (t < 30) fly(t, (1 - s) * (1 - s) * 128 + 2 * s * (1 - s) * 40 + s * s * 134, (1 - s) * (1 - s) * 150 + 2 * s * (1 - s) * 100 + s * s * 82, { rot: t * 0.21, face: t < 6 ? calm : glad });
    else if (t < 34) fly(t, 134, 82, { kx: 0.85, face: wince, extra: { front: burst(158, 82) } });
    else if (t < 56) fly(t, 108 + 26 * back, 96 - 14 * back, { rot: Math.sin((t - 34) / 4) * 0.12, face: glad });
    else if (t < 58) fly(t, 112, 96, { kx: 0.8, face: yikes, extra: { front: burst(86, 94) } });
    else if (t < 80) fly(t, (112 + 23.3 * n + 26) % 240 - 26, 96 + n * n / 121 * 79, { rot: n * 1.1, face: dizzy });   // knocked off the right edge and back in on the left
    else put(t, { ky: 0.5, kx: 1.3, shadowK: 1, face: dizzy });
  }
  D[P + 'up'] = xf(D.N, { k: 0.7, face: FACE.spiral });
  D[P + 'd1'] = xf(D.N, { rot: 0.05, face: FACE.spiral }); D[P + 'd2'] = xf(D.N, { rot: -0.05, face: FACE.spiral });
  seq.push([P + 'up', 2], [P + 'd1', 4], [P + 'd2', 4], [P + 'd1', 4], [P + 'd2', 4], ...DOZE);
  CLIPS.rock_field = { home: 'idle', seq };
})();

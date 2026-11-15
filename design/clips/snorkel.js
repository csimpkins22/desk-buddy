// Water fills the screen from the bottom edge: a snorkel drops onto him, he floats up, drifts, rolls upside down as a fish swims behind him, and is left dripping in a puddle.
(() => {
  const { D, xf, boil, openPath, closedPath, kit } = window.__lump, k = kit.clip('snorkel'), PI = Math.PI;
  // where a point on standing Lump lands once he has turned about his middle and drifted
  const P = (o, [x, y]) => { const r = o.rot || 0, u = x - 128, v = y - 136; return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), 136 + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
  const MASK = [[101, 101], [128, 97], [155, 99], [158, 110], [153, 120], [128, 119], [103, 122], [98, 111]], TUBE = [[128, 129], [108, 134], [93, 120], [88, 92], [90, 56]];
  // mask and tube on him; his eyes are drawn inside the mask, looking (ex, ey) off centre
  const gear = (c, o, seed, [ex, ey] = [0, 0]) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    const tube = boil(TUBE.map(p => P(o, p)), seed + 31, 0.6), a = P(o, [89, 68]), b = P(o, [90, 56]);
    [[kit.CREAM, 9.5], [kit.YELLOW, 5.5]].forEach(([col, w]) => { c.strokeStyle = col; c.lineWidth = w; openPath(c, tube); c.stroke(); });
    c.strokeStyle = kit.RED; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
    closedPath(c, boil(MASK.map(p => P(o, p)), seed + 33, 0.6)); c.fillStyle = '#2C6E9E'; c.fill(); c.strokeStyle = kit.CREAM; c.lineWidth = 2.8; c.stroke();
    c.fillStyle = kit.CREAM; [[116, 110], [140, 108]].forEach(([x, y]) => { const q = P(o, [x + ex, y + ey]); c.beginPath(); c.arc(q[0], q[1], 4, 0, kit.TAU); c.fill(); });
    c.restore();
  };
  const wave = (L, seed) => [-6, 44, 94, 144, 194, 246].map((x, i) => [x, L + ((i + Math.floor(seed)) % 2 ? 4 : -4)]);
  const STREAKS = [[22, 60, 30], [150, 96, 40], [60, 150, 34], [176, 190, 28], [18, 214, 36]];
  const fish = (c, x, y, wag) => {
    c.save(); c.lineJoin = 'round'; c.fillStyle = kit.YELLOW; c.strokeStyle = kit.CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.moveTo(x + 22, y); c.lineTo(x + 46, y - 14 + wag); c.lineTo(x + 46, y + 14 + wag); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(x, y, 27, 14, 0, 0, kit.TAU); c.fill(); c.stroke();
    c.fillStyle = kit.DARK; c.beginPath(); c.arc(x - 14, y - 4, 3.2, 0, kit.TAU); c.fill();
    c.restore();
  };
  const drop = (c, x, y, r = 6) => { c.beginPath(); c.moveTo(x, y - r * 1.9); c.quadraticCurveTo(x + r * 1.2, y, x, y + r); c.quadraticCurveTo(x - r * 1.2, y, x, y - r * 1.9); c.fill(); c.stroke(); };
  // L is how high the water has come (its surface, in pixels from the top). Behind him: the puddle it leaves, the water, a fish.
  // In front: streaks of light and the surface line, which cross him too, then his snorkel, bubbles and drips.
  const scene = (L, { o, eyes, bub, swim, puddle, drops } = {}) => ({
    back: (c, d, seed) => {
      if (puddle) { c.fillStyle = kit.BLUE; c.beginPath(); c.ellipse(126, 204, puddle, 6, 0, 0, kit.TAU); c.fill(); }
      if (L < 252) { openPath(c, wave(L, seed)); c.lineTo(246, 250); c.lineTo(-6, 250); c.closePath(); c.fillStyle = '#123A5E'; c.fill(); }
      if (swim) fish(c, ...swim);
    },
    front: (c, d, seed) => {
      c.save(); c.lineCap = 'round';
      if (L < 252) {
        c.strokeStyle = '#3E78A8'; c.lineWidth = 3; c.beginPath(); STREAKS.forEach(([x, y, w]) => { if (y > L + 16) { c.moveTo(x, y); c.lineTo(x + w, y); } }); c.stroke();
        if (L > -8) { c.strokeStyle = kit.BLUE; c.lineWidth = 3.4; openPath(c, wave(L, seed)); c.stroke(); }
      }
      if (o) gear(c, o, seed, eyes);
      if (bub !== undefined) { const t = P(o, [90, 52]); c.strokeStyle = kit.CREAM; c.lineWidth = 2.4;
        [0, 1, 2].forEach(j => { const y = t[1] - 10 - (bub * 7 + j * 17) % 50; if (y > L + 8) { c.beginPath(); c.arc(t[0] + 5 * Math.sin(bub + j * 2), y, 4.5 + j % 2 * 2.5, 0, kit.TAU); c.stroke(); } }); }
      if (drops) { c.fillStyle = kit.BLUE; c.strokeStyle = kit.CREAM; c.lineWidth = 1.8; drops.forEach(p => drop(c, ...p)); }
      c.restore();
    },
  });
  const add = (name, ticks, o, face, extra) => k.add(name, ticks, xf(D.N, { ox: 128, oy: 136, ...o, face, extra }));

  // it creeps up from the bottom edge
  kit.steps(238, 150, 6).forEach((L, i) => add('see' + i, 2, {}, i < 3 ? kit.look(0, 6, 'o') : kit.faces.worried, scene(L)));
  // a snorkel from above
  [[-150, 142], [-70, 134], [-20, 126]].forEach(([dy, L], i) => add('gear' + i, 2, {}, kit.look(-2, -6, 'o'), scene(L, { o: { dy } })));
  add('on', 4, {}, [], scene(120, { o: {} }));
  // over his head, and he comes off the floor
  const UP = kit.steps(0, -34, 6);
  kit.steps(108, -14, 6).forEach((L, i) => add('fill' + i, 2, { dy: UP[i], shadowK: 1 - i * 0.1 }, [], scene(L, { o: { dy: UP[i] }, bub: i })));
  // drifting
  const drift = i => ({ dx: 34 * Math.sin(i * 0.35), dy: -34 - 14 * Math.sin(i * 0.5), rot: 0.14 * Math.sin(i * 0.35) });
  for (let i = 1; i < 22; i++) add('drift' + i, 2, { ...drift(i), shadowK: 0.5 }, [], scene(-14, { o: drift(i), bub: i }));
  // over he goes, and a fish swims by behind him
  const end = drift(21), R = kit.steps(end.rot, PI, 6), RX = kit.steps(end.dx, 0, 6), RY = kit.steps(end.dy, -30, 6);
  R.slice(1).forEach((rot, i) => { const o = { rot, dx: RX[i + 1], dy: RY[i + 1] }; add('roll' + i, 2, { ...o, shadowK: 0.5 }, [], scene(-14, { o, bub: i })); });
  for (let i = 0; i < 13; i++) {
    const o = { rot: PI, dy: -30 + 4 * Math.sin(i * 0.8) }, x = 276 - i * 26;
    add('fish' + i, 2, { ...o, shadowK: 0.5 }, [], scene(-14, { o, bub: i, eyes: [x > 128 ? -4 : 4, -1], swim: [x, 165 + 4 * Math.sin(i), i % 2 ? 3 : -3] }));
  }
  kit.steps(PI, PI * 2, 6).slice(1).forEach((rot, i) => { const o = { rot, dy: -30 - i }; add('right' + i, 2, { ...o, shadowK: 0.5 }, [], scene(-14, { o, bub: i })); });
  // it drains away and sets him down
  const DOWN = kit.steps(-34, 0, 5);
  kit.steps(-14, 256, 8).forEach((L, i) => { const dy = DOWN[Math.min(i, 4)]; add('drain' + i, 2, { dy, shadowK: 0.5 + Math.min(i, 4) * 0.125 }, [], scene(L, { o: { dy }, puddle: 58 })); });
  add('land', 2, { ky: 0.92, kx: 1.04, oy: 201 }, [], scene(256, { o: { dy: 5 }, puddle: 58, drops: [[84, 150], [174, 136]] }));
  // off comes the snorkel; he is left dripping in a puddle, and dozes off in it
  [[-24, 0], [-90, 1], [-175, 2]].forEach(([dy, i]) => add('off' + i, 2, {}, kit.look(0, -5, 'smile'), scene(256, { o: { dy }, puddle: 60, drops: [[84, 164 + i * 12], [174, 150 + i * 14]] })));
  add('wet', 6, {}, kit.faces.closed, scene(256, { puddle: 62, drops: [[80, 158], [178, 176], [128, 60]] }));
  k.add('t1', 4, { ...D.T1, ...scene(256, { puddle: 70, drops: [[78, 176], [186, 150]] }) });
  k.add('t2', 4, { ...D.T2, ...scene(256, { puddle: 84, drops: [[66, 180], [196, 170]] }) });
  k.add('s1', 8, { ...D.S1, fxm: 'idle', ...scene(256, { puddle: 92, drops: [[44, 184, 4.5]] }) });
  k.done({ doze: false });
})();

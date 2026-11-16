// Rainbow flight: under the stars he springs up out of sight, comes flying level across the sky with a banded rainbow streaming out behind him, banks round at the far side for a second pass lower down, and drops back in.
// group: memes
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', YELLOW = '#FFD23F', BANDS = ['#FF5A4D', '#FF9F1C', '#FFD23F', '#58D68D', '#5AB8FF'], TAU = Math.PI * 2, P = 'rainbow_flight_';
  const K = 0.66, Y1 = 76, Y2 = 158, XT = 176, R = (Y2 - Y1) / 2, L1 = XT + 50, L2 = L1 + Math.PI * R, STEP = 15;
  // where he is after flying s along his course (in from the left along the top, round a half circle, back along the bottom), bobbing as he goes; a: his heading
  const course = s => {
    const a = s < L1 ? 0 : s < L2 ? (s - L1) / R : Math.PI, bob = 6.5 * Math.sin(s / 24);
    const x = s < L1 ? s - 50 : s < L2 ? XT + R * Math.sin(a) : XT - (s - L2), y = s < L1 ? Y1 : s < L2 ? (Y1 + Y2) / 2 - R * Math.cos(a) : Y2;
    return { x: x - Math.sin(a) * bob, y: y + Math.cos(a) * bob, a };
  };
  // the trail between two places on the course: five plain bands, in blocks that jog up and down and swap every drawing
  const trail = (c, from, to, flip) => {
    const pts = [];
    for (let j = Math.floor(from / STEP); j * STEP < to; j++) {
      const jog = (j + flip) % 2 ? 2.2 : -2.2;
      [Math.max(from, j * STEP), Math.min(to, (j + 1) * STEP)].forEach(s => { const p = course(s); pts.push([p.x, p.y, -Math.sin(p.a), Math.cos(p.a), jog]); });
    }
    c.lineWidth = 6;
    BANDS.forEach((band, i) => {
      const off = (i - 2) * 5.4; c.strokeStyle = band; c.beginPath();
      pts.forEach(([x, y, nx, ny, jog], n) => { const px = x + nx * (off + jog), py = y + ny * (off + jog); n ? c.lineTo(px, py) : c.moveTo(px, py); });
      c.stroke();
    });
  };
  const STARS = [[18, 30, 1.8], [52, 112, 1.4], [86, 22, 1.6], [112, 128, 1.3], [150, 40, 1.8], [196, 18, 1.5], [226, 104, 1.7], [208, 150, 1.3], [30, 168, 1.5], [128, 184, 1.2], [72, 60, 1.2], [174, 96, 1.3]];
  const TWINKLES = [[36, 72, 6], [222, 52, 7], [120, 14, 5], [166, 136, 5], [14, 132, 5]];
  // the night sky; fade: how far it has come out. ribbon: the trail's [from, to, flip].
  const sky = (fade, ribbon) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.strokeStyle = CREAM; c.globalAlpha = 0.35 * fade; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke();
    c.fillStyle = CREAM; c.globalAlpha = 0.75 * fade; c.beginPath();
    STARS.forEach(([x, y, r], i) => { const rr = r * ((i + seed) % 3 ? 1 : 0.6); c.moveTo(x + rr, y); c.arc(x, y, rr, 0, TAU); }); c.fill();
    c.fillStyle = YELLOW; c.globalAlpha = fade; c.beginPath();
    TWINKLES.forEach(([x, y, r], i) => {
      const s = r * ((i + seed) % 3 ? 1 : 0.55);
      [[0, -1], [0.22, -0.22], [1, 0], [0.22, 0.22], [0, 1], [-0.22, 0.22], [-1, 0], [-0.22, -0.22]].forEach(([u, v], n) => n ? c.lineTo(x + u * s, y + v * s) : c.moveTo(x + u * s, y + v * s)); c.closePath();
    });
    c.fill();
    if (ribbon && ribbon[1] > ribbon[0]) { c.globalAlpha = 1; trail(c, ...ribbon); }
    c.restore();
  };
  // him flying, s along the course: stretched out level with a nub out in front, face to us
  const flying = i => {
    const s = i * STEP, { x, y, a } = course(s), hx = Math.cos(a), hy = Math.sin(a), under = hx < 0 ? -1 : 1;
    const o = { ox: 128, oy: 140, k: K, kx: 0.82, ky: 1.06, rot: a + Math.PI / 2 - 0.1 * hx + 6.5 / 24 * Math.cos(s / 24), dx: x - 128, dy: y - 140 }, cs = Math.cos(o.rot), sn = Math.sin(o.rot);
    // a mark at (u, v) from the middle of his face as the screen sees it, put back into the standing drawing's own space
    const at = (u, v) => { const X = hx * 33 + hy * under * 6 + u + hx * 4, Y = hy * 33 - hx * under * 6 + v; return [128 + (X * cs + Y * sn) / o.kx, 140 + (-X * sn + Y * cs) / o.ky]; };
    const face = [['dot', ...at(-13, -4), 5.2], ['dot', ...at(13, -5), 5.2], ['mouth', [[-8, 5], [8, 4], [7, 13], [0, 17], [-7, 13]].map(([u, v]) => at(u, v))]];
    const sx = x + (hx * 6 - hy * under * 31) * K, sy = y + (hy * 6 + hx * under * 31) * K;
    return xf(D.N, { ...o, face, extra: { shadow: [x, 8 + y * 0.1], arm2: [[sx, sy], [sx + (hx * 40 + hy * under * 5) * K, sy + (hy * 40 - hx * under * 5) * K]], back: sky(1, [Math.max(0, s - 290), s - 27, i]) } });
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };
  add('night0', 3, xf(D.N, { extra: { back: sky(0.35) } }));
  add('night1', 2, xf(D.N, { face: FACE.lookup, extra: { back: sky(0.7) } }));
  add('gaze', 6, xf(D.N, { face: FACE.lookup, ky: 1.02, extra: { back: sky(1) } }));
  add('crouch', 4, xf(D.A1, { extra: { back: sky(1) } }));
  add('spring', 2, xf(D.A2, { dy: -40, extra: { back: sky(1) } }));
  add('away', 2, xf(D.A3, { dy: -128, k: 0.85, shadowK: 0.5, extra: { back: sky(1) } }));
  for (let i = 1; i < 40; i++) add('fly' + i, 2, flying(i));
  // the last of the trail slips away to the left as he comes back down
  const END = 39 * STEP, tail = n => [END - 290 + n * 75, END - 9, n + 1];
  add('gone', 2, xf(D.N, { dy: -400, shadowK: 0, extra: { back: sky(1, tail(1)) } }));
  add('drop0', 2, xf(D.A3, { dy: -150, k: 0.74, shadowK: 0.5, extra: { back: sky(1, tail(2)) } }));
  add('drop1', 2, xf(D.A2, { dy: -58, k: 0.9, shadowK: 0.8, extra: { back: sky(1, tail(3)) } }));
  add('land', 2, xf(D.A1, { extra: { back: sky(0.9) } }));
  add('bounce', 2, xf(D.N, { face: FACE.happy, ky: 1.06, kx: 0.96, extra: { back: sky(0.7) } }));
  add('home0', 4, xf(D.N, { face: FACE.happy, extra: { back: sky(0.45) } }));
  add('home1', 2, xf(D.N, { face: FACE.happy, extra: { back: sky(0.2) } }));
  CLIPS.rainbow_flight = { home: 'idle', seq: [...seq, ...DOZE] };
})();

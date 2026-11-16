// Line goes up: a tie drops onto him and he presents a chart, nodding proudly with his eyes shut as its arrow climbs; he goes on nodding when it turns and dives out through the bottom of the board and the floor.
// group: memes
(() => {
  const { D, CLIPS, xf, WAKE, DOZE, boil } = window.__lump;
  const CREAM = '#FFF1DC', RED = '#FF5A4D', GREEN = '#58D68D', BLUE = '#5AB8FF', NAVY = '#3A86C8', BOARD = '#22304A', WOOD = '#8A5A2B', BROWN = '#6B4A1F', WHITE = '#F4F8FF', TAU = Math.PI * 2, P = 'line_goes_up_';
  const idle = [['dot',120,110,3.8], ['dot',144,108,3.8], ['stroke',[[124,123],[131,127],[138,123]],2.8]];
  const upward = [['dot',116,102,3.8], ['dot',140,100,3.8], ['stroke',[[122,120],[128,122],[134,120]],2.6]];
  const chest = [['dot',114,116,3.6], ['dot',138,114,3.6], ['stroke',[[119,127],[126,131],[133,127]],2.6]];
  // eyes shut, brows up, well pleased; dy: his head dipping in a nod
  const proud = dy => [['stroke',[[101,97 + dy],[113,94 + dy]],2.2], ['stroke',[[128,93 + dy],[140,95 + dy]],2.2], ['stroke',[[104,107 + dy],[110,111 + dy],[116,107 + dy]],3], ['stroke',[[128,105 + dy],[134,109 + dy],[140,105 + dy]],3], ['stroke',[[111,119 + dy],[122,127 + dy],[134,118 + dy]],2.8]];
  const pt = (o, [x, y]) => { const k = o.k ?? 1, r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + (u * Math.cos(r) - v * Math.sin(r)) * k + (o.dx || 0), 201 + (u * Math.sin(r) + v * Math.cos(r)) * k + (o.dy || 0)]; };
  const jog = (c, x, y, seed, rot = 0) => { c.translate(x + (seed % 3 - 1) * 0.5, y + (seed % 2) * 0.5); c.rotate(rot + (seed % 3 - 1) * 0.008); };
  const poly = (c, pts) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); };
  const stick = (c, a, b) => {
    poly(c, [a, b]); c.strokeStyle = CREAM; c.lineWidth = 5.4; c.stroke(); c.strokeStyle = WOOD; c.lineWidth = 2.6; c.stroke();
    c.fillStyle = WHITE; c.strokeStyle = CREAM; c.lineWidth = 1.6; c.beginPath(); c.arc(b[0], b[1], 2.6, 0, TAU); c.fill(); c.stroke();
  };
  // a board on an easel with an empty chart on it: axes, ticks and dashed gridlines. jolt: knocked about its feet; rest: the pointer lying on its ledge
  const easel = (c, off, seed, jolt, rest) => {
    c.save(); jog(c, off + 180, 203, seed, jolt); c.translate(-180, -203);
    c.beginPath(); c.moveTo(168, 24); c.lineTo(137, 203); c.moveTo(192, 24); c.lineTo(223, 203); c.strokeStyle = CREAM; c.lineWidth = 7; c.stroke(); c.strokeStyle = BROWN; c.lineWidth = 3; c.stroke();
    c.fillStyle = BOARD; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.roundRect(128, 30, 104, 106, 4); c.fill(); c.stroke();
    c.fillStyle = WOOD; c.lineWidth = 2.6; c.beginPath(); c.roundRect(123, 134, 114, 8, 3); c.fill(); c.stroke();
    if (rest) { stick(c, [133, 130], [174, 130]); c.strokeStyle = CREAM; }
    c.globalAlpha = 0.3; c.lineWidth = 1.6; c.setLineDash([4, 5]); c.beginPath(); [62, 82, 102].forEach(y => { c.moveTo(145, y); c.lineTo(225, y); }); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
    c.lineWidth = 2.4; c.beginPath(); c.moveTo(140, 40); c.lineTo(140, 122); c.lineTo(226, 122);
    [62, 82, 102].forEach(y => { c.moveTo(136, y); c.lineTo(140, y); }); [160, 180, 200, 220].forEach(x => { c.moveTo(x, 122); c.lineTo(x, 126); }); c.stroke();
    c.restore();
  };
  const UP = [[144, 116], [154, 109], [162, 112], [172, 98], [180, 102], [190, 84], [198, 71], [205, 56]], DOWN = [[210, 53], [214, 62], [217, 86], [219, 112], [221, 142], [223, 172], [225, 208], [226, 250]], FALL = [2, 3, 4, 5, 7, 8];
  // the chart's line, n steps on: 0 to 6 climbing, 7 to 12 over the top and down through the board, its ledge and the floor. chips: how far the splinters have flown
  const trace = (c, off, n, seed, chips, jolt) => {
    const up = boil(UP.slice(0, Math.min(n, 6) + 2), seed + 5, 0.8), down = n > 6 && [up[7], ...DOWN.slice(0, FALL[n - 7])], [a, b] = (down || up).slice(-2);
    c.save(); c.translate(off + 180, 203); c.rotate(jolt); c.translate(-180, -203); c.strokeStyle = CREAM;
    if (n > 9) { c.lineWidth = 2; c.beginPath(); [[-9, 5], [-4, 11], [8, 6]].forEach(([u, v]) => { c.moveTo(221 + u * 0.4, 143 + v * 0.4); c.lineTo(221 + u, 143 + v); }); c.stroke(); }
    if (n > 10) { c.lineWidth = 2; poly(c, [[207, 203], [214, 207], [219, 204], [225, 208]]); c.stroke(); poly(c, [[225, 208], [231, 204], [236, 207], [240, 204]]); c.stroke(); }
    if (chips) { c.fillStyle = WOOD; c.lineWidth = 1.6; [[-1, 0.5], [1.2, 0]].forEach(([u, v], i) => { const x = 221 + u * (4 + chips * 7), y = 146 + chips * chips * 3.2 + v * 8; poly(c, [[x - 4, y + 2], [x + 1, y - 4], [x + 4, y + 3]]); c.closePath(); c.fill(); c.stroke(); }); }
    c.lineWidth = 7.6; poly(c, up); c.stroke(); if (down) { poly(c, down); c.stroke(); }
    c.lineWidth = 4; c.strokeStyle = GREEN; poly(c, up); c.stroke(); if (down) { c.strokeStyle = RED; poly(c, down); c.stroke(); }
    c.translate(b[0], b[1]); c.rotate(Math.atan2(b[1] - a[1], b[0] - a[0])); c.fillStyle = down ? RED : GREEN; c.strokeStyle = CREAM; c.lineWidth = 2.4; poly(c, [[10, 0], [-5, -8.5], [-5, 8.5]]); c.closePath(); c.fill(); c.stroke();
    c.restore();
  };
  // a neat tie, its knot at (x, y), k of its full size: collar, knot and a striped blade
  const tie = (c, x, y, rot, k, seed) => {
    const blade = boil([[-4.5, 6], [4.5, 6], [10, 36], [0, 47], [-10, 36]], seed + 12, 0.7);
    c.save(); c.translate(x, y); c.rotate(rot); c.scale(k, k); c.strokeStyle = CREAM; c.lineWidth = 2.2 / k;
    c.fillStyle = WHITE; [-1, 1].forEach(sd => { poly(c, [[sd * 5, -4], [sd * 19, -9], [sd * 12, 5]]); c.closePath(); c.fill(); c.stroke(); });
    c.fillStyle = BLUE; poly(c, blade); c.closePath(); c.fill();
    c.strokeStyle = NAVY; c.lineWidth = 3.2 / k; c.beginPath(); [[12, 5], [22, 6.6], [32, 8.2]].forEach(([v, w]) => { c.moveTo(-w + 1.5, v - 1); c.lineTo(w - 1.5, v + 5); }); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2.2 / k; poly(c, blade); c.closePath(); c.stroke();
    c.fillStyle = NAVY; poly(c, [[-7, -5], [7, -5], [4.5, 7], [-4.5, 7]]); c.closePath(); c.fill(); c.stroke();
    c.restore();
  };
  const HOME = { k: 0.8, dx: -52 };
  // one drawing. off: how far off the easel still is; n: how far the line has got (jolt, chips: as it breaks through); wear: the tie, [how far above his chest, tilt]; fix: his nub at its knot; take: his nub at the pointer on the ledge; point: the pointer in his hand, [how high, its angle]
  const shot = (o, face, { off = 0, fade = 1, n, wear, fix, take, point, jolt = 0, chips } = {}) => {
    const q = { ...HOME, ...o }, s = pt(q, [166, 142]), knot = pt(q, [124, 141]), h = point && [s[0] + 19, s[1] - 8 - point[0]];
    return xf(D.N, { ...q, face, extra: { ...(fix && { arm2: [s, [knot[0] + 9, knot[1] + 2]] }), ...(take && { arm2: [s, [131, 133]] }), ...(h && { arm2: [s, h] }),
      back: (c, d, seed) => {
        c.save(); c.lineCap = c.lineJoin = 'round';
        c.strokeStyle = CREAM; c.globalAlpha = 0.35 * fade; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke(); c.globalAlpha = 1;
        easel(c, off, seed, jolt, !point);
        c.restore();
      },
      front: (c, d, seed) => {
        c.save(); c.lineCap = c.lineJoin = 'round';
        if (wear) tie(c, knot[0], knot[1] - wear[0], wear[1], (q.k ?? 1) * 1.1, seed);
        if (n !== undefined) trace(c, off, n, seed, chips, jolt);
        if (h) stick(c, [h[0] - Math.cos(point[1]) * 3, h[1] - Math.sin(point[1]) * 3], [h[0] + Math.cos(point[1]) * 40, h[1] + Math.sin(point[1]) * 40]);
        c.restore();
      } } });
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };

  // he steps aside as the easel is slid in; undone at the end
  const WALK = [[0.96, -10], [0.92, -22], [0.87, -35], [0.83, -46], [0.8, -52]], OFF = [150, 92, 46, 14, 0];
  WALK.forEach(([k, dx], i) => add('in' + i, i ? 2 : 3, shot({ k, dx, rot: i % 2 ? 0.05 : -0.05 }, idle, { off: OFF[i], fade: (i + 1) / 5 })));
  // the tie comes down, lands with a swing, and he straightens it
  add('tie0', 2, shot({}, upward, { wear: [112, 0.35] }));
  add('tie1', 2, shot({ ky: 1.02 }, upward, { wear: [52, -0.3] }));
  add('tie2', 2, shot({ ky: 0.95, kx: 1.03 }, chest, { wear: [-2, 0.2] }));
  add('tie3', 2, shot({}, chest, { wear: [0, -0.1] }));
  add('neat', 6, shot({ rot: -0.02 }, chest, { wear: [0, 0], fix: true }));
  add('take', 2, shot({ rot: 0.07 }, idle, { wear: [0, 0.04], take: true }));
  add('ahem', 4, shot({ ky: 1.03 }, proud(-2), { wear: [0, 0], point: [0, -0.5], n: 0 }));
  // nodding, eyes shut, whatever the line does
  const nod = (down, n, hand, hit) => shot(down ? { ky: 0.96, kx: 1.02, rot: 0.02 } : { ky: 1.02 }, proud(down ? 4 : -2), { wear: [0, down ? 0.03 : -0.02], point: [hand + (down ? -3 : 0), -0.62 - hand * 0.02], n, ...hit });
  for (let n = 1; n < 7; n++) add('up' + n, 4, nod(n % 2, n, n * 2));
  add('top', 4, nod(1, 6, 13));
  for (let n = 7; n < 13; n++) add('down' + n, 2, nod(n % 4 < 2 ? 0 : 1, n, 13, n > 9 && { chips: n - 9, jolt: [0.02, -0.014, 0.007][n - 10] }));
  for (let i = 0; i < 4; i++) add('still' + i, 4, nod(i % 2, 12, 13));
  add('put', 2, shot({ rot: 0.07 }, proud(1), { wear: [0, 0.04], take: true, n: 12 }));
  const LIFT = [[6, 0.12], [44, -0.3], [104, 0.3], [190, -0.2]];                    // the tie goes back up the way it came
  [4, 3, 2, 1, 0].forEach((i, m) => add('out' + m, 2, shot({ k: WALK[i][0], dx: WALK[i][1], rot: i % 2 ? 0.05 : -0.05 }, m < 2 ? proud(0) : idle, { off: OFF[i], fade: (i + 1) / 5, n: 12, wear: LIFT[m] })));
  CLIPS.line_goes_up = { home: 'idle', seq: [...seq, ...DOZE] };
})();

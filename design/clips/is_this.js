// Is this...? A butterfly flutters into his meadow. He holds a nub out towards it with a hopeful "?", and it comes over and settles on his cowlick.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', BLUE = '#5AB8FF', DEEP = '#2A6FB0', YELLOW = '#FFD23F', GOLD = '#D9A21B', BROWN = '#6B4A1F', GREEN = '#58D68D', RED = '#FF5A4D', TAU = Math.PI * 2, P = 'is_this_';
  const DX = -20, HOVER = [205, 62], FLAP = [1, 0.5, 0.12];
  const track = [['dot',123,105,3.8], ['dot',147,103,3.8], ['stroke',[[125,122],[130,124],[135,122]],2.6]];
  const spot = [['dot',122,104,4.8], ['dot',148,102,4.8], ['mouth',[[126,119],[134,118],[135,126],[130,129],[125,126]]]];
  const brows = [['stroke',[[106,98],[118,94]],2.4], ['stroke',[[138,92],[150,95]],2.4]];
  const hopeful = [...brows, ['oval',116,108,5.2,5.8], ['oval',140,106,5.2,5.8], ['shine',118,105,1.8], ['shine',142,103,1.8], ['mouth',[[121,119],[135,118],[133,126],[128,129],[123,126]],[128,126,4,2]]];
  const glance = [...brows, ['oval',121,107,5.2,5.8], ['oval',145,105,5.2,5.8], ['shine',124,104,1.8], ['shine',148,102,1.8], ['stroke',[[124,122],[130,125],[136,122]],2.6]];
  const upR = [['dot',122,103,4], ['dot',145,101,4], ['dot',131,121,2.6]];
  const up = [['dot',119,102,4], ['dot',139,100,4], ['dot',128,121,2.6]];
  const aww = [['blush',100,119,8,4.5], ['blush',156,117,8,4.5], ['dot',119,102,4], ['dot',139,100,4], ['mouth',[[120,116],[136,115],[134,124],[128,127],[122,124]],[128,124,4,2]]];
  const after = [['dot',112,103,3.8], ['dot',136,101,3.8], ['stroke',[[116,120],[124,125],[132,120]],2.8]];
  const pt = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), 201 + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
  const UPPER = [[1, -6], [8, -17], [20, -24], [30, -20], [31, -9], [22, -1], [8, 1]], LOWER = [[1, 0], [10, 2], [21, 5], [25, 14], [19, 22], [9, 20], [3, 10]];
  const inset = (pts, k) => { const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cy = pts.reduce((a, p) => a + p[1], 0) / pts.length; return pts.map(([x, y]) => [cx + (x - cx) * k, cy + (y - cy) * k]); };
  // seen from above, its middle at (x, y) and its head pointing along a. open: 1 with its wings spread flat, 0 with them folded together
  const butterfly = (c, x, y, a, open, seed) => {
    const w = 0.14 + 0.86 * open;
    c.save(); c.translate(x, y); c.rotate(a); c.scale(0.95, 0.95); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM;
    [-1, 1].forEach(side => [[LOWER, YELLOW, GOLD], [UPPER, BLUE, DEEP]].forEach(([pts, fill, edge], n) => {
      const wing = boil(pts, seed + n * 3, 0.8).map(([px, py]) => [side * px * w, py - (1 - open) * px * 0.2]);
      closedPath(c, wing); c.fillStyle = edge; c.fill(); c.lineWidth = 2.7; c.stroke();
      closedPath(c, inset(wing, 0.6)); c.fillStyle = fill; c.fill();
      if (n) { c.fillStyle = CREAM; c.beginPath(); c.ellipse(side * 23 * w, -15 - (1 - open) * 4.6, 3 * w, 3, 0, 0, TAU); c.fill(); }
    }));
    c.fillStyle = BROWN; c.lineWidth = 2.2; c.beginPath(); c.ellipse(0, 1, 3.4, 12, 0, 0, TAU); c.fill(); c.stroke();
    c.beginPath(); c.arc(0, -13, 3.8, 0, TAU); c.fill(); c.stroke();
    c.lineWidth = 2; c.beginPath(); [-1, 1].forEach(s => { c.moveTo(s * 1.5, -16.5); c.quadraticCurveTo(s * 3, -25, s * 8.5, -27); }); c.stroke();
    c.fillStyle = CREAM; [-1, 1].forEach(s => { c.beginPath(); c.arc(s * 9, -27.5, 1.9, 0, TAU); c.fill(); });
    c.restore();
  };
  const mark = (c, x, y, s, seed) => {
    c.strokeStyle = c.fillStyle = CREAM; c.lineWidth = 4.2;
    openPath(c, boil([[-7, -11], [-4, -18], [4, -20], [9, -14], [6, -7], [1, -2], [0.5, 4]].map(([px, py]) => [x + px * s, y + py * s]), seed + 11, 1.2)); c.stroke();
    c.beginPath(); c.arc(x + 0.5 * s, y + 12 * s, 2.8, 0, TAU); c.fill();
  };
  // the meadow behind him, `a` of the way faded in
  const meadow = (c, a, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.strokeStyle = CREAM; c.globalAlpha = 0.35 * a; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke();
    c.globalAlpha = 0.85 * a; c.strokeStyle = GREEN; c.lineWidth = 2.4; c.beginPath();
    [10, 190, 232].forEach(x => [-6, 0, 6].forEach(s => { c.moveTo(x + s * 0.6, 204); c.quadraticCurveTo(x + s * 0.8, 196, x + s * 1.5, s ? 192 : 187); }));
    c.stroke();
    [[30, 34, RED, YELLOW], [212, 25, YELLOW, BROWN]].forEach(([x, h, petal, eye], i) => {
      const [tx, ty] = boil([[x, 204 - h]], seed + i, 1.6)[0];
      c.strokeStyle = GREEN; c.lineWidth = 2.6; openPath(c, [[x, 204], [x + 2, 204 - h * 0.5], [tx, ty]]); c.stroke();
      c.fillStyle = GREEN; c.beginPath(); c.ellipse(x + 7, 204 - h * 0.42, 6, 2.6, -0.5, 0, TAU); c.fill();
      c.fillStyle = petal; c.strokeStyle = CREAM; c.lineWidth = 1.6;
      for (let k = 0; k < 5; k++) { const t = k / 5 * TAU - 1.57; c.beginPath(); c.arc(tx + Math.cos(t) * 5.5, ty + Math.sin(t) * 5.5, 4.2, 0, TAU); c.fill(); c.stroke(); }
      c.fillStyle = eye; c.beginPath(); c.arc(tx, ty, 3.4, 0, TAU); c.fill();
    });
    c.restore();
  };
  let now = 29, perched;
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); now += ticks; }, show = (name, ticks) => { seq.push([P + name, ticks]); now += ticks; };
  // fly: the butterfly as [x, y, heading, open], or 'hover' beside him, or 'perch' on his cowlick. hand: where his nub reaches.
  // ask: the "?" as [size, how solid]. sit: how far the butterfly's weight bends his cowlick. land: how far the meadow has faded in.
  const shot = (o, face, { fly, hand, ask, sit = 0, land = 1 } = {}) => {
    const q = { dx: DX, ...o };
    return xf(D.N, { ...q, face, extra: { ...(hand && { arm2: [pt(q, [164, 134]), hand] }),
      curl: [[128, 71], [122 - sit * 0.3, 60 + sit * 0.5], [126, 52 + sit], [134, 55 + sit], [131, 61 + sit * 0.6]].map(p => pt(q, p)),
      back: (c, d, seed) => meadow(c, land, seed),
      front: (c, d, seed, tick) => {
        const step = Math.floor(tick / 2), sway = Math.sin(step * TAU / 6);
        c.save(); c.lineCap = c.lineJoin = 'round';
        if (ask && ask[1]) { c.globalAlpha = ask[1]; mark(c, 128 + q.dx - 36, 40, ask[0] * 1.3, seed); c.globalAlpha = 1; }
        if (fly === 'hover') butterfly(c, HOVER[0] + sway * 5, HOVER[1] + [0, -4, -1][step % 3], -0.2 + sway * 0.1, FLAP[step % 3], seed);
        else if (fly === 'perch') butterfly(c, d.curl[2][0] + 1, d.curl[2][1] - 12, -0.12, [1, 0.8, 0.45, 0.15, 0.45, 0.8][Math.floor((tick - perched) / 2) % 6], seed);
        else if (fly) butterfly(c, ...fly, seed);
        c.restore();
      } } });
  };
  [[252, 34], [238, 46], [226, 34], [215, 50], [206, 42], [200, 58]].forEach(([x, y], i) => add('in' + i, i ? 2 : 3,
    shot({ dx: [0, -6, -12, -17, DX, DX][i], rot: [0, -0.04, 0.03, -0.03, 0, 0][i] }, i ? track : FACE.lookr, { fly: [x, y, -0.9 + (i % 2) * 0.4, FLAP[i % 3]], land: Math.min(1, 0.3 + i * 0.25) })));
  add('see', 6, shot({ ky: 1.03 }, spot, { fly: 'hover' }));
  add('dip', 2, shot({ ky: 0.93, kx: 1.04 }, track, { fly: 'hover', hand: [166, 150] }));
  add('reach', 2, shot({ ky: 1.02 }, track, { fly: 'hover', hand: [170, 120] }));
  add('q0', 2, shot({ ky: 1.04, kx: 0.98, rot: -0.03 }, hopeful, { fly: 'hover', hand: [175, 100], ask: [0.5, 1] }));
  add('q1', 2, shot({ rot: -0.03 }, hopeful, { fly: 'hover', hand: [172, 104], ask: [1.25, 1] }));
  add('ask', 12, shot({ rot: -0.03 }, hopeful, { fly: 'hover', hand: [172, 104], ask: [1, 1] }));
  add('glance', 6, shot({ rot: -0.02 }, glance, { fly: 'hover', hand: [173, 102], ask: [1, 1] }));
  show('ask', 6);
  [[192, 46], [174, 52], [156, 36], [138, 42], [122, 30], [111, 34]].forEach(([x, y], i) => add('come' + i, 2,
    shot({ rot: -0.03 + i * 0.006 }, i < 2 ? glance : i < 4 ? upR : up, { fly: [x, y, -0.9 + (i % 2) * 0.4, FLAP[i % 3]], hand: [[172, 104], [172, 110], [170, 124], [166, 146]][i], ask: [1, Math.max(0, 1 - i * 0.25)] })));
  perched = now;
  add('land', 2, shot({ ky: 0.96, kx: 1.02 }, up, { fly: 'perch', sit: 6 }));
  add('hush', 6, shot({}, up, { fly: 'perch', sit: 2 }));
  add('aww', 16, shot({}, aww, { fly: 'perch', sit: 2 }));
  [[100, 28], [88, 8], [76, -18]].forEach(([x, y], i) => add('off' + i, 2, shot({ dx: [-14, -7, 0][i] }, after, { fly: [x + 14 - i * 7, y, -0.5, FLAP[i % 3]], sit: i ? 0 : -2, land: [0.7, 0.4, 0.15][i] })));
  add('bye', 2, xf(D.N, { face: FACE.happy }));
  CLIPS.is_this = { home: 'idle', seq: [...seq, ...DOZE] };
})();

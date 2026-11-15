// He wakes as a rough pencil sketch. A pen inks his line and a brush colours him in, missing a spot; he points at it until the brush comes back.
(() => {
  const L = window.__lump, { D, xf, FACE, boil, openPath, closedPath, tint, kit } = L;
  const k = kit.clip('unfinished', { bare: true }), PENCIL = kit.GREY, V = kit.view(1.25, [126, 136], [120, 122]);

  // a face in pencil: outlines only
  const marks = (c, face, colour) => {
    c.strokeStyle = colour; c.lineWidth = 2.2; c.lineJoin = c.lineCap = 'round';
    face.forEach(m => {
      if (m[0] === 'dot') { c.beginPath(); c.arc(m[1], m[2], m[3], 0, kit.TAU); c.stroke(); }
      else if (m[0] === 'oval') { c.beginPath(); c.ellipse(m[1], m[2], m[3], m[4], 0, 0, kit.TAU); c.stroke(); }
      else if (m[0] === 'stroke') { openPath(c, m[1]); c.stroke(); }
      else if (m[0] === 'mouth') { closedPath(c, m[1]); c.stroke(); }
    });
  };
  // him roughed out: an egg, a centre line and an eye line, and his outline gone over twice
  const rough = (c, d, seed, a = 1) => {
    if (a <= 0) return;
    const xs = d.body.map(p => p[0]), ys = d.body.map(p => p[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys), cx = (x0 + x1) / 2, eye = y0 + (y1 - y0) * 0.3;
    c.save(); c.globalAlpha = a; c.lineCap = c.lineJoin = 'round'; c.strokeStyle = PENCIL; c.lineWidth = 1.8;
    c.beginPath(); c.ellipse(cx, (y0 + y1) / 2, (x1 - x0) / 2 + 7, (y1 - y0) / 2 + 7, 0, 0, kit.TAU); c.stroke();
    openPath(c, boil([[cx, y0 - 16], [cx, y1 + 6]], seed + 31, 2)); c.stroke();
    openPath(c, boil([[x0 - 12, eye], [x1 + 12, eye]], seed + 32, 2)); c.stroke();
    c.lineWidth = 2.4; closedPath(c, boil(d.body, seed + 3, 3)); c.stroke(); closedPath(c, boil(d.body, seed + 13, 4)); c.stroke();
    openPath(c, boil(d.curl, seed + 23, 1.5)); c.stroke();
    c.restore();
  };
  // him as usually drawn, at an opacity
  const ghost = (c, d, seed, a) => {
    c.save(); c.globalAlpha = a; c.lineCap = c.lineJoin = 'round';
    c.save(); c.translate(4, 2.5); closedPath(c, boil(d.body, seed + 50, 2.2)); c.fillStyle = tint(); c.fill(); c.restore();
    c.strokeStyle = kit.CREAM; closedPath(c, boil(d.body, seed, 2.2)); L.inkStroke(c, 4); openPath(c, boil(d.curl, seed + 20, 1.2)); L.inkStroke(c, 3.4);
    c.restore();
  };
  const pen = (c, x, y, a) => {
    c.save(); c.translate(x, y); c.rotate(a); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.4;
    c.fillStyle = kit.BLUE; c.beginPath(); c.roundRect(11, -6, 62, 12, 5); c.fill(); c.stroke();
    c.fillStyle = kit.WHITE; c.beginPath(); c.moveTo(0, 0); c.lineTo(12, -5); c.lineTo(12, 5); c.closePath(); c.fill(); c.stroke();
    c.restore();
  };
  const brush = (c, x, y, a) => {
    c.save(); c.translate(x, y); c.rotate(a); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.4;
    c.fillStyle = kit.BROWN; c.beginPath(); c.roundRect(30, -5, 58, 10, 4); c.fill(); c.stroke();
    c.fillStyle = kit.GREY; c.beginPath(); c.rect(18, -8, 12, 16); c.fill(); c.stroke();
    c.fillStyle = tint(); closedPath(c, [[-2, 0], [4, -8], [18, -9], [18, 9], [4, 8]], [2, 3]); c.fill(); c.stroke();
    c.restore();
  };
  // his line in ink as far as the mth point, starting at the top of his head and going down his left side; returns where the pen is
  const inked = (c, d, seed, m) => {
    const B = boil(d.body, seed, 2.2), P = [...B.slice(9), ...B.slice(0, 10)];
    c.lineCap = c.lineJoin = 'round'; c.strokeStyle = kit.CREAM; openPath(c, P.slice(0, m)); L.inkStroke(c, 4);
    return P[m - 1];
  };
  // colour down to y, inside his body
  const wash = (c, d, seed, y) => {
    c.save(); c.translate(4, 2.5); closedPath(c, boil(d.body, seed + 50, 2.2)); c.clip(); c.fillStyle = tint();
    closedPath(c, [[40, 30], [220, 30], [220, y], [190, y + 5], [160, y - 3], [130, y + 5], [100, y - 3], [70, y + 4], [40, y]], [0, 1, 2, 8]); c.fill();
    c.restore();
  };
  // the place the brush missed, s from 1 down to nothing
  const spot = (c, seed, s = 1) => {
    if (s <= 0) return;
    c.fillStyle = '#000'; closedPath(c, boil([[-13, -2], [-6, -10], [6, -9], [13, -1], [8, 8], [-5, 9]].map(([u, v]) => [148 + u * s, 177 + v * s]), seed + 41, 1.5)); c.fill();
    c.strokeStyle = PENCIL; c.lineWidth = 2; c.lineCap = 'round'; openPath(c, [[148 - 8 * s, 180], [148 + 8 * s, 174]]); c.stroke();
  };

  // a sketch of him, a sketch with his line inked, and him coloured in
  const sk = (base, face, front, view = V) => xf(base, { face: [], shadowK: 0, extra: { fill: 'none', line: 'none', skf: face || base.face, view, front, back: (c, d, s) => { rough(c, d, s); marks(c, d.skf, PENCIL); } } });
  const lined = (face, front) => xf(D.N, { face: [], shadowK: 0, extra: { fill: 'none', skf: face, view: V, front, back: (c, d, s) => { rough(c, d, s); marks(c, d.skf, PENCIL); } } });
  const col = (face, more, sp = 1, view = V, extra = {}) => xf(D.N, { face, extra: { view, front: (c, d, s) => { spot(c, s, sp); if (more) more(c, s); }, ...extra } });

  k.add('asleep', 3, xf(D.S1, {}));
  [1 / 3, 2 / 3].forEach((t, i) => k.add('drain' + i, 4, xf(D.S1, { face: [], shadowK: 1 - t, extra: { fill: 'none', line: 'none', view: kit.cam(t, kit.HOME, V),
    back: (c, d, s) => { ghost(c, d, s, 1 - t); rough(c, d, s, t); c.save(); c.globalAlpha = t; marks(c, D.S1.face, PENCIL); c.restore(); } } })));
  k.add('sk_s', 8, sk(D.S1));
  k.add('sk_y1', 6, sk(D.Y1)); k.add('sk_y2', 8, sk(D.Y2)); k.add('sk_y3', 6, sk(D.Y3));
  k.add('sk_n', 6, sk(D.N, kit.look(0, 0, 'flat')));
  k.add('sk_down', 12, sk(D.N, kit.look(0, 7, 'o')));

  [[92, 8], [112, 42]].forEach(([x, y], i) => k.add('pen' + i, 2, sk(D.N, kit.look(-3, -6, 'o'), c => pen(c, x, y, -2.2))));
  const EYES = [[-3, -5], [-6, 0], [-6, 5], [-3, 7], [3, 7], [6, 4], [6, -1], [2, -5]];
  [3, 5, 7, 9, 11, 13, 15, 17].forEach((m, i) => k.add('ink' + i, 4, sk(D.N, kit.look(EYES[i][0], EYES[i][1], 'flat'), (c, d, s) => { const p = inked(c, d, s, m); pen(c, p[0], p[1], p[0] < 128 ? -2.2 : -0.9); })));
  k.add('curl0', 2, sk(D.N, kit.look(2, -6, 'flat'), (c, d, s) => { inked(c, d, s, 17); pen(c, 128, 71, -0.9); }));
  k.add('curl1', 2, lined(kit.look(3, -6, 'smile'), c => pen(c, 138, 52, -0.9)));
  k.add('curl2', 2, lined(kit.look(4, -6, 'smile'), c => pen(c, 164, 12, -0.9)));
  k.add('lined', 10, lined(kit.look(0, 6, 'smile')));

  [[196, 22], [176, 46]].forEach(([x, y], i) => k.add('brush' + i, 2, lined(kit.look(5, -6, 'o'), c => brush(c, x, y, -0.85))));
  kit.steps(66, 206, 9).map(Math.round).forEach((y, i) => {
    const x = i % 2 ? 100 : 160, on = y >= 136, f = kit.faces.closed;
    k.add('wash' + i, 4, xf(D.N, { face: on ? f : [], shadowK: i / 8, extra: { fill: 'none', view: V,
      back: (c, d, s) => { rough(c, d, s, 1 - i / 8); wash(c, d, s, y); if (!on) marks(c, f, PENCIL); },
      front: (c, d, s) => { if (y > 166) spot(c, s); brush(c, x, Math.min(y, 196), x < 128 ? -2.3 : -0.85); } } }));
  });
  [[186, 160], [222, 104], [262, 50]].forEach(([x, y], i) => k.add('away' + i, 2, col(i ? FACE.happy : kit.faces.closed, c => brush(c, x, y, -0.85))));
  k.add('ta', 8, col(FACE.happy));
  k.add('eh', 10, col(kit.look(5, 8, 'flat')));
  [[170, 152], [167, 166], [171, 159], [167, 166], [171, 159]].forEach((hand, i) => k.add('point' + i, 4, col(kit.look(4, -6, 'flat'), null, 1, V, { arm2: [[166, 140], hand] })));
  [[240, 162], [194, 172]].forEach(([x, y], i) => k.add('back' + i, 2, col(kit.look(6, 4, 'smile'), c => brush(c, x, y, -0.25), 1, V, i ? {} : { arm2: [[166, 140], [170, 152]] })));
  [0.7, 0.35, 0].forEach((sp, i) => k.add('dab' + i, 2, col(kit.faces.closed, c => brush(c, 150 + (i % 2) * 6, 178, -0.25), sp)));
  [[198, 170], [250, 158]].forEach(([x, y], i) => k.add('off' + i, 2, col(FACE.happy, c => brush(c, x, y, -0.25), 0)));
  [1 / 3, 2 / 3, 1].forEach((t, i) => k.add('home' + i, 2, col(FACE.happy, null, 0, kit.cam(t, V, kit.HOME))));
  k.add('n', 4, xf(D.N, {})); k.add('t1', 8, xf(D.T1, {})); k.add('t2', 6, xf(D.T2, {})); k.add('s1', 4, xf(D.S1, {}));
  k.done();
})();

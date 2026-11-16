// A quiet one, seen from far off: he sails a paper boat across wide water past a low sun and out of view, then walks back in, wet.
// group: scenes
(() => {
  const { D, xf, boil, kit } = window.__lump, k = kit.clip('paper_boat');
  const screen = (c, fn) => { c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.lineCap = c.lineJoin = 'round'; fn(); c.restore(); };
  // the water and its sun in screen pixels; up 0 to 1 brings them up from the bottom edge
  const sea = (c, seed, up) => screen(c, () => {
    const y = 240 - 90 * up, s = Math.floor(seed) % 3;
    c.fillStyle = kit.YELLOW; c.beginPath(); c.arc(178, y + (1 - up) * 34, 26, 0, kit.TAU); c.fill();
    c.fillStyle = '#1B4A72'; c.fillRect(0, y, 240, 240 - y);
    c.strokeStyle = kit.YELLOW; c.lineWidth = 3; c.beginPath();
    [[12, 14], [24, 9], [36, 5]].forEach(([dy, w], i) => { const x = 178 + (i + s) % 3 * 2 - 2; c.moveTo(x - w, y + dy); c.lineTo(x + w, y + dy); }); c.stroke();
    c.strokeStyle = kit.BLUE; c.lineWidth = 2.6; c.beginPath();
    [[30, 22], [96, 44], [210, 30], [58, 66], [140, 58]].forEach(([x, dy], i) => { c.moveTo(x + s * 3, y + dy); c.lineTo(x + 18 + s * 3, y + dy); });
    c.moveTo(0, y); c.lineTo(240, y); c.stroke();
  });
  // the hull round his feet, in his own coordinates so it rides with him, and its wake behind
  const boat = (c, seed, rot) => {
    c.save(); c.translate(128, 201); c.rotate(rot); c.translate(-128, -201); c.lineJoin = c.lineCap = 'round';
    c.strokeStyle = kit.CREAM; c.lineWidth = 4; c.beginPath(); c.moveTo(18, 214); c.lineTo(-22, 214); c.moveTo(6, 200); c.lineTo(-30, 200); c.stroke();
    c.beginPath(); boil([[30, 160], [86, 180], [170, 180], [226, 160], [186, 214], [70, 214]], seed + 5, 1.6).forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath();
    c.fillStyle = kit.WHITE; c.fill(); c.lineWidth = 6; c.stroke();
    c.strokeStyle = kit.GREY; c.lineWidth = 5; c.beginPath(); c.moveTo(128, 182); c.lineTo(128, 212); c.moveTo(86, 180); c.lineTo(100, 212); c.moveTo(170, 180); c.lineTo(156, 212); c.stroke();
    c.restore();
  };
  const wide = (x, y) => kit.view(0.5, [128, 201], [x, y]);
  const drop = (c, x, y, r = 6) => { c.beginPath(); c.moveTo(x, y - r * 1.9); c.quadraticCurveTo(x + r * 1.2, y, x, y + r); c.quadraticCurveTo(x - r * 1.2, y, x, y - r * 1.9); c.fill(); c.stroke(); };
  const drips = pts => ({ front: c => { c.save(); c.fillStyle = kit.BLUE; c.strokeStyle = kit.CREAM; c.lineWidth = 2; pts.forEach(p => drop(c, ...p)); c.restore(); } });
  // his cowlick plastered down, on standing Lump
  const DAMP = [[128, 71], [135, 65], [143, 67], [147, 76]], damp = o => DAMP.map(p => kit.pt(o, p));

  kit.walk(0, -190, 5, { face: kit.look(-4, 0, 'smile') }).forEach((o, i) => k.add('off' + i, 2, xf(D.N, o)));
  kit.steps(0, 1, 5).slice(1).forEach((up, i) => k.add('rise' + i, 2, kit.gone({ view: wide(120, 150), back: (c, d, seed) => sea(c, seed, up) })));
  const N = 46;
  for (let i = 0; i < N; i++) {
    const x = -58 + i * 356 / (N - 1), y = 152 + 2 * Math.sin(i * 0.7), rot = 0.045 * Math.sin(i * 0.7 + 1);
    k.add('sail' + i, 2, xf(D.N, { rot, shadowK: 0, face: i > 17 && i < 30 ? kit.look(5, -1, 'smile', 5) : kit.faces.closed,
      extra: { view: wide(x, y), back: (c, d, seed) => sea(c, seed, 1), front: (c, d, seed) => boat(c, seed, rot) } }));
  }
  k.add('empty', 16, kit.gone({ view: wide(120, 150), back: (c, d, seed) => sea(c, seed, 1) }));
  [0.9, 0.5, 0.1, -0.06].forEach((up, i) => k.add('drain' + i, 2, kit.gone({ view: wide(120, 150), back: (c, d, seed) => sea(c, seed, up) })));
  // back on foot, dripping
  kit.walk(-190, 0, 6, { face: kit.look(3, 0, 'flat') }).forEach((o, i) => k.add('back' + i, 2, xf(D.N, { ...o, extra: { curl: damp(o),
    ...drips([[128 + o.dx - 46, 150 + i * 23 % 46], [128 + o.dx + 48, 132 + (i * 31 + 20) % 62], [128 + o.dx + 8, 60 - (i % 2) * 6], [128 + o.dx - 66, 168 + i * 17 % 30]]) } })));
  k.add('drip0', 4, xf(D.N, { face: kit.look(0, 0, 'flat'), extra: { curl: damp({}), ...drips([[80, 176], [176, 160], [136, 58]]) } }));
  k.add('drip1', 4, xf(D.N, { face: kit.faces.closed, extra: { curl: damp({}), ...drips([[80, 194, 4.5], [176, 188], [58, 196, 4.5]]) } }));
  k.add('shake', 2, xf(D.N, { kx: 1.06, ky: 0.97, face: kit.faces.closed, extra: { front: c => { kit.sweat(c, 196, 110, 0, 1); kit.sweat(c, 60, 110, 1, -1); } } }));
  k.add('dry', 2, xf(D.N, { face: kit.faces.closed }));
  k.done();
})();

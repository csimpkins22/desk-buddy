// He is the washing: pegged to a line, dripping. A breeze pings one peg off, then the other; he drops out of view and climbs back up.
// group: scenes
(() => {
  const { D, xf, FACE, openPath, kit } = window.__lump;
  const { CREAM, BLUE, GREY, TAU } = kit, k = kit.clip('laundry');
  const WOOD = '#D9A75B', LIFT = 36, CLOSE = 1.3, A = [104, 78], B = [152, 78];
  // where a point on standing Lump lands after xf(D.N, o), whatever o turns him about
  const tp = (o, [x, y]) => {
    const ox = o.ox ?? 128, oy = o.oy ?? 201, r = o.rot || 0, u = (x - ox) * (o.kx ?? 1), v = (y - oy) * (o.ky ?? 1);
    return [ox + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), oy + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)];
  };
  const cam = e => kit.view(1 + (CLOSE - 1) * e, [128, 95], [128 - 8 * e, 95 + 17 * e]);
  const peg = (c, [x, y], rot) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.4;
    c.fillStyle = WOOD; c.beginPath(); c.roundRect(-5.5, -18, 11, 30, 3); c.fill(); c.stroke();
    c.fillStyle = GREY; c.beginPath(); c.arc(0, -4, 3, 0, TAU); c.fill(); c.restore();
  };
  // the line, from edge to edge through whatever is pulling it down
  const rope = (c, mid, y = 22) => { c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3; openPath(c, [[-40, y], ...mid, [300, y]]); c.stroke(); c.restore(); };
  const drips = (c, o, n) => {
    c.save(); c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 1.6;
    [[106, 0], [148, 17]].forEach(([bx, phase]) => {
      const [x, y0] = tp(o, [bx, 199]), y = y0 + 6 + (n * 9 + phase) % 26, r = 6.5;
      c.beginPath(); c.moveTo(x, y - r * 1.9); c.quadraticCurveTo(x + r * 1.2, y, x, y + r); c.quadraticCurveTo(x - r * 1.2, y, x, y - r * 1.9); c.fill(); c.stroke();
    });
    c.restore();
  };
  const gust = (c, n) => {
    c.save(); c.strokeStyle = CREAM; c.globalAlpha = 0.7; c.lineWidth = 3; c.lineCap = 'round';
    [[58, 0], [112, 80], [156, 36]].forEach(([y, off]) => { const x = (n * 48 + off) % 170; openPath(c, [[x, y], [x + 36, y - 6], [x + 76, y]]); c.stroke(); });
    c.restore();
  };
  // hanging by both pegs: turned by rot about the middle of the line, hoisted `up` of the way, which also brings the camera in
  const hang = (rot, up, face, front, both = true, behind) => {
    const o = { ox: 128, oy: 66, rot, dy: -LIFT * up, ky: 1 + 0.05 * up, kx: 1 - 0.03 * up, shadowK: 1 - up }, pa = tp(o, A), pb = tp(o, B);
    return xf(D.N, { ...o, face, extra: { view: cam(up), back: c => { if (behind) behind(c); rope(c, [[pa[0], pa[1] - 12], [pb[0], pb[1] - 12]], 22 + (1 - up) * 36); },
      front: c => { peg(c, pa, rot); if (both) peg(c, pb, rot); if (front) front(c, o); } } });
  };
  // hanging by the left peg alone, and `drop` below it once that goes too
  const dangle = (rot, drop, face, front, slide = 24) => {
    const o = { ox: A[0], oy: A[1], rot, dx: slide, dy: -LIFT + 2 + drop, ky: 1.05, kx: 0.97, shadowK: 0 }, pa = tp(o, A);
    return xf(D.N, { ...o, face, extra: { view: cam(1), back: c => rope(c, drop ? [[150, 15]] : [[pa[0], pa[1] - 12]]), front: c => { if (!drop) peg(c, pa, rot); front(c, o); } } });
  };
  const unimpressed = [['stroke', [[108, 104], [124, 105]], 3], ['dot', 116, 110, 3.4], ['stroke', [[132, 102], [148, 103]], 3], ['dot', 140, 108, 3.4], ['stroke', [[121, 126], [135, 126]], 2.8]];
  let n = 0;

  [[30, 10], [56, 36]].forEach(([y, ends], i) => k.add('line' + i, 2, xf(D.N, { face: FACE.lookup, extra: { back: c => rope(c, [[A[0], y - 12], [B[0], y - 12]], ends), front: c => { peg(c, [A[0], y], 0); peg(c, [B[0], y], 0); } } })));
  k.add('clip', 2, hang(0, 0, kit.look(0, -4, 'o')));
  [0.33, 0.66, 1].forEach((up, i) => k.add('hoist' + i, 2, hang(i === 1 ? -0.03 : 0.03, up, FACE.shock)));
  [0.04, -0.04].forEach((rot, i) => { const m = ++n; k.add('hung' + i, 4, hang(rot, 1, unimpressed, (c, o) => drips(c, o, m))); });
  [-0.1, -0.22, -0.08, 0.12, 0, -0.3].forEach((rot, i) => { const m = ++n; k.add('breeze' + i, 2, hang(rot, 1, i < 3 ? unimpressed : kit.faces.worried, (c, o) => drips(c, o, m), true, c => gust(c, i))); });

  const loose = tp({ ox: 128, oy: 66, rot: -0.3, dy: -LIFT, ky: 1.05, kx: 0.97 }, B);
  k.add('ping', 2, hang(-0.3, 1, FACE.shock, c => { peg(c, [loose[0] + 14, loose[1] - 16], 0.8); kit.sparkle(c, loose[0], loose[1] - 4, 9); }, false));
  [-0.25, 0, 0.3, 0.55, 0.42, 0.33].forEach((rot, i) => { const m = ++n; k.add('dangle' + i, i === 5 ? 6 : 2, dangle(rot, 0, i < 2 ? FACE.shock : kit.faces.worried, (c, o) => {
    drips(c, o, m); if (i < 2) peg(c, [loose[0] + 40 + i * 30, loose[1] - 44 - i * 26], 1.6 + i);
  }, [6, 14, 20, 24, 24, 24][i])); });
  [[20, 14], [75, 40]].forEach(([drop, fly], i) => k.add('snap' + i, 2, dangle(0.33 - i * 0.15, drop, FACE.shock, c => peg(c, [128 - fly, 44 - fly * 1.1], -0.8 - i))));
  k.add('fall', 2, dangle(0.1, 150, FACE.shock, () => {}));
  [9, 28, 18].forEach((y, i) => k.add('twang' + i, 2, kit.gone({ view: cam(1), back: c => rope(c, [[128, y]]) })));

  [125, 95, 102, 60, 28, 0].forEach((dy, i) => k.add('climb' + i, 2, xf(D.N, { dy, shadowK: 0, face: i < 5 ? kit.look(0, -4, 'flat') : FACE.puff,
    extra: { view: cam(1), back: c => rope(c, [[128, 20]]), ...(i % 2 ? { arm2: [[166, 140 + dy], [184, 104 + dy]] } : { arm: [[90, 140 + dy], [72, 104 + dy]] }) } })));
  [[0.66, 8], [0.33, -14], [0, -60]].forEach(([e, y], i) => k.add('out' + i, 2, xf(D.N, { face: i < 2 ? FACE.puff : kit.faces.closed, extra: { view: cam(e), back: c => rope(c, [[128, y - 2]], y) } })));
  k.done();
})();

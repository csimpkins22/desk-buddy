// One hit, close up: a big pan comes up from below, scoops him and flips him like a pancake. He lands flat, blinks, and gets a drizzle of syrup.
(() => {
  const { D, xf, FACE, boil, openPath, closedPath, kit } = window.__lump;
  const { CREAM, BROWN, WHITE, TAU } = kit, k = kit.clip('pancake_flip');
  const STEEL = '#59616D', INSIDE = '#2B3038', SYRUP = '#8A4A14', CLOSE = 1.25;
  // the camera, e of the way in, looking at height fy
  const cam = (e, fy = 132) => kit.view(1 + (CLOSE - 1) * e, [128, 122 + (fy - 122) * e], [128 - 8 * e, 122 - 2 * e]);
  const ink = (c, w = 3) => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = w; };
  // the pan, its rim centred at height py: the far side and handle go behind him, the near wall in front
  const panBack = py => c => {
    c.save(); ink(c, 15); c.beginPath(); c.moveTo(212, py + 8); c.lineTo(300, py - 8); c.stroke();
    c.strokeStyle = BROWN; c.lineWidth = 10; c.stroke();
    ink(c); c.fillStyle = INSIDE; c.beginPath(); c.ellipse(128, py, 88, 14, 0, 0, TAU); c.fill(); c.stroke(); c.restore();
  };
  const panFront = (c, py, seed) => {
    c.save(); ink(c);
    closedPath(c, boil([[40, py], [70, py + 11], [128, py + 14], [186, py + 11], [216, py], [205, py + 22], [176, py + 31], [128, py + 33], [80, py + 31], [51, py + 22]], seed, 1));
    c.fillStyle = STEEL; c.fill(); c.stroke(); c.restore();
  };
  const syrup = (c, top, seed, stream, alpha = 1) => kit.fade(c, alpha, () => {
    ink(c, 2.4);
    if (stream) { const P = boil(stream.map((y, i) => [128 + (i % 2 ? 4 : -3), y]), seed, 2); ink(c, 10); openPath(c, P); c.stroke(); c.strokeStyle = SYRUP; c.lineWidth = 6; c.stroke(); ink(c, 2.4); }
    if (top) {
      closedPath(c, boil([[88, 6], [104, -3], [128, -6], [152, -3], [168, 6], [165, 22], [156, 10], [128, 7], [101, 10], [93, 24]].map(([x, y]) => [x, top + y]), seed + 4, 1.2));
      c.fillStyle = SYRUP; c.fill(); c.stroke();
      c.strokeStyle = WHITE; c.globalAlpha = alpha * 0.7; c.lineWidth = 2.6; c.beginPath(); c.moveTo(112, top + 1); c.lineTo(126, top - 1); c.stroke();
    }
  });
  // faces for when he is squashed flat: spread out, so they survive it
  const eyes = (dy = 0) => [['dot', 116, 110 + dy, 4.4], ['dot', 140, 108 + dy, 4.4]], lips = ['stroke', [[116, 144], [128, 160], [140, 144]], 3];
  const flatFace = { open: [...eyes(), lips], up: [...eyes(-9), lips], dizzy: [['spiral', 116, 110, 7], ['spiral', 140, 108, 7], ['oval', 128, 150, 5, 4]],
    blink: [['stroke', [[109, 110], [123, 110]], 3], ['stroke', [[133, 108], [147, 108]], 3], lips],
    happy: [['stroke', [[109, 116], [116, 100], [123, 116]], 3], ['stroke', [[133, 114], [140, 98], [147, 114]], 3], ['stroke', [[118, 142], [128, 160], [138, 142]], 3]] };
  const inPan = (py, o, face, e = 1, more = {}) => xf(D.N, { dy: py + 4 - 201, ...o, face, extra: { view: cam(e), back: panBack(py), front: (c, d, seed) => { panFront(c, py, seed); more.front && more.front(c, seed); } } });
  const flat = (py, ky, kx, face, front) => inPan(py, { ky, kx, shadowK: 0 }, flatFace[face], 1, { front });
  const REST = 184, TOP = REST + 4 - 131 * 0.42;

  k.add('rise0', 2, inPan(232, { dy: 0 }, kit.look(0, 5, 'o'), 0.5));
  k.add('rise1', 2, inPan(196, { dy: 0 }, kit.look(0, 6, 'o')));
  k.add('scoop', 2, inPan(186, { ky: 1.04 }, FACE.shock));
  k.add('dip', 2, inPan(197, { ky: 0.88, kx: 1.07 }, FACE.shock));
  [[174, -58, 0.9], [182, -100, 2.2], [186, -116, 3.4], [186, -92, 4.7], [186, -50, 5.8]].forEach(([py, dy, rot], i) =>
    k.add('flip' + i, 2, xf(D.N, { ox: 128, oy: 136, rot, dy, shadowK: 0, face: i < 3 ? FACE.shock : FACE.aah, extra: { view: cam(1, 132 + dy * 0.6), back: panBack(py), front: (c, d, seed) => panFront(c, py, seed) } })));
  k.add('splat', 2, flat(197, 0.3, 1.5, 'dizzy'));
  k.add('flat', 4, flat(REST, 0.42, 1.36, 'open'));
  k.add('blink', 4, flat(REST, 0.42, 1.36, 'blink'));
  k.add('flat', 2);
  k.add('pour0', 2, flat(REST, 0.42, 1.36, 'up', (c, seed) => syrup(c, 0, seed, [-20, 20, 60, 96])));
  k.add('pour1', 2, flat(REST, 0.42, 1.36, 'up', (c, seed) => syrup(c, TOP, seed, [-20, 30, 80, TOP])));
  k.add('pour2', 2, flat(REST, 0.42, 1.36, 'blink', (c, seed) => syrup(c, TOP, seed, [64, 90, 112, TOP])));
  k.add('syrup', 10, flat(REST, 0.42, 1.36, 'happy', (c, seed) => syrup(c, TOP, seed)));
  k.add('pop0', 2, inPan(200, { dy: 0, ky: 0.75, kx: 1.12 }, FACE.happy, 0.66, { front: (c, seed) => syrup(c, 201 - 131 * 0.75, seed, null, 0.6) }));
  k.add('pop1', 2, inPan(228, { dy: 0, ky: 1.06, kx: 0.96 }, FACE.happy, 0.33, { front: (c, seed) => syrup(c, 201 - 131 * 1.06, seed, null, 0.3) }));
  k.add('pop2', 2, xf(D.N, { face: FACE.happy, extra: { view: cam(0) } }));
  k.done();
})();

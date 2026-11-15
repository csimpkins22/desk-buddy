// UFO: a small saucer hovers in, its beam lifts him halfway, it changes its mind and drops him.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('ufo');
  const { CREAM, YELLOW, BLUE, GREY, TAU } = kit;
  const tw = (a, b, n) => kit.steps(a, b, n + 1).slice(1);
  const ufo = (c, x, y) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.fillStyle = BLUE; c.beginPath(); c.arc(x, y - 3, 15, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = GREY; c.beginPath(); c.ellipse(x, y, 44, 10, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = YELLOW; [-26, 0, 26].forEach(dx => { c.beginPath(); c.arc(x + dx, y + 2, 3.2, 0, TAU); c.fill(); }); c.restore();
  };
  const beam = (c, x, y, a) => kit.fade(c, a, () => { c.fillStyle = YELLOW; c.beginPath(); c.moveTo(x - 22, y + 8); c.lineTo(x + 22, y + 8); c.lineTo(x + 66, 201); c.lineTo(x - 66, 201); c.closePath(); c.fill(); });
  const L = (face, o, s = {}) => xf(D.N, { ...o, face, extra: { back: c => {
    const [x, y] = s.ufo || [128, 28];
    if (s.beam) beam(c, x, y, s.beam);
    if (s.ufo !== null) ufo(c, x, y);
  } } });
  const UP = { dy: -28, ky: 1.08, kx: 0.96, shadowK: 0.5 };

  tw(300, 128, 4).forEach((x, i) => k.add('in' + i, 2, L(i < 2 ? FACE.lookr : FACE.lookup, {}, { ufo: [x, 28 + [6, -3, 4, 0][i]] })));
  k.add('hover', 6, L(FACE.lookup, {}, { ufo: [128, 30] }));
  k.add('hover2', 4, L(FACE.lookup, {}, { ufo: [128, 26] }));
  [0.12, 0.25].forEach((beam, i) => k.add('beam' + i, 2, L(i ? FACE.shock : FACE.lookup, {}, { beam })));
  tw(0, 1, 4).forEach((t, i) => k.add('lift' + i, 2, L(i < 3 ? FACE.shock : FACE.happy, { dy: -28 * t, ky: 1 + 0.08 * t, kx: 1 - 0.04 * t, shadowK: 1 - 0.5 * t }, { beam: 0.25 })));
  k.add('hang', 4, L(FACE.happy, UP, { beam: 0.25, ufo: [128, 30] }));
  k.add('hang2', 4, L(FACE.happy, { ...UP, dy: -25 }, { beam: 0.25 }));
  k.add('dim', 2, L(FACE.lookup, UP, { beam: 0.12 }));
  k.add('out', 2, L(FACE.shock, { ...UP, ky: 1 , kx: 1 }, {}));
  k.add('fall', 2, L(FACE.shock, { dy: -12, ky: 1.08, shadowK: 0.8 }, {}));
  k.add('thud', 2, L(FACE.shock, { ky: 0.7, kx: 1.2 }, {}));
  k.add('settle', 2, L(FACE.shock, { ky: 1.06, kx: 0.97 }, {}));
  tw(128, -70, 3).forEach((x, i) => k.add('away' + i, 2, L(FACE.grump, {}, { ufo: [x, 26 - i * 3] })));
  k.add('huh', 12, L(FACE.grump, {}, { ufo: null }));
  k.done();
})();

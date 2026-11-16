// He pinches in at the middle and splits into two half-size Lumps. Each points at himself: both think they are the original. They merge back with a squelch, slightly too tall.
// group: odd
// Staging: centre; the second one comes out of him; the view closes in on the pair; 5.5 seconds; rapid fire; ends a little too tall.
(() => {
  const { D, xf, FACE, openPath, tint } = window.__lump, kit = window.__lump.kit, k = kit.clip('mitosis');
  // a cell pinching in two: a wide blob whose top and bottom close in at the middle by a
  const peanut = (a, A) => {
    const cy = 150, B = 50, body = Array.from({ length: 24 }, (_, i) => { const t = i / 24 * kit.TAU, w = 1 - a * Math.exp(-((Math.cos(t) / 0.38) ** 2)); return [128 + A * Math.cos(t), cy - B * Math.sin(t) * w]; });
    const top = x => [x, cy - B * 0.94], sprout = ([x, y], s) => [[x, y], [x - 6 * s, y - 11 * s], [x - 2 * s, y - 19 * s], [x + 6 * s, y - 16 * s], [x + 3 * s, y - 10 * s]];
    return { ...D.N, body, corners: undefined, curl: sprout(top(128 - A * 0.5), 1), shadow: [128, A * 0.8],
      face: [['dot', 128 - 14 - A * 0.4 * a, cy - 8, 4.4], ['dot', 128 + 14 + A * 0.4 * a, cy - 10, 4.4], ...(a < 0.6 ? [['stroke', [[114, cy + 12], [121, cy + 9], [128, cy + 12], [135, cy + 9], [142, cy + 12]], 2.8]] : [])],
      front: c => { c.save(); c.strokeStyle = kit.CREAM; c.lineCap = c.lineJoin = 'round'; c.lineWidth = 3.4; openPath(c, sprout(top(128 + A * 0.5), a)); c.stroke(); c.restore(); } };
  };
  const half = (dx, face, o = {}) => xf(D.N, { k: 0.62, dx, face, ...o });
  const PAIR = kit.view(1.3, [128, 165], [120, 135]);
  const pair = (l, r, t = 1) => kit.gone({ view: kit.cam(t, kit.HOME, PAIR), front: (c, d, seed) => { kit.twin(c, l, seed); kit.twin(c, r, seed + 3); } });
  const eyes = (dx, mouth) => kit.look(dx, 0, mouth, 5.6);
  const drops = c => {
    c.save(); c.fillStyle = tint(); c.strokeStyle = kit.CREAM; c.lineWidth = 2.4;
    [[42, 150, 6], [30, 172, 4.5], [214, 146, 6], [226, 170, 4.5], [50, 126, 4], [206, 122, 4]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, kit.TAU); c.fill(); c.stroke(); });
    c.restore();
  };

  k.add('brace', 2, xf(D.N, { ky: 0.9, kx: 1.08, face: FACE.puff }));
  k.add('wide', 2, xf(D.N, { ky: 0.8, kx: 1.3, face: FACE.puff }));
  k.add('pin1', 2, peanut(0.4, 86));
  k.add('pin2', 4, peanut(0.82, 94));
  k.add('sp1', 2, pair(half(-36, eyes(0, 'o'), { ky: 0.88, kx: 1.08 }), half(36, eyes(0, 'o'), { ky: 0.88, kx: 1.08 }), 0.4));
  k.add('sp2', 2, pair(half(-52, eyes(0, 'o'), { dy: -10, ky: 1.06 }), half(52, eyes(0, 'o'), { dy: -10, ky: 1.06 }), 0.75));
  k.add('look', 10, pair(half(-48, eyes(5, 'o')), half(48, eyes(-5, 'o'))));

  const L = { k: 0.62, dx: -48 }, R = { k: 0.62, dx: 48 };
  const meL = { arm: [kit.pt(L, [90, 140]), kit.pt(L, [120, 150])] }, meR = { arm2: [kit.pt(R, [166, 140]), kit.pt(R, [136, 150])] };
  k.add('meA', 8, pair(half(-48, kit.faces.closed, { ky: 1.06, extra: meL }), half(48, eyes(-5, 'flat'))));
  k.add('meB', 8, pair(half(-48, eyes(5, 'frown'), { extra: meL }), half(48, kit.faces.closed, { ky: 1.06, extra: meR })));
  k.add('glare', 8, pair(half(-44, FACE.grump, { rot: 0.1, extra: meL }), half(44, FACE.grump, { rot: -0.1, extra: meR })));
  k.add('m1', 2, pair(half(-30, FACE.aah, { rot: 0.14 }), half(30, FACE.aah, { rot: -0.14 }), 0.7));
  k.add('m2', 2, pair(half(-14, FACE.aah, { ky: 1.05 }), half(14, FACE.aah, { ky: 1.05 }), 0.35));
  k.add('squelch', 4, xf(D.N, { ky: 0.76, kx: 1.3, face: FACE.choo, extra: { front: drops } }));
  k.add('boing', 2, xf(D.N, { ky: 1.24, kx: 0.88, face: FACE.shock }));
  k.add('tall', 12, xf(D.N, { ky: 1.14, kx: 0.94, face: kit.look(0, -6, 'flat') }));
  k.add('shrug', 6, xf(D.N, { ky: 1.07, kx: 0.97, face: kit.look(0, 0, 'smile') }));
  k.done();
})();

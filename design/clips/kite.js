// A windy day seen wide: the gusts build on a big kite until it carries him off the right edge, and he walks back in from the left wearing it.
(() => {
  const { D, xf, FACE, boil, openPath, kit } = window.__lump;
  // zooms are kept to 256ths, as the board stores them: otherwise things far from the focus land a fraction of a pixel off and the frame is kept as pixels
  const snap = z => Math.round(z * 256) / 256;
  const k = kit.clip('kite'), Z = snap(0.6), WIDE = kit.view(Z, [128, 201], [50, 205]), WALK = kit.view(Z, [128, 201], [110, 205]), K0 = [318, -14], KS = 1.3;
  const round = c => { c.lineCap = c.lineJoin = 'round'; };
  const poly = (c, P) => { c.beginPath(); P.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); };

  const kite = (c, [x, y], rot, seed, s = 1) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); round(c);
    const P = boil([[0, -72], [60, -8], [0, 92], [-60, -8]], seed, 3), mid = [0, -8];
    c.fillStyle = kit.RED; poly(c, P); c.fill();
    c.fillStyle = kit.YELLOW; poly(c, [P[0], P[1], mid]); c.fill(); poly(c, [P[3], P[2], mid]); c.fill();
    c.strokeStyle = kit.CREAM; c.lineWidth = 5; poly(c, P); c.stroke();
    c.beginPath(); c.moveTo(P[0][0], P[0][1]); c.lineTo(P[2][0], P[2][1]); c.moveTo(P[3][0], P[3][1]); c.lineTo(P[1][0], P[1][1]); c.stroke();
    c.restore();
  };
  // a line of points with two bows on it: the kite's tail
  const ribbon = (c, pts, seed) => {
    const P = boil(pts, seed, 2);
    c.save(); round(c); c.strokeStyle = kit.CREAM; c.lineWidth = 5; openPath(c, P); c.stroke();
    c.fillStyle = kit.YELLOW; c.lineWidth = 3;
    [P[1], P[2]].forEach(([x, y]) => [-1, 1].forEach(side => { poly(c, [[x, y], [x + side * 12, y - 9], [x + side * 12, y + 9]]); c.fill(); c.stroke(); }));
    c.restore();
  };
  const tail = (c, [x, y], rot, seed, i, s = 1) => {
    const tx = x - Math.sin(rot) * 92 * s, ty = y + Math.cos(rot) * 92 * s, w = i % 2 ? 9 : -9;
    ribbon(c, [[tx, ty], [tx + 26, ty + 20 + w], [tx + 54, ty + 26 - w], [tx + 84, ty + 40 + w]], seed);
  };
  const string = (c, from, to, seed, w = 5, sag = 18) => {
    c.save(); round(c); c.strokeStyle = kit.CREAM; c.lineWidth = w;
    openPath(c, boil([from, [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2 + sag], to], seed, 2)); c.stroke(); c.restore();
  };
  // streaks of wind crossing from the left: more, longer and faster as gust goes 1 to 3. Lanes are screen heights; z is the view's zoom.
  const LANES = [[30, 0, 26], [150, 60, 30], [96, 120, 20], [60, 200, 22], [178, 160, 24], [122, 260, 28], [14, 90, 20]];
  const wind = (c, gust, i, z = Z) => {
    if (!gust) return;
    const at = z === 1 ? (x, y) => [x, y] : (x, y) => [128 + (x - 50) / Z, 201 + (y - 205) / Z];
    c.save(); round(c); c.strokeStyle = kit.GREY; c.lineWidth = 4 / z;
    LANES.slice(0, gust * 2 + 1).forEach(([y, off, len]) => {
      const x = (off + i * (30 + gust * 8)) % 330 - 60, [ax, ay] = at(x, y), [bx] = at(x + len + 12 + gust * 8, y);
      c.beginPath(); c.moveTo(ax, ay); c.quadraticCurveTo((ax + bx) / 2, ay - 6 / z, bx, ay); c.stroke();
    });
    c.restore();
  };

  // him holding the string, the kite at kp
  const fly = (o, { kp = K0, kr = 0.4, gust = 0, i = 0, face, view = WIDE, w = 5 }) => {
    const sh = kit.pt(o, [166, 140]), a = Math.atan2(kp[1] - sh[1], kp[0] - sh[0]), hand = [sh[0] + Math.cos(a) * 34, sh[1] + Math.sin(a) * 34];
    return xf(D.N, { ...o, face, extra: { view, arm2: [sh, hand], back: (c, d, seed) => { wind(c, gust, i); string(c, hand, kp, seed, w); tail(c, kp, kr, seed, i, KS); kite(c, kp, kr, seed, KS); } } });
  };
  const HAND = [189.6, 115.5], UP = kit.look(4, -4, 'smile');

  // a string end lowers in from the top right, and he takes it
  kit.steps(0.72, 1, 4).forEach((t, i) => k.add('str' + i, 2, xf(D.N, { face: i ? UP : kit.look(3, -2, 'flat'),
    extra: { back: (c, d, seed) => string(c, [K0[0] + (HAND[0] + 6 - K0[0]) * t, K0[1] + (HAND[1] - 6 - K0[1]) * t], K0, seed, 3, 6) } })));
  k.add('reach', 2, xf(D.N, { face: UP, extra: { arm2: [[166, 140], [180, 128]], back: (c, d, seed) => string(c, [HAND[0] + 4, HAND[1] - 4], K0, seed, 3, 6) } }));
  k.add('grab', 4, fly({}, { face: UP, view: kit.view(1, [128, 201], [128, 201]), w: 3 }));

  // the view pulls back: he is small in the bottom left, and the kite fills the top right
  kit.steps(0, 1, 8).slice(1).forEach((t, i) => { const z = snap(1 + (Z - 1) * t); k.add('back' + i, 2, fly({}, { face: UP, view: kit.view(z, [128, 201], [128 - 78 * t, 201 + 4 * t]), w: 3 / z })); });

  // the gusts build
  let i = 0;
  for (let n = 0; n < 10; n++, i++) k.add('a' + n, 2, fly({ rot: -0.04 }, { gust: n < 3 ? 0 : 1, i, face: UP, kp: [K0[0] + Math.sin(n * 1.1) * 5, K0[1] + Math.cos(n * 1.7) * 6], kr: 0.4 + Math.sin(n * 1.3) * 0.05 }));
  for (let n = 0; n < 10; n++, i++) {
    const t = n / 9;
    k.add('b' + n, 2, fly({ rot: 0.05 + t * 0.3, ky: 1 + t * 0.2, kx: 1 - t * 0.08, dx: t * 10, dy: n > 6 ? -4 : 0 },
      { gust: 2, i, face: n < 4 ? kit.look(4, -3, 'flat') : kit.faces.worried, kp: [K0[0] + 6 + t * 10 + Math.sin(n * 2.1) * 7, K0[1] - t * 12 + Math.cos(n * 1.9) * 8], kr: 0.45 + Math.sin(n * 2) * 0.1 }));
  }
  // his feet leave the floor and he is carried up and off the right edge
  for (let n = 0; n < 12; n++, i++) {
    const t = (n + 1) / 12, e = t * t, dx = 10 + 400 * e, dy = -8 - 235 * e;
    k.add('c' + n, 2, fly({ rot: 0.35 + e * 0.15, ky: 1.2, kx: 0.92, dx, dy, shadowK: Math.max(0, 1 - t * 3) }, { gust: 3, i, face: FACE.shock, kp: [K0[0] + 16 + dx, K0[1] - 12 + dy], kr: 0.55 }));
  }
  // empty sky as the wind drops
  for (let n = 0; n < 4; n++, i++) { const at = i; k.add('d' + n, 2, kit.gone({ view: WIDE, back: c => wind(c, n < 2 ? 2 : 1, at) })); }
  k.add('empty', 8, kit.gone({ view: WIDE }));

  // back in from the left with the kite round him
  const wraps = (c, dx, seed, w, n = 3) => {
    c.save(); round(c); c.strokeStyle = kit.CREAM; c.lineWidth = w;
    [[[74, 142], [128, 156], [188, 140]], [[70, 170], [128, 182], [189, 166]], [[90, 150], [118, 170], [146, 197]]].slice(0, n).forEach((P, j) => { openPath(c, boil(P.map(([x, y]) => [x + dx, y]), seed + j, 2)); c.stroke(); });
    c.restore();
  };
  const worn = (o, face, view, w) => xf(D.N, { ...o, face, extra: { view,
    back: (c, d, seed) => { const dx = o.dx || 0; ribbon(c, [[84 + dx, 190], [58 + dx, 182], [32 + dx, 195], [8 + dx, 188]], seed); kite(c, [108 + dx, 90], -0.55, seed, 0.9); },
    front: (c, d, seed) => wraps(c, o.dx || 0, seed, w) } });
  kit.walk(-250, 0, 10, {}).forEach((o, n) => k.add('in' + n, 2, worn(o, FACE.grump, WALK, 5)));
  kit.steps(0, 1, 6).slice(1).forEach((t, n) => { const z = snap(Z + (1 - Z) * t); k.add('push' + n, 2, worn({}, FACE.grump, kit.view(z, [128, 201], [110 + 18 * t, 205 - 4 * t]), 3 / z)); });
  k.add('worn', 12, worn({}, FACE.grump, undefined, 3));

  // a last gust takes it off him and away over the top
  [0.1, 0.25, 0.42, 0.62, 0.85].forEach((t, n) => {
    const kp = [108 + 225 * t, 90 - 250 * t], kr = -0.55 + 0.95 * t;
    k.add('off' + n, 2, xf(D.N, { rot: 0.06 * (1 - t), face: n ? FACE.lookup : FACE.shock, extra: {
      back: (c, d, seed) => { wind(c, 2, n, 1); tail(c, kp, kr, seed, n, 0.9 + 0.1 * t); string(c, [kp[0] - 30, kp[1] + 70], kp, seed, 3, 8); kite(c, kp, kr, seed, 0.9 + 0.1 * t); },
      front: (c, d, seed) => wraps(c, 0, seed, 3, n ? 0 : 1) } }));
  });
  k.add('after', 4, xf(D.N, { face: FACE.lookup }));
  k.done();
})();

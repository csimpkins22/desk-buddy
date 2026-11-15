// On the right, he tosses dough that comes down wider every time, until it is bigger than he is and settles over him like a blanket.
(() => {
  const { D, xf, FACE, boil, openPath, closedPath } = window.__lump, kit = window.__lump.kit, { CREAM, TAU } = kit;
  const k = kit.clip('pizza_spin_b');
  const DOUGH = '#EBCB8B', CRUST = '#C9A25E', X = 168, F = [168, 140], TO = [140, 150];
  const lerp = (a, b, t) => a + (b - a) * t, rest = o => kit.pt({ dx: 40, ...o }, [128, 58])[1];

  const disc = (c, y, r, tilt, ph, z) => {
    const ry = r * 0.26;
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3 / z;
    c.fillStyle = CRUST; c.beginPath(); c.ellipse(X, y + 5, r, ry, tilt, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = DOUGH; c.beginPath(); c.ellipse(X, y, r, ry, tilt, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = CRUST;
    [0, 2.1, 4.2].forEach(a => { c.beginPath(); c.arc(X + Math.cos(ph + a) * r * 0.55, y + Math.sin(ph + a) * ry * 0.5, Math.max(2.5, r * 0.05), 0, TAU); c.fill(); });
    c.restore();
  };
  const ball = (y, w = 15, h = 15) => c => { c.save(); c.fillStyle = DOUGH; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.ellipse(X, y, w, h, 0, 0, TAU); c.fill(); c.stroke(); c.restore(); };
  // the dough coming down over him: a dome whose rim drops to the floor
  const dome = (c, top, rx, rim, seed, z) => {
    const m = lerp(top, rim, 0.3);
    c.save(); c.lineJoin = c.lineCap = 'round'; c.fillStyle = DOUGH; c.strokeStyle = CREAM; c.lineWidth = 3 / z;
    openPath(c, boil([[X - rx, rim], [X - rx * 0.86, m], [X - rx * 0.45, top + 4], [X, top], [X + rx * 0.45, top + 4], [X + rx * 0.86, m], [X + rx, rim]], seed + 31, 1.5));
    c.closePath(); c.fill(); c.stroke(); c.restore();
  };
  // the dough lying over whatever pose he is in: a mound behind him, and a hood over the part of him that `poly` covers
  const mound = (c, d, seed, z) => {
    const n = d.body.length, cx = d.body.reduce((a, p) => a + p[0], 0) / n, cy = d.body.reduce((a, p) => a + p[1], 0) / n;
    const up = d.body.filter(p => p[1] < 196).map(([x, y]) => { const h = Math.hypot(x - cx, y - cy); return [x + (x - cx) / h * 15, y + (y - cy) / h * 15]; });
    const xs = d.body.map(p => p[0]), lo = Math.min(...xs), hi = Math.max(...xs);
    c.save(); c.lineJoin = c.lineCap = 'round'; c.fillStyle = DOUGH; c.strokeStyle = CREAM; c.lineWidth = 3 / z;
    openPath(c, boil([[hi + 34, 204], [hi + 18, 197], ...up, [lo - 18, 197], [lo - 34, 204]], seed + 31, 1.5)); c.closePath(); c.fill(); c.stroke(); c.restore();
  };
  const hood = (c, d, poly, z) => {
    c.save(); closedPath(c, d.body); c.clip();
    c.fillStyle = DOUGH; c.strokeStyle = CREAM; c.lineWidth = 3 / z; c.lineJoin = 'round';
    c.beginPath(); poly.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); c.stroke(); c.restore();
  };

  const man = (o, face, dough, z = 1, grip) => {
    const oo = { dx: 40, ...o }, L = kit.pt(oo, [90, 140]), R = kit.pt(oo, [166, 140]), g = Math.min(dough.r, 46);
    const arms = grip ? { arm: [L, [X - g, dough.y + 6]], arm2: [R, [X + g, dough.y + 6]] } : { arm: [L, [L[0] - 10, L[1] - 56]], arm2: [R, [R[0] + 10, R[1] - 56]] };
    return xf(D.N, { ...oo, face, extra: { view: kit.zoom(z, F, TO), ...arms, front: c => disc(c, dough.y, dough.r, dough.t || 0, dough.ph || 0, z) } });
  };

  kit.walk(0, 40, 4, { face: kit.look(4, 0) }).forEach((o, i) => k.add('go' + i, 2, xf(D.N, o)));
  [-18, 12, 38].forEach((y, i) => k.add('drop' + i, 2, xf(D.N, { dx: 40, face: kit.look(0, -5, 'o'), extra: { front: ball(y) } })));
  const sq = { ky: 0.86, kx: 1.08 }, st = { ky: 1.08, kx: 0.95 };
  k.add('catch', 2, xf(D.N, { dx: 40, ...sq, face: kit.look(0, -5, 'o'), extra: { front: ball(rest(sq), 24, 9) } }));

  const R = [40, 56, 78, 104, 134], Z = [1, 1, 0.9, 0.75, 0.6], PEAK = [30, 14, -16, -50], HOLD = [2, 4, 4, 6];
  const FACES = [kit.look(0, -5, 'smile'), FACE.happy, FACE.happy, kit.faces.worried];
  k.add('have', 4, man({}, FACES[0], { y: rest({}), r: R[0] }, 1, true));
  for (let i = 0; i < 4; i++) {
    const r0 = R[i], r1 = R[i + 1], z0 = Z[i], z1 = Z[i + 1], up = kit.look(0, -5, i < 2 ? 'smile' : 'o'), y0 = rest({});
    k.add('a' + i, 2, man(sq, FACES[i], { y: rest(sq), r: r0 }, z0, true));
    k.add('b' + i, 2, man(st, up, { y: rest(st) - 16, r: r0, t: 0.12, ph: 1 }, z0));
    k.add('c' + i, 2, man({}, up, { y: lerp(y0, PEAK[i], 0.7), r: lerp(r0, r1, 0.35), t: -0.14, ph: 2 }, lerp(z0, z1, 0.4)));
    k.add('d' + i, HOLD[i], man({}, i === 3 ? FACE.shock : up, { y: PEAK[i], r: lerp(r0, r1, 0.7), t: 0.1, ph: 3 }, lerp(z0, z1, 0.75)));
    if (i === 3) break;
    k.add('e' + i, 2, man({}, up, { y: lerp(PEAK[i], y0, 0.55), r: r1, t: -0.08, ph: 4 }, z1));
    k.add('f' + i, 2, man(sq, FACES[i + 1], { y: rest(sq), r: r1, ph: 5 }, z1, true));
    k.add('g' + i, 4, man({}, FACES[i + 1], { y: y0, r: r1, ph: 5 }, z1, true));
  }

  const land = (part, top, rx, rim, o, ticks) => k.add(part, ticks, xf(D.N, { dx: 40, ...o, face: FACE.shock, extra: { view: kit.zoom(0.6, F, TO), front: (c, d, seed) => dome(c, top, rx, rim, seed, 0.6) } }));
  k.add('l0', 2, man({}, FACE.shock, { y: -12, r: 134, ph: 4 }, 0.6));
  land('l1', 36, 124, 108, { ky: 0.95 }, 2);
  land('l2', 50, 110, 204, { ky: 0.9 }, 4);

  const under = (base, dx, z, poly, a = 1, extra = {}) => xf(base, { dx, extra: { view: kit.zoom(z, F, TO), ...extra,
    back: (c, d, seed) => kit.fade(c, a, () => mound(c, d, seed, z)), front: (c, d) => kit.fade(c, a, () => hood(c, d, poly, z)) } });
  const above = y => [[-400, -300], [800, -300], [800, y], [-400, y]];
  const leftOf = (x, y) => [[-400, -300], [x - 0.15 * (y + 300), -300], [x + 0.15 * (260 - y), 260], [-400, 260]];
  k.add('u0', 4, under(D.T1, 40, 0.6, above(260)));
  k.add('u1', 4, under(D.T1, 40, 0.7, above(103)));
  k.add('u2', 4, under(D.T2, 28, 0.82, leftOf(176, 150)));
  k.add('u3', 4, under(D.S1, 14, 0.92, leftOf(170, 168)));
  k.add('u4', 22, under(D.S1, 0, 1, leftOf(156, 168), 1, { fxm: 'idle' }));
  k.add('u5', 2, under(D.S1, 0, 1, leftOf(156, 168), 0.6, { fxm: 'idle' }));
  k.add('u6', 2, under(D.S1, 0, 1, leftOf(156, 168), 0.3, { fxm: 'idle' }));
  k.done({ doze: false });
})();

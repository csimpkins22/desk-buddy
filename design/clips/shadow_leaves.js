// His shadow peels up off the floor and walks out to the right; he hurries after it, and both come back in from the left, where it lies down under him again.
(() => {
  const { D, xf, FACE, boil, openPath, closedPath, kit } = window.__lump;
  const k = kit.clip('shadow_leaves'), SH = '#465061', EDGE = '#7A8698';
  const flat = ([x, y]) => [x + (201 - y) * 0.34, 203 + (201 - y) * 0.2];
  // his shadow as a flat Lump: t 0 lying on the floor in front of the feet of drawing d, t 1 standing where d stands
  const shade = (c, d, seed, t, alpha = 1) => {
    const m = p => { const q = flat(p); return [q[0] + (p[0] - q[0]) * t, q[1] + (p[1] - q[1]) * t]; };
    c.save(); c.lineJoin = c.lineCap = 'round'; c.globalAlpha = alpha; c.strokeStyle = t > 0.05 ? EDGE : SH;
    closedPath(c, boil(d.body.map(m), seed + 3, 1.6)); c.fillStyle = SH; c.fill(); c.lineWidth = 3; c.stroke();
    openPath(c, boil(d.curl.map(m), seed + 5, 1)); c.lineWidth = 3.4; c.stroke(); c.restore();
  };
  const at = o => xf(D.N, o), under = (c, d, seed) => shade(c, d, seed, 0);
  const lump = (o, face, hook, where = 'front') => xf(D.N, { ...o, face, shadowK: 0, extra: { [where]: hook } });
  const happy = kit.look(0, 0, 'smile');

  [0.35, 0.7, 1].forEach((a, i) => k.add('sw' + i, i < 2 ? 2 : 8, xf(D.N, { face: happy, shadowK: 1 - a, extra: { front: (c, d, seed) => shade(c, d, seed, 0, a) } })));
  kit.steps(0, 1, 6).forEach((t, i) => { const sd = at({ dx: 50 * t }); k.add('peel' + i, 2, lump({ dx: -56 * t }, kit.look(5, 6 - 6 * t, 'o', 4.4), (c, d, seed) => shade(c, sd, seed, t))); });
  const stood = at({ dx: 50, ky: 1.04 });
  k.add('stood', 6, lump({ dx: -56 }, kit.faces.wide, (c, d, seed) => shade(c, stood, seed, 1)));
  kit.walk(50, 250, 7).forEach((o, i) => { const sd = at(o); k.add('go' + i, 2, lump({ dx: -56 }, kit.look(7, 0, 'o', 4.4), (c, d, seed) => shade(c, sd, seed, 1))); });
  k.add('stare', 8, lump({ dx: -56 }, kit.look(7, 0, 'flat', 4.4)));
  k.add('feet', 8, lump({ dx: -56 }, kit.look(3, 7, 'wobble')));
  k.add('lean', 2, lump({ dx: -60, rot: -0.1, ky: 0.94 }, kit.faces.worried));
  kit.walk(-50, 236, 8, { face: kit.faces.worried }).forEach((o, i) => k.add('run' + i, 2, xf(D.N, { ...o, rot: o.rot * 2 + 0.08, shadowK: 0 })));
  k.add('empty', 12, kit.gone());
  kit.walk(-240, 46, 9).forEach((o, i) => { const sd = at(o); k.add('sin' + i, 2, kit.gone({ front: (c, d, seed) => shade(c, sd, seed, 1) })); });
  const waits = at({ dx: 46 }), back = (c, d, seed) => shade(c, waits, seed, 1);
  kit.walk(-236, -52, 7, { face: FACE.puff }).forEach((o, i) => k.add('lin' + i, 2, xf(D.N, { ...o, shadowK: 0, extra: { back } })));
  k.add('puff', 6, lump({ dx: -52, ky: 0.96 }, FACE.puff, back, 'back'));
  const meek = at({ dx: 46, ky: 0.93 });
  k.add('glare', 8, lump({ dx: -52 }, FACE.grump, (c, d, seed) => shade(c, meek, seed, 1), 'back'));
  kit.steps(1, 0, 6).forEach((t, i) => { const sd = at({ dx: -52 + 98 * t, ky: 0.93 }); k.add('lie' + i, 2, lump({ dx: -52 }, kit.look(4, 6 - 4 * t, 'flat'), (c, d, seed) => shade(c, sd, seed, t), 'back')); });
  k.add('glad', 10, lump({ dx: -52 }, kit.look(3, 6, 'smile'), under));
  [[-34, 0.7], [-17, 0.35], [0, 0]].forEach(([dx, a], i) => k.add('home' + i, 2, xf(D.N, { dx, face: happy, shadowK: 1 - a, extra: a ? { front: (c, d, seed) => shade(c, d, seed, 0, a) } : {} })));
  k.done();
})();

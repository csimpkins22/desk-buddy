// His outline steps sideways out of his body. The line and the blob look at each other; the blob starts to sag, and the line hurries back in, crooked.
// group: odd
(() => {
  const L = window.__lump, { D, xf, FACE, boil, openPath, closedPath, kit } = L;
  const k = kit.clip('outline_walkout'), WIDE = kit.view(0.8, [195, 132], [120, 124]), OUT = 135;

  // his outline and cowlick by themselves, with a face in cream if the drawing has one
  const line = (c, o, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = c.fillStyle = kit.CREAM;
    closedPath(c, boil(o.body, seed, 2.2)); L.inkStroke(c, 4); openPath(c, boil(o.curl, seed + 20, 1.2)); L.inkStroke(c, 3.4);
    o.face.forEach(m => {
      if (m[0] === 'dot') { c.beginPath(); c.arc(m[1], m[2], m[3], 0, kit.TAU); c.fill(); }
      else if (m[0] === 'oval') { c.beginPath(); c.ellipse(m[1], m[2], m[3], m[4], 0, 0, kit.TAU); c.fill(); }
      else if (m[0] === 'stroke') { openPath(c, m[1]); c.lineWidth = m[2]; c.stroke(); }
    });
    c.restore();
  };
  // the blob (xf options) with its line elsewhere (xf options), the view t of the way out to wide
  const apart = (blob, o, t = 1, more) => {
    const ol = xf(D.N, o);
    return xf(D.N, { ...blob, extra: { line: 'none', view: kit.cam(t, kit.HOME, WIDE), front: (c, d, seed) => { line(c, ol, seed); if (more) more(c, seed); } } });
  };

  k.add('hm', 3, xf(D.N, { face: kit.look(0, 0, 'flat') }));
  k.add('itch0', 2, apart({ face: kit.look(3, 0, 'flat') }, { dx: 4, face: [] }, 0));
  k.add('itch1', 2, apart({ face: kit.look(5, 0, 'o') }, { dx: 10, rot: 0.04, face: [] }, 0));
  kit.steps(18, OUT, 6).forEach((dx, i) => k.add('out' + i, 2, apart({ face: kit.look(7, 0, 'o') }, { dx, dy: i % 2 ? -8 : 0, rot: i % 2 ? 0.08 : 0.02, face: i > 2 ? kit.look(5, 0, 'smile') : [] }, (i + 1) / 6)));
  k.add('turn', 6, apart({ face: kit.look(7, 0, 'flat') }, { dx: OUT, face: kit.look(-6, 0, 'flat') }));
  k.add('regard', 14, apart({ face: kit.look(7, 0, 'o') }, { dx: OUT, face: kit.look(-7, 0, 'o') }));
  k.add('tilt', 8, apart({ face: kit.look(7, -2, 'flat') }, { dx: OUT, rot: 0.1, face: kit.look(-7, 0, 'smile') }, 1, c => kit.mark(c, '?', 318, 72, 1.2)));

  // nothing is holding the blob in
  kit.steps(0, 1, 5).forEach((t, i) => k.add('sag' + i, 4, apart({ ky: 1 - 0.24 * t, kx: 1 + 0.2 * t, face: t < 0.5 ? kit.look(6, 3, 'flat') : kit.faces.worried },
    { dx: OUT, rot: 0.1 * (1 - t), face: t < 0.5 ? kit.look(-7, 0, 'smile') : kit.look(-7, 3, 'o') })));
  kit.steps(OUT, 7, 6).forEach((dx, i) => k.add('back' + i, 2, apart({ ky: 0.76, kx: 1.2, face: kit.faces.worried }, { dx, dy: i % 2 ? -8 : 0, rot: -0.1, face: i < 2 ? kit.look(-7, 3, 'o') : [] }, 1 - (i + 1) / 6)));

  const CROOK = { dx: 7, dy: -3, rot: 0.11, ox: 128, oy: 136, face: [] };
  k.add('pop', 2, apart({ ky: 1.08, kx: 0.95, face: FACE.shock }, { ...CROOK, dy: -10 }, 0));
  k.add('crooked', 18, apart({ face: kit.look(3, -6, 'flat') }, CROOK, 0));
  k.add('shrug', 8, apart({ face: FACE.sheep }, CROOK, 0));
  [[D.T1, 8], [D.T2, 6]].forEach(([base, ticks], i) => { const ol = xf(base, CROOK); k.add('doze' + i, ticks, xf(base, { extra: { line: 'none', front: (c, d, seed) => line(c, ol, seed) } })); });
  k.add('asleep', 4, xf(D.S1, {}));
  k.done({ doze: false });
})();

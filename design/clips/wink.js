// Wink: he looks straight at you, leans in a touch, and winks, with a small sparkle off the closed eye.
(() => {
  const { D, xf, kit } = window.__lump, k = kit.clip('wink');
  const at = (z, face, extra = {}) => xf(D.N, { face, extra: { view: kit.zoom(z, [128, 112]), ...extra } });
  kit.steps(1, 1.5, 4).forEach((z, i) => k.add('in' + i, 2, at(z, kit.look(0, 0, 'flat'))));
  k.add('look', 8, at(1.5, kit.look(0, 0, 'smile')));
  k.add('shut', 2, at(1.5, kit.faces.wink, { front: c => kit.sparkle(c, 156, 98, 5) }));
  k.add('wink', 12, xf(D.N, { face: kit.faces.wink, rot: 0.05, extra: { view: kit.zoom(1.5, [128, 112]), front: c => kit.sparkle(c, 160, 94, 10) } }));
  k.add('after', 6, at(1.5, kit.look(0, 0, 'smile')));
  kit.steps(1.5, 1, 4).forEach((z, i) => k.add('out' + i, 2, at(z, kit.look(0, 0, 'smile'))));
  k.done();
})();

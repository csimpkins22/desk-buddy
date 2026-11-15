// He hops into a top hat on the right and vanishes; a second hat drops in top left, upside down, and he falls out of it, then looks from one hat to the other.
(() => {
  const { D, xf, FACE, kit } = window.__lump, { TAU } = kit;
  const k = kit.clip('magic_hat_b');
  const H1 = [200, 152], H2 = [46, 62], LAND = -24;

  // a top hat with its brim at (x, y): dir 1 stands on its crown with the opening up, dir -1 hangs crown up with the opening down
  const hat = (c, x, y, dir, sq = 1) => {
    const w = 20 * sq, h = 48 / sq;
    c.save(); c.translate(x, y); c.lineJoin = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.8; c.fillStyle = '#2B3140';
    c.beginPath(); c.moveTo(-w, 0); c.lineTo(-w + 2, h * dir); c.lineTo(w - 2, h * dir); c.lineTo(w, 0); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = kit.RED; c.fillRect(-w + 2, dir > 0 ? 7 : -16, 2 * w - 4, 9);
    c.fillStyle = '#2B3140'; c.beginPath(); c.ellipse(0, 0, 28 * sq, 7, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = '#0B0C10'; c.beginPath(); c.ellipse(0, 0, 19 * sq, 3.5, 0, 0, TAU); c.fill();
    c.restore();
  };
  const one = (x = H1[0], sq) => c => hat(c, x, H1[1], 1, sq);
  const both = (y = H2[1], sq, x = H1[0]) => c => { hat(c, x, H1[1], 1); hat(c, H2[0], y, -1, sq); };
  // him in the air with his feet at (x, y)
  const air = (x, y, s, o = {}) => ({ k: s, dx: x - 128, dy: y - 201, shadowK: 0.5, ...o });

  kit.steps(290, H1[0], 4).forEach((x, i) => k.add('in' + i, 2, xf(D.N, { dx: -34 * i / 3, rot: i % 2 ? 0.05 : -0.05, face: kit.look(5, 2), extra: { front: one(x) } })));
  k.add('see', 4, xf(D.N, { dx: -34, face: kit.look(5, 3, 'o'), extra: { front: one() } }));
  k.add('crouch', 4, xf(D.N, { dx: -34, ky: 0.84, kx: 1.08, face: kit.look(5, 0, 'flat'), extra: { front: one() } }));
  [[104, 168, 0.94], [126, 134, 0.84], [152, 114, 0.72], [178, 112, 0.6], [194, 134, 0.48, 1.15], [200, 172, 0.36, 1.1]].forEach(([x, y, s, ky = 1], i) =>
    k.add('hop' + i, 2, xf(D.N, { ...air(x, y, s, { ky, rot: 0.12 }), face: i < 4 ? FACE.happy : kit.faces.wide, extra: { front: one() } })));
  const stars = (c, s) => [[178, 126], [204, 112], [224, 130]].forEach(([x, y]) => kit.sparkle(c, x, y, s));
  k.add('gulp0', 2, kit.gone({ front: c => { hat(c, ...H1, 1, 1.16); stars(c, 8); } }));
  k.add('gulp1', 2, kit.gone({ front: c => { hat(c, ...H1, 1, 0.92); stars(c, 12); } }));
  k.add('gulp2', 2, kit.gone({ front: c => { hat(c, ...H1, 1); stars(c, 7); } }));
  k.add('only', 12, kit.gone({ front: one() }));

  [-12, 38, 68].forEach((y, i) => k.add('drop' + i, 2, kit.gone({ front: both(y) })));
  k.add('hang', 4, kit.gone({ front: both() }));
  k.add('spit', 2, kit.gone({ front: both(H2[1], 1.16) }));
  [[56, 98, 0.36, -0.5], [72, 134, 0.6, -0.3], [90, 170, 0.85, -0.12]].forEach(([x, y, s, rot], i) =>
    k.add('fall' + i, 2, xf(D.N, { ...air(x, y, s, { rot }), face: FACE.shock, extra: { front: both(H2[1], i ? 1 : 0.94) } })));
  k.add('land', 2, xf(D.N, { dx: LAND, ky: 0.8, kx: 1.12, face: FACE.aah, extra: { front: both() } }));
  k.add('dizzy', 6, xf(D.N, { dx: LAND, face: FACE.spiral, extra: { front: both() } }));
  k.add('look1', 10, xf(D.N, { dx: LAND, face: kit.look(5, 3, 'flat'), extra: { front: both() } }));
  k.add('look2', 10, xf(D.N, { dx: LAND, face: kit.look(-5, -5, 'o'), extra: { front: both() } }));
  const ask = s => c => { both()(c); kit.mark(c, '?', 150, 52, s); };
  k.add('ask0', 2, xf(D.N, { dx: LAND, face: kit.look(0, 0, 'flat'), extra: { front: ask(0.5) } }));
  k.add('ask1', 12, xf(D.N, { dx: LAND, face: kit.look(0, 0, 'flat'), extra: { front: ask(1) } }));
  [[232, 30, 0.5], [262, -4], [296, -40]].forEach(([x, y, q], i) => k.add('clear' + i, 2, xf(D.N, { dx: LAND * (2 - i) / 3, rot: i % 2 ? 0.04 : -0.04, face: kit.look(0, 0, 'smile'),
    extra: { front: c => { both(y, 1, x)(c); if (q) kit.mark(c, '?', 150, 52, q); } } })));
  k.done();
})();

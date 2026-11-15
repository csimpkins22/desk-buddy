// An extreme close-up of his straining face, teeth gritted, sweating and trembling; then the view pulls back to show he is lifting a tiny dumbbell with one nub.
(() => {
  const { D, xf, FACE, kit } = window.__lump;
  const k = kit.clip('weightlift_b');
  const F = [122, 112], CLOSE = 2.8;
  const strain = [['stroke', [[106, 103], [121, 109], [106, 115]], 3.2], ['stroke', [[150, 101], [135, 107], [150, 113]], 3.2],
                  ['stroke', [[104, 93], [122, 99]], 2.8], ['stroke', [[134, 98], [152, 91]], 2.8], ['teeth', 128, 127, 30, 12]];

  const bead = (c, x, y, r = 4.5) => {
    c.save(); c.fillStyle = kit.BLUE; c.strokeStyle = kit.CREAM; c.lineWidth = 1.6; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(x, y - r * 1.9); c.quadraticCurveTo(x + r * 1.2, y, x, y + r); c.quadraticCurveTo(x - r * 1.2, y, x, y - r * 1.9); c.fill(); c.stroke(); c.restore();
  };
  // two beads of sweat running down his temples; p is how far down they are
  const sweat = (c, p, dx = 0) => { const q = (p + 0.5) % 1; bead(c, 97 - 5 * p + dx, 88 + 44 * p); bead(c, 160 + 6 * q + dx, 84 + 44 * q); };
  const bell = (c, x, y, a = -0.5) => {
    c.save(); c.translate(x, y); c.rotate(a); c.lineCap = c.lineJoin = 'round';
    c.strokeStyle = kit.GREY; c.lineWidth = 5; c.beginPath(); c.moveTo(-10, 0); c.lineTo(10, 0); c.stroke();
    c.fillStyle = '#4A5568'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.4;
    c.beginPath(); c.roundRect(-18, -10, 8, 20, 2); c.roundRect(10, -10, 8, 20, 2); c.fill(); c.stroke(); c.restore();
  };
  // straining: shaking by `sh`, the nub up on the right with the dumbbell in it once the view is wide enough to see it
  const lift = (sh, view, p, shown = true) => {
    const hand = [200, 116 + sh * 1.5];
    return xf(D.N, { dx: sh, face: strain, extra: { ...(view && { view }), arm2: [[166 + sh, 140], hand], front: c => { sweat(c, p, sh); if (shown) bell(c, hand[0] + 5, hand[1] - 5); } } });
  };

  const zin = kit.steps(1, CLOSE, 4).slice(1);
  k.add('in0', 2, xf(D.N, { face: kit.look(0, 0, 'flat'), extra: { view: kit.zoom(zin[0], F) } }));
  k.add('in1', 2, xf(D.N, { face: strain, extra: { view: kit.zoom(zin[1], F) } }));
  for (let i = 0; i < 6; i++) k.add('grit' + i, 2, lift(i % 2 ? 1.2 : -1.2, kit.view(CLOSE, F), i / 6, false));
  for (let n = 0; n < 2; n++) for (let i = 0; i < 6; i++) k.add('grit' + i, 2);
  kit.steps(CLOSE, 1, 5).slice(1).forEach((z, i) => k.add('back' + i, 2, lift(i % 2 ? 1.2 : -1.2, kit.zoom(z, F), i / 6)));
  k.add('tiny0', 2, lift(-1.2, null, 0.7)); k.add('tiny1', 2, lift(1.2, null, 0.85));
  for (let n = 0; n < 2; n++) { k.add('tiny0', 2); k.add('tiny1', 2); }

  const held = { arm2: [[166, 140], [200, 118]], front: c => bell(c, 205, 113) };
  k.add('us', 8, xf(D.N, { face: kit.look(0, 0, 'flat'), extra: held }));
  k.add('shrug', 8, xf(D.N, { ky: 1.03, face: FACE.sheep, extra: { arm: [[90, 140], [64, 126]], arm2: [[166, 140], [198, 122]], front: c => bell(c, 203, 117) } }));
  [[222, 98, [196, 126]], [240, 100, [192, 136]], [262, 122, null]].forEach(([x, y, hand], i) =>
    k.add('toss' + i, 2, xf(D.N, { face: FACE.happy, extra: { ...(hand && { arm2: [[166, 140], hand] }), front: c => bell(c, x, y, -0.5 + i * 0.6) } })));
  k.done();
})();

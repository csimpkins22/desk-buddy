// A pan slides in while he sleeps and one kernel pops, waking him. Then popcorn fills the screen from the bottom, lifting him to the top edge until only his eyes and cowlick show. He dozes off buried.
// group: scenes
(() => {
  const { xf, D, kit, hash } = window.__lump, { CREAM, YELLOW, GREY, TAU } = kit;
  const k = kit.clip('popcorn', { asleep: true });
  const FILL = '#FFF6DC', EDGE = '#C89B4A', BUTTER = '#E2B85C', PAN = '#5B6676';
  const puff = (c, x, y, side) => { c.moveTo(x + 15, y); c.arc(x, y, 15, 0, TAU); c.moveTo(x + side * 10 + 10, y - 8); c.arc(x + side * 10, y - 8, 10, 0, TAU); };
  // popcorn from `top` down to the bottom of the screen (or just `rows` of it)
  const heap = (c, top, rows = 99) => {
    if (top > 254) return;
    c.save(); c.lineJoin = c.lineCap = 'round';
    if (top + 14 < 240) { c.fillStyle = BUTTER; c.fillRect(0, top + 14, 240, 226 - top); }
    c.fillStyle = FILL; c.strokeStyle = EDGE; c.lineWidth = 2.4;
    for (let r = 0; r < rows && top + r * 24 - 4 < 240; r++) {
      c.beginPath();
      for (let i = 0; i < 8; i++) puff(c, -4 + i * 34 + (r % 2) * 17 + (hash(r * 7.3 + i * 3.1) - 0.5) * 10, top + 14 + r * 24 + (hash(r * 5.7 + i * 9.4) - 0.5) * 8, hash(r + i * 1.7) > 0.5 ? 1 : -1);
      c.fill(); c.stroke();
    }
    c.restore();
  };
  const pan = (c, x, kernel = true) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = GREY; c.lineWidth = 5;
    c.beginPath(); c.moveTo(x + 20, 186); c.lineTo(x + 40, 176); c.stroke();
    if (kernel) { c.fillStyle = YELLOW; c.beginPath(); c.ellipse(x, 180, 7, 5.5, 0, 0, TAU); c.fill(); }
    c.fillStyle = PAN; c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath(); c.roundRect(x - 22, 180, 44, 22, 6); c.fill(); c.stroke();
    c.restore();
  };
  const one = (c, x, y) => { c.save(); c.fillStyle = FILL; c.strokeStyle = EDGE; c.lineWidth = 2.4; c.beginPath(); puff(c, x, y, 1); c.fill(); c.stroke(); c.restore(); };
  const lines = (c, pts) => { c.save(); c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); pts.forEach(([a, b, x, y]) => { c.moveTo(a, b); c.lineTo(x, y); }); c.stroke(); c.restore(); };
  const PX = 35;

  [-36, -2, PX].forEach((x, i) => k.add('pan' + i, 2, xf(D.S1, { extra: { front: c => pan(c, x) } })));
  [-2, 2].forEach((dx, i) => k.add('shake' + i, 4, xf(D.S1, { extra: { front: c => { pan(c, PX + dx); lines(c, i ? [[8, 176, 4, 170], [58, 172, 63, 166]] : [[10, 170, 6, 163], [56, 176, 62, 172]]); } } })));
  k.add('shake0', 4);
  k.add('pop0', 2, xf(D.S1, { extra: { front: c => { pan(c, PX, false); c.fillStyle = YELLOW; c.beginPath(); c.ellipse(PX, 154, 7, 5.5, 0, 0, TAU); c.fill(); } } }));
  k.add('pop1', 4, xf(D.K1, { extra: { front: c => { pan(c, PX, false); one(c, 34, 126); lines(c, [[14, 112, 6, 104], [54, 112, 62, 104], [34, 100, 34, 90], [12, 132, 3, 134]]); } } }));
  k.add('pop2', 2, xf(D.N, { face: kit.look(-6, -3, 'o'), extra: { front: c => { pan(c, PX, false); one(c, 44, 150); } } }));
  k.add('pop3', 2, xf(D.N, { face: kit.look(-7, 2, 'o'), extra: { front: c => { pan(c, PX, false); one(c, 56, 178); } } }));
  const still = c => { pan(c, PX, false); one(c, 62, 190); };
  k.add('pop4', 8, xf(D.N, { face: kit.look(-8, 6, 'flat'), extra: { front: still } }));
  // the heap comes up from the bottom edge and takes him with it
  const N = 18;
  for (let i = 0; i < N; i++) {
    const top = 246 - (i + 1) * (103 / N), feet = Math.min(201, top + 10), up = feet < 201;
    k.add('rise' + i, 2, xf(D.N, { dy: feet - 201, rot: up ? (i % 2 ? 0.04 : -0.04) : 0, shadowK: up ? 0 : 1, face: up ? kit.faces.worried : kit.look(0, 6, 'o'),
      extra: { back: c => up && heap(c, top - 14, 2), front: c => { still(c); heap(c, top); } } }));
  }
  // pressed against the top edge: he squashes, and the popcorn climbs up his face
  const buried = (t, face) => { const ky = 1 - 0.25 * t, feet = 4 + 149 * ky, top = 143 + (62 - 143) * t;
    return xf(D.N, { ky, kx: 1 + 0.18 * t, dy: feet - 201, shadowK: 0, face, extra: { back: c => heap(c, top - 14, 2), front: c => heap(c, top) } }); };
  const peep = g => [['dot', 116 + g, 109, 4.2], ['dot', 140 + g, 107, 4.2]];
  kit.steps(0, 1, 6).slice(1).forEach((t, i) => k.add('press' + i, 2, buried(t, t < 0.7 ? kit.faces.wide : peep(0))));
  k.add('peep_l', 8, buried(1, peep(-4))); k.add('peep_r', 8, buried(1, peep(4))); k.add('peep_c', 6, buried(1, peep(0)));
  k.add('droop', 4, buried(1, [['stroke', [[110, 110], [122, 110]], 3], ['stroke', [[134, 108], [146, 108]], 3]]));
  k.add('doze', 16, buried(1, kit.faces.closed.slice(0, 2)));
  k.done();
})();

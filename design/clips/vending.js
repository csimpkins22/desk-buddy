// Vending: he presses a button on a vending machine, the snack sticks, he shakes the machine, and everything falls out at once.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('vending'), { CREAM, GREY, DARK, YELLOW, RED, GREEN, TAU } = kit;
  const BX = 182, COLS = [YELLOW, RED, GREEN, RED, GREEN, YELLOW];
  const HOME = [[-4, -124], [18, -124], [-4, -98], [18, -98], [-4, -72], [18, -72]];
  const PILE = [[134, 193, 0.3], [152, 194, -0.2], [170, 193, 1.2], [143, 180, -0.5], [161, 181, 0.4], [190, 194, 1.5]];
  const at = ([x, y], a) => [BX + x * Math.cos(a) - y * Math.sin(a), 201 + x * Math.sin(a) + y * Math.cos(a), a];
  const ink = (c, w = 2.8) => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = w; };
  const machine = (c, a) => {
    c.save(); c.translate(BX, 201); c.rotate(a); ink(c);
    c.fillStyle = GREY; c.beginPath(); c.roundRect(-38, -146, 76, 146, 6); c.fill(); c.stroke();
    c.fillStyle = DARK; c.beginPath(); c.rect(-14, -138, 46, 86); c.roundRect(-28, -40, 56, 22, 4); c.fill();
    c.fillRect(-30, -96, 7, 12);
    c.fillStyle = RED; c.lineWidth = 2.2; c.beginPath(); c.arc(-26, -70, 6, 0, TAU); c.fill(); c.stroke();
    c.restore();
  };
  const snack = (c, [x, y, r], col) => {
    c.save(); c.translate(x, y); c.rotate(r); ink(c, 2); c.fillStyle = col; c.beginPath(); c.roundRect(-6.5, -8, 13, 16, 3); c.fill(); c.stroke(); c.restore();
  };
  const home = (a, stuck) => HOME.map((p, i) => i === 4 && stuck ? at(stuck, a).map((v, j) => j === 2 ? v + stuck[2] : v) : at(p, a));
  const sit = { k: 0.9, dx: -56 };
  const f = (o, face, { a = 1, tilt = 0, items = home(tilt), hand, q } = {}) => xf(D.N, { ...o, face, extra: {
    ...(hand ? { arm2: [kit.pt(o, [166, 140]), hand] } : {}),
    front: c => { kit.fade(c, a, () => { machine(c, tilt); items.forEach((p, i) => snack(c, p, COLS[i])); }); if (q) kit.mark(c, '?', 72, 74); } } });

  const ks = kit.steps(1, 0.9, 3), xs = kit.steps(0, -56, 3);
  ks.forEach((s, i) => k.add('in' + i, 2, f({ k: s, dx: xs[i] }, FACE.lookr, { a: [0.35, 0.7, 1][i] })));
  k.add('reach', 2, f(sit, FACE.lookr, { hand: [140, 138] }));
  k.add('press', 4, f({ ...sit, rot: 0.04 }, FACE.happy, { hand: [152, 131] }));
  k.add('slip', 2, f(sit, FACE.happy, { hand: [152, 131], items: home(0, [-4, -66, 0.2]) }));
  const stuck = [-2, -59, 0.6];
  k.add('stuck', 10, f(sit, FACE.grump, { hand: [140, 140], items: home(0, stuck), q: true }));
  k.add('sh0', 2, f({ ...sit, rot: 0.06 }, FACE.puff, { hand: [144, 116], tilt: 0.05, items: home(0.05, stuck) }));
  k.add('sh1', 2, f({ ...sit, rot: -0.03 }, FACE.puff, { hand: [140, 118], tilt: -0.04, items: home(-0.04, stuck) }));
  for (let i = 0; i < 2; i++) { k.add('sh0', 2); k.add('sh1', 2); }
  const from = home(0, stuck);
  [0.3, 0.65, 1].forEach((t, i) => k.add('fall' + i, 2, f(sit, FACE.shock, { hand: [136, 148], items: from.map((p, j) => p.map((v, n) => v + (PILE[j][n] - v) * t)) })));
  k.add('pile', 16, f({ ...sit, ky: 1.04 }, FACE.happy, { items: PILE }));
  k.add('out0', 2, f({ k: 0.93, dx: -37 }, FACE.happy, { items: PILE, a: 0.6 }));
  k.add('out1', 2, f({ k: 0.97, dx: -18 }, FACE.happy, { items: PILE, a: 0.3 }));
  k.done();
})();

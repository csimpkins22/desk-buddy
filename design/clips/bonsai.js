// Quiet: close on a little tree at the left, he leans in from the right with shears, makes one careful snip, watches the leaf drift down, and nods.
(() => {
  const { D, xf, boil, closedPath } = window.__lump, kit = window.__lump.kit, { CREAM, GREEN, GREY, RED, TAU } = kit;
  const k = kit.clip('bonsai');
  const TX = -52, POT = '#C4623A', RIM = '#8E4426', WOOD = '#8A5F2A', LEAF = '#2E9E62';
  const cam = t => kit.view(1 + 0.2 * t, [120 - 120 * t, 120 - 4 * t], [120, 120]);

  const leaf = (c, x, y, rot) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.fillStyle = GREEN; c.strokeStyle = CREAM; c.lineWidth = 2; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(-10, 0); c.quadraticCurveTo(0, -9, 10, 0); c.quadraticCurveTo(0, 9, -10, 0); c.fill(); c.stroke(); c.restore();
  };
  // the tree stands off to the left of where he sleeps, its pot on the floor at x = TX; `cut` once the long sprig has been snipped
  const tree = (c, seed, cut) => {
    c.save(); c.translate(TX, 201); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.fillStyle = RIM; c.fillRect(-17, -4, 8, 4); c.fillRect(9, -4, 8, 4);
    c.fillStyle = POT; c.beginPath(); c.moveTo(-26, -25); c.lineTo(26, -25); c.lineTo(20, -4); c.lineTo(-20, -4); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = RIM; c.beginPath(); c.roundRect(-30, -32, 60, 8, 3); c.fill(); c.stroke();
    c.save(); c.strokeStyle = WOOD; c.lineWidth = 5;
    [[[-12, -56], [-28, -68]], [[5, -74], [26, -84]], [[36, -94], cut ? [44, -102] : [55, -113]]].forEach(([a, b]) => { c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); });
    c.restore();
    closedPath(c, boil([[-9, -32], [-17, -52], [-9, -72], [1, -88], [-1, -102], [8, -102], [12, -86], [4, -70], [-3, -54], [9, -32]], seed + 3, 0.8)); c.fillStyle = WOOD; c.fill(); c.stroke();
    kit.puff(c, -30, -76, seed, 13, GREEN); kit.puff(c, 30, -90, seed + 1, 13, GREEN); kit.puff(c, 2, -112, seed + 2, 17, GREEN);
    c.fillStyle = LEAF; [[-34, -72], [-24, -80], [26, -86], [35, -93], [-4, -108], [8, -116], [2, -104]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); });
    if (!cut) leaf(c, 61, -119, -0.75);
    c.restore();
  };
  // shears held at (x, y), pointing along ang, blades open by `open` radians
  const shears = (c, x, y, ang, open) => {
    c.save(); c.translate(x, y); c.rotate(ang); c.scale(1.5, 1.5); c.lineCap = c.lineJoin = 'round';
    [-1, 1].forEach(s => {
      c.save(); c.translate(10, 0); c.rotate(s * open / 2);
      c.fillStyle = GREY; c.strokeStyle = CREAM; c.lineWidth = 1.6; c.beginPath(); c.moveTo(-2, s * 3.5); c.lineTo(22, 0); c.lineTo(-2, -s * 0.5); c.closePath(); c.fill(); c.stroke();
      c.strokeStyle = RED; c.lineWidth = 2.2; c.beginPath(); c.arc(-9, -s * 5.5, 4.5, 0, TAU); c.stroke();
      c.restore();
    });
    c.restore();
  };
  const shot = (o, face, { t = 1, cut = false, sh, lf, snip } = {}) => {
    const oo = { dx: -46, ...o }, S = kit.pt(oo, [90, 140]);
    return xf(D.N, { ...oo, face, extra: { view: cam(t), ...(sh ? { arm: [S, [sh[0], sh[1]]] } : {}), back: (c, d, seed) => tree(c, seed, cut),
      front: c => { if (sh) shears(c, ...sh); if (lf) leaf(c, ...lf);
        if (snip) { c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.4; c.lineCap = 'round'; [[-18, 92, -26, 88], [-16, 104, -24, 108], [2, 104, 8, 110]].forEach(([a, b, x, y]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(x, y); c.stroke(); }); c.restore(); } } } });
  };
  const AT = [24.3, 134.8, -2.2], lean = { rot: -0.25 }, back = { rot: -0.1 }, tip = [TX + 61, 201 - 119, -0.75];

  kit.walk(0, -46, 5, {}).forEach((o, i) => k.add('go' + i, 4, shot(o, kit.look(-5, 0), { t: kit.steps(0, 1, 5)[i] })));
  k.add('see', 6, shot({}, kit.look(-5, -2)));
  k.add('lean0', 4, shot({ rot: -0.13 }, kit.look(-5, -2)));
  k.add('lean1', 4, shot(lean, kit.look(-5, -2, 'flat')));
  k.add('take0', 4, shot(lean, kit.look(-5, -2, 'flat'), { sh: [22, 158, -1.5, 0] }));
  k.add('take1', 14, shot(lean, kit.look(-5, -2, 'flat'), { sh: [20, 146, -1.9, 0] }));
  k.add('open', 4, shot(lean, kit.look(-5, -3, 'flat'), { sh: [22, 140, -2.05, 0.7] }));
  k.add('at', 12, shot(lean, kit.look(-5, -3, 'o'), { sh: [...AT, 0.7] }));
  k.add('snip', 4, shot(lean, kit.look(-5, -3, 'o'), { sh: [...AT, 0], cut: true, lf: tip, snip: true }));
  k.add('cut', 6, shot(lean, kit.look(-5, -3, 'flat'), { sh: [...AT, 0], cut: true, lf: tip }));
  const down = { cut: true, sh: [kit.pt({ dx: -46, ...back }, [90, 140])[0] - 13, 158, -1.9, 0] };
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    k.add('fall' + i, 4, shot(back, kit.look(-6, -3 + 8 * t, 'flat'), { ...down, lf: [2 + 12 * Math.sin(t * TAU * 1.5) * (1 - t * 0.4), 84 + 113 * t, 0.7 * Math.cos(t * TAU * 1.5) * (1 - t) + 0.1] }));
  }
  const lain = [2, 197, 0.1];
  k.add('think', 14, shot({ rot: -0.03 }, kit.look(-5, -3, 'flat'), { ...down, lf: lain }));
  k.add('nod0', 4, shot({ rot: -0.12, ky: 0.93 }, kit.faces.closed, { ...down, lf: lain }));
  k.add('nod1', 4, shot({ rot: -0.03 }, kit.faces.closed, { ...down, lf: lain }));
  k.add('nod0', 4);
  k.add('nod1', 6);
  kit.walk(-46, 0, 5, {}).forEach((o, i) => k.add('home' + i, 4, shot(o, kit.faces.closed, { t: kit.steps(1, 0, 5)[i], cut: true, lf: lain })));
  k.done();
})();

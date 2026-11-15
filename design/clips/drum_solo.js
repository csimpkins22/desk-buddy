// Close in and fast: sticks, cymbals and a determined face, his nubs a blur. One stick leaves. He ends the roll with his forehead on the snare and stays there.
(() => {
  const { D, xf, FACE, kit } = window.__lump;
  const { CREAM, YELLOW, BLUE, WHITE, GREY, TAU, steps, pt, look } = kit;
  const k = kit.clip('drum_solo');
  const FOCUS = [128, 132], V = kit.zoom(1.4, FOCUS);
  const SH = { L: [90, 140], R: [166, 140] };
  // where a hand can be, and where its stick points: 0 raised, 1 on the cymbal, 2 on the snare
  const POS = { L: [[[68, 112], [56, 82]], [[62, 122], [78, 137]], [[96, 152], [117, 166]]], R: [[[188, 112], [200, 82]], [[194, 122], [178, 137]], [[160, 152], [139, 166]]] };

  const drums = (c, off, tl, tr, hit) => {
    c.save(); c.translate(0, off); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM;
    c.lineWidth = 2.6; [74, 182].forEach(x => { c.beginPath(); c.moveTo(x, 142); c.lineTo(x, 222); c.stroke(); });
    c.fillStyle = BLUE; c.lineWidth = 2.8;
    c.beginPath(); c.moveTo(90, 168); c.lineTo(90, 196); c.ellipse(128, 196, 38, 10, 0, Math.PI, 0, true); c.lineTo(166, 168); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = WHITE; c.beginPath(); c.ellipse(128, 168, 38, 10, 0, 0, TAU); c.fill(); c.stroke();
    [[74, tl], [182, tr]].forEach(([x, t]) => {
      c.fillStyle = YELLOW; c.beginPath(); c.ellipse(x, 140, 28, 7, t, 0, TAU); c.fill(); c.stroke();
      c.fillStyle = CREAM; c.beginPath(); c.arc(x, 139, 3.4, 0, TAU); c.fill();
    });
    if (hit) { c.lineWidth = 3; [[50, 126, 38, 114], [206, 126, 218, 114], [102, 152, 96, 140], [154, 152, 160, 140]].forEach(([x0, y0, x1, y1]) => { c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); }); }
    c.restore();
  };
  const stick = (c, [hx, hy], [tx, ty]) => {
    c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 4.2; c.beginPath(); c.moveTo(hx - (tx - hx) * 0.25, hy - (ty - hy) * 0.25); c.lineTo(tx, ty); c.stroke();
    c.fillStyle = YELLOW; c.beginPath(); c.arc(tx, ty, 3.2, 0, TAU); c.fill();
  };
  // one side's arm: every position in `ghost` faintly and `solid` on top, each with a stick unless bare
  const limb = (c, side, solid, ghost, seed, o = {}, bare = false) => {
    const sh = pt(o, SH[side]), dy = sh[1] - SH[side][1];
    const one = i => { const [h, t] = POS[side][i], hand = [h[0], h[1] + dy]; kit.arm(c, [sh, hand], seed + i); if (!bare) stick(c, hand, [t[0], t[1] + dy * 0.5]); };
    ghost.filter(i => i !== solid).forEach(i => kit.fade(c, 0.45, () => one(i)));
    one(solid);
  };
  const det = [['dot', 116, 110, 4], ['dot', 140, 108, 4], ['stroke', [[107, 99], [122, 104]], 3], ['stroke', [[134, 102], [149, 96]], 3], ['stroke', [[121, 125], [135, 124]], 3]];
  const shut = [['stroke', [[109, 108], [116, 111], [123, 108]], 3], ['stroke', [[133, 106], [140, 109], [147, 106]], 3], ['stroke', [[121, 125], [135, 124]], 3]];

  steps(1, 1.4, 4).slice(1).forEach((z, i) => k.add('in' + i, 2, xf(D.N, { face: det, extra: { view: kit.zoom(z, FOCUS), front: (c, d, seed) => { drums(c, [46, 18, 0][i], 0, 0); if (i) { limb(c, 'L', 0, [], seed); limb(c, 'R', 0, [], seed); } } } })));
  k.add('ready', 4, xf(D.N, { ky: 1.04, kx: 0.97, face: det, extra: { view: V, front: (c, d, seed) => { drums(c, 0, 0, 0); limb(c, 'L', 0, [], seed, { ky: 1.04 }); limb(c, 'R', 0, [], seed, { ky: 1.04 }); } } }));

  const LS = [1, 2, 0, 2, 1, 2], RS = [2, 0, 2, 1, 2, 1], ALL = [0, 1, 2];
  for (let i = 0; i < 6; i++) {
    const o = { ky: i % 2 ? 0.97 : 1.02 };
    D['drum_solo_r' + i] = xf(D.N, { ...o, face: det, extra: { view: V, front: (c, d, seed) => {
      drums(c, 0, LS[i] === 1 ? 0.22 : -0.1, RS[i] === 1 ? -0.22 : 0.1, LS[i] === 2 || RS[i] === 2);
      limb(c, 'L', LS[i], ALL, seed, o); limb(c, 'R', RS[i], ALL, seed, o);
      if (i % 2) kit.sweat(c, 160, 84, seed, 1); else kit.sweat(c, 96, 86, seed, -1);
    } } });
  }
  [0, 1, 2, 3, 4, 5, 0, 1].forEach(i => k.add('r' + i, 2));

  // the right stick leaves
  [[196, 86, 0.6], [205, 66, 2.2], [216, 44, 3.8]].forEach(([sx, sy, a], i) => k.add('fly' + i, 2, xf(D.N, { ky: i % 2 ? 0.98 : 1.02, face: i ? look(5, -4, 'o') : det, extra: { view: V, front: (c, d, seed) => {
    drums(c, 0, i % 2 ? 0.2 : -0.1, 0.08, i % 2 === 0);
    limb(c, 'L', i % 2 ? 1 : 2, ALL, seed); limb(c, 'R', 0, [], seed, {}, true);
    stick(c, [sx - Math.cos(a) * 12, sy - Math.sin(a) * 12], [sx + Math.cos(a) * 14, sy + Math.sin(a) * 14]);
  } } })));
  k.add('empty', 4, xf(D.N, { face: look(6, -3, 'flat'), extra: { view: V, front: (c, d, seed) => { drums(c, 0, 0, 0); limb(c, 'L', 0, [], seed); limb(c, 'R', 0, [], seed, {}, true); } } }));

  // ...so he finishes it with his head
  const head = (name, ticks, ky, face, hit, rest) => {
    const o = { ky, kx: 1 + (1 - ky) * 0.3 }, extra = { view: V, front: (c, d, seed) => { drums(c, hit ? 3 : 0, hit ? 0.2 : 0, hit ? -0.2 : 0, hit); limb(c, 'L', rest ? 2 : 1, [], seed, o); } };
    extra.arm2 = [pt(o, SH.R), pt(o, [198, 168])];
    if (rest) { extra.fxm = 'idle'; extra.fx = [168, 104]; }
    k.add(name, ticks, xf(D.N, { ...o, face, extra }));
  };
  const down = [FACE.aahEyes[0], FACE.aahEyes[1]], calm = [kit.faces.closed[0], kit.faces.closed[1]];
  head('bang0', 2, 0.62, down, true);
  head('lift0', 2, 1.04, shut, false);
  head('bang1', 2, 0.6, down, true);
  head('lift1', 2, 1.02, shut, false);
  head('bang2', 4, 0.58, down, true);
  head('rest', 14, 0.6, calm, false, true);
  k.done({ doze: false });
})();

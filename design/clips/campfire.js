// Campfire: he toasts a marshmallow over a small fire, it catches alight, and he blows it out sooty-faced.
(() => {
  const { D, xf, FACE, boil, closedPath, kit } = window.__lump, k = kit.clip('campfire');
  const { CREAM, DARK, YELLOW, RED, BROWN, WHITE, TAU } = kit;
  const tw = (a, b, n) => kit.steps(a, b, n + 1).slice(1);
  const pose = t => ({ k: 1 - 0.1 * t, dx: -30 * t }), O = pose(1), HAND = [152, 154], OVER = [192, 146], NEAR = [162, 112];
  const fire = (c, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    [[CREAM, 10], [BROWN, 6]].forEach(([col, w]) => { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(175, 198); c.lineTo(209, 191); c.moveTo(175, 191); c.lineTo(209, 198); c.stroke(); });
    c.strokeStyle = CREAM; c.lineWidth = 2.4; c.fillStyle = RED;
    closedPath(c, boil([[178, 190], [182, 170], [188, 176], [192, 156], [198, 174], [204, 168], [206, 190], [192, 196]], seed, 2.5)); c.fill(); c.stroke();
    c.fillStyle = YELLOW; closedPath(c, boil([[185, 190], [189, 177], [193, 168], [198, 180], [199, 190], [192, 194]], seed + 5, 2)); c.fill();
    c.restore();
  };
  const stick = (c, [x, y], burnt, flame, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    [[CREAM, 6], [BROWN, 3]].forEach(([col, w]) => { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(HAND[0], HAND[1]); c.lineTo(x, y); c.stroke(); });
    c.strokeStyle = CREAM; c.lineWidth = 2.4; c.fillStyle = burnt ? '#3A3A40' : WHITE; c.beginPath(); c.roundRect(x - 8, y - 7, 16, 13, 4); c.fill(); c.stroke();
    if (flame) { const f = flame; c.fillStyle = YELLOW; c.strokeStyle = RED; closedPath(c, boil([[x - 7 * f, y - 6], [x - 4 * f, y - 6 - 11 * f], [x, y - 6 - 22 * f], [x + 5 * f, y - 6 - 10 * f], [x + 7 * f, y - 6]], seed, 1.5)); c.fill(); c.stroke(); }
    c.restore();
  };
  const soot = (c, d, o) => {
    const [fx, fy] = kit.pt(o, [128, 116]);
    c.save(); closedPath(c, d.body); c.clip(); c.globalAlpha *= 0.7; c.fillStyle = DARK; c.beginPath(); c.ellipse(fx, fy, 36, 28, 0, 0, TAU); c.fill(); c.restore();
    [[116, 110], [140, 108]].forEach(p => { const [x, y] = kit.pt(o, p); c.fillStyle = CREAM; c.beginPath(); c.arc(x, y, 6, 0, TAU); c.fill(); c.fillStyle = DARK; c.beginPath(); c.arc(x, y, 2.6, 0, TAU); c.fill(); });
  };
  // s.a: opacity of the props; s.tip: where the marshmallow is; s.flame: size of its flame; s.burnt; s.soot; s.smoke: [x, y, r, opacity]
  const L = (face, o, s = {}) => xf(D.N, { ...o, face, extra: { arm2: [kit.pt(o, [166, 140]), HAND], front: (c, d, seed) => {
    kit.fade(c, s.a ?? 1, () => { fire(c, seed); stick(c, s.tip || OVER, s.burnt, s.flame, seed); if (s.soot) soot(c, d, o); });
    if (s.smoke) kit.fade(c, s.smoke[3], () => kit.puff(c, s.smoke[0], s.smoke[1], seed, s.smoke[2]));
  } } });

  tw(0, 1, 3).forEach((t, i) => k.add('go' + i, 2, L(FACE.lookr, pose(t), { a: t })));
  k.add('toast', 14, L(FACE.happy, O));
  k.add('sniff', 6, L(FACE.lookup, { ...O, ky: 1.03 }));
  [0.5, 1].forEach((flame, i) => k.add('lit' + i, 2, L(i ? FACE.shock : FACE.lookr, O, { flame })));
  k.add('eek', 4, L(FACE.shock, { ...O, ky: 0.96 }, { flame: 1.1 }));
  k.add('pull0', 2, L(FACE.shock, O, { flame: 1, tip: [178, 126] }));
  k.add('pull1', 2, L(FACE.shock, O, { flame: 1, tip: NEAR }));
  k.add('inhale', 2, L(FACE.ah, { ...O, ky: 1.06 }, { flame: 1.1, tip: NEAR }));
  k.add('blow0', 2, L(FACE.puff, { ...O, rot: 0.06 }, { flame: 0.7, tip: NEAR }));
  k.add('blow1', 2, L(FACE.puff, { ...O, rot: 0.06 }, { flame: 0.4, tip: NEAR }));
  k.add('blow2', 2, L(FACE.puff, { ...O, rot: 0.06 }, { burnt: 1, tip: NEAR, smoke: [128, 116, 20, 1] }));
  k.add('sooty0', 2, L([], O, { burnt: 1, tip: NEAR, soot: 1, smoke: [132, 92, 16, 0.5] }));
  k.add('sooty', 16, L([], O, { burnt: 1, tip: NEAR, soot: 1 }));
  [0.66, 0.33, 0].forEach((a, i) => k.add('off' + i, 2, L(a ? [] : FACE.grump, pose(a), { burnt: 1, tip: NEAR, soot: 1, a })));
  k.done();
})();

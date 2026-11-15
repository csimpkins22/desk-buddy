// Ice cream: he licks a cone, the scoop slides off, he looks down sadly, then catches it on the cone on the bounce.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('ice_cream');
  const { CREAM, BROWN, GREEN, WHITE, TAU } = kit;
  const tw = (a, b, n) => kit.steps(a, b, n + 1).slice(1);
  const SAD = [['dot', 120, 114, 3.8], ['dot', 144, 112, 3.8], ['stroke', [[122, 128], [129, 124], [136, 128]], 2.6]];
  const cone = (c, x, y) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.fillStyle = BROWN; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.moveTo(x - 11, y); c.lineTo(x + 11, y); c.lineTo(x, y + 32); c.closePath(); c.fill(); c.stroke(); c.restore();
  };
  const scoop = (c, x, y, sq = 0) => {
    c.save(); c.fillStyle = GREEN; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.ellipse(x, y, 13 * (1 + sq), 13 * (1 - sq), 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = WHITE; c.lineWidth = 3; c.beginPath(); c.arc(x, y, 7, -2.6, -1.6); c.stroke(); c.restore();
  };
  // s.cone: top centre of the cone; s.sc: [x, y, squash] of the scoop; s.a: opacity of both
  const L = (face, o, s, hand) => xf(D.N, { ...o, face, extra: { ...(hand ? { arm2: [kit.pt(o, [166, 140]), hand] } : {}), front: c => kit.fade(c, s.a ?? 1, () => {
    if (s.cone) cone(c, s.cone[0], s.cone[1]);
    if (s.sc) scoop(c, s.sc[0], s.sc[1], s.sc[2] || 0);
  }) } });
  const H = [194, 140], C = [196, 122], S = [196, 110];

  k.add('reach', 2, L(FACE.lookup, {}, {}, [182, 146]));
  tw(-60, 122, 3).forEach((y, i) => k.add('get' + i, 2, L(FACE.lookup, {}, { cone: [196, y], sc: [196, y - 12] }, H)));
  k.add('got', 4, L(FACE.happy, {}, { cone: C, sc: S }, H));
  D.ice_cream_lean = L(FACE.happy, { rot: 0.11 }, { cone: [190, 123], sc: [190, 111] }, [190, 140]);
  D.ice_cream_lick = L(FACE.cute, { rot: 0.22 }, { cone: [182, 124], sc: [181, 112] }, [186, 142]);
  for (let i = 0; i < 2; i++) { k.add('lean', 2); k.add('lick', 4); k.add('lean', 2); if (!i) k.add('got', 2); }
  [[202, 112, 0], [208, 132, 0], [210, 164, -0.1], [210, 192, 0.3]].forEach((sc, i) => k.add('slip' + i, 2, L(i ? FACE.shock : FACE.happy, {}, { cone: C, sc }, H)));
  k.add('sad', 10, L(SAD, { ky: 0.97 }, { cone: C, sc: [210, 192, 0.3] }, H));
  k.add('b0', 2, L(FACE.shock, {}, { cone: C, sc: [207, 150, -0.12] }, H));
  k.add('b1', 2, L(FACE.lookup, {}, { cone: C, sc: [200, 98, 0] }, H));
  k.add('catch', 2, L(FACE.happy, { ky: 0.96 }, { cone: [196, 126], sc: [196, 116, 0.2] }, [194, 144]));
  k.add('got', 12);
  [0.66, 0.33].forEach((a, i) => k.add('fin' + i, 2, L(FACE.happy, {}, { cone: C, sc: S, a }, H)));
  k.add('end', 2, L(FACE.happy, {}, {}));
  k.done();
})();

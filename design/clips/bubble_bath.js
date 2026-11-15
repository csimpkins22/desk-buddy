// Bubble bath: a tub of foam rises round him, he scoops a foam beard onto his face and blows it off in puffs.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('bubble_bath');
  const { CREAM, GREY, BLUE, WHITE, TAU } = kit;
  const tw = (a, b, n) => kit.steps(a, b, n + 1).slice(1);
  const tub = (c, yo, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.8;
    c.fillStyle = GREY; c.beginPath(); c.roundRect(46, 154 + yo, 164, 48, 18); c.fill(); c.stroke();
    c.fillStyle = BLUE; c.fillRect(62, 178 + yo, 132, 6);
    c.fillStyle = WHITE; c.lineWidth = 2.2;
    for (let i = 0; i < 9; i++) { c.beginPath(); c.arc(50 + i * 19.5, 150 + yo + (i % 2) * 4, 10 + (i * 2) % 3, 0, TAU); c.fill(); c.stroke(); }
    c.restore();
  };
  const L = (face, o, s, arms) => xf(D.N, { ...o, face, extra: { ...(arms ? { arm: arms[0], arm2: arms[1] } : {}), front: (c, d, seed) => {
    tub(c, s.yo || 0, seed);
    if (s.hands) arms.forEach(a => kit.puff(c, a[1][0], a[1][1] - 6, seed, 8, WHITE));
    if (s.beard) [[110, 132, 9], [146, 132, 9], [128, 140, 11]].forEach(([x, y, r], i) => kit.puff(c, x, y, seed + i, r * s.beard, WHITE));
    if (s.blow) { const t = s.blow; kit.fade(c, 1 - 0.8 * t, () => [[110 - 50 * t, 132 - 25 * t], [146 + 50 * t, 132 - 25 * t], [128 - 12 * t, 140 - 85 * t]].forEach(([x, y], i) => kit.puff(c, x, y, seed + i, 10 - 3 * t, WHITE))); }
  } } });
  const A = y => [[[90, 140], [72, y]], [[166, 140], [184, y]]], CHIN = [[[90, 140], [100, 130]], [[166, 140], [156, 130]]];

  tw(110, 0, 3).forEach((yo, i) => k.add('rise' + i, 2, L(FACE.lookr, {}, { yo })));
  k.add('sit', 6, L(FACE.happy, {}, {}));
  [146, 132, 118].forEach((y, i) => k.add('scoop' + i, 2, L(FACE.happy, {}, { hands: 1 }, A(y))));
  [0.4, 0.7, 1].forEach((b, i) => k.add('on' + i, 2, L(FACE.happy, {}, { beard: b }, CHIN)));
  k.add('armdn', 2, L(FACE.happy, {}, { beard: 1 }, A(152)));
  k.add('beard', 12, L(FACE.happy, { ky: 1.02 }, { beard: 1 }));
  k.add('look', 6, L(FACE.lookr, {}, { beard: 1 }));
  k.add('inhale', 4, L(FACE.ah, { ky: 1.06, kx: 0.97 }, { beard: 1 }));
  tw(0, 1, 4).forEach((t, i) => k.add('blow' + i, 2, L(FACE.puff, { ky: 0.96, kx: 1.03 }, { blow: t })));
  k.add('clean', 12, L(FACE.happy, {}, {}));
  tw(0, 110, 3).forEach((yo, i) => k.add('sink' + i, 2, L(FACE.happy, {}, { yo })));
  k.done();
})();

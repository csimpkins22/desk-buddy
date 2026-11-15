// High five: a smaller Lump walks in and offers one, pulls away at the last moment, he swings through and spins, and the small one giggles.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('high_five');
  const HOME = -44, TX = 56;
  const LOOK = [['dot', 112, 110, 5], ['dot', 136, 108, 5], ['stroke', [[118, 124], [125, 127], [132, 124]], 4]];
  const GIGGLE = [['stroke', [[108, 111], [114, 106], [120, 111]], 4], ['stroke', [[132, 109], [138, 104], [144, 109]], 4],
    ['mouth', [[116, 120], [128, 118], [140, 120], [128, 134]]], ['blush', 104, 120, 7, 4], ['blush', 150, 118, 7, 4]];

  // the small one: o places him, hand raises his left arm, ha adds giggle marks by his head
  const small = (o, face, hand, ha) => {
    const p = { k: 0.6, dx: TX, ...o }, td = xf(D.N, { ...p, face }), sh = kit.pt(p, [90, 140]), top = kit.pt(p, [100, 74]);
    return (c, d, seed) => {
      kit.twin(c, td, seed);
      c.save(); c.lineCap = 'round'; c.strokeStyle = kit.CREAM;
      if (hand) { c.lineWidth = 4; c.beginPath(); c.moveTo(sh[0], sh[1]); c.lineTo(hand[0], hand[1]); c.stroke(); }
      if (ha) {
        c.lineWidth = 3;
        [[-10, -4, -20, -10], [-4, -12, -9, -24], [-14, 6, -26, 6]].forEach(([x0, y0, x1, y1]) => {
          c.beginPath(); c.moveTo(top[0] + x0, top[1] + y0 + ha); c.lineTo(top[0] + x1, top[1] + y1 + ha); c.stroke();
        });
      }
      c.restore();
    };
  };
  // him: o places him, hand is where his right hand is (left if side is -1)
  const big = (o, face, front, hand, side = 1) => {
    const p = { dx: HOME, ...o }, extra = { front };
    if (hand) extra[side > 0 ? 'arm2' : 'arm'] = [kit.pt(p, side > 0 ? [166, 140] : [90, 140]), hand];
    return xf(D.N, { ...p, face, extra });
  };

  // setup: he shuffles aside as the small one hops in from the right
  const inX = kit.steps(150, TX, 5), outX = kit.steps(0, HOME, 5), hop = [0, -10, 0, -8, 0];
  inX.forEach((x, i) => k.add('in' + i, 2, big({ dx: outX[i] }, FACE.lookr, small({ dx: x, dy: hop[i] }, LOOK))));
  // the small one puts a hand up
  kit.steps(160, 132, 3).forEach((y, i) => k.add('offer' + i, 2, big({}, FACE.happy, small({}, LOOK, [150, y]))));
  k.add('offer', 6, big({ ky: 1.03 }, FACE.happy, small({}, LOOK, [148, 130])));

  // action: wind up, swing, and the hand is gone
  k.add('wind', 4, big({ rot: -0.12, ky: 0.96 }, FACE.happy, small({}, LOOK, [148, 130]), [116, 98]));
  k.add('swing', 2, big({ rot: 0.06 }, FACE.happy, small({ rot: 0.06 }, LOOK, [158, 140]), [142, 112]));
  k.add('miss', 2, big({ rot: 0.2 }, FACE.shock, small({ dx: TX + 2, ky: 0.8, kx: 1.06, rot: 0.1 }, GIGGLE), [156, 150]));

  // he spins round with his arm flung out while the small one starts to giggle
  const turn = [[0.6, 0.14, 1], [0.25, 0.08, 0], [0.6, 0, -1], [1, -0.06, -1], [0.6, 0, -1], [0.25, 0.04, 0], [0.6, 0.06, 1], [1, 0, 1]];
  turn.forEach(([kx, rot, side], i) => {
    const o = { kx, rot }, sh = kit.pt({ dx: HOME, ...o }, side > 0 ? [166, 140] : [90, 140]);
    const twin = small({ ky: i % 2 ? 1.05 : 0.93 }, GIGGLE, null, i % 2 ? 1 : -2);
    k.add('spin' + i, 2, big(o, kx < 0.3 ? [] : FACE.shock, twin, side ? [sh[0] + side * 30 * kx, sh[1] - 8] : null, side || 1));
  });

  // punchline: he sways, dizzy, and the small one shakes with giggles
  k.add('gigA', 4, big({ rot: 0.07, ky: 0.97 }, FACE.spiral, small({ ky: 0.92, kx: 1.05 }, GIGGLE, null, -2)));
  k.add('gigB', 4, big({ rot: -0.07, ky: 0.97 }, FACE.spiral, small({ ky: 1.06 }, GIGGLE, null, 1)));
  for (let i = 0; i < 2; i++) { k.add('gigA', 4); k.add('gigB', 4); }

  // the small one hops off, and he shuffles back, unimpressed
  kit.steps(TX, 150, 4).forEach((x, i) => k.add('out' + i, 2, big({}, FACE.grump, small({ dx: x, dy: i % 2 ? -9 : 0 }, GIGGLE))));
  kit.steps(HOME, 0, 3).forEach((x, i) => k.add('back' + i, 2, xf(D.N, { dx: x, face: FACE.grump })));
  k.add('end', 6, xf(D.N, { face: FACE.grump }));
  k.done();
})();

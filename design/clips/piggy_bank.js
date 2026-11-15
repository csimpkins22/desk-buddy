// Wide: tiny beside an enormous piggy bank, he climbs its side, drops his coin in the slot, leans to look after it and falls in; a beat of just the pig, then he rattles out of the bottom.
(() => {
  const { D, xf, boil, openPath } = window.__lump, kit = window.__lump.kit, { CREAM, BLUE, DARK, YELLOW, WHITE, TAU } = kit;
  const k = kit.clip('piggy_bank');
  const SHADE = '#3A8FD0', H = 80, PX = 455, PY = 35, RX = 180, RY = 130;
  const cam = t => { const z = 1 - 0.55 * t; return kit.view(z, [130 * t + 120 / z, 201], [120, 201 + 3 * t]); };
  const big = (dx = 0, dy = 0, mouth = ['oval', 128, 127, 4.5, 4.5]) => [['dot', 114 + dx, 108 + dy, 7], ['dot', 142 + dx, 106 + dy, 7], mouth];
  const grin = ['stroke', [[117, 123], [128, 131], [139, 123]], 5.5];
  const dizzy = [['spiral', 114, 108, 10], ['spiral', 142, 106, 10], ['oval', 128, 128, 5, 5]];

  // the pig stands well to the right of where he sleeps, facing right, its slot on top
  const pig = (c, seed, z, { shake = 0, blink, rattle } = {}) => {
    c.save(); c.translate(PX - 375 + shake, 0); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3 / z;
    [[300, SHADE], [480, SHADE], [245, BLUE], [425, BLUE]].forEach(([x, col]) => { c.fillStyle = col; c.beginPath(); c.roundRect(x, 110, 42, 91, 12); c.fill(); c.stroke(); });
    openPath(c, boil([[200, 22], [178, 8], [168, 26], [184, 36], [192, 22]], seed, 1.5)); c.stroke();
    c.fillStyle = BLUE; c.beginPath(); c.moveTo(452, -84); c.lineTo(500, -132); c.lineTo(508, -62); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(375, PY, RX, RY, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = SHADE; c.beginPath(); c.ellipse(553, 45, 22, 32, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = DARK; [[549, 34], [556, 56]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 4.5, 0, TAU); c.fill(); });
    if (blink) { c.beginPath(); c.moveTo(494, 0); c.lineTo(516, 0); c.stroke(); } else { c.beginPath(); c.arc(505, 0, 10, 0, TAU); c.fill(); }
    c.beginPath(); c.roundRect(372, -100, 56, 13, 6); c.fill(); c.stroke();
    c.strokeStyle = WHITE; c.lineWidth = 5 / z; c.beginPath(); c.ellipse(375, PY, 150, 102, 0, 3.5, 4.2); c.stroke();
    if (rattle) { c.strokeStyle = CREAM; c.lineWidth = 4 / z; [[176, -60, 146, -80], [166, 92, 134, 106], [574, -86, 600, -108], [604, 112, 634, 126]].forEach(([a, b, x, y]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(x, y); c.stroke(); }); }
    c.restore();
  };
  const coinAt = (c, x, y, z) => { c.save(); c.fillStyle = YELLOW; c.strokeStyle = CREAM; c.lineWidth = 3 / z; c.beginPath(); c.arc(x, y, 16, 0, TAU); c.fill(); c.stroke(); c.strokeStyle = '#B8860B'; c.lineWidth = 3; c.beginPath(); c.arc(x, y, 8, 0, TAU); c.stroke(); c.restore(); };
  // xf options that stand him on the pig's outline at th degrees round from its snout, leaning out from it
  const on = (th, lean = 0.7) => { const a = th * Math.PI / 180, x = PX + RX * Math.cos(a), y = PY - RY * Math.sin(a); return { dx: x - 128, dy: y - 201, rot: Math.atan2(Math.cos(a) / RX, Math.sin(a) / RY) * lean, shadowK: 0 }; };
  // carry: the coin in his raised right hand. coin: a coin anywhere. inside: he is behind the pig, not in front of it
  const shot = (o, face, { t = 1, carry, coin, inside, pg, spark, behind } = {}) => {
    const z = 1 - 0.55 * t, hand = carry && kit.pt(o, carry === 'out' ? [214, 122] : [200, 104]), drawPig = (c, d, seed) => pig(c, seed, z, pg);
    return xf(D.N, { ...o, face, extra: { view: cam(t), ...(carry ? { arm2: [kit.pt(o, [166, 140]), hand] } : {}),
      back: (c, d, seed) => { if (!inside) drawPig(c, d, seed); if (behind) coinAt(c, behind[0], behind[1], z); },
      front: (c, d, seed) => { if (inside) drawPig(c, d, seed); if (carry) coinAt(c, hand[0] + 8, hand[1] - 10, z); if (coin) coinAt(c, coin[0], coin[1], z); if (spark) kit.sparkle(c, PX - 375 + 400, -128, 22); } } });
  };
  const lone = (pg) => kit.gone({ view: cam(1), back: (c, d, seed) => pig(c, seed, 0.45, pg) });

  kit.walk(0, H, 5, {}).forEach((o, i) => k.add('back' + i, 2, shot(o, big(5, -3), { t: kit.steps(0, 1, 6)[i + 1] })));
  k.add('see', 6, shot({ dx: H }, big(6, -5)));
  k.add('coin0', 2, shot({ dx: H }, big(4, -2, grin), { coin: [H + 190, 150] }));
  k.add('coin1', 6, shot({ dx: H }, big(4, -2, grin), { carry: true }));
  k.add('j0', 2, shot({ dx: H, ky: 0.82, kx: 1.1 }, big(5, -4), { carry: true }));
  const c0 = on(160);
  k.add('j1', 2, shot({ dx: H + (c0.dx - H) * 0.3, dy: c0.dy * 0.45, rot: -0.3, ky: 1.08, shadowK: 0.5 }, big(5, -4), { carry: true }));
  k.add('j2', 2, shot({ dx: H + (c0.dx - H) * 0.7, dy: c0.dy * 0.82, rot: -0.6, shadowK: 0 }, big(5, -4), { carry: true }));
  k.add('j3', 2, shot({ ...c0, ky: 0.92 }, big(4, -4), { carry: true }));
  for (let i = 0; i < 8; i++) k.add('up' + i, 2, shot({ ...on(160 - 48 * (i + 1) / 8), ky: i % 2 ? 0.96 : 1.04 }, big(4, -4), { carry: true }));
  const top = { ...on(112, 0) };
  k.add('top', 4, shot(top, big(5, 4, grin), { carry: true }));
  k.add('drop0', 4, shot(top, big(5, 4), { carry: 'out' }));
  const slot = [PX + 25, -94], hand = kit.pt(top, [214, 122]);
  k.add('drop1', 2, shot(top, big(5, 5), { coin: [(hand[0] + 8 + slot[0]) / 2, (hand[1] - 10 + slot[1]) / 2 - 6] }));
  k.add('drop2', 2, shot(top, big(5, 5), { coin: [slot[0], slot[1] - 10] }));
  k.add('drop3', 4, shot(top, big(5, 5, grin), { spark: true }));
  k.add('lean0', 2, shot({ ...top, rot: 0.3 }, big(5, 6)));
  k.add('lean1', 6, shot({ ...top, rot: 0.6 }, big(4, 7)));
  k.add('lean2', 2, shot({ ...top, rot: 0.8 }, big(4, 7, ['oval', 128, 128, 7, 8])));
  k.add('lean1', 2);
  k.add('lean3', 2, shot({ ...top, rot: 0.95 }, big(4, 7, ['oval', 128, 128, 7, 8])));
  // in he goes, head first: turned about his middle, sinking behind the pig's back
  const dive = (rot, y, kk) => ({ rot, ox: 128, oy: 136, k: kk, dx: slot[0] - 128, dy: y - 136, shadowK: 0 });
  k.add('fall0', 2, shot(dive(1.7, -150, 1), big(0, 0, ['oval', 128, 128, 7, 8])));
  k.add('fall1', 2, shot(dive(2.7, -104, 0.85), big(0, 0, ['oval', 128, 128, 7, 8]), { inside: true }));
  k.add('fall2', 2, shot(dive(3.14, -64, 0.7), big(), { inside: true }));
  k.add('fall3', 2, shot(dive(3.14, -10, 0.6), big(), { inside: true }));
  k.add('pig', 6, lone());
  k.add('blink', 2, lone({ blink: true }));
  k.add('pig', 6);
  for (let n = 0; n < 2; n++) { k.add('r0', 2, lone({ shake: -7, rattle: true })); k.add('r1', 2, lone({ shake: 7, rattle: true })); }
  k.add('pig', 4);
  k.add('r0', 2); k.add('r1', 2);
  // out of the bottom, flat, and back to his spot
  const under = PX + 5 - 128;
  k.add('o0', 2, shot({ dx: under, dy: -22, ky: 0.3, kx: 0.9, shadowK: 0 }, dizzy, { inside: true, pg: { shake: 5 } }));
  [[under, 0.2, 1.3], [under - 70, 0.3, 1.25], [under - 140, 0.5, 1.15], [H + 50, 0.8, 1.05], [H, 1.06, 0.97]].forEach(([dx, ky, kx], i) => k.add('o' + (i + 1), 2, shot({ dx, ky, kx }, dizzy)));
  k.add('dz', 6, shot({ dx: H, rot: 0.06 }, dizzy));
  [[PX + 5, 180], [PX - 80, 187], [PX - 160, 187], [H + 214, 187]].forEach((p, i) => k.add('roll' + i, 2, shot({ dx: H, rot: i % 2 ? 0.06 : -0.06 }, dizzy, { coin: p })));
  k.add('found', 8, shot({ dx: H }, big(6, 6), { coin: [H + 214, 187] }));
  k.add('take0', 2, shot({ dx: H }, big(6, 6, grin), { behind: [H + 196, 178] }));
  k.add('take1', 2, shot({ dx: H }, big(0, 0, grin), { behind: [H + 170, 168] }));
  kit.walk(H, 0, 5, {}).slice(1).forEach((o, i) => k.add('home' + i, 2, shot(o, big(0, 0, grin), { t: kit.steps(1, 0, 5)[i + 1] })));
  k.done();
})();

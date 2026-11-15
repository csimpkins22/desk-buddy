// He pats a sandcastle; a wave takes the whole screen and him with it, then washes him back flat on the far left with a starfish on his head.
(() => {
  const { D, xf, FACE, boil, openPath, closedPath, kit } = window.__lump;
  const { CREAM, RED, BLUE, WHITE, YELLOW, TAU } = kit, k = kit.clip('sandcastle');
  const SAND = '#E0B860', WET = '#B08A3C', HERE = -20;
  // where a point on standing Lump lands after xf(D.N, o), whatever o turns him about
  const tp = (o, [x, y]) => {
    const ox = o.ox ?? 128, oy = o.oy ?? 201, r = o.rot || 0, u = (x - ox) * (o.kx ?? 1), v = (y - oy) * (o.ky ?? 1);
    return [ox + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), oy + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)];
  };
  const ink = (c, w = 2.6) => { c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = w; };
  const poly = (c, pts) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); };
  const castle = (c, rise) => {
    c.save(); c.beginPath(); c.rect(150, 100, 90, 102); c.clip(); c.translate(0, rise); ink(c);
    c.beginPath(); c.moveTo(199, 150); c.lineTo(199, 122); c.stroke();
    c.fillStyle = RED; poly(c, [[199, 122], [216, 128], [199, 135]]); c.fill(); c.stroke();
    c.fillStyle = SAND;
    poly(c, [[186, 174], [186, 148], [192, 148], [192, 154], [196, 154], [196, 148], [202, 148], [202, 154], [206, 154], [206, 148], [212, 148], [212, 174]]); c.fill(); c.stroke();
    poly(c, [[174, 203], [176, 172], [184, 172], [184, 178], [192, 178], [206, 178], [214, 178], [214, 172], [222, 172], [224, 203]]); c.fill(); c.stroke();
    c.fillStyle = WET; c.beginPath(); c.arc(199, 203, 8, Math.PI, TAU); c.fill(); c.stroke();
    c.restore();
  };
  // the big one, its curling front at f, filling everything behind it
  const wave = (c, f, seed) => {
    c.save(); ink(c, 3);
    closedPath(c, boil([[f - 34, 250], [f - 26, 205], [f - 14, 150], [f + 2, 112], [f + 24, 98], [f + 52, 96], [f + 46, 64], [f + 22, 38], [f - 14, 20], [f - 80, 10], [f - 200, 8], [f - 330, 10], [f - 430, 12], [f - 430, 250]], seed, 3));
    c.fillStyle = BLUE; c.fill(); c.stroke();
    c.strokeStyle = WHITE; c.lineWidth = 3.4;
    [[-52, 86], [-120, 70], [-76, 150]].forEach(([dx, y]) => { openPath(c, boil([[f + dx, y], [f + dx + 16, y + 26], [f + dx + 10, y + 54]], seed + dx, 2)); c.stroke(); });
    c.fillStyle = WHITE; ink(c, 2.2);
    [[50, 94, 9], [40, 76, 7], [58, 110, 6]].forEach(([dx, y, r]) => { c.beginPath(); c.arc(f + dx, y, r, 0, TAU); c.fill(); c.stroke(); });
    c.restore();
  };
  // the same water with nowhere left to go, its top at `top`
  const water = (c, top, seed) => {
    c.save(); ink(c, 3);
    closedPath(c, boil([[-14, top], [50, top - 5], [110, top + 4], [175, top - 4], [254, top], [254, 252], [-14, 252]], seed, 3));
    c.fillStyle = BLUE; c.fill(); c.stroke(); c.restore();
  };
  // a low sheet washing back in from the right, its front at g
  const sheet = (c, g, top, seed) => {
    c.save(); ink(c, 3);
    closedPath(c, boil([[g, 250], [g + 3, 212], [g + 12, top + 24], [g + 34, top + 7], [g + 80, top], [g + 170, top + 5], [g + 300, top], [g + 300, 250]], seed, 2.5));
    c.fillStyle = BLUE; c.fill(); c.stroke();
    c.fillStyle = WHITE; ink(c, 2.2);
    [[8, 30, 8], [22, 14, 6], [-2, 46, 5]].forEach(([dx, dy, r]) => { c.beginPath(); c.arc(g + dx, top + dy, r, 0, TAU); c.fill(); c.stroke(); });
    c.restore();
  };
  const wet = (c, seed, alpha = 1) => kit.fade(c, alpha, () => {
    ink(c);
    closedPath(c, boil([[174, 203], [184, 193], [198, 189], [213, 194], [224, 203]], seed, 1)); c.fillStyle = WET; c.fill(); c.stroke();
    c.fillStyle = BLUE; [[58, 216, 24, 5], [142, 226, 30, 6], [206, 218, 14, 4]].forEach(([x, y, rx, ry]) => { c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, TAU); c.fill(); });
    [[16, 207, 40], [92, 209, 34], [150, 207, 18], [100, 232, 22]].forEach(([x, y, w]) => { c.beginPath(); c.moveTo(x, y); c.lineTo(x + w, y); c.stroke(); });
  });
  const starfish = (c, [x, y], rot) => {
    c.save(); c.translate(x, y); c.rotate(rot); ink(c);
    poly(c, Array.from({ length: 10 }, (_, i) => { const a = i * TAU / 10 - TAU / 4, r = i % 2 ? 10 : 23; return [Math.cos(a) * r, Math.sin(a) * r]; }));
    c.fillStyle = YELLOW; c.fill(); c.stroke();
    c.fillStyle = RED; [[0, 0], [0, -10], [9, 5], [-9, 5]].forEach(([dx, dy]) => { c.beginPath(); c.arc(dx, dy, 2.2, 0, TAU); c.fill(); });
    c.restore();
  };
  const pat = up => ({ arm2: [[146, 140], up ? [174, 128] : [178, 147]] });

  [[-7, 30], [-14, 14], [HERE, 0]].forEach(([dx, rise], i) => k.add('build' + i, 2, xf(D.N, { dx, rot: i === 1 ? 0.04 : -0.04, face: kit.look(5, 3), extra: { back: c => castle(c, rise) } })));
  [1, 0, 1, 0].forEach((up, i) => k.add('pat' + i, up ? 2 : 4, xf(D.N, { dx: HERE, ky: up ? 1.02 : 0.97, face: FACE.happy, extra: { ...pat(up), back: c => castle(c, 0) } })));

  const ride = [[HERE + 8, -10, 0.2], [2, -24, 0.7], [42, -40, 1.5], [84, -48, 2.4], [126, -44, 3.3], [170, -36, 4.2]];
  for (let i = 0; i < 9; i++) {
    const f = -20 + i * 40, back = (c, d, seed) => { if (f < 250) castle(c, 0); wave(c, f, seed); };
    if (i === 0) k.add('wave0', 2, xf(D.N, { dx: HERE, face: kit.look(-7, 0, 'o', 4.4), extra: { ...pat(0), back } }));
    else if (i === 1) k.add('wave1', 2, xf(D.K1, { dx: HERE, extra: { back } }));
    else if (i === 2) k.add('wave2', 2, xf(D.N, { dx: HERE + 4, rot: 0.1, face: FACE.shock, extra: { back } }));
    else {
      const [dx, dy, rot] = ride[i - 3];
      k.add('wave' + i, 2, xf(D.N, { ox: 128, oy: 136, dx, dy, rot, shadowK: 0, face: FACE.shock, extra: { back,
        front: (c, d, seed) => { kit.puff(c, 96 + dx, 196 + dy, seed, 12, WHITE); kit.puff(c, 166 + dx, 186 + dy, seed + 2, 9, WHITE); } } }));
    }
  }
  [40, 80, 120, 160, 198, 228].forEach((top, i) => k.add('drain' + i, 2, kit.gone({ back: (c, d, seed) => { if (i > 3) wet(c, seed); water(c, top, seed); } })));
  k.add('sand', 8, kit.gone({ back: (c, d, seed) => wet(c, seed) }));

  const lying = (cx, bob, wob, face, shadow) => {
    const o = kit.tip(1.57 + wob, { dx: cx - 128, dy: bob });
    return { o, face, shadow };
  };
  const beached = (p, back, alpha = 1) => xf(D.N, { ...p.o, shadowK: 0, face: p.face, extra: { ...(p.shadow ? { shadow: p.shadow } : {}), back, front: c => kit.fade(c, alpha, () => starfish(c, tp(p.o, [102, 72]), p.o.rot)) } });
  [255, 215, 175, 135, 95, 55, 30].forEach((g, i) => k.add('back' + i, 2, beached(lying(Math.max(78, g + 45), i % 2 ? -8 : -3, i % 2 ? 0.12 : -0.1, FACE.spiral), (c, d, seed) => { wet(c, seed); sheet(c, g, 150, seed); })));
  [[70, 165], [115, 180], [165, 192], [220, 204]].forEach(([g, top], i) => k.add('ebb' + i, 2, beached(lying(78, 0, 0, FACE.spiral, [78, 60]), (c, d, seed) => { wet(c, seed); sheet(c, g, top, seed); })));
  k.add('left', 12, beached(lying(78, 0, 0, FACE.grump, [78, 60]), (c, d, seed) => wet(c, seed)));

  [[1.1, -38], [0.6, -24], [0.2, -10], [0, 0]].forEach(([rot, dx], i) => {
    const o = kit.tip(rot, { dx });
    k.add('up' + i, 2, xf(D.N, { ...o, face: FACE.grump, extra: { shadow: [128 + dx, 60], back: (c, d, seed) => wet(c, seed, [0.75, 0.5, 0.25, 0][i]), front: c => starfish(c, tp(o, [102, 72]), rot) } }));
  });
  [[84, 52, -0.7], [52, 46, -1.5], [18, 60, -2.3], [-24, 88, -3.1]].forEach(([x, y, rot], i) =>
    k.add('shake' + i, 2, xf(D.N, { rot: i % 2 ? -0.07 : 0.07, face: i < 2 ? FACE.grump : kit.look(-6, -2, 'flat'), extra: { front: c => starfish(c, [x, y], rot) } })));
  k.done();
})();

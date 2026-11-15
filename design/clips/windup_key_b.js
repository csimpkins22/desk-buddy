// A wind-up key turns in his back as he marches in from the left; it runs down and he dozes off mid-step.
(() => {
  const { D, xf, kit } = window.__lump;
  const { CREAM, DARK, YELLOW, GREY, TAU } = kit, k = kit.clip('windup_key_b');
  // the key in his back at [x, y]: rot 0 points straight left, a is how far round its wings have turned
  const key = ([x, y], rot, a) => c => {
    const h = 6 + 24 * Math.abs(Math.cos(a));
    c.save(); c.translate(x, y); c.rotate(rot); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.fillStyle = GREY; c.beginPath(); c.rect(-34, -4, 46, 8); c.fill(); c.stroke();
    [-1, 1].forEach(s => {
      c.fillStyle = YELLOW; c.beginPath(); c.ellipse(-42, s * (h / 2 + 2), 11, h / 2, 0, 0, TAU); c.fill(); c.stroke();
      if (h > 13) { c.fillStyle = DARK; c.beginPath(); c.ellipse(-42, s * (h / 2 + 2), 4.5, h / 2 - 5, 0, 0, TAU); c.fill(); }
    });
    c.restore();
  };
  const stare = kit.look(3, 0, 'flat', 4.4);
  const heavy = [['stroke', [[109, 105], [123, 106]], 2.8], ['dot', 116, 110, 3], ['stroke', [[133, 103], [147, 104]], 2.8], ['dot', 140, 108, 3], ['stroke', [[123, 125], [133, 125]], 2.6]];
  const shut = [kit.faces.closed[0], kit.faces.closed[1], ['dot', 128, 126, 2.8]];
  const toy = (o, a, face, handY, more = {}) => xf(D.N, { ...o, face, extra: { arm2: [kit.pt(o, [166, 140]), kit.pt(o, [190, handY])], back: key(kit.pt(o, [84, 138]), o.rot || 0, a), ...more } });

  kit.walk(0, -190, 8, { face: kit.look(-5) }).forEach((o, i) => k.add('off' + i, 2, xf(D.N, o)));
  k.add('empty', 6, kit.gone());

  let x = -196, a = 0, o;
  for (let i = 0; i < 24; i++) {
    const up = i % 2, v = 16 - 13.45 * i / 23;
    o = { dx: x, rot: up ? 0.11 : -0.05, ky: up ? 1.03 : 0.96, kx: up ? 0.98 : 1.03 };
    k.add('m' + i, i < 10 ? 2 : i < 16 ? 4 : i < 21 ? 6 : 8, toy(o, a, stare, up ? 120 : 152));
    if (i < 23) { x += v; a += v * 0.055; }
  }
  const stop = { dx: x + 4, rot: 0.15, ky: 1.02, kx: 0.99 };
  a += 0.45;
  k.add('tick', 4, toy({ ...stop, rot: 0.2 }, a, stare, 118));
  k.add('still', 10, toy(stop, a, stare, 126));
  k.add('heavy', 6, toy(stop, a, heavy, 140));
  k.add('shut', 20, toy(stop, a, shut, 152, { fxm: 'idle', fx: [186, 66] }));
  k.add('sag', 4, xf(D.T1, { dx: 20, face: [['stroke', [[110, 117], [116, 120], [122, 117]], 3], ['stroke', [[134, 115], [140, 118], [146, 115]], 3], ['dot', 128, 132, 2.6]], extra: { back: key([104, 142], 0.1, a) } }));
  k.add('tip', 4, xf(D.T2, { dx: 10, extra: { back: key([95, 140], 0.75, a) } }));
  k.add('down', 6, xf(D.S1, { dx: 3, extra: { back: key([86, 154], 0.75, a), fxm: 'idle' } }));
  k.done({ doze: false });
})();

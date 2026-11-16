// A progress bar above him fills fast and stalls near the end; he waits, taps a foot, then stretches up behind the end of the fill and pushes it home.
// group: odd
(() => {
  const { D, xf, FACE, tint, kit } = window.__lump, { TAU, CREAM, DARK, GREEN, BLUE } = kit;
  const k = kit.clip('loading'), X0 = 33, W = 186, BY = 30, STALL = 0.78, HOME = -36;
  const bar = (p, done, y = BY) => c => {
    c.save(); c.lineJoin = 'round';
    c.fillStyle = DARK; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.roundRect(X0 - 4, y, W + 8, 16, 5); c.fill(); c.stroke();
    if (p > 0.01) { c.fillStyle = done ? GREEN : BLUE; c.fillRect(X0, y + 4, Math.round(W * p), 8); }
    c.restore();
  };
  const tick = s => c => kit.mark(c, 'tick', 206, 92, s);
  // a foot poking out at his right side: lifted, or down with two tap lines beside it
  const foot = up => c => {
    c.save(); c.lineCap = 'round'; c.fillStyle = tint(); c.strokeStyle = CREAM; c.lineWidth = 3;
    c.beginPath(); c.ellipse(152, up ? 191 : 198, 13, 6, up ? -0.5 : 0, 0, TAU); c.fill(); c.stroke();
    if (!up) { c.beginPath(); [[170, 189, 180, 183], [173, 198, 185, 197]].forEach(([a, b, x, y]) => { c.moveTo(a, b); c.lineTo(x, y); }); c.stroke(); }
    c.restore();
  };
  const up = kit.look(5, -6, 'flat'), tall = { ky: 1.38, kx: 0.86, rot: 0.08 };
  const hand = p => [X0 + W * p - 5, BY + 9];
  const he = (o, face, back, extra = {}) => xf(D.N, { dx: HOME, ...o, face, extra: { back, ...extra } });

  kit.walk(0, HOME, 4, { face: kit.look(-3, 0, 'smile') }).forEach((o, i) => k.add('go' + i, 2, xf(D.N, { ...o, extra: { back: bar(0, false, -24 + i * 18) } })));
  kit.steps(0, STALL, 8).forEach((p, i) => k.add('fill' + i, 2, he({}, kit.look(4, -4, 'smile'), bar(p))));
  k.add('stall', 10, he({}, up, bar(STALL)));
  k.add('wait', 12, he({}, kit.look(0, 0, 'flat'), bar(STALL)));
  for (let i = 0; i < 3; i++) {
    k.add('untap', 2, he({ rot: -0.02 }, FACE.grump, bar(STALL), { front: foot(true) }));
    k.add('tap', 2, he({ ky: 0.97, rot: 0.02 }, FACE.grump, bar(STALL), { front: foot(false) }));
  }
  k.add('eye', 4, he({}, up, bar(STALL)));
  k.add('duck', 2, he({ ky: 0.84, kx: 1.08 }, up, bar(STALL)));
  [[1.15, 0.95, 0.03], [1.3, 0.9, 0.06], [1.38, 0.86, 0.08]].forEach(([ky, kx, rot], i) => k.add('grow' + i, 2, he({ ky, kx, rot }, up, bar(STALL))));
  const sh = dx => kit.pt({ ...tall, dx }, [166, 140]), reach = (dx, p, t = 1) => { const s = sh(dx), h = hand(p); return [s, [s[0] + (h[0] - s[0]) * t, s[1] + (h[1] - s[1]) * t]]; };
  [0.4, 1].forEach((t, i) => k.add('reach' + i, 2, he(tall, up, bar(STALL), { arm2: reach(HOME, STALL, t) })));
  const strain = [...kit.look(5, -5, 'wobble'), ['stroke', [[108, 98], [120, 101]], 2.6], ['stroke', [[136, 99], [148, 96]], 2.6]];
  kit.steps(STALL, 1, 6).forEach((p, i) => {
    const o = { ...tall, dx: HOME + W * (p - STALL) }, brow = kit.pt(o, [84, 96]);
    k.add('push' + i, 2, he(o, strain, bar(p), { arm2: reach(o.dx, p), front: i % 2 ? c => kit.sweat(c, brow[0], brow[1], i, -1) : undefined }));
  });
  const END = HOME + W * (1 - STALL);
  k.add('full', 4, he({ ...tall, dx: END }, kit.look(5, -5, 'o'), bar(1, true), { arm2: reach(END, 1) }));
  [[1.3, 0.9, 0.5], [1.15, 0.95, 1.3], [1, 1, 1.1]].forEach(([ky, kx, s], i) => k.add('done' + i, 2, he({ ky, kx, dx: END }, FACE.happy, bar(1, true), { front: tick(s) })));
  k.add('proud', 12, he({ dx: END }, kit.look(6, -3, 'smile'), bar(1, true), { front: tick(1.1) }));
  [[12, 0.75], [-6, 0.4], [-24, 0]].forEach(([y, a], i) => k.add('clear' + i, 2, xf(D.N, { dx: END * (1 - (i + 1) / 3), face: kit.look(0, 0, 'smile'), extra: { back: bar(1, true, y), front: a ? c => kit.fade(c, a, () => tick(1.1)(c)) : undefined } })));
  k.done();
})();

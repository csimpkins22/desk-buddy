// His orange drains out through his feet into a puddle. He stands pale and appalled, produces a straw, and drinks it back up from the top down.
// Staging: he stands on the right; his colour runs out of him to the left along the floor; normal view; 8.5 seconds; a slow drain, a hold, a slow refill; walks back to rest.
(() => {
  const { D, xf, FACE, boil, closedPath, tint, mixHex } = window.__lump, kit = window.__lump.kit, k = kit.clip('colour_leak');
  const X = 34, PALE = '#E9E2D2', N = 10, LEVELS = kit.steps(64, 208, N).map(Math.round);
  // his body painted pale, with his own colour only between y0 and y1
  const paint = (y0, y1) => (c, d, seed) => {
    c.save(); c.translate(4, 2.5); closedPath(c, boil(d.body, seed + 50, 2.2), d.corners); c.fillStyle = PALE; c.fill();
    if (y1 > y0) { c.clip(); c.translate(-4, -2.5); c.fillStyle = tint(); c.fillRect(0, y0, 240, y1 - y0); }
    c.restore();
  };
  const puddle = (f, cx) => c => {
    const rx = 64 * f, ry = 2 + 6 * f;
    if (rx < 4) return;
    c.save(); c.fillStyle = tint(); c.strokeStyle = kit.CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.ellipse(cx, 205, rx, ry, 0, 0, kit.TAU); c.fill(); c.stroke();
    c.strokeStyle = mixHex(tint(), '#FFFFFF', 0.45); c.lineCap = 'round'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(cx - rx * 0.55, 203); c.lineTo(cx - rx * 0.15, 202); c.stroke();
    c.restore();
  };
  const straw = P => c => {
    const line = () => { c.beginPath(); P.forEach(([x, y], i) => c[i ? 'lineTo' : 'moveTo'](x, y)); };
    c.save(); c.lineCap = c.lineJoin = 'round';
    [[kit.DARK, 10], [kit.WHITE, 6]].forEach(([col, w]) => { c.strokeStyle = col; c.lineWidth = w; line(); c.stroke(); });
    c.fillStyle = kit.BLUE;
    P.slice(1).forEach((q, i) => { const p = P[i], n = Math.max(1, Math.round(Math.hypot(q[0] - p[0], q[1] - p[1]) / 11)); for (let j = 0; j < n; j++) { c.beginPath(); c.arc(p[0] + (q[0] - p[0]) * (j + 0.5) / n, p[1] + (q[1] - p[1]) * (j + 0.5) / n, 2.8, 0, kit.TAU); c.fill(); } });
    c.restore();
  };
  const nub = (a, b) => c => { c.save(); c.lineCap = 'round'; [[kit.CREAM, 19], [PALE, 13]].forEach(([col, w]) => { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); }); c.restore(); };
  const both = (...fs) => (c, d, seed, tick) => fs.forEach(f => f(c, d, seed, tick));
  const pale = (o, face, y0, y1, extra) => xf(D.N, { dx: X, ...o, face, extra: { fill: 'none', back: paint(y0, y1), ...extra } });

  kit.walk(0, X, 4, { face: kit.look(3, 0, 'smile') }).forEach((o, i) => k.add('go' + i, 2, xf(D.N, o)));
  LEVELS.forEach((y, i) => {
    const f = i / (N - 1), face = i < 3 ? kit.look(0, 0, 'smile') : i < 6 ? kit.look(-2, 5, 'flat') : kit.faces.worried;
    k.add('drain' + i, 4, pale({ ky: 1 + 0.04 * f, kx: 1 - 0.03 * f }, face, y, 212, { front: puddle(f, 142 - 36 * f) }));
  });
  k.add('appalled', 14, pale({ ky: 1.05, kx: 0.96 }, FACE.shock, 0, 0, { front: puddle(1, 106) }));
  k.add('stare', 8, pale({ rot: -0.04 }, kit.look(-6, 5, 'wobble'), 0, 0, { front: puddle(1, 106) }));

  const sh = kit.pt({ dx: X }, [90, 140]);
  k.add('s0', 2, pale({}, kit.look(-4, 0, 'o'), 0, 0, { back: both(paint(0, 0), straw([[132, 150], [118, 124]])), front: both(puddle(1, 106), nub(sh, [114, 132])) }));
  k.add('s1', 8, pale({ ky: 1.03 }, kit.faces.smug, 0, 0, { back: both(paint(0, 0), straw([[130, 150], [104, 92]])), front: both(puddle(1, 106), nub(sh, [110, 122]), c => kit.sparkle(c, 96, 78, 9)) }));

  const lean = { dx: X, rot: -0.1 }, mouth = kit.pt(lean, [128, 125]), PIPE = [mouth, [mouth[0] - 16, mouth[1] + 8], [114, 202]];
  const sip = [...kit.faces.closed.slice(0, 2), ['oval', 126, 126, 3.5, 4.5]];
  k.add('s2', 4, pale(lean, sip, 0, 0, { front: both(puddle(1, 106), straw(PIPE)) }));
  LEVELS.forEach((y, i) => {
    const f = 1 - i / (N - 1);
    k.add('sip' + i, 4, pale({ ...lean, kx: i % 2 ? 0.98 : 1 }, sip, 60, y, { front: both(puddle(f, 114 - 8 * f), straw(PIPE)) }));
  });
  k.add('pop', 2, xf(D.N, { dx: X, ky: 1.04, face: FACE.aah, extra: { front: straw([[108, 96], [84, 66]]) } }));
  k.add('pop2', 2, xf(D.N, { dx: X, ky: 1.02, face: FACE.aah, extra: { front: straw([[62, 40], [34, 16]]) } }));
  k.add('better', 8, xf(D.N, { dx: X, face: kit.faces.closed }));
  kit.walk(X, 0, 4, { face: kit.look(0, 0, 'smile') }).forEach((o, i) => k.add('home' + i, 2, xf(D.N, o)));
  k.done();
})();

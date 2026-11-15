// He sits small at the bottom looking up while stars come out and thin lines join some of them into his own outline, cowlick and all.
(() => {
  const { D, xf, kit } = window.__lump, { WHITE, GREY, YELLOW } = kit;
  const k = kit.clip('constellation'), V = kit.view(0.5, [128, 201], [120, 228]);
  // screen points to the scene the wide view shows, and his standing outline shrunk into the sky
  const S = ([sx, sy]) => [128 + (sx - 120) * 2, 201 + (sy - 228) * 2], sky = ([x, y]) => S([120 + (x - 128) * 0.62, 84 + (y - 135) * 0.62]);
  const nb = D.N.body.length, M = Math.min(12, nb), O = Array.from({ length: M }, (_, i) => sky(D.N.body[Math.round(i * nb / M) % nb]));
  const c0 = D.N.curl[0], curl = D.N.curl.map(([x, y]) => sky([c0[0] + (x - c0[0]) * 1.7, c0[1] + (y - c0[1]) * 1.7])), TIP = curl[curl.length - 1], EYES = [sky([116, 110]), sky([140, 108])];
  const B = [[26, 44], [204, 30], [52, 104], [66, 20], [214, 92], [184, 128]].map(S);
  // the order they come out in: [point, size, colour]
  const stars = [[B[0], 12, GREY], [B[1], 12, GREY]];
  O.forEach((p, i) => { stars.push([p, 18, WHITE]); if (i % 2 && B[(i + 3) / 2]) stars.push([B[(i + 3) / 2], 12, GREY]); });
  stars.push([TIP, 18, WHITE]);
  const segs = [...O.map((p, i) => [p, O[(i + 1) % M]]), ...curl.slice(1).map((p, i) => [curl[i], p])];
  const START = 18, LINES = START + segs.length * 2, END = LINES + 4;
  const night = (f, alpha = 1) => c => kit.fade(c, alpha, () => {
    c.lineCap = 'round'; c.strokeStyle = GREY; c.lineWidth = 5;
    segs.forEach(([a, b], i) => {
      const t = Math.min(1, (f - START - i * 2 + 1) / 2); if (t <= 0) return;
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t); c.stroke();
    });
    stars.forEach(([p, s, col], i) => { const age = f - i * 2; if (age >= 0) kit.sparkle(c, p[0], p[1], s * (age === 0 ? 0.5 : age === 1 ? 1.5 : 1), col); });
    EYES.forEach(p => { const age = f - LINES; if (age >= 0) kit.sparkle(c, p[0], p[1], 12 * (age < 2 ? 0.5 : age < 4 ? 1.4 : 1), YELLOW); });
  });
  const sit = (rot, view, back) => xf(D.N, { ky: 0.9, kx: 1.04, rot, face: kit.look(0, -7, 'smile'), extra: { view, back } });

  kit.steps(0, 1, 5).forEach((t, i) => k.add('out' + i, 2, sit(0, kit.cam(t, kit.HOME, V))));
  for (let f = 0; f <= END; f++) k.add('s' + f, 2, sit(0, V, night(f)));
  k.add('whole', 14, sit(0, V, night(END + 2)));
  kit.steps(0, 0.17, 3).forEach((r, i) => k.add('tilt' + i, i < 2 ? 2 : 20, sit(r, V, night(END + 2))));
  kit.steps(0, 1, 5).forEach((t, i) => k.add('home' + i, 2, sit(0.17 * (1 - t), kit.cam(t, V, kit.HOME), t < 1 ? night(END + 2, 1 - t) : undefined)));
  k.done();
})();

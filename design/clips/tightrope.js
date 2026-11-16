// Wide and slow: he crosses a high rope from the far left to the far right with a balancing pole, wobbling worst in the middle, then drops back in from above.
// group: scenes
(() => {
  const { D, xf, FACE, kit } = window.__lump;
  const k = kit.clip('tightrope');
  const Z = 0.6, cam = z => kit.zoom(z, [128, 201], [118, 218.5]), wide = cam(Z), TOP = 26;

  // the rope from x0 to x1, dipping by `sag` at x `at` where something stands on it
  const rope = (c, x0, x1, at, sag = 0) => {
    if (x1 <= x0) return;
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = '#C9A26B'; c.lineWidth = 6;
    c.beginPath(); c.moveTo(x0, TOP); if (at > x0 && at < x1) c.lineTo(at, TOP + sag); c.lineTo(x1, TOP); c.stroke(); c.restore();
  };
  const strung = c => rope(c, -90, 350);

  k.add('up', 2, xf(D.N, { face: kit.look(-2, -5, 'o') }));
  kit.steps(1, Z, 5).forEach((z, i) => k.add('back' + i, 2, xf(D.N, { face: kit.look(-2, -5, 'o'), extra: { view: cam(z), back: c => rope(c, -90, -90 + 110 * i) } })));
  kit.walk(0, -262, 6, { face: kit.look(-5, 0) }).forEach((o, i) => k.add('off' + i, 2, xf(D.N, { ...o, extra: { view: wide, back: strung } })));
  k.add('empty', 4, kit.gone({ view: wide, back: strung }));

  const N = 26;
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1), mid = Math.sin(Math.PI * t), rot = (i % 2 ? 1 : -1) * (0.05 + 0.2 * mid * mid), sag = 5 + 9 * mid;
    const o = { dx: -262 + 527 * t, dy: -175 + sag, rot, shadowK: 0.5 }, C = kit.pt(o, [128, 150]), a = -rot * 1.6, u = [Math.cos(a), Math.sin(a)];
    k.add('walk' + i, 4, xf(D.N, { ...o, face: mid > 0.8 ? kit.faces.worried : kit.look(4, 2, 'flat'), extra: { view: wide,
      arm: [kit.pt(o, [90, 140]), [C[0] - u[0] * 50, C[1] - u[1] * 50]], arm2: [kit.pt(o, [166, 140]), [C[0] + u[0] * 50, C[1] + u[1] * 50]],
      back: c => rope(c, -90, 350, 128 + o.dx, sag),
      front: c => { c.save(); c.lineCap = 'round'; c.strokeStyle = kit.YELLOW; c.lineWidth = 6; c.beginPath(); c.moveTo(C[0] - u[0] * 95, C[1] - u[1] * 95); c.lineTo(C[0] + u[0] * 95, C[1] + u[1] * 95); c.stroke(); c.restore(); } } }));
  }

  [9, -7, 5, -4, 2, -1].forEach((s, i) => k.add('bounce' + i, 2, kit.gone({ view: wide, back: c => rope(c, -90, 350, 128, s) })));
  k.add('empty', 4);
  kit.steps(-90, 350, 5).slice(1).forEach((x0, i) => k.add('reel' + i, 2, kit.gone({ view: wide, back: c => rope(c, x0, 350) })));

  [-340, -300, -250, -190, -120, -40].forEach((dy, i) => k.add('drop' + i, 2, xf(D.N, { dy, ky: 1.12, kx: 0.94, shadowK: 0.4 + i * 0.1, face: FACE.shock, extra: { view: wide } })));
  k.add('land', 2, xf(D.N, { ky: 0.78, kx: 1.14, face: FACE.aah, extra: { view: wide } }));
  kit.steps(Z, 1, 5).forEach((z, i) => k.add('home' + i, 2, xf(D.N, { ky: [0.9, 1.05, 1, 1, 1][i], face: FACE.sheep, extra: { view: cam(z) } })));
  k.add('ta', 6, xf(D.N, { face: FACE.happy }));
  k.done();
})();

// A dark piece: the lights go out, a candle on a small cake at lower left lights a circle round itself and part of his face. He blows it out: just his eyes. It relights itself. He looks at us.
(() => {
  const { D, xf, mixHex, kit } = window.__lump;
  const { CREAM, YELLOW, RED, BLUE, WHITE, TAU, pt, look } = kit;
  const k = kit.clip('birthday_candle');
  const FX = 46, FY = 148, FULL = 95, FACE_AT = [128, 112];

  // flame: [size, how far the tip is pushed sideways]
  const flameAt = (c, [s, bend]) => {
    const tx = FX + bend, ty = 155 - 17 * s + Math.abs(bend) * 0.5;
    c.fillStyle = YELLOW; c.beginPath(); c.moveTo(tx, ty); c.quadraticCurveTo(FX + 8 * s, 150, FX, 155); c.quadraticCurveTo(FX - 8 * s, 150, tx, ty); c.fill();
    c.fillStyle = WHITE; c.beginPath(); c.arc(FX + bend * 0.3, 152, 2.2 * s, 0, TAU); c.fill();
  };
  const cake = (c, seed, flame) => {
    c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.moveTo(14, 201); c.lineTo(78, 201); c.stroke();
    c.fillStyle = WHITE; c.beginPath(); c.roundRect(24, 175, 44, 25, 4); c.fill(); c.stroke();
    c.fillStyle = BLUE; c.fillRect(25.5, 176.5, 41, 7); [32, 46, 60].forEach(x => { c.beginPath(); c.arc(x, 184, 4, 0, TAU); c.fill(); });
    c.fillStyle = RED; c.lineWidth = 2; c.beginPath(); c.rect(43, 156, 6, 19); c.fill(); c.stroke();
    if (flame) flameAt(c, flame);
  };
  // everything outside the circle (cx, cy, r) painted black, as one shape with a hole in it
  const cover = (c, cx, cy, r) => {
    c.fillStyle = '#000';
    if (r <= 0) { c.fillRect(0, 0, 240, 240); return; }
    c.beginPath(); c.moveTo(-400, -400); c.lineTo(640, -400); c.lineTo(640, 640); c.lineTo(-400, 640); c.lineTo(-400, cy); c.lineTo(cx - r, cy);
    c.arc(cx, cy, r, Math.PI, -Math.PI, true); c.lineTo(-400, cy); c.closePath(); c.fill();
  };
  // st: o (his xf options), eyes [dx, dy] or 'shut', r (radius of the light), at (its middle), flame, cake (opacity), glow (0 to 1), puff
  const shot = (name, ticks, st) => {
    const o = st.o || {}, [cx, cy] = st.at || [FX, FY], r = st.r, e = st.eyes === 'shut' ? [0, 0] : st.eyes || [0, 0];
    const back = st.glow ? c => {
      c.fillStyle = mixHex('#000000', '#2A2410', st.glow); c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.fill();
      c.fillStyle = mixHex('#000000', '#3D3514', st.glow); c.beginPath(); c.arc(cx, cy, r * 0.5, 0, TAU); c.fill();
    } : undefined;
    const front = (c, d, seed) => {
      if (st.cake) kit.fade(c, st.cake, () => cake(c, seed, st.flame));
      if (st.puff) { c.strokeStyle = CREAM; c.lineWidth = 2.6; c.lineCap = 'round'; const m = pt(o, [118, 126]); [[-8, 2, -24, 9], [-6, 9, -20, 19], [-10, -4, -26, -1]].forEach(([x0, y0, x1, y1]) => { c.beginPath(); c.moveTo(m[0] + x0, m[1] + y0); c.lineTo(m[0] + x1, m[1] + y1); c.stroke(); }); }
      if (r !== undefined) cover(c, cx, cy, r);
      if (r === undefined) return;
      if (st.spark) flameAt(c, [st.spark, 0]);
      // his eyes show in the dark
      [[116, 109], [140, 107]].forEach(q => {
        const [x, y] = pt(o, [q[0] + e[0], q[1] + e[1]]);
        if (Math.hypot(x - cx, y - cy) < r - 3) return;
        if (st.eyes === 'shut') { c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(x - 6, y); c.lineTo(x + 6, y); c.stroke(); }
        else { c.fillStyle = CREAM; c.beginPath(); c.ellipse(x, y, 4.2, 4.8, 0, 0, TAU); c.fill(); }
      });
    };
    const extra = { front };
    if (back) extra.back = back;
    k.add(name, ticks, xf(D.N, { ...o, face: st.face || look(e[0], e[1], 'flat'), extra }));
  };
  const lean = t => ({ dx: -12 * t, rot: -0.3 * t });
  const LIT = { cake: 1, glow: 1 };

  // the lights go out
  [150, 100, 55, 22].forEach((r, i) => shot('iris' + i, 2, { r, at: FACE_AT, face: kit.faces.worried }));
  shot('dark0', 4, { r: 0 });
  shot('dark1', 4, { r: 0, eyes: [-5, 0] });
  // a flame, and its light
  shot('spark', 2, { r: 0, spark: 0.8, eyes: [-6, 4] });
  [[20, 0.5], [50, 0.8], [78, 1], [FULL, 1]].forEach(([r, s], i) => shot('light' + i, 2, { ...LIT, r, flame: [s, 0], eyes: [-6, 4], face: look(-6, 4, 'o') }));
  shot('watch0', 4, { ...LIT, r: FULL - 4, flame: [0.9, 2], eyes: [-6, 4], face: look(-6, 4, 'smile') });
  shot('watch1', 4, { ...LIT, r: FULL, flame: [1.05, -1], eyes: [-6, 4], face: look(-6, 4, 'smile') });
  [0.35, 0.7, 1].forEach((t, i) => shot('lean' + i, 2, { ...LIT, o: lean(t), r: FULL - (i % 2) * 4, flame: [1, i % 2 ? 2 : -1], eyes: [-6, 5], face: look(-6, 5, 'smile') }));
  shot('inhale', 4, { ...LIT, o: { ...lean(0.8), ky: 1.06, kx: 0.96 }, r: FULL, flame: [1, 1], eyes: [-6, 5], face: look(-6, 5, 'o') });
  shot('blow0', 2, { ...LIT, o: lean(1.1), r: FULL - 8, flame: [0.8, -7], puff: true, eyes: [-6, 5], face: look(-6, 5, 'o') });
  shot('blow1', 2, { ...LIT, o: lean(1.1), r: 54, glow: 0.7, flame: [0.5, -10], puff: true, eyes: [-6, 5], face: look(-6, 5, 'o') });
  shot('out', 2, { o: lean(1.1), cake: 1, glow: 0.4, r: 20, eyes: [-6, 5] });
  // darkness: just his eyes
  shot('black0', 8, { o: lean(1), r: 0, eyes: [-6, 5] });
  shot('blink', 2, { o: lean(1), r: 0, eyes: 'shut' });
  shot('black1', 6, { o: lean(1), r: 0, eyes: [-2, 2] });
  // it relights itself
  shot('respark', 2, { o: lean(1), r: 0, spark: 0.8, eyes: [-6, 5] });
  [[20, 0.5], [50, 0.8], [78, 1], [FULL, 1.1]].forEach(([r, s], i) => shot('relight' + i, 2, { ...LIT, o: lean(1), r, flame: [s, 0], eyes: [-6, 5], face: kit.faces.wide }));
  shot('stare', 8, { ...LIT, o: lean(0.9), r: FULL - 3, flame: [1, 2], eyes: [-6, 5], face: look(-6, 5, 'o', 4.6) });
  // he looks at us
  shot('us0', 2, { ...LIT, o: lean(0.6), r: FULL, flame: [1, -1], eyes: [-2, 2] });
  shot('us1', 8, { ...LIT, o: lean(0.5), r: FULL - 4, flame: [0.95, 2], eyes: [0, 0] });
  shot('us2', 8, { ...LIT, o: lean(0.5), r: FULL, flame: [1.05, -1], eyes: [0, 0] });
  // the room comes back
  [[125, 0.8], [165, 0.6], [215, 0.4], [275, 0.2]].forEach(([r, a], i) => shot('day' + i, 2, { o: lean(0.4 - i * 0.12), cake: a, glow: a, r, flame: [1, i % 2 ? 1 : -1], eyes: [0, 0], face: look(0, 0, 'smile') }));
  k.done();
})();

// Each bounce on a trampoline goes higher and the view follows him up, past clouds and stars, until he lands on the moon and dozes off there.
(() => {
  const { D, CLIPS, xf, FACE, DOZE, boil, closedPath, kit } = window.__lump;
  const NAME = 'trampoline', k = kit.clip(NAME), TAU = kit.TAU, MAT = 21, ZW = 0.68, MX = 226, MR = 60, HM = 660, MY = 180 - HM + MR, OVER = MX - 128;
  const snap = z => Math.round(z * 256) / 256;   // the board stores zoom in 256ths
  const smooth = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  // the view for him h above the mat: it pulls back over the first bounce and then stays on him, a little behind (lead) on the way up and down
  const cam = (h, dx = 0, lead = 0) => { const hc = Math.max(0, h), t = smooth(hc / 120); return kit.view(snap(1 - (1 - ZW) * t), [128 + dx, 180 - hc], [128 - 8 * t, 180 - 52 * smooth(hc / 100) + lead * t]); };

  const tramp = (c, tx, dip) => {
    c.save(); c.translate(tx, 0); c.lineCap = c.lineJoin = 'round';
    c.strokeStyle = kit.GREY; c.lineWidth = 4; c.beginPath(); c.moveTo(64, 184); c.lineTo(58, 203); c.moveTo(192, 184); c.lineTo(198, 203); c.moveTo(48, 203); c.lineTo(70, 203); c.moveTo(186, 203); c.lineTo(208, 203); c.stroke();
    c.strokeStyle = kit.CREAM; c.lineWidth = 5; c.beginPath(); c.moveTo(66, 182); c.quadraticCurveTo(128, 182 + dip * 2, 190, 182); c.stroke();
    c.fillStyle = kit.BLUE; c.lineWidth = 2.6; [42, 184].forEach(x => { c.beginPath(); c.roundRect(x, 175, 30, 13, 6); c.fill(); c.stroke(); });
    c.restore();
  };
  const cloud = (c, x, y, s, seed) => {
    c.save(); c.lineJoin = 'round'; c.fillStyle = '#DCE6F2'; c.strokeStyle = kit.CREAM; c.lineWidth = 3.5;
    closedPath(c, boil([[-40, 8], [-36, -8], [-18, -12], [-8, -26], [12, -28], [22, -14], [38, -10], [42, 8], [0, 12]].map(([px, py]) => [x + px * s, y + py * s]), seed, 2)); c.fill(); c.stroke();
    c.restore();
  };
  const moon = c => {
    c.save(); c.fillStyle = kit.YELLOW; c.strokeStyle = kit.CREAM; c.lineWidth = 4; c.beginPath(); c.arc(MX, MY, MR, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = '#E2B21E'; [[-18, -14, 10], [16, 8, 13], [-12, 26, 7], [22, -26, 6]].forEach(([x, y, r]) => { c.beginPath(); c.arc(MX + x, MY + y, r, 0, TAU); c.fill(); });
    c.restore();
  };
  const CLOUDS = [[34, -52, 1], [226, -112, 1.1], [58, -196, 0.9], [216, -236, 0.8]];
  const STARS = [[60, -300, 13], [150, -282, 10], [30, -390, 11], [112, -440, 12], [70, -505, 13], [150, -548, 10], [262, -566, 12], [20, -600, 10], [196, -636, 12], [300, -500, 10]];
  // everything behind him, leaving out what the view cannot see. a fades the sky for the end.
  const sky = (tx, dip = 0, a = 1) => (c, d, seed) => {
    const [z, , fy, , ty] = d.view, top = fy - ty / z - 40, bot = fy + (240 - ty) / z + 40, seen = y => y > top && y < bot;
    if (seen(190)) tramp(c, tx, dip);
    kit.fade(c, a, () => {
      CLOUDS.forEach(([x, y, s], i) => seen(y) && cloud(c, x, y, s, seed + i));
      STARS.forEach(([x, y, s], i) => seen(y) && kit.sparkle(c, x, y, s + 5 + (seed + i) % 2 * 2, i % 2 ? kit.CREAM : kit.YELLOW));
      if (seen(MY)) moon(c);
    });
  };

  let n = 0;
  const UP = { ky: 1.1, kx: 0.93 }, DOWN = { ky: 1.05, kx: 0.97 }, LOOK_DOWN = kit.look(0, 4, 'o');
  const at = (h, face, o = {}, ticks = 2, tx = 0) => {
    const dx = o.dx || 0;
    k.add('f' + n++, ticks, xf(D.N, { ...o, dy: -MAT - h, shadowK: Math.max(0, 1 - Math.max(0, h) / 70), face, extra: { view: cam(h, dx * 0.6, o.ky === UP.ky ? -6 : o.ky === DOWN.ky ? 8 : 0), back: sky(tx, h < 0 ? -h : 0) } }));
  };
  const dip = (face = FACE.happy, deep = 12, ticks = 2) => at(-deep, face, { ky: 1 - deep / 55, kx: 1 + deep / 85 }, ticks);

  // he hops, and a trampoline slides in under him
  const floor = (dy, tx, o, ticks = 2) => k.add('s' + n++, ticks, xf(D.N, { ...o, dy, face: kit.look(-4, 2, 'smile'), extra: { view: cam(0), back: sky(tx) } }));
  floor(0, -215, { ky: 0.86, kx: 1.08 }); floor(-24, -181, DOWN); floor(-36, -107, {}); floor(-38, -34, {}); floor(-30, 0, {});

  // five bounces, each higher
  dip(); [22, 44, 56].forEach(h => at(h, FACE.happy, UP)); at(60, FACE.happy); [54, 38, 16].forEach(h => at(h, FACE.happy, DOWN));
  dip(); [50, 100, 140, 162].forEach(h => at(h, FACE.happy, UP)); at(170, kit.faces.wide, {}, 6); [160, 128, 84, 36].forEach(h => at(h, LOOK_DOWN, DOWN));
  dip(FACE.happy, 14); [70, 150, 225, 290, 345, 382].forEach(h => at(h, FACE.happy, UP)); at(400, kit.faces.wide, {}, 8); [384, 330, 250, 150, 60].forEach(h => at(h, LOOK_DOWN, DOWN));
  dip(FACE.happy, 15); [85, 180, 270, 355, 430, 490, 525].forEach(h => at(h, FACE.happy, UP)); at(540, kit.look(5, -3, 'o'), {}, 10); [524, 470, 385, 280, 165, 60].forEach(h => at(h, kit.look(4, -4, 'flat'), DOWN));
  // the last one: he means it, and does not come down
  dip(FACE.grump, 17, 4);
  [95, 200, 310, 420, 520, 600, 655, 690, 700].forEach((h, i) => at(h, i < 7 ? FACE.grump : kit.look(3, 4, 'o'), { ...(i < 7 ? UP : {}), dx: OVER * smooth((i - 4) / 4) }));
  [690, 672].forEach(h => at(h, kit.look(0, 4, 'o'), { ...DOWN, dx: OVER }));

  // sitting on the moon, he dozes off; the view comes in on him and the sky fades away
  const MOONVIEW = cam(HM, OVER * 0.6), feet = [MX, 180 - HM];
  const on = (base, o = {}, extra = {}, view = MOONVIEW, a = 1) => xf(base, { ...o, dx: OVER, dy: -MAT - HM + (o.dy || 0), shadowK: 0, extra: { view, back: sky(0, 0, a), ...extra } });
  k.add('land', 2, on(D.N, { ky: 0.8, kx: 1.12, face: FACE.happy }));
  k.add('sat', 2, on(D.N, { ky: 1.04, face: FACE.happy }));
  k.add('sit', 14, on(D.N, { face: kit.faces.closed }));
  k.add('nod1', 8, on(D.T1)); k.add('nod2', 6, on(D.T2)); k.add('zz', 8, on(D.S1, {}, { fxm: 'idle' }));
  const [wz, wx, wy] = [MOONVIEW[0], MOONVIEW[3] + MOONVIEW[0] * (feet[0] - MOONVIEW[1]), MOONVIEW[4] + MOONVIEW[0] * (feet[1] - MOONVIEW[2])];
  kit.steps(0, 1, 6).slice(1).forEach((t, i) => k.add('push' + i, 2, on(D.S1, {}, { fxm: 'idle' }, kit.view(snap(wz + (1 - wz) * t), feet, [wx + (128 - wx) * t, wy + (201 - wy) * t]))));
  [0.66, 0.33].forEach((a, i) => k.add('fade' + i, 2, on(D.S1, {}, { fxm: 'idle' }, kit.view(1, feet, [128, 201]), a)));
  k.done();
  CLIPS[NAME].seq.splice(-DOZE.length, DOZE.length, ['S1', 4]);
})();

// Wide and slow: tiny on the far left he taps a ball that rolls the whole width, stops on the lip, and he blows it in from over there.
// group: scenes
(() => {
  const { D, xf, boil, closedPath, kit } = window.__lump;
  const { CREAM, RED, WHITE, GREY, TAU, steps, pt, look } = kit;
  const k = kit.clip('golf_putt');
  const HOLE = 486, LIP = 461, TEE = 222, GROUND = 204, BY = 188, CUP = GROUND + 16;
  // the view at t = 1 is half size with his feet at the far left; widths below are doubled to survive it
  const cam = t => kit.view(1 - 0.5 * t, [128, 201], [128 - 94 * t, 201 - 43 * t]);
  const V = cam(1);

  const course = (alpha, { ball, club, gust, wave = 0 } = {}) => (c, d, seed) => kit.fade(c, alpha, () => {
    c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 5;
    c.beginPath(); c.moveTo(50, GROUND); c.lineTo(HOLE - 22, GROUND); c.lineTo(HOLE - 22, GROUND + 32); c.lineTo(HOLE + 22, GROUND + 32); c.lineTo(HOLE + 22, GROUND); c.lineTo(560, GROUND); c.stroke();
    c.beginPath(); c.moveTo(HOLE + 12, GROUND + 30); c.lineTo(HOLE + 12, 56); c.stroke();
    closedPath(c, boil([[HOLE + 12, 58], [HOLE - 16, 66 + wave], [HOLE - 44, 80 + wave * 2], [HOLE - 16, 90 + wave], [HOLE + 12, 100]], seed, 2));
    c.fillStyle = RED; c.fill(); c.lineWidth = 4; c.stroke();
    if (club) {
      const [[hx, hy], [tx, ty]] = club;
      c.strokeStyle = GREY; c.lineWidth = 6; c.beginPath(); c.moveTo(hx, hy); c.lineTo(tx, ty); c.stroke();
      c.lineWidth = 10; c.beginPath(); c.moveTo(tx, ty); c.lineTo(tx + 12, ty); c.stroke();
    }
    if (gust !== undefined) {
      c.strokeStyle = CREAM; c.lineWidth = 6;
      [[0, 150, 44], [16, 168, 56], [-8, 186, 40]].forEach(([dx, y, len]) => { c.beginPath(); c.moveTo(gust + dx, y); c.lineTo(gust + dx + len, y); c.stroke(); });
    }
    if (ball) { c.fillStyle = WHITE; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.arc(ball[0], ball[1], 13, 0, TAU); c.fill(); c.stroke(); }
  });

  // one drawing in the wide view: he leans by rot, his right hand holds the club
  const shot = (name, ticks, rot, face, sc = {}, o = {}) => {
    const p = { rot, kx: o.kx, ky: o.ky }, hand = pt(p, o.hand || [184, 150]);
    const extra = { view: V, arm2: [pt(p, [166, 140]), hand], back: course(1, { club: [hand, sc.head || [hand[0] + 12, 199]], ...sc }) };
    if (o.armL) extra.arm = [pt(p, [90, 140]), pt(p, o.armL)];
    k.add(name, ticks, xf(D.N, { ...p, face, extra }));
  };

  steps(0.15, 1, 6).forEach((t, i) => {
    const hand = [184, 150];
    k.add('out' + i, 2, xf(D.N, { face: look(4, 3, 'flat'), extra: { view: cam(t), arm2: [[166, 140], hand], back: course(t, { ball: [TEE, BY], club: [hand, [204, 198]] }) } }));
  });
  shot('look', 8, 0, look(5, 3, 'flat'), { ball: [TEE, BY], head: [204, 198] });
  shot('back1', 2, -0.04, look(5, 3, 'flat'), { ball: [TEE, BY], head: [196, 194] });
  shot('back2', 4, -0.07, look(5, 3, 'flat'), { ball: [TEE, BY], head: [186, 188] });
  shot('tap', 2, 0.04, look(5, 3, 'smile'), { ball: [TEE + 8, BY], head: [208, 198] });
  shot('follow', 2, 0.06, look(5, 2, 'smile'), { ball: [TEE + 28, BY], head: [222, 192] });

  const N = 20, X0 = TEE + 28;
  for (let i = 0; i < N; i++) {
    const t = (i + 1) / N, x = X0 + (LIP - X0) * (1 - Math.pow(1 - t, 1.8)), lean = 0.06 + 0.42 * Math.pow(t, 1.1);
    shot('roll' + i, i < 10 ? 2 : i < 16 ? 4 : 6, lean, look(6, 2, t < 0.5 ? 'smile' : 'o'), { ball: [x, BY] }, { armL: [62, 132 - 26 * t] });
  }
  shot('lip', 24, 0.5, kit.faces.worried, { ball: [LIP, BY] }, { armL: [60, 104] });
  shot('rec1', 2, 0.25, kit.faces.worried, { ball: [LIP, BY] }, { armL: [62, 130] });
  shot('rec2', 2, 0, look(6, 2, 'flat'), { ball: [LIP, BY] });
  shot('inhale', 4, -0.13, look(6, 0, 'o'), { ball: [LIP, BY] }, { ky: 1.07, kx: 0.95 });
  [236, 300, 364, 424].forEach((g, i) => shot('blow' + i, 2, 0.3, look(6, 3, 'o'), { ball: [LIP, BY], gust: g, wave: i > 1 ? 4 : 0 }, { ky: 0.96, kx: 1.03 }));
  [[LIP + 9, BY + 4], [HOLE - 6, GROUND + 4], [HOLE - 2, CUP], [HOLE, CUP - 5]].forEach((b, i) => shot('drop' + i, 2, 0.3 - i * 0.08, look(6, 3, 'o'), { ball: b, wave: 4 - i }));
  shot('in', 12, 0, kit.faces.wide, { ball: [HOLE, CUP], head: [196, 52] }, { hand: [190, 102], armL: [66, 102] });
  steps(0.85, 0, 6).forEach((t, i) => {
    const hand = [184, 150];
    k.add('home' + i, 2, xf(D.N, { face: look(0, 0, 'smile'), extra: { view: cam(t), arm2: [[166, 140], hand], back: course(t, { ball: [HOLE, CUP], club: [hand, [204, 198]] }) } }));
  });
  k.done();
})();

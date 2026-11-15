// Stair run: a wide flight of steps slides in and he bounds up it, slower with every step. At the top he throws his arms up, and flops.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath, inkStroke, tint } = window.__lump;
  const CREAM = '#FFF1DC', TREAD = '#5E6B7D', RISER = '#3F4855', WALL = '#2B3440', BLUE = '#5AB8FF', TAU = Math.PI * 2;
  const K = 0.7, F = [128, 176], RUN = 72, RISE = 26, WIDE = 150, DEEP = 55, DX = -0.88, DY = -0.48, STEPS = 5;
  const puffing = [['dot',116,108,3.6], ['dot',140,106,3.6], ['mouth',[[123,119],[133,118],[134,126],[128,129],[122,126]]], ['stroke',[[100,116],[104,122],[110,124]],2.4], ['stroke',[[156,114],[152,120],[146,122]],2.4]];
  const strained = [...FACE.chooEyes, ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6]];
  const spent = [['stroke',[[108,110],[122,106]],3], ['stroke',[[134,104],[148,108]],3], ['dot',116,114,3], ['dot',140,112,3], ['mouth',[[120,121],[136,120],[137,130],[128,135],[119,130]],[128,132,6,4]]];
  const flat = puff => [['stroke',[[163,158],[175,169]],3.6], ['stroke',[[175,158],[163,169]],3.6], ['mouth',[[176,173],[191,171],[194,184],[185,190],[176,184]],[185,187,7,4]], ...(puff ? [['stroke',[[204,166],[213,160]],3], ['stroke',[[206,177],[216,177]],3]] : [])];
  // the sky behind: a skyline and a low sun, which drop away as he climbs
  const sky = (c, alpha, sink) => {
    const y = 60 + sink * 10;
    c.globalAlpha = alpha; c.fillStyle = '#FFD23F'; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.arc(46, y - 22 - sink * 3, 16, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = WALL; c.beginPath(); c.moveTo(-4, y); c.lineTo(-4, y - 12);
    [[14, 12, 24], [32, 24, 16], [54, 16, 10], [60, 10, 34], [70, 34, 34], [78, 34, 14], [100, 14, 22], [116, 22, 22], [124, 40, 40], [130, 40, 22], [138, 22, 8], [160, 8, 28], [178, 28, 18], [200, 18, 30], [214, 30, 12], [244, 12, 12]].forEach(([x, from, to]) => { c.lineTo(x, y - from); c.lineTo(x, y - to); });
    c.lineTo(244, y); c.closePath(); c.fill(); c.globalAlpha = alpha * 0.6; c.lineWidth = 1.8; c.stroke(); c.globalAlpha = 1;
  };
  // the flight, with the camera on tread `at` (halves while he is in the air), nudged by `shift`
  const stairs = (at, shift = [0, 0], alpha = 1, skyAt = at) => (c, d, seed) => {
    const ox = F[0] - (at + 0.5) * RUN - DEEP * DX + shift[0], oy = F[1] + at * RISE - DEEP * DY + shift[1];
    const p = (s, h, w) => [ox + s + w * DX, oy - h + w * DY], END = STEPS * RUN + 400;
    const quad = (pts, colour, k) => {
      if (pts.every(q => q[0] < -4) || pts.every(q => q[0] > 244) || pts.every(q => q[1] > 244) || pts.every(q => q[1] < -4)) return;
      const B = boil(pts, seed + k, 1.2); c.beginPath(); B.forEach((q, i) => i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])); c.closePath(); c.fillStyle = colour; c.fill(); c.stroke();
    };
    c.save(); c.lineJoin = c.lineCap = 'round';
    if (alpha) sky(c, alpha, skyAt);
    c.strokeStyle = CREAM; c.lineWidth = 2.4;
    const side = [p(RUN, 0, 0)];
    for (let j = 1; j <= STEPS; j++) side.push(p(j * RUN, j * RISE, 0), p((j + 1) * RUN, j * RISE, 0));
    side.pop(); side.push(p(END, STEPS * RISE, 0), p(END, 0, 0));
    quad(side, WALL, 40);
    for (let j = STEPS; j >= 1; j--) {
      quad([p(j * RUN, j * RISE, 0), p(j < STEPS ? (j + 1) * RUN : END, j * RISE, 0), p(j < STEPS ? (j + 1) * RUN : END, j * RISE, WIDE), p(j * RUN, j * RISE, WIDE)], TREAD, j * 2);
      quad([p(j * RUN, (j - 1) * RISE, 0), p(j * RUN, j * RISE, 0), p(j * RUN, j * RISE, WIDE), p(j * RUN, (j - 1) * RISE, WIDE)], RISER, j * 2 + 1);
    }
    c.restore();
  };
  const nub = (c, [x0, y0], [x1, y1], seed) => {
    const len = Math.hypot(x1 - x0, y1 - y0), w = 5;
    c.save(); c.translate(x0, y0); c.rotate(Math.atan2(y1 - y0, x1 - x0));
    closedPath(c, boil([[0, -w], [len * 0.5, -w], [len, -w + 0.6], [len + 4.5, 0], [len, w - 0.6], [len * 0.5, w], [0, w]], seed, 0.7));
    c.fillStyle = tint(); c.fill(); c.strokeStyle = CREAM; inkStroke(c, 2.6); c.restore();
  };
  // in front: dust kicked up where he lands, sweat flying off him, and his arms when they are up
  const fore = ({ dust, sweat, arms, at = F }) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    if (dust) { c.fillStyle = CREAM; c.globalAlpha = 0.5; [[-46, -3, 5], [-56, -9, 3.5], [46, -3, 5], [56, -8, 3.5]].forEach(([x, y, r]) => { c.beginPath(); c.arc(at[0] + x * dust, at[1] + y, r * dust, 0, TAU); c.fill(); }); c.globalAlpha = 1; }
    if (sweat) {
      c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 1.4;
      [[-44, -80, -0.7], [46, -84, 0.7], [-52, -60, -1], [52, -58, 1]].slice(0, sweat).forEach(([x, y, lean]) => { c.save(); c.translate(at[0] + x, at[1] + y); c.rotate(lean); c.beginPath(); c.moveTo(0, -6); c.bezierCurveTo(4.5, 0, 3.5, 4, 0, 4); c.bezierCurveTo(-3.5, 4, -4.5, 0, 0, -6); c.fill(); c.stroke(); c.restore(); });
    }
    if (arms) { const on = ([x, y]) => [at[0] + (x - 128) * K, at[1] + (y - 201) * K]; nub(c, on([94, 116]), arms[0], seed + 98); nub(c, on([166, 114]), arms[1], seed + 99); }
    c.restore();
  };
  const P = 'stair_run_', START = [36, -14];
  const put = (name, base, o, back, front = {}) => { D[P + name] = xf(base, { shadowK: 0, ...o, extra: { back, front: fore(front), ...o.extra } }); };
  const onStep = o => ({ k: K, dx: F[0] - 128, dy: F[1] - 201, ...o });
  put('in1', D.N, { face: FACE.lookr, shadowK: 1 }, stairs(1, [START[0] + 190, START[1]], 0.3, 0));
  put('in2', D.N, { face: FACE.lookr, shadowK: 1 }, stairs(1, [START[0] + 90, START[1]], 0.7, 0));
  put('in3', D.N, { face: FACE.lookr, shadowK: 1 }, stairs(1, [START[0] + 20, START[1]], 1, 0));
  put('in4', D.N, { face: FACE.happy, shadowK: 1 }, stairs(1, START, 1, 0));
  put('on1', D.N, { face: FACE.happy, ky: 0.86, kx: 1.08, shadowK: 1 }, stairs(1, START, 1, 0));
  put('on2', D.N, { face: FACE.happy, k: 0.85, dy: -34, ky: 1.08, kx: 0.95 }, stairs(1, [START[0] / 2, START[1] / 2], 1, 0.5));
  put('on3', D.N, onStep({ face: FACE.happy, ky: 0.86, kx: 1.08 }), stairs(1), { dust: 1 });
  // each hop: crouch on tread n, in the air between the two, land on the next. tired: 0 fresh to 1 spent.
  const hop = (n, face, tired) => {
    const sweat = Math.round(tired * 4);
    put(`h${n}a`, D.N, onStep({ face, ky: 0.88 - tired * 0.1, kx: 1.07 + tired * 0.05, rot: tired * 0.06 }), stairs(n), { sweat: sweat && sweat - 1 });
    put(`h${n}b`, D.N, onStep({ face, dy: F[1] - 201 - 28 + tired * 18, ky: 1.08 - tired * 0.04, kx: 0.95, rot: tired * 0.1 }), stairs(n + 0.5), { sweat });
    put(`h${n}c`, D.N, onStep({ face, ky: 0.86 - tired * 0.16, kx: 1.08 + tired * 0.1 }), stairs(n + 1), { dust: 1 - tired * 0.4, sweat });
  };
  hop(1, FACE.happy, 0); hop(2, puffing, 0.35); hop(3, strained, 0.7); hop(4, spent, 1);
  const TOP = stairs(STEPS);
  put('top1', D.N, onStep({ face: spent, ky: 0.9, kx: 1.05 }), TOP, { sweat: 2 });
  put('top2', D.N, onStep({ face: FACE.happy, ky: 1.04 }), TOP);
  put('win1', D.N, onStep({ face: D.D2.face, extra: { fxm: 'done' } }), TOP, { arms: [[82, 62], [176, 60]] });
  put('win2', D.N, onStep({ face: D.D2.face, dy: F[1] - 201 - 9, ky: 1.05, kx: 0.97, extra: { fxm: 'done' } }), TOP, { arms: [[86, 48], [172, 46]] });
  put('sag1', D.N, onStep({ face: FACE.spiral, rot: 0.05, extra: { fxm: 'oops' } }), TOP, { arms: [[74, 96], [184, 94]] });
  put('sag2', D.N, onStep({ face: FACE.spiral, rot: 0.24, ky: 0.92 }), TOP, { arms: [[78, 122], [188, 120]] });
  put('sag3', D.A5, onStep({ face: [['spiral',112,150,5], ['spiral',150,148,5], ['mouth',[[123,161],[137,160],[138,171],[130,176],[122,171]]]], ky: 0.86, kx: 1.06 }), TOP, { dust: 1.2 });
  put('out1', D.S1, onStep({ face: flat(false) }), TOP);
  put('out2', D.S3, onStep({ face: flat(true) }), TOP);
  put('up1', D.A1, onStep({ face: [['dot',112,150,3.8], ['dot',150,148,3.8], ['stroke',[[123,166],[130,169],[137,166]],2.8]] }), stairs(STEPS, [0, 0], 0.7));
  put('up2', D.N, { face: FACE.happy, k: 0.85, dy: -30, ky: 1.08, kx: 0.95 }, stairs(STEPS, [-70, 60], 0.4));
  put('up3', D.N, { face: FACE.happy, ky: 0.86, kx: 1.08, shadowK: 1 }, stairs(STEPS, [-170, 150], 0.15));
  const s = (id, n) => [P + id, n], step = (n, a, b, c) => [s(`h${n}a`, a), s(`h${n}b`, b), s(`h${n}c`, c)];
  const cheer = n => Array.from({ length: n }, (_, i) => s(i % 2 ? 'win2' : 'win1', 3)), wheeze = n => Array.from({ length: n }, (_, i) => s(i % 2 ? 'out2' : 'out1', 5));
  CLIPS.stair_run = { home: 'idle', seq: [...WAKE, s('in1', 2), s('in2', 2), s('in3', 2), s('in4', 3), s('on1', 2), s('on2', 2), s('on3', 2),
    ...step(1, 2, 2, 2), ...step(2, 3, 2, 3), ...step(3, 4, 3, 4), ...step(4, 6, 3, 5), s('top1', 5), s('top2', 2), ...cheer(5),
    s('sag1', 4), s('sag2', 2), s('sag3', 2), ...wheeze(3), s('up1', 3), s('up2', 2), s('up3', 2), ...DOZE] };
})();

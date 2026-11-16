// Take my money: a gem on a pedestal slides in and his eyes go wide. He thrusts a fan of banknotes at it, then a bigger one, then his whole wallet.
// group: memes
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath, inkStroke, mixHex, tint } = window.__lump;
  const CREAM = '#FFF1DC', STEEL = '#9FB0C4', SLATE = '#6F7C8C', BLUE = '#5AB8FF', DEEP = '#2A6FB0', YELLOW = '#FFD23F', RED = '#FF5A4D', GREEN = '#58D68D', MOSS = '#2F9E63', BROWN = '#6B4A1F', TAN = '#8A5A2B';
  const TAU = Math.PI * 2, P = 'take_my_money_', HOME = -54, SPOT = 210;
  const big = (rx, ry) => [['oval',118,105,rx,ry], ['oval',146,103,rx,ry], ['shine',121.5,101,rx * 0.34], ['shine',149.5,99,rx * 0.34]];
  const wow = [...big(9, 10.5), ['mouth',[[127,121],[135,120],[136,128],[131,131],[126,128]]]];
  const eager = [...big(9, 10.5), ['mouth',[[121,119],[143,117],[140,129],[132,133],[124,129]],[132,130,6,3]]];
  const frantic = [['stroke',[[105,91],[117,87]],2.6], ['stroke',[[146,85],[158,89]],2.6], ...big(9.5, 11), ['mouth',[[119,119],[145,117],[142,131],[132,136],[122,131]],[132,132,7,4]]];
  const rummage = [...FACE.chooEyes, ['stroke',[[120,125],[124,122],[128,125],[132,122],[136,125]],2.6]];
  const plead = [['stroke',[[104,94],[117,87]],2.6], ['stroke',[[146,85],[159,92]],2.6], ...big(9.5, 11), ['shine',114.5,109,1.7], ['shine',142.5,107,1.7], ['stroke',[[124,125],[128,122],[132,125],[136,122],[140,125]],2.4]];
  const left = [['dot',122,110,3.8], ['dot',146,108,3.8], ['stroke',[[127,125],[139,124]],2.6]];
  const pt = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), 201 + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
  const poly = (c, pts) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); c.stroke(); };
  // a banknote with the middle of one short end at (x, y), lying along a. flat: 1 face on, less as it lies down
  const note = (c, x, y, a, flat, seed) => {
    const h = 7.5 * flat;
    c.save(); c.translate(x, y); c.rotate(a);
    c.fillStyle = GREEN; c.strokeStyle = CREAM; c.lineWidth = 2.2; poly(c, boil([[0, -h], [28, -h], [28, h], [0, h]], seed, 0.8));
    c.strokeStyle = MOSS; c.lineWidth = 1.6; c.beginPath(); c.rect(3.2, -h + 2.8 * flat, 21.6, (h - 2.8 * flat) * 2); c.stroke();
    c.fillStyle = MOSS; c.beginPath(); c.ellipse(14, 0, 3.8, 3.8 * flat, 0, 0, TAU); c.fill();
    c.restore();
  };
  const wallet = (c, x, y, a, seed) => {
    c.save(); c.translate(x, y); c.rotate(a + (seed % 3 - 1) * 0.015); c.strokeStyle = CREAM;
    [[19, -10, -0.22], [21, 4, 0.16]].forEach(([nx, ny, na]) => { c.save(); c.translate(nx, ny); c.rotate(na); c.fillStyle = GREEN; c.lineWidth = 2; c.beginPath(); c.rect(0, -6, 19, 12); c.fill(); c.stroke(); c.fillStyle = MOSS; c.fillRect(11, -3, 4, 6); c.restore(); });
    c.fillStyle = BROWN; c.lineWidth = 2.6; c.beginPath(); c.roundRect(0, -16, 28, 32, 5); c.fill(); c.stroke();
    c.fillStyle = TAN; c.beginPath(); c.roundRect(0, -16, 12, 32, 5); c.fill(); c.stroke();
    c.fillStyle = YELLOW; c.lineWidth = 2; c.beginPath(); c.arc(12, 0, 3.2, 0, TAU); c.fill(); c.stroke();
    c.globalAlpha = 0.6; c.lineWidth = 1.4; c.setLineDash([2.5, 3]); c.beginPath(); c.moveTo(17, -12); c.lineTo(24, -12); c.lineTo(24, 12); c.lineTo(17, 12); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
    c.restore();
  };
  const PILE = [[-56, 199, -0.06], [-51, 194.5, 0.12], [-59, 190.5, -0.18], [-50, 186.5, 0.05], [-57, 182.5, -0.1], [-52, 178.5, 0.16]];
  // the pedestal standing at x under its own spotlight with the gem floating over it, twinkling, and `pile` notes thrown down at its foot
  const shrine = (c, x, seed, tick, pile) => {
    const beat = Math.floor(tick / 4) % 3, gy = 98 - (beat ? 1.5 : 0), g = ([px, py]) => [x + px * 1.15, gy + py * 1.15];
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.fillStyle = YELLOW; c.globalAlpha = 0.07; c.beginPath(); c.moveTo(x - 7, 0); c.lineTo(x + 7, 0); c.lineTo(x + 40, 204); c.lineTo(x - 40, 204); c.closePath(); c.fill(); c.globalAlpha = 1;
    c.translate((seed % 3 - 1) * 0.4, 0);
    c.fillStyle = STEEL; poly(c, boil([[x - 13, 143], [x + 13, 143], [x + 15, 191], [x - 15, 191]], seed + 2, 1));
    c.fillStyle = SLATE; c.beginPath(); c.moveTo(x + 5, 145); c.lineTo(x + 11.6, 145); c.lineTo(x + 13.4, 189.5); c.lineTo(x + 6, 189.5); c.closePath(); c.fill();
    c.strokeStyle = SLATE; c.lineWidth = 1.8; c.beginPath(); [-7, -1].forEach(dx => { c.moveTo(x + dx, 150); c.lineTo(x + dx * 1.1, 185); }); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2.6; c.fillStyle = STEEL;
    c.beginPath(); c.roundRect(x - 21, 133, 42, 10, 3); c.fill(); c.stroke(); c.beginPath(); c.roundRect(x - 24, 191, 48, 12, 3); c.fill(); c.stroke();
    c.fillStyle = SLATE; c.fillRect(x - 19, 139, 38, 2.6); c.fillRect(x - 22, 198.6, 44, 2.8);
    c.fillStyle = RED; c.beginPath(); c.ellipse(x, 131, 15, 4.5, 0, 0, TAU); c.fill(); c.stroke();
    PILE.slice(0, pile).forEach(([dx, y, a], i) => note(c, x + dx, y, a, 0.5, seed + i));
    c.fillStyle = YELLOW; c.globalAlpha = 0.12; [24, 33].forEach(r => { c.beginPath(); c.arc(x, gy, r, 0, TAU); c.fill(); }); c.globalAlpha = 1;
    c.fillStyle = BLUE; c.beginPath(); [[-10, -14], [10, -14], [18, -4], [0, 18], [-18, -4]].map(g).forEach(([px, py], i) => i ? c.lineTo(px, py) : c.moveTo(px, py)); c.closePath(); c.fill();
    [[mixHex(BLUE, '#FFFFFF', 0.6), [[-10, -14], [10, -14], [6, -4], [-6, -4]]], [mixHex(BLUE, '#FFFFFF', 0.28), [[-6, -4], [6, -4], [0, 18]]], [DEEP, [[6, -4], [18, -4], [0, 18]]]].forEach(([colour, pts]) => {
      c.fillStyle = colour; c.beginPath(); pts.map(g).forEach(([px, py], i) => i ? c.lineTo(px, py) : c.moveTo(px, py)); c.closePath(); c.fill(); });
    c.globalAlpha = 0.75; c.lineWidth = 1.6; c.beginPath(); [[[-18, -4], [18, -4]], [[-10, -14], [-6, -4], [0, 18]], [[10, -14], [6, -4], [0, 18]]].forEach(line => line.map(g).forEach(([px, py], i) => i ? c.lineTo(px, py) : c.moveTo(px, py))); c.stroke(); c.globalAlpha = 1;
    c.lineWidth = 2.6; c.beginPath(); boil([[-10, -14], [10, -14], [18, -4], [0, 18], [-18, -4]].map(g), seed + 6, 0.8).forEach(([px, py], i) => i ? c.lineTo(px, py) : c.moveTo(px, py)); c.closePath(); c.stroke();
    c.lineWidth = 2; c.fillStyle = CREAM;
    [[-27, -20, 6.5], [22, -27, 5.5], [23, 13, 4.5]].forEach(([dx, dy, s], i) => { if (i === beat) return;
      c.beginPath(); [[0, -s], [s * 0.24, -s * 0.24], [s, 0], [s * 0.24, s * 0.24], [0, s], [-s * 0.24, s * 0.24], [-s, 0], [-s * 0.24, -s * 0.24]].forEach(([px, py], k) => k ? c.lineTo(x + dx + px, gy + dy + py) : c.moveTo(x + dx + px, gy + dy + py)); c.closePath(); c.fill(); });
    c.restore();
  };
  const nub = (c, [x0, y0], [x1, y1], seed) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    c.save(); c.translate(x0, y0); c.rotate(Math.atan2(y1 - y0, x1 - x0));
    closedPath(c, boil([[0, -7], [len * 0.5, -7], [len, -6], [len + 6, 0], [len, 6], [len * 0.5, 7], [0, 7]], seed, 0.8));
    c.fillStyle = tint(); c.fill(); c.strokeStyle = CREAM; inkStroke(c, 3); c.restore();
  };
  // at: where the pedestal stands. hand: where his right nub reaches, holding fan ([notes, the angle between them, a waggle]) or purse (its tilt).
  // pump: his left nub in the air. loose: notes on their way, [x, y, angle, flat]. pile: how many have landed. show: how far the floor has faded in.
  const shot = (o, face, { at = SPOT, hand, fan, purse, pump, loose = [], pile = 0, show = 1 } = {}) => {
    const q = { dx: HOME, ...o }, sr = pt(q, [162, 136]), a = hand && Math.atan2(hand[1] - sr[1], hand[0] - sr[0]);
    return xf(D.N, { ...q, face, extra: {
      back: (c, d, seed, tick) => {
        c.save(); c.lineCap = 'round'; c.strokeStyle = CREAM; c.globalAlpha = 0.35 * show; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke(); c.restore();
        shrine(c, at, seed, tick, pile);
      },
      front: (c, d, seed) => {
        c.save(); c.lineCap = c.lineJoin = 'round';
        if (fan) for (let i = 0; i < fan[0]; i++) note(c, hand[0] + Math.cos(a) * 2, hand[1] + Math.sin(a) * 2, a + (i - (fan[0] - 1) / 2) * fan[1] + fan[2], 1, seed + i);
        if (purse !== undefined) wallet(c, hand[0] + Math.cos(a) * 3, hand[1] + Math.sin(a) * 3, a + purse, seed);
        if (hand) nub(c, sr, hand, seed + 99);
        if (pump) nub(c, pt(q, [94, 138]), pump, seed + 98);
        loose.forEach(([x, y, turn, flat], i) => note(c, x, y, turn, flat, seed + i));
        c.restore();
      } } });
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); }, show = (name, ticks) => seq.push([P + name, ticks]);
  [[0, 272], [-18, 250], [-36, 228], [HOME, 207]].forEach(([dx, at], i) => add('in' + i, i ? 2 : 3, shot({ dx, rot: i % 2 ? 0.04 : -0.03 }, FACE.lookr, { at, show: 0.25 + i * 0.25 })));
  add('there', 2, shot({}, FACE.lookr));
  add('pop', 2, shot({ ky: 1.07, kx: 0.96 }, wow));
  add('wow', 12, shot({ ky: 1.01 }, wow));
  // each offer: duck to dig it out, lunge, hold it there waggling, then throw it down
  const lunge = (name, lean, face, held, reach, more) => {
    add(name + '0', 2, shot({ rot: lean + 0.05, ky: 1.04, kx: 0.98 }, face, { hand: [reach[0] + 6, reach[1] - 3], ...held(0), ...more }));
    [0.06, -0.06].forEach((wag, i) => { D[P + name + (i + 1)] = shot({ rot: lean }, face, { hand: [reach[0], reach[1] + i * 2], ...held(wag), ...more, ...(more.pump && { pump: [more.pump[0] + i * 3, more.pump[1] + i * 5] }) }); });
  };
  add('dig0', 2, shot({ rot: -0.07, ky: 0.9, kx: 1.05 }, wow));
  lunge('some', 0.09, eager, wag => ({ fan: [3, 0.42, wag] }), [140, 123], {});
  for (let i = 0; i < 4; i++) show('some' + (1 + i % 2), 2);
  add('throw0', 2, shot({ rot: 0.04, ky: 1.02 }, eager, { hand: [138, 108], loose: [[152, 120, 0.5, 0.9], [160, 104, -0.3, 0.8], [158, 142, 1.1, 0.7]] }));
  add('dig1', 2, shot({ rot: -0.09, ky: 0.88, kx: 1.06 }, eager, { pile: 3 }));
  lunge('more', 0.13, frantic, wag => ({ fan: [6, 0.3, wag - 0.25] }), [142, 125], { pile: 3, pump: [20, 104] });
  for (let i = 0; i < 4; i++) show('more' + (1 + i % 2), 2);
  add('throw1', 2, shot({ rot: 0.05, ky: 1.02 }, frantic, { hand: [140, 108], pile: 3, loose: [[150, 112, -0.5, 0.9], [158, 134, 0.8, 0.8], [164, 96, 0.2, 0.8], [156, 154, 1.3, 0.6], [144, 92, -1, 0.9]] }));
  D[P + 'dig2'] = shot({ rot: -0.1, ky: 0.86, kx: 1.07, dx: HOME - 2 }, rummage, { pile: 6 });
  D[P + 'dig3'] = shot({ rot: -0.08, ky: 0.88, kx: 1.06, dx: HOME + 2 }, rummage, { pile: 6 });
  show('dig2', 2); show('dig3', 2); show('dig2', 2);
  add('all0', 2, shot({ rot: 0.21, ky: 1.05, kx: 0.97 }, plead, { hand: [150, 123], purse: 0.1, pile: 6 }));
  add('all1', 18, shot({ rot: 0.16 }, plead, { hand: [144, 127], purse: 0, pile: 6 }));
  add('gone0', 2, shot({ rot: 0.1 }, plead, { hand: [141, 130], purse: 0.1, pile: 6, at: SPOT + 14 }));
  add('gone1', 2, shot({ dx: -36, rot: 0.04 }, left, { hand: [152, 142], purse: 0.4, pile: 6, at: SPOT + 42, show: 0.7 }));
  add('gone2', 2, shot({ dx: -18 }, left, { pile: 6, at: SPOT + 92, show: 0.4 }));
  add('oh', 2, xf(D.N, { face: FACE.sheep }));
  CLIPS.take_my_money = { home: 'idle', seq: [...seq, ...DOZE] };
})();

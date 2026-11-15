// Bottle flip: he flips a bottle of water. It slaps down on its side, then lands on its base and topples; the third one sticks. He throws both arms up, and the thump of his cheering knocks it over.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', FLOOR = '#2B3440', WATER = '#5AB8FF', CAP = '#2E7FB8', LABEL = '#F4F8FF', TAU = Math.PI * 2, HALF = Math.PI / 2;
  const LX = 188, K = 1.14, STAND = 201 - 30.5 * K, LIE = 201 - 11.5 * K, P = 'bottle_flip_';
  const atHand = [['dot',124,112,3.8], ['dot',148,110,3.8], ['stroke',[[124,124],[131,127],[138,123]],2.6]];
  const upAfter = [['dot',124,103,3.8], ['dot',148,101,3.8], ['stroke',[[126,121],[131,123],[136,121]],2.6]];
  const atFloor = [['dot',126,114,3.8], ['dot',150,112,3.8], ['stroke',[[128,126],[136,126]],2.6]];
  const meh = [['stroke',[[117,105],[131,105]],2.4], ['stroke',[[143,103],[157,103]],2.4], ['dot',126,114,3.4], ['dot',150,112,3.4], ['stroke',[[128,127],[137,126]],2.6]];
  const cross = [['stroke',[[114,101],[128,106]],2.8], ['stroke',[[142,104],[156,99]],2.8], ['dot',125,113,3.6], ['dot',149,111,3.6], ['stroke',[[126,128],[131,125],[137,128]],2.6]];
  const set = [['stroke',[[114,102],[128,105]],2.6], ['stroke',[[142,103],[156,100]],2.6], ['dot',124,112,3.6], ['dot',148,110,3.6], ['stroke',[[130,125],[137,124]],2.6]];
  const agog = [['dot',126,112,5], ['dot',150,110,5], ['stroke',[[115,98],[127,95]],2.4], ['stroke',[[146,93],[158,96]],2.4], ['mouth',[[131,121],[139,120],[140,128],[135,131],[130,128]]]];
  const joy = [...FACE.aahEyes, ['mouth',[[116,118],[140,116],[138,131],[128,136],[118,131]],[128,132,6,4]]];
  const oops = [['dot',126,113,4.4], ['dot',150,111,4.4], ['stroke',[[123,126],[135,125]],2.6]];
  const deadpan = [['stroke',[[108,104],[124,104]],3], ['stroke',[[132,102],[148,102]],3], ['dot',116,109,3.4], ['dot',140,107,3.4], ['stroke',[[122,125],[134,124]],2.8]];
  const pt = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), 201 + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
  const outline = c => {
    c.beginPath(); c.moveTo(-4.2, -24); c.lineTo(4.2, -24); c.quadraticCurveTo(5, -15, 11, -11); c.lineTo(11, -3); c.quadraticCurveTo(8.5, 1.5, 11, 6); c.lineTo(11, 25); c.quadraticCurveTo(11, 30, 6, 30);
    c.lineTo(-6, 30); c.quadraticCurveTo(-11, 30, -11, 25); c.lineTo(-11, 6); c.quadraticCurveTo(-8.5, 1.5, -11, -3); c.lineTo(-11, -11); c.quadraticCurveTo(-5, -15, -4.2, -24); c.closePath();
  };
  // a plastic bottle a third full, its middle at (x, y), turned by rot (0: stood up). water: [the tilt of its surface, how far that is from the middle]; left out, the water lies level.
  const bottle = (c, x, y, rot, water = [-rot, 10 - 7 * Math.abs(Math.sin(rot))]) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.scale(K, K); c.strokeStyle = CREAM;
    outline(c); c.fillStyle = 'rgba(200,225,245,.2)'; c.fill();
    c.save(); c.clip();
    c.save(); c.rotate(water[0]); c.fillStyle = WATER; c.fillRect(-60, water[1], 120, 90); c.fillStyle = '#C8E8FF'; c.fillRect(-60, water[1], 120, 1.8); c.restore();
    c.fillStyle = LABEL; c.fillRect(-12, -11, 24, 8.5); c.restore();
    c.strokeStyle = WATER; c.lineWidth = 1.6; c.beginPath(); c.moveTo(-8, -6.5); c.quadraticCurveTo(-4, -9.5, 0, -6.5); c.quadraticCurveTo(4, -3.5, 8, -6.5); c.stroke();
    c.strokeStyle = CREAM; c.globalAlpha = 0.5; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-10, 13); c.lineTo(10, 13); c.moveTo(-10, 20); c.lineTo(10, 20); c.moveTo(-7, -17); c.lineTo(-8, -13); c.stroke();
    c.globalAlpha = 1; c.lineWidth = 2.2; outline(c); c.stroke();
    c.fillStyle = CAP; c.beginPath(); c.roundRect(-5, -31, 10, 7, 2); c.fill(); c.stroke();
    c.restore();
  };
  // behind him: the floor and his shadow. thud: how hard he has just come down.
  const ground = (floor, thud) => (c, d) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.globalAlpha = floor; c.fillStyle = FLOOR; c.fillRect(0, 201, 240, 39);
    c.strokeStyle = CREAM; c.lineWidth = 2; c.globalAlpha = floor * 0.4; c.beginPath(); c.moveTo(0, 201); c.lineTo(240, 201); c.stroke(); c.globalAlpha = floor;
    if (d.shadow[1]) { c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.ellipse(d.shadow[0] + 4, 204, d.shadow[1], 6, 0, 0, TAU); c.fill(); }
    if (thud) { c.lineWidth = 2.6; c.beginPath(); [[-66, -6, -78, -15], [-58, -16, -66, -28], [62, -6, 74, -15], [54, -16, 61, -28]].forEach(([x0, y0, x1, y1]) => { c.moveTo(d.shadow[0] + x0, 201 + y0); c.lineTo(d.shadow[0] + x1, 201 + y1); }); c.stroke(); }
    c.restore();
  };
  // one drawing. hand: where his right hand is, from its shoulder. grip: he holds the bottle by its neck, tipped this far. to: his hand reaches this spot instead.
  // bot: the bottle on its own, [x, y, turn, water]. up: both arms raised this far, 0 to 1. slap: it has just hit the floor. thud: his landing shakes the floor.
  const shot = (o, face, { hand, grip, to, bot, up, slap, thud, floor = 1, ...more } = {}) => {
    const S = pt(o, [164, 140]), L = pt(o, [92, 140]), H = to || (hand && [S[0] + hand[0], S[1] + hand[1]]);
    const b = grip !== undefined ? [H[0] - 24 * K * Math.sin(grip), H[1] + 24 * K * Math.cos(grip), grip] : bot;
    return xf(D.N, { ...o, face, extra: { ...more, ...(H && { arm2: [S, H] }), ...(up && { arm: [L, [L[0] - 22 - up * 6, L[1] + 14 - up * 58]], arm2: [S, [S[0] + 22 + up * 6, S[1] + 14 - up * 58]] }),
      back: ground(floor, thud), front: c => {
        if (!b) return;
        c.save(); c.lineCap = c.lineJoin = 'round'; bottle(c, ...b);
        if (slap) { c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); [[-40, -6, -50, -13], [-30, -16, -36, -26], [40, -6, 50, -13], [30, -16, 36, -26]].forEach(([x0, y0, x1, y1]) => { c.moveTo(b[0] + x0, 201 + y0); c.lineTo(b[0] + x1, 201 + y1); }); c.stroke(); }
        c.restore();
      } } });
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); }, show = (name, ticks) => seq.push([P + name, ticks]);
  const HERE = { dx: -48 }, LAIN = [LX, LIE, -HALF], HELD = { hand: [24, -12], grip: 0 };
  // one throw: the wind-up, the flick, and four drawings of it in the air, turning `spin` in all on its way to (LX, y)
  const toss = (n, spin, y, faces, wind = 4) => {
    add('wind' + n, wind, shot({ ...HERE, rot: -0.07, ky: 0.95, kx: 1.03 }, faces[0], { hand: [17, 0], grip: 0.45 }));
    add('flick' + n, 2, shot({ ...HERE, rot: 0.05, ky: 1.04 }, upAfter, { hand: [28, -36], bot: [152, 94, spin * 0.1, [0.3, 12]] }));
    [[0.2, 0.3], [0.45, 0.55], [0.7, 0.78], [0.9, 0.94]].forEach(([t, turned], i) => add('fly' + n + i, 2, shot(HERE, i < 2 ? upAfter : atFloor,
      { hand: i ? [22, -4 + i * 4] : [28, -28], bot: [152 + (LX - 152) * t, 94 + (y - 94) * t - 360 * t * (1 - t), spin * turned, [i % 2 ? -0.5 : 0.4, 11]] })));
  };

  add('in0', 3, shot({ dx: -14, rot: -0.03 }, FACE.lookr, { floor: 0.4, bot: [272, LIE, -HALF] }));
  add('in1', 2, shot({ dx: -32, rot: -0.04 }, FACE.lookr, { floor: 0.8, bot: [222, LIE, -HALF] }));
  add('in2', 2, shot(HERE, atFloor, { bot: [LX + 4, LIE, -HALF] }));
  D[P + 'pick'] = shot({ ...HERE, rot: 0.2, ky: 0.97 }, atFloor, { to: [LX - 25 * K, LIE - 3], bot: LAIN });
  D[P + 'lift'] = shot({ ...HERE, rot: 0.08 }, atHand, { hand: [27, 4], grip: -0.8 });
  const pickUp = () => { show('pick', 2); show('lift', 2); };
  pickUp();
  add('hold', 2, shot(HERE, atHand, HELD));
  toss(1, TAU * 0.75, LIE, [atHand]);
  add('slap', 2, shot(HERE, atFloor, { bot: [LX - 2, LIE - 3, -HALF - 0.22], slap: true }));
  add('skip', 2, shot(HERE, atFloor, { bot: [LX + 1, LIE - 9, -HALF + 0.12] }));
  add('flat', 4, shot(HERE, meh, { bot: LAIN }));
  pickUp();
  toss(2, TAU - 0.45, STAND + 2, [cross], 2);
  add('edge', 4, shot({ ...HERE, ky: 1.03 }, agog, { bot: [LX - 4, STAND + 2, -0.42, [0.2, 9]] }));
  add('topple', 2, shot(HERE, agog, { bot: [LX - 6, STAND + 9, -1, [0.8, 6]] }));
  add('slap2', 2, shot(HERE, atFloor, { bot: [LX - 1, LIE - 4, -HALF - 0.1], slap: true }));
  add('flat2', 4, shot({ ...HERE, ky: 0.97 }, cross, { bot: LAIN }));
  pickUp();
  add('steady', 4, shot({ ...HERE, ky: 0.97 }, set, HELD));
  toss(3, TAU, STAND, [set]);
  add('stick0', 2, shot(HERE, atFloor, { bot: [LX, STAND, -0.1, [0.3, 9]] }));
  add('stick1', 2, shot(HERE, atFloor, { bot: [LX, STAND, 0.07, [-0.25, 10]] }));
  add('stuck', 6, shot({ ...HERE, ky: 1.02 }, agog, { bot: [LX, STAND, 0] }));
  // the cheer: two jumps, and each landing shakes the bottle
  const UP = { ...HERE, dy: -24, ky: 1.07, kx: 0.96, shadowK: 0.7 }, DOWN = { ...HERE, ky: 0.85, kx: 1.1 };
  add('crouch', 2, shot({ ...HERE, ky: 0.84, kx: 1.1 }, joy, { up: 0.3, bot: [LX, STAND, 0] }));
  add('yay0', 4, shot(UP, joy, { up: 1, bot: [LX, STAND, 0], fxm: 'done' }));
  add('thump0', 2, shot(DOWN, joy, { up: 0.9, thud: true, bot: [LX, STAND - 4, 0.12, [-0.3, 9]] }));
  add('rock', 2, shot(HERE, joy, { up: 1, bot: [LX, STAND, -0.09, [0.25, 10]] }));
  add('yay1', 4, shot(UP, joy, { up: 1, bot: [LX, STAND, 0.04], fxm: 'done' }));
  add('thump1', 2, shot(DOWN, joy, { up: 0.9, thud: true, bot: [LX + 1, STAND - 5, 0.24, [-0.4, 9]] }));
  add('tip', 2, shot(HERE, joy, { up: 1, bot: [LX + 6, STAND + 4, 0.75, [-0.2, 7]] }));
  add('clunk', 2, shot(HERE, oops, { up: 1, bot: [LX + 9, LIE - 5, HALF + 0.14], slap: true }));
  const OVER = [LX + 8, LIE, HALF];
  add('oops', 4, shot(HERE, oops, { up: 1, bot: OVER }));
  add('sag', 6, shot({ ...HERE, ky: 0.98 }, deadpan, { up: 0.45, bot: OVER }));
  add('dead', 6, shot({ ...HERE, ky: 0.96, kx: 1.02 }, deadpan, { bot: OVER }));
  add('out0', 2, shot({ dx: -36 }, deadpan, { bot: [LX + 28, LIE, HALF] }));
  add('out1', 2, shot({ dx: -22 }, FACE.sheep, { floor: 0.7, bot: [LX + 66, LIE, HALF] }));
  add('out2', 2, shot({ dx: -8 }, FACE.sheep, { floor: 0.35 }));
  add('out', 2, xf(D.N, { face: FACE.sheep }));
  CLIPS.bottle_flip = { home: 'idle', seq: [...seq, ...DOZE] };
})();

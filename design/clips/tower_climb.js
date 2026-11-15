// Tower climb: a little city comes up behind him. He leaps onto its tallest tower, climbs to the top, and swats at the paper aeroplanes circling him until he gets one.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', SHADE = '#B9AE98', NAVY = '#2B3A4A', DUSK = '#1E2936', SLATE = '#6F7C8C', YELLOW = '#FFD23F', TAU = Math.PI * 2, P = 'tower_climb_';
  // faces drawn large, to read when he is small and far away
  const watch = (dx, dy = 0) => [['dot',116 + dx,108 + dy,5], ['dot',142 + dx,106 + dy,5], ['stroke',[[122 + dx,126 + dy],[129 + dx,128 + dy],[136 + dx,125 + dy]],3.4]];
  const mad = [['stroke',[[98,96],[118,103]],3.6], ['stroke',[[130,101],[150,94]],3.6], ['dot',110,111,4.6], ['dot',138,109,4.6], ['stroke',[[114,128],[134,127]],3.6]];
  const swing = [['stroke',[[98,102],[110,109],[98,116]],3.6], ['stroke',[[144,100],[132,107],[144,114]],3.6], ['mouth',[[110,120],[134,118],[134,131],[122,136],[110,131]]]];
  const yikes = [['dot',112,106,5.4], ['dot',140,104,5.4], ['mouth',[[119,117],[135,116],[137,132],[127,137],[117,132]]]];
  const roar = [['stroke',[[104,108],[112,101],[120,108]],3.6], ['stroke',[[134,106],[142,99],[150,106]],3.6], ['mouth',[[110,117],[146,115],[142,132],[128,139],[114,132]],[128,134,8,5]]];
  const effort = [...FACE.chooEyes, ['stroke',[[121,126],[135,125]],2.8]];
  // the skyline and the tower, `sunk` below where they end up
  const city = (c, seed, sunk) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    c.globalAlpha = Math.max(0, 1 - sunk / 60); c.fillStyle = CREAM; c.beginPath(); c.arc(38, 36, 14, 0, TAU); c.fill(); c.fillStyle = '#000'; c.beginPath(); c.arc(45, 31, 12.5, 0, TAU); c.fill();
    c.fillStyle = CREAM; c.beginPath(); [[98, 20, 1.6], [208, 34, 2], [226, 84, 1.4], [18, 96, 1.6]].forEach(([x, y, r]) => { c.moveTo(x + r, y); c.arc(x, y, r, 0, TAU); }); c.fill(); c.globalAlpha = 1;
    c.translate((seed % 3 - 1) * 0.5, sunk - 14);
    c.fillStyle = DUSK; c.strokeStyle = SLATE; c.lineWidth = 2; c.beginPath(); c.moveTo(-4, 300);
    [[-4, 222], [14, 222], [14, 208], [34, 208], [34, 228], [52, 228], [52, 214], [74, 214], [74, 224], [96, 224], [96, 210], [120, 210], [120, 222], [206, 222], [206, 228], [222, 228], [222, 206], [244, 206], [244, 300]].forEach(([x, y]) => c.lineTo(x, y));
    c.closePath(); c.fill(); c.stroke();
    c.fillStyle = NAVY; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.moveTo(100, 300);
    [[100, 232], [108, 232], [108, 204], [116, 204], [116, 180], [124, 180], [124, 166], [188, 166], [188, 180], [196, 180], [196, 204], [204, 204], [204, 232], [212, 232], [212, 300]].forEach(([x, y]) => c.lineTo(x, y));
    c.closePath(); c.fill(); c.stroke();
    c.fillStyle = DUSK; c.fillRect(181, 168, 5.5, 11); c.fillRect(188, 182, 6.5, 21); c.fillRect(196, 206, 6.5, 25); c.fillRect(204, 234, 6.5, 30);
    c.fillStyle = YELLOW; c.beginPath();
    [0, 1, 3, 4].forEach(i => c.rect(122 + i * 13, 187, 6, 9)); [0, 2, 3, 5].forEach(i => c.rect(114 + i * 13, 212, 6, 9)); [0, 1, 3, 4, 6].forEach(i => c.rect(106 + i * 13, 240, 6, 9));
    [[20, 214], [26, 220], [58, 220], [80, 219], [228, 212], [234, 220], [228, 228]].forEach(([x, y]) => c.rect(x, y, 3.5, 3.5));
    c.fill(); c.restore();
  };
  // the mast on the tower's roof, with its warning light lit or not
  const mast = (c, sunk, lit) => {
    c.save(); c.translate(0, sunk - 14); c.lineCap = 'round'; c.beginPath(); c.moveTo(182, 164); c.lineTo(182, 114); c.moveTo(176, 128); c.lineTo(188, 128);
    c.strokeStyle = CREAM; c.lineWidth = 6; c.stroke(); c.strokeStyle = SLATE; c.lineWidth = 2.4; c.stroke();
    c.fillStyle = lit ? '#FF5A4D' : '#8E2B22'; c.strokeStyle = CREAM; c.lineWidth = 1.8; c.beginPath(); c.arc(182, 110, 4, 0, TAU); c.fill(); c.stroke();
    c.restore();
  };
  // a paper aeroplane heading left (dir -1) or right, `turn` round from level
  const plane = (c, [x, y, dir, turn, s]) => {
    c.save(); c.translate(x, y); c.scale(dir * s, s); c.rotate(turn);
    c.fillStyle = CREAM; c.beginPath(); c.moveTo(17, 0); c.lineTo(-14, -9); c.lineTo(-8, 0); c.closePath(); c.fill();
    c.fillStyle = SHADE; c.beginPath(); c.moveTo(17, 0); c.lineTo(-8, 0); c.lineTo(-13, 8); c.closePath(); c.fill();
    c.restore();
  };
  // Three planes circle the tower top once every 27 steps, one passing his swatting side every 9: on steps 6, 15 and 24.
  // wide: how far out they are flying. hop: the one going past jumps his arm.
  const SWAT = [84, 126];
  const circling = (n, wide = 1, hop = 0, only = [0, 1, 2]) => only.map(j => {
    const a = 2.45 + (n - 6 - 9 * j) * TAU / 27, near = Math.sin(a) > 0, passing = Math.abs(n - 6 - 9 * j) < 2;
    return [150 + 86 * wide * Math.cos(a), 110 + 24 * wide * Math.sin(a) - (passing ? hop : 0), near ? -1 : 1, -0.22 * Math.cos(a) - (passing ? hop * 0.03 : 0), 1.05 + 0.2 * Math.sin(a), near];
  });
  const pt = (o, [x, y]) => { const r = o.rot || 0, k = o.k || 1, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + (u * Math.cos(r) - v * Math.sin(r)) * k + (o.dx || 0), 201 + (u * Math.sin(r) + v * Math.cos(r)) * k + (o.dy || 0)]; };
  const at = (x, y, k, o) => ({ k, dx: x - 128, dy: y - 201, ...o });                  // standing at (x, y), k of his full size
  // him in front of the city. hand: where his left arm is (in his own coordinates), hold: he has the mast in his right. bang: a swat that lands
  const shot = (o, face, { sunk = 0, planes = [], hand, hand2, hold, lit, bang, shadowK = 0 } = {}) => xf(D.N, { ...o, face, shadowK, extra: {
    arm: hand && [pt(o, [92, 136]), pt(o, hand)], arm2: hold ? [pt(o, [164, 138]), [181, 124]] : hand2 && [pt(o, [164, 136]), pt(o, hand2)],
    back: (c, d, seed) => { city(c, seed, sunk); planes.filter(p => !p[5]).forEach(p => plane(c, p)); },
    front: (c, d, seed) => {
      mast(c, sunk, lit);
      planes.filter(p => p[5]).forEach(p => plane(c, p));
      if (bang) { c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); for (let i = 0; i < 6; i++) { const a = i * TAU / 6 + 0.4; c.moveTo(SWAT[0] - 6 + Math.cos(a) * 9, SWAT[1] + Math.sin(a) * 9); c.lineTo(SWAT[0] - 6 + Math.cos(a) * 17, SWAT[1] + Math.sin(a) * 17); } c.stroke(); c.restore(); }
    } } });
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };
  const TOP = [150, 152, 0.56], NEAR = [66, 201, 1];

  // he makes room and the city comes up behind him
  [[112, 80], [92, 40], [74, 14], [66, 0]].forEach(([x, sunk], i) => add('rise' + i, i ? 2 : 3, shot(at(x, 201, 1, { rot: i < 3 ? -0.05 : 0 }), FACE.lookr, { sunk, shadowK: 1 })));
  add('eye', 6, shot(at(...NEAR), FACE.lookr, { shadowK: 1, lit: true }));
  add('crouch', 4, shot(at(...NEAR, { ky: 0.8, kx: 1.1 }), effort, { shadowK: 1 }));
  // a leap away from us onto the tower's shoulder, then up the last of it
  [[84, 140, 0.86, 0.12], [104, 104, 0.72, 0.25], [114, 118, 0.62, 0.35], [117, 152, 0.56, 0.3]].forEach(([x, y, k, rot], i) =>
    add('leap' + i, 2, shot(at(x, y, k, { rot, ky: i < 2 ? 1.08 : 1 }), i < 2 ? FACE.aah : yikes, { hand: [70, 96], hand2: [186, 92], lit: i % 2 })));
  add('cling', 4, shot(at(117, 172, 0.56, { rot: 0.3, ky: 0.9 }), effort, { hand2: [196, 104] }));
  [[122, 165, 0.24, [200, 96]], [134, 157, 0.12, [196, 124]], [144, 153, 0.05, [200, 112]]].forEach(([x, y, rot, hand2], i) =>
    add('climb' + i, 2, shot(at(x, y, 0.56, { rot }), effort, { hand2, hand: i % 2 ? [66, 110] : undefined, lit: i % 2 })));
  add('up', 6, shot(at(...TOP), roar, { hold: true, lit: true }));
  // n: the step. Nine steps to a swat: watch, wind up, swing, and stagger after it
  const ARM = { '-3': [62, 128], '-2': [72, 84], '-1': [78, 76], 0: [34, 130], 1: [46, 164], 2: [62, 154] };
  const LEAN = [[0.07, 0.1, -0.14, -0.2, -0.08], [0.08, 0.12, -0.2, -0.36, -0.2], [0.08, 0.12, -0.17, -0.1, 0]];
  for (let n = 0; n < 27; n++) {
    const go = Math.floor(n / 9), r = n % 9 - 6, rot = r < -2 ? 0 : LEAN[go][r + 2], hit = go === 2 && r >= 0;
    const face = r < -3 ? [watch(10), watch(4, -8), watch(-10)][n % 3] : r < 0 ? mad : r === 0 ? swing : hit ? roar : go ? yikes : mad;
    add('swat' + n, 2, shot(at(...TOP, { rot, ...(r === 0 ? { ky: 1.05 } : {}) }), face, {
      hold: true, hand: ARM[r], lit: n % 4 < 2, bang: hit && r === 0,
      planes: [...circling(n, n < 3 ? [1.9, 1.5, 1.2][n] : hit ? 1 + r * 0.45 : 1, r === 0 && !hit ? 15 : Math.abs(r) === 1 && !hit ? 7 : 0, hit ? [0, 1] : [0, 1, 2]),
        ...(hit ? [[[78, 126, -1, 0.5, 1.2, true], [60, 150, -1, 1.6, 1.2, true], [48, 186, -1, 2.9, 1.2, true]][r]] : [])] }));
  }
  add('won', 4, shot(at(...TOP, { ky: 1.06, kx: 0.97 }), roar, { hold: true, hand: [58, 86], lit: true, planes: [[42, 230, -1, 4, 1.2, true]] }));
  add('king', 10, shot(at(...TOP), roar, { hold: true, hand: [62, 92], lit: false }));
  // and back: a leap towards us, and the city goes down again
  add('ready', 2, shot(at(...TOP, { ky: 0.84, kx: 1.08 }), effort, { lit: true }));
  [[126, 100, 0.7, -0.2, 8], [94, 124, 0.88, -0.1, 30]].forEach(([x, y, k, rot, sunk], i) => add('home' + i, 2, shot(at(x, y, k, { rot, ky: 1.06 }), FACE.aah, { sunk, hand: [70, 96], hand2: [186, 92] })));
  add('land', 4, shot(at(...NEAR, { ky: 0.76, kx: 1.14 }), effort, { sunk: 60, shadowK: 1 }));
  add('back0', 2, shot(at(84, 201, 1, { ky: 1.05, rot: 0.05 }), FACE.happy, { sunk: 100, shadowK: 1 }));
  add('back1', 2, shot(at(108, 201, 1, { rot: 0.05 }), FACE.happy, { sunk: 150, shadowK: 1 }));
  CLIPS.tower_climb = { home: 'idle', seq: [...seq, ...DOZE] };
})();

// Table flip: a table laid for dinner comes up in front of him. He simmers, then hurls it over in a rage, plates and vase and all; a beat later, rather sheepish, he stands it back up, lays it again and straightens the vase.
// group: memes
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath, inkStroke, tint } = window.__lump;
  const CREAM = '#FFF1DC', WHITE = '#F4F8FF', CHINA = '#C9D4E0', BLUE = '#5AB8FF', NAVY = '#3D8FD1', BROWN = '#6B4A1F', WOOD = '#8A5A2B', YELLOW = '#FFD23F', AMBER = '#E0962A', GREEN = '#58D68D', RED = '#FF5A4D', HOT = '#FF2A1F', TAU = Math.PI * 2;
  const P = 'table_flip_', HOME = -18, TX = 120, TY = 156, OVER = 166;
  const lookdown = [['dot',116,114,3.8], ['dot',140,112,3.8], ['stroke',[[122,126],[128,127.5],[134,126]],2.6]];
  const cross = (tilt, r, mouth) => [['stroke',[[106,103 - tilt],[121,103 + tilt]],3], ['stroke',[[135,101 + tilt],[150,101 - tilt]],3], ['dot',116,112,r], ['dot',140,110,r], mouth];
  const peeved = cross(0.5, 3.6, ['stroke',[[121,126],[135,125]],2.8]), cross2 = cross(3, 3.4, ['stroke',[[120,127],[124,124.5],[128,127],[132,124.5],[136,127]],2.8]), grit = cross(5, 3.2, ['teeth',128,126,20,9]);
  const roar = cross(6, 3, ['mouth',[[112,118],[144,116],[143,133],[128,141],[113,133]],[128,137,9,5]]);
  const pant = cross(2, 3.4, ['mouth',[[122,121],[134,120],[135,129],[128,132],[121,129]]]);
  const oops = [['stroke',[[110,99],[121,97]],2.4], ['stroke',[[139,95],[150,96]],2.4], ['dot',121,111,4.4], ['dot',145,109,4.4], ['mouth',[[127,122],[135,121.5],[136,128],[131,130.5],[126,128]]]];
  const sheep = [['blush',100,121,9,5], ['blush',156,119,9,5], ['dot',111,111,3.6], ['dot',135,109,3.6], ['stroke',[[118,125],[123,122.5],[128,125],[133,122.5]],2.6]];
  const eyeing = [['dot',122,112,3.8], ['dot',146,110,3.8], ['stroke',[[126,125],[136,124]],2.6]];
  const bashful = [['blush',100,121,9,5], ['blush',156,119,9,5], ['stroke',[[110,111],[116,107],[122,111]],3], ['stroke',[[134,109],[140,105],[146,109]],3], ['stroke',[[120,123],[124,126],[128,124],[132,126],[136,123]],2.6]];
  const pt = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), 201 + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
  // the room behind him: the floor and a picture on the wall, which the crash knocks crooked
  const room = (fade, knock = 0) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.globalAlpha = 0.35 * fade; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke();
    c.globalAlpha = 0.7 * fade; c.beginPath(); c.moveTo(29, 14); c.lineTo(29, 26); c.stroke();
    c.translate(29, 26); c.rotate(knock); c.globalAlpha = fade;
    c.fillStyle = '#23405A'; c.lineWidth = 2.4; c.beginPath(); c.roundRect(-17, 4, 34, 26, 2); c.fill(); c.stroke();
    c.fillStyle = GREEN; c.beginPath(); c.moveTo(-15, 28); c.quadraticCurveTo(-4, 14, 6, 22); c.quadraticCurveTo(11, 18, 15, 22); c.lineTo(15, 28); c.closePath(); c.fill();
    c.fillStyle = YELLOW; c.beginPath(); c.arc(8, 12, 3.4, 0, TAU); c.fill();
    c.restore();
  };
  // the table with its cloth, the middle of its top at (x, y), turned by rot
  const table = (c, seed, x, y, rot = 0) => {
    c.save(); c.translate(x + (seed % 3 - 1) * 0.4, y); c.rotate(rot); c.strokeStyle = CREAM;
    c.fillStyle = BROWN; c.lineWidth = 2.6; c.beginPath(); c.rect(-7, 28, 14, 14); c.roundRect(-28, 41, 56, 7, 3); c.fill(); c.stroke();
    c.fillStyle = NAVY; c.lineWidth = 3; c.beginPath(); c.moveTo(-74, 0); c.lineTo(-74, 27);
    for (let i = 1; i < 8; i++) c.lineTo(-74 + i * 18.5, i % 2 ? 34 : 27);
    c.lineTo(74, 27); c.lineTo(74, 0); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = BLUE; c.lineWidth = 2.2; c.beginPath(); [-55.5, -18.5, 18.5, 55.5].forEach((u, i) => { c.moveTo(u, 17); c.lineTo(u + (i % 2 ? 2 : -2), 29); }); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 3; c.fillStyle = BLUE; c.beginPath(); c.ellipse(0, 0, 74, 14, 0, 0, TAU); c.fill(); c.stroke();
    c.restore();
  };
  // the table upside down on the floor at x, having bounced `up`: foot in the air, the cloth squashed underneath
  const upturned = (c, seed, x, up = 0) => {
    c.save(); c.translate(x, 206 - up); c.strokeStyle = CREAM;
    c.fillStyle = BLUE; c.lineWidth = 2.6; closedPath(c, boil([[-78, -4], [-60, 2], [-30, 0], [4, 3], [36, 0], [62, 2], [78, -4], [64, -11], [-64, -11]], seed + 13, 1.4)); c.fill(); c.stroke();
    c.fillStyle = WOOD; c.lineWidth = 3; c.beginPath(); c.ellipse(0, -12, 71, 11.5, 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = BROWN; c.lineWidth = 2; c.beginPath(); c.ellipse(0, -12.5, 48, 6.6, 0, 0, TAU); c.stroke();
    c.strokeStyle = CREAM; c.fillStyle = BROWN; c.lineWidth = 2.6; c.beginPath(); c.rect(-7, -46, 14, 33); c.roundRect(-28, -53, 56, 7, 3); c.fill(); c.stroke();
    c.restore();
  };
  const DRAW = {
    plate: (c, seed, x, y, r, open = 0.3, tilt = 0) => {
      c.fillStyle = WHITE; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.ellipse(x, y, r, Math.max(1.4, r * open), tilt, 0, TAU); c.fill(); c.stroke();
      c.strokeStyle = CHINA; c.lineWidth = 1.8; c.beginPath(); c.ellipse(x, y, r * 0.6, Math.max(0.7, r * open * 0.6), tilt, 0, TAU); c.stroke();
    },
    fork: (c, seed, x, y, a, len = 14) => {
      c.save(); c.translate(x, y); c.rotate(a); c.strokeStyle = WHITE; c.lineWidth = 2.4; c.beginPath(); c.moveTo(0, 0); c.lineTo(len - 6, 0); c.moveTo(len - 6, -3.2); c.lineTo(len - 6, 3.2); c.stroke();
      c.lineWidth = 1.8; c.beginPath(); [-3.2, 0, 3.2].forEach(v => { c.moveTo(len - 6, v); c.lineTo(len, v); }); c.stroke(); c.restore();
    },
    knife: (c, seed, x, y, a, len = 14) => {
      c.save(); c.translate(x, y); c.rotate(a); c.strokeStyle = CHINA; c.lineWidth = 2.6; c.beginPath(); c.moveTo(0, 0); c.lineTo(len * 0.4, 0); c.stroke();
      c.strokeStyle = WHITE; c.lineWidth = 4; c.beginPath(); c.moveTo(len * 0.5, 0); c.lineTo(len, 0); c.stroke(); c.restore();
    },
    // standing on (x, y) and tipped by rot; flop: how far over its flower is hanging
    vase: (c, seed, x, y, rot = 0, flop = 0) => {
      const fx = 2 + flop * 15, fy = -42 + Math.abs(flop) * 9;
      c.save(); c.translate(x, y); c.rotate(rot); c.scale(1.25, 1.25);
      c.strokeStyle = GREEN; c.lineWidth = 2.4; c.beginPath(); c.moveTo(0, -22); c.quadraticCurveTo(1 + flop * 5, -33, fx, fy); c.stroke();
      c.fillStyle = GREEN; c.beginPath(); c.ellipse(-3.5 + flop * 3, -30.5, 4.6, 2.2, -0.7, 0, TAU); c.fill();
      c.fillStyle = CREAM; c.beginPath(); for (let i = 0; i < 5; i++) { const a = i / 5 * TAU + flop, px = fx + Math.cos(a) * 4.6, py = fy + Math.sin(a) * 4.6; c.moveTo(px + 3.2, py); c.arc(px, py, 3.2, 0, TAU); } c.fill();
      c.fillStyle = AMBER; c.beginPath(); c.arc(fx, fy, 2.8, 0, TAU); c.fill();
      c.fillStyle = YELLOW; c.strokeStyle = CREAM; c.lineWidth = 2.4;
      closedPath(c, boil([[-5, 0], [-9, -7], [-8, -14], [-4, -19], [-4.5, -24], [4.5, -24], [4, -19], [8, -14], [9, -7], [5, 0]], seed + 23, 0.7), [0, 4, 5, 9]); c.fill(); c.stroke();
      c.strokeStyle = AMBER; c.lineWidth = 2.2; c.beginPath(); c.moveTo(-8.4, -9.5); c.quadraticCurveTo(0, -7, 8.4, -9.5); c.stroke();
      c.restore();
    },
  };
  // one of his nubs, drawn the way the page draws them so it can go in front of the table, and flush along with him
  const nub = (c, [x0, y0], [x1, y1], seed, hot) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    c.save(); c.translate(x0, y0); c.rotate(Math.atan2(y1 - y0, x1 - x0));
    closedPath(c, boil([[0, -7], [len * 0.5, -7], [len, -6], [len + 6, 0], [len, 6], [len * 0.5, 7], [0, 7]], seed, 0.8));
    c.fillStyle = tint(); c.fill(); if (hot) { c.fillStyle = HOT; c.globalAlpha = hot * 0.42; c.fill(); c.globalAlpha = 1; }
    c.strokeStyle = CREAM; inkStroke(c, 3); c.restore();
  };
  // where everything sits when the table is laid, and where it comes down: [kind, x, y, extra, landing x, landing y, frames in the air, how it lies]
  const SET = [['plate', TX - 28, TY - 1, [19], 62, 217, 7.5, [19, 0.34, 0.05]], ['fork', TX - 57, TY + 4, [-1.15], 84, 234, 7, [-0.3, 20]], ['knife', TX - 3, TY + 5, [-1.3], 6, 230, 9, [0.1, 20]],
    ['plate', TX + 21, TY - 5, [13], 22, 210, 8.5, [13, 0.34, -0.06]], ['vase', TX + 50, TY - 2, [], 106, 227, 8, [1.45, 0.25]]];
  const laid = (rise = 0, rattle = 0) => SET.map(([kind, x, y, more], i) => kind === 'plate' ? [kind, x + rattle * (i ? -1 : 1), y + rise, more[0], 0.3, rattle * 0.04 * (i ? 1 : -1)] : kind === 'vase' ? [kind, x, y + rise, rattle * 0.05] : [kind, x, y + rise, more[0] + rattle * 0.08]);
  // thrown: t drawings after the heave. Each thing rises, hangs and falls to its place on the floor, spinning as it goes
  const thrown = t => SET.map(([kind, x0, y0, more, xl, yl, tl, rest], i) => {
    if (t >= tl) { const hop = t < tl + 1 ? 1 : 0; return kind === 'plate' ? [kind, xl, yl - hop * 5, rest[0], rest[1] + hop * 0.2, rest[2] + hop * 0.3] : kind === 'vase' ? [kind, xl, yl - hop * 5, rest[0] + hop * 0.2, rest[1]] : [kind, xl, yl - hop * 4, rest[0] + hop * 0.4, rest[1]]; }
    const x = x0 + (xl - x0) * t / tl, y = y0 + (yl - y0 - 8 * tl * tl) / tl * t + 8 * t * t, spin = t * (1.1 + i * 0.23) * (i % 2 ? -1 : 1);
    return kind === 'plate' ? [kind, x, y, more[0], 0.16 + 0.8 * Math.abs(Math.cos(t * 1.25 + i)), spin] : kind === 'vase' ? [kind, x, y, spin * 0.8, -0.5] : [kind, x, y, more[0] + spin * 1.3, 20];
  });
  const floored = thrown(99);
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };
  // one drawing. tb: the table, ['up', x, y, rot] or ['over', x, bounce]. things: what is on it or in the air. L, R: where his hands are.
  // hot: how flushed he is. vein: the size of the cross mark by his head. steam: how far his puffs of steam have risen. thud: lines where the table lands.
  // drops: beads of water. glint: a twinkle, [x, y, size]. knock: how far the picture has been knocked crooked.
  const scene = (o, face, { tb, things = [], L, R, hot = 0, vein = 0, steam, thud, glint, drops, fade = 1, knock = 0 } = {}) => {
    const q = { dx: HOME, ...o }, sl = pt(q, [94, 138]), sr = pt(q, [166, 136]);
    return xf(D.N, { ...q, face, extra: { back: room(fade, knock), front: (c, d, seed) => {
      c.save(); c.lineCap = c.lineJoin = 'round';
      if (hot) {
        const top = 204 - hot * 140;
        c.save(); closedPath(c, boil(d.body, seed + 50, 2.2).map(([x, y]) => [x + 4, y + 2.5])); c.clip(); c.fillStyle = HOT;
        c.globalAlpha = 0.42; c.fillRect(0, top, 240, 240 - top); c.globalAlpha = 0.2; c.fillRect(0, top - 9, 240, 9); c.restore();
        c.strokeStyle = CREAM; closedPath(c, boil(d.body, seed, 2.2)); inkStroke(c, 4);
      }
      const [hx, hy] = pt(q, [128, 70]);
      if (vein) { c.strokeStyle = RED; c.lineWidth = 2.8; c.beginPath(); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([u, v]) => { c.moveTo(hx + 50 + u * 2, hy - 2 + v * vein); c.quadraticCurveTo(hx + 50 + u * 2, hy - 2 + v * 2, hx + 50 + u * vein, hy - 2 + v * 2); }); c.stroke(); }
      if (steam !== undefined) {
        c.strokeStyle = CREAM; c.lineWidth = 2.2;
        [[-30, 0], [26, 3]].forEach(([u, late], i) => { const p = ((steam + late) % 6) / 6; c.globalAlpha = 1 - p; c.beginPath(); c.arc(hx + u + (i ? 5 : -5) * p, hy - 4 - p * 30, 4 + p * 4, 0, TAU); c.stroke(); });
        c.globalAlpha = 1;
      }
      if (tb) tb[0] === 'up' ? table(c, seed, tb[1], tb[2], tb[3]) : upturned(c, seed, tb[1], tb[2]);
      if (thud) { c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath(); [[-84, -8, -98, -16], [-78, -22, -88, -34], [70, -30, 76, -44]].forEach(([x0, y0, x1, y1]) => { c.moveTo(OVER + x0, 204 + y0); c.lineTo(OVER + x1, 204 + y1); }); c.stroke(); }
      if (L) nub(c, sl, typeof L === 'function' ? L(sl) : L, seed + 98, hot);
      if (R) nub(c, sr, typeof R === 'function' ? R(sr) : R, seed + 99, hot);
      things.forEach(([kind, ...a]) => DRAW[kind](c, seed, ...a));
      if (drops) { c.fillStyle = BLUE; c.beginPath(); drops.forEach(([x, y]) => { c.moveTo(x + 2.4, y); c.arc(x, y, 2.4, 0, TAU); }); c.fill(); }
      if (glint) { c.fillStyle = CREAM; c.beginPath(); [[0, -1], [0.2, -0.2], [1, 0], [0.2, 0.2], [0, 1], [-0.2, 0.2], [-1, 0], [-0.2, -0.2]].forEach(([u, v], i) => i ? c.lineTo(glint[0] + u * glint[2], glint[1] + v * glint[2]) : c.moveTo(glint[0] + u * glint[2], glint[1] + v * glint[2])); c.closePath(); c.fill(); }
      c.restore();
    } } });
  };
  const squash = ky => ({ ky, kx: 1 + (1 - ky) * 0.6 }), UP = ['up', TX, TY, 0];

  // the table comes up as he shuffles round behind it
  [[-5, 92, 0.4], [-11, 48, 0.75], [-16, 14, 1], [-18, -3, 1]].forEach(([dx, rise, fade], i) => add('in' + i, i ? 2 : 3, scene({ dx }, i > 1 ? lookdown : FACE.happy, { tb: ['up', TX, TY + rise, 0], things: laid(rise), fade })));
  add('laid', 4, scene({}, lookdown, { tb: UP, things: laid() }));
  // simmering: the flush climbs, he starts to shake, and the crockery starts to rattle
  for (let i = 0; i < 8; i++) {
    const shake = (i % 2 ? 1 : -1) * (0.5 + i * 0.22), rattle = i > 4 ? (i % 2 ? 1 : -1) * (i - 4) * 0.4 : 0;
    add('simmer' + i, 2, scene({ dx: HOME + shake, ...squash(1 - i * 0.006) }, i < 3 ? peeved : i < 6 ? cross2 : grit, { tb: UP, things: laid(0, rattle), hot: (i + 1) / 8, vein: i > 2 ? 4 + i * 0.6 : 0, steam: i > 4 ? i - 5 : undefined }));
  }
  const from = (u, v) => s => [s[0] + u, s[1] + v];
  add('grab', 4, scene(squash(0.88), grit, { tb: UP, things: laid(0, 0.8), L: [TX - 40, TY - 9], R: [TX + 38, TY - 9], hot: 1, vein: 9, steam: 3 }));
  add('heave', 2, scene(squash(1.07), roar, { tb: ['up', TX + 3, TY - 18, 0.2], things: laid(-23, 2), L: [TX - 46, TY - 30], R: [TX + 44, TY - 22], hot: 1, vein: 9, steam: 4 }));
  // over it goes. The table lands on its top; everything else stays up a good while longer
  const FLIGHT = [['up', TX + 26, 98, 1.0], ['up', TX + 46, 60, 1.9], ['up', TX + 58, 58, 2.75], ['up', TX + 54, 108, 3.22], ['over', OVER, 0], ['over', OVER, 7], ['over', OVER, 0], ['over', OVER, 0], ['over', OVER, 0]];
  FLIGHT.forEach((tb, n) => {
    const t = n + 1, pose = t === 1 ? [squash(1.1), from(-20, -36), from(22, -38)] : t % 2 ? [squash(1.04), from(-25, -31), from(27, -33)] : [squash(0.97), from(-29, -25), from(30, -27)], [, vx, vy] = thrown(t)[4];
    add('fly' + t, 2, scene(pose[0], roar, { tb, things: thrown(t), L: pose[1], R: pose[2], hot: 1, vein: 9, steam: t + 4, thud: t === 5, knock: [0, 0, 0, 0, 0.32, 0.12, 0.26, 0.2, 0.22][n],
      drops: t < 6 ? [[-10, 8], [6, 14], [14, -2]].map(([u, v]) => [vx + u * t * 0.7, vy + v + t * t * 1.2]) : undefined }));
  });
  const MESS = { tb: ['over', OVER, 0], things: floored, knock: 0.22 };
  add('huff', 4, scene(squash(0.96), pant, { ...MESS, L: from(-24, 2), R: from(25, 0), hot: 0.85, vein: 6 }));
  add('oops', 6, scene({}, oops, { ...MESS, hot: 0.45 }));
  add('sheep', 4, scene(squash(0.97), sheep, { ...MESS, hot: 0.14, drops: [[150 + HOME, 96]] }));
  // putting it all back: the table first, then what was on it
  add('lift0', 2, scene({ dx: HOME + 6, rot: 0.1 }, eyeing, { tb: ['up', 206, 140, 2.1], things: floored, R: [172, 164], knock: 0.22 }));
  add('lift1', 2, scene({ dx: HOME + 6, rot: 0.08 }, eyeing, { tb: ['up', 210, 132, 1.3], things: floored, R: [184, 152], knock: 0.22 }));
  add('lift2', 2, scene({ dx: HOME + 3, rot: 0.04 }, eyeing, { tb: ['up', 138, 155, 0.36], things: floored, L: [84, 138], R: [170, 162], knock: 0.22 }));
  add('stood', 2, scene(squash(0.97), eyeing, { tb: ['up', TX - 2, TY, -0.05], things: floored, L: [TX - 42, TY - 5], R: [TX + 38, TY - 13], knock: 0.22 }));
  const back = n => SET.map((s, i) => i < n ? laid()[i] : floored[i]), DOWN = { rot: -0.17, ...squash(0.85) };
  add('duck0', 2, scene(DOWN, lookdown, { tb: UP, things: floored, L: from(-18, 30), knock: 0.22 }));
  add('lay0', 4, scene({ rot: -0.03 }, lookdown, { tb: UP, things: back(2), L: [TX - 34, TY - 9], knock: 0.22 }));
  add('duck1', 2, scene(DOWN, lookdown, { tb: UP, things: back(2), L: from(-18, 30), knock: 0.22 }));
  add('lay1', 4, scene({ rot: 0.02 }, lookdown, { tb: UP, things: back(4), L: [TX - 34, TY - 9], R: [TX + 26, TY - 12], knock: 0.22 }));
  add('duck2', 2, scene({ rot: 0.08, ...squash(0.85) }, lookdown, { tb: UP, things: back(4), R: from(8, 30), knock: 0.22 }));
  const VX = TX + 50, crooked = (rot, flop) => [...laid().slice(0, 4), ['vase', VX, TY - 2, rot, flop]];
  add('lay2', 4, scene({ rot: 0.05 }, eyeing, { tb: UP, things: crooked(-0.36, -0.3), R: [VX - 6, TY - 22], knock: 0.22 }));
  add('eye', 6, scene({}, eyeing, { tb: UP, things: crooked(-0.36, -0.3), knock: 0.22 }));
  add('nudge0', 2, scene({ rot: 0.04 }, eyeing, { tb: UP, things: crooked(-0.22, -0.45), R: [VX - 16, TY - 34], knock: 0.22 }));
  add('nudge1', 2, scene({ rot: 0.06 }, eyeing, { tb: UP, things: crooked(0.1, -0.5), R: [VX - 9, TY - 38], knock: 0.22 }));
  add('nudge2', 2, scene({ rot: 0.02 }, eyeing, { tb: UP, things: crooked(-0.04, 0.4), R: [VX - 14, TY - 32], knock: 0.22 }));
  add('neat', 2, scene({}, bashful, { tb: UP, things: crooked(0, -0.15), knock: 0.22, glint: [VX + 12, TY - 30, 8] }));
  add('there', 12, scene({}, bashful, { tb: UP, things: laid(), knock: 0.22 }));
  [[-16, 16, 1], [-10, 58, 0.7], [-4, 126, 0.35]].forEach(([dx, rise, fade], i) => add('out' + i, 2, scene({ dx }, FACE.happy, { tb: ['up', TX, TY + rise, 0], things: laid(rise), fade, knock: 0.22 })));
  CLIPS.table_flip = { home: 'idle', seq: [...seq, ...DOZE] };
})();

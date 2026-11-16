// Nope, yep: a plate of broccoli slides up and he turns away from it behind a raised nub; it is sent back, a slice of cake slides up instead, and he points at that with a nod.
// group: memes
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', RED = '#FF5A4D', YELLOW = '#FFD23F', BLUE = '#5AB8FF', NAVY = '#3A86C8', BROWN = '#6B4A1F', COCOA = '#8A5A2B', SPONGE = '#F4C76B', WHITE = '#F4F8FF', SHADE = '#C9D4E0',
    GREEN = '#58D68D', LEAF = '#2FA866', MOSS = '#1F7F4C', TAU = Math.PI * 2, P = 'nope_yep_';
  const move = (face, dx, dy) => face.map(m => m[0] === 'stroke' ? ['stroke', m[1].map(([x, y]) => [x + dx, y + dy]), m[2]] : m[0] === 'mouth' ? ['mouth', m[1].map(([x, y]) => [x + dx, y + dy]), m[2] && [m[2][0] + dx, m[2][1] + dy, m[2][2], m[2][3]]] : [m[0], m[1] + dx, m[2] + dy, ...m.slice(3)]);
  const idle = [['dot',124,110,3.8], ['dot',148,108,3.8], ['stroke',[[128,123],[135,127],[142,123]],2.8]];
  const eyeing = [['dot',127,113,3.8], ['dot',151,111,3.8], ['stroke',[[130,126],[135,127],[140,126]],2.6]];
  const wary = [['stroke',[[116,100],[128,103]],2.4], ['stroke',[[142,101],[154,98]],2.4], ['dot',127,112,4.6], ['dot',151,110,4.6], ['stroke',[[131,127],[141,126]],2.6]];
  const away = [['stroke',[[97,105],[105,110],[97,115]],3], ['stroke',[[136,103],[128,108],[136,113]],3], ['stroke',[[107,127],[111,124],[115,127],[119,124],[123,127]],2.6]];
  const peek = [['stroke',[[98,110],[108,111]],2.8], ['dot',134,109,4.2], ['stroke',[[111,126],[122,125]],2.6]];
  const nod = dy => move([...FACE.aahEyes, ['mouth',[[118,119],[138,118],[136,129],[128,133],[120,129]],[128,130,5,3]]], 10, dy);
  const pt = (o, [x, y]) => { const k = o.k ?? 1, r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + (u * Math.cos(r) - v * Math.sin(r)) * k + (o.dx || 0), 201 + (u * Math.sin(r) + v * Math.cos(r)) * k + (o.dy || 0)]; };
  const jog = (c, x, y, seed, rot = 0) => { c.translate(x + (seed % 3 - 1) * 0.5, y + (seed % 2) * 0.5); c.rotate(rot + (seed % 3 - 1) * 0.008); };
  const lamp = (c, drop, seed) => {
    c.save(); jog(c, 182, drop, seed); c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.moveTo(0, -80); c.lineTo(0, 12); c.stroke();
    c.fillStyle = WHITE; c.beginPath(); c.arc(0, 31, 7, 0, Math.PI); c.fill();
    c.fillStyle = YELLOW; c.lineWidth = 3; c.beginPath(); c.moveTo(-9, 12); c.lineTo(9, 12); c.lineTo(21, 31); c.lineTo(-21, 31); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = WHITE; c.lineWidth = 2; c.beginPath(); c.moveTo(-6, 17); c.lineTo(-12, 27); c.stroke();
    c.restore();
  };
  // the end of a long table, its cloth hanging down this side; it runs off the right of the screen
  const table = (c, slide, seed) => {
    c.save(); jog(c, slide, 0, seed); c.strokeStyle = CREAM;
    c.fillStyle = BROWN; c.lineWidth = 2.6; c.beginPath(); c.rect(123, 190, 10, 12); c.fill(); c.stroke();
    c.fillStyle = NAVY; c.lineWidth = 3; c.beginPath(); c.moveTo(112, 176); c.lineTo(112, 192);
    for (let i = 1; i < 10; i++) c.lineTo(112 + i * 15, i % 2 ? 198 : 192);
    c.lineTo(262, 176); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = BLUE; c.beginPath(); for (let i = 0; i < 5; i++) c.rect(119 + i * 30, 183, 15, 8); c.fill();
    c.beginPath(); c.roundRect(106, 167, 170, 12, 6); c.fill(); c.stroke();
    c.restore();
  };
  const plate = (c, x) => {
    c.fillStyle = WHITE; c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath(); c.ellipse(x, 166, 32, 6, 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = SHADE; c.lineWidth = 2; c.beginPath(); c.ellipse(x, 166.5, 23, 3.6, 0, 0, TAU); c.stroke();
  };
  const HEAD = [[-15, -27, 9], [-8, -37, 10], [6, -38, 10], [15, -28, 9], [0, -27, 11]];
  // two florets standing on (x, y): a small one tucked behind a big one
  const broccoli = (c, x, y, tilt, seed) => {
    c.save(); jog(c, x, y, seed, tilt);
    [[19, -1, 0.62, 0.4], [-5, 0, 1, -0.05]].forEach(([fx, fy, k, lean]) => {
      c.save(); c.translate(fx, fy); c.rotate(lean); c.scale(k, k); c.strokeStyle = CREAM;
      c.fillStyle = GREEN; c.lineWidth = 2.4 / k; c.beginPath(); c.moveTo(-6, 0); c.lineTo(-5, -13); c.lineTo(-13, -22); c.lineTo(13, -22); c.lineTo(5, -13); c.lineTo(6, 0); c.closePath(); c.fill(); c.stroke();
      c.beginPath(); HEAD.forEach(([hx, hy, r]) => { c.moveTo(hx + r, hy); c.arc(hx, hy, r, 0, TAU); });
      c.lineWidth = 5 / k; c.stroke(); c.fillStyle = LEAF; c.fill();
      c.strokeStyle = MOSS; c.lineWidth = 2 / k; c.beginPath(); HEAD.slice(0, 4).forEach(([hx, hy, r]) => { c.moveTo(hx + r * 0.55 * Math.cos(0.3), hy + r * 0.55 * Math.sin(0.3)); c.arc(hx, hy, r * 0.55, 0.3, 1.9); }); c.stroke();
      c.strokeStyle = GREEN; c.beginPath(); c.moveTo(-10, -39); c.arc(-8, -39, 5, -2.8, -1.7); c.moveTo(4, -40); c.arc(6, -40, 5, -2.8, -1.7); c.stroke();
      c.restore();
    });
    c.restore();
  };
  // a slice of layer cake standing on (x, y): two sponges, cream between, icing running down, a cherry
  const cake = (c, x, y, tilt, seed) => {
    c.save(); jog(c, x, y, seed, tilt); c.strokeStyle = CREAM; c.lineWidth = 2.4;
    c.fillStyle = COCOA; c.beginPath(); c.moveTo(-25, -31); c.lineTo(-15, -40); c.lineTo(19, -40); c.lineTo(25, -31); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = SPONGE; c.beginPath(); c.rect(-25, -31, 50, 31); c.fill();
    c.fillStyle = WHITE; c.fillRect(-25, -16, 50, 4.5);
    c.fillStyle = BROWN; c.beginPath(); c.moveTo(-25, -31); c.lineTo(25, -31); c.lineTo(25, -25); c.quadraticCurveTo(21, -19, 17, -25); c.quadraticCurveTo(11, -28, 7, -24); c.quadraticCurveTo(3, -17, -2, -24);
    c.quadraticCurveTo(-8, -28, -13, -25); c.quadraticCurveTo(-17, -20, -21, -25); c.lineTo(-25, -26); c.closePath(); c.fill();
    c.beginPath(); c.rect(-25, -31, 50, 31); c.stroke();
    c.fillStyle = WHITE; c.beginPath(); c.ellipse(1, -40, 10, 4.5, 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = GREEN; c.lineWidth = 2; c.beginPath(); c.moveTo(1, -48); c.quadraticCurveTo(2, -57, 9, -58); c.stroke();
    c.fillStyle = RED; c.strokeStyle = CREAM; c.beginPath(); c.arc(1, -46, 6, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = CREAM; c.beginPath(); c.arc(-1, -48, 1.6, 0, TAU); c.fill();
    c.restore();
  };
  // his verdict over the dish: a cross or a tick, s of its full size
  const verdict = (c, yes, s) => {
    c.save(); c.translate(184, 84); c.scale(s, s); c.beginPath();
    if (yes) { c.moveTo(-14, 0); c.lineTo(-5, 10); c.lineTo(14, -12); } else { c.moveTo(-11, -11); c.lineTo(11, 11); c.moveTo(11, -11); c.lineTo(-11, 11); }
    c.strokeStyle = CREAM; c.lineWidth = 9; c.stroke(); c.strokeStyle = yes ? GREEN : RED; c.lineWidth = 4.6; c.stroke();
    c.restore();
  };
  const HOME = { k: 0.82, dx: -44 };
  // one drawing. slide: how far off the table still is; drop: the lamp above its place; dish: [which, how far off to the right, tilt, on its way out]; hand: where his right nub goes from its shoulder; mark: [tick?, size]
  const shot = (o, face, { slide = 0, fade = 1, drop = 0, dish, hand, mark } = {}) => {
    const q = { ...HOME, ...o }; q.dy = 201 - Math.max(...D.N.body.map(p => pt(q, p)[1]));        // leaning, he stays on the floor
    const s = pt(q, [162, 134]);
    return xf(D.N, { ...q, face, extra: { ...(hand && { arm2: [s, [s[0] + hand[0], s[1] + hand[1]]] }),
      back: (c, d, seed) => {
        c.save(); c.lineCap = c.lineJoin = 'round';
        c.strokeStyle = CREAM; c.globalAlpha = 0.35 * fade; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke(); c.globalAlpha = 1;
        lamp(c, drop, seed); if (mark) verdict(c, ...mark);
        c.restore();
      },
      front: (c, d, seed) => {
        c.save(); c.lineCap = c.lineJoin = 'round'; table(c, slide, seed);
        if (dish) {
          const [what, off, tilt, sent] = dish, x = 182 + off;
          if (sent) { c.strokeStyle = CREAM; c.globalAlpha = 0.7; c.lineWidth = 2.2; c.beginPath(); [[152, 6], [141, 0], [130, 10]].forEach(([y, n]) => { c.moveTo(x - 36 - n, y); c.lineTo(x - 50 - n - off * 0.2, y); }); c.stroke(); c.globalAlpha = 1; }
          plate(c, x); (what === 'cake' ? cake : broccoli)(c, x, 164, tilt, seed);
        }
        c.restore();
      } } });
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };

  // he steps back to his end of the table as it slides in and the lamp comes down; and the same undone at the end
  const WALK = [[0.96, -9], [0.92, -20], [0.87, -31], [0.84, -40], [0.82, -44]], SLIDE = [150, 90, 44, 12, 0], DROP = [-70, -44, -22, -6, 0];
  const IN = [[92, 0.14], [44, 0.1], [12, 0.05], [-5, -0.07], [0, 0]];
  WALK.forEach(([k, dx], i) => add('in' + i, i ? 2 : 3, shot({ k, dx, rot: i % 2 ? 0.05 : -0.05 }, idle, { slide: SLIDE[i], fade: (i + 1) / 5, drop: DROP[i] })));
  IN.forEach(([off, tilt], i) => add('greens' + i, 2, shot({ rot: i * 0.01 }, i < 2 ? idle : eyeing, { dish: ['broccoli', off, tilt] })));
  add('sniff', 4, shot({ rot: 0.07, ky: 0.98 }, eyeing, { dish: ['broccoli', 0, 0] }));
  add('uh', 2, shot({ rot: 0.09, ky: 0.94, kx: 1.04 }, wary, { dish: ['broccoli', 0, 0] }));
  add('recoil', 2, shot({ rot: -0.3, ky: 1.05, kx: 0.96 }, away, { dish: ['broccoli', 0, 0], hand: [30, -18], mark: [false, 0.6] }));
  for (let i = 0; i < 3; i++) add('nope' + i, 4, shot({ rot: i % 2 ? -0.2 : -0.23 }, away, { dish: ['broccoli', 0, 0], hand: i % 2 ? [29, -20] : [27, -23], mark: [false, i ? 1 : 1.2] }));
  add('shoo', 2, shot({ rot: -0.16 }, away, { dish: ['broccoli', 6, 0.08], hand: [38, -10], mark: [false, 0.85] }));
  add('off0', 2, shot({ rot: -0.14 }, away, { dish: ['broccoli', 48, 0.16, true], hand: [38, -8], mark: [false, 0.55] }));
  add('off1', 2, shot({ rot: -0.12 }, peek, { dish: ['broccoli', 112, 0.18, true], hand: [30, 0], mark: [false, 0.25] }));
  add('peek', 4, shot({ rot: -0.08 }, peek));
  IN.forEach(([off, tilt], i) => add('cake' + i, 2, shot({ rot: -0.06 + i * 0.02 }, i < 2 ? peek : eyeing, { dish: ['cake', off, tilt] })));
  add('ooh', 4, shot({ rot: 0.04, ky: 0.92, kx: 1.05 }, move(FACE.cute, 12, 2), { dish: ['cake', 0, 0] }));
  add('point', 2, shot({ rot: 0.24, ky: 1.06, kx: 0.96 }, nod(0), { dish: ['cake', 0, 0], hand: [31, -4], mark: [true, 0.6] }));
  for (let i = 0; i < 4; i++) add('yep' + i, 4, shot({ rot: i % 2 ? 0.2 : 0.17, ky: i % 2 ? 0.97 : 1.01 }, nod(i % 2 ? 4 : 0), { dish: ['cake', 0, 0], hand: i % 2 ? [29, -1] : [29, -5], mark: [true, i ? 1 : 1.2] }));
  [4, 3, 2, 1, 0].forEach((i, n) => add('out' + n, 2, shot({ k: WALK[i][0], dx: WALK[i][1], rot: i % 2 ? 0.05 : -0.05 }, n < 2 ? nod(0) : idle, { slide: SLIDE[i], fade: (i + 1) / 5, drop: DROP[i], dish: ['cake', SLIDE[i], 0], mark: n < 2 && [true, 0.7 - n * 0.4, 1] })));
  CLIPS.nope_yep = { home: 'idle', seq: [...seq, ...DOZE] };
})();

// Bow of the ship: a prow glides in and scoops him up. He spreads his arms into the wind, blissful, until a gull lands on his cowlick and does the same.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', SEA = '#0E2438', BLUE = '#5AB8FF', WOOD = '#6B4A1F', GRAIN = '#8A6230', RAIL = '#C89B5A', GREY = '#9FB0C4', WHITE = '#F4F8FF', YELLOW = '#FFD23F', RED = '#FF5A4D', TAU = Math.PI * 2;
  const lookl = [['dot',108,110,3.8], ['dot',132,108,3.8], ['stroke',[[120,124],[125,126],[130,124]],2.6]];
  const bliss = [...FACE.aahEyes, ['stroke',[[119,121],[128,127],[137,121]],2.8]];
  const startled = [['dot',119,101,4.6], ['dot',143,99,4.6], ['stroke',[[124,123],[133,122]],2.8]];
  const deadpan = [['stroke',[[112,98],[126,98]],3], ['stroke',[[136,96],[150,96]],3], ['dot',120,103,3.2], ['dot',144,101,3.2], ['stroke',[[122,124],[134,123]],2.8]];
  const poly = (c, pts) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); c.stroke(); };
  // behind him. level: where the horizon is, the sun sitting on it. sailing: wind streaks blowing past, on twos.
  const sea = (level, sailing) => (c, d, seed, tick) => {
    const ph = Math.floor(tick / 2) % 3;
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.fillStyle = YELLOW; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.arc(14, level + 3, 18, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = SEA; c.fillRect(0, level, 240, 240 - level);
    c.strokeStyle = YELLOW; c.globalAlpha = 0.7; c.lineWidth = 2; c.beginPath(); [[0, 8, 30], [4, 16, 20]].forEach(([x, y, w]) => { c.moveTo(x, level + y); c.lineTo(x + w, level + y); }); c.stroke();
    c.strokeStyle = BLUE; c.beginPath(); c.moveTo(0, level); c.lineTo(240, level);
    [[196, 9, 16], [222, 14, 14], [52, 12, 12]].forEach(([x, y, w]) => { c.moveTo(x, level + y); c.quadraticCurveTo(x + w / 2, level + y - 4, x + w, level + y); }); c.stroke();
    c.strokeStyle = CREAM; c.globalAlpha = Math.max(0, Math.min(0.5, (232 - level) / 150)); c.beginPath(); c.moveTo(176, 62); c.lineTo(222, 62); c.arc(214, 54, 8, 0.6, -1.9, true); c.arc(200, 49, 10, -0.5, -2.7, true); c.arc(186, 55, 7, -1.2, 1.9, true); c.stroke();
    if (sailing) {
      c.globalAlpha = 0.55; c.lineWidth = 2.4;
      c.beginPath(); [[232, 30], [62, 96], [150, 16]].forEach(([x0, y]) => { const x = x0 - ph * 28; c.moveTo(x, y); c.bezierCurveTo(x - 14, y - 7, x - 28, y + 6, x - 44, y - 1); }); c.stroke();
    }
    c.restore();
  };
  const sheer = x => 178 - Math.max(0, x - 110) ** 2 / 800;                    // the deck's edge, sweeping up to the bow
  // the prow, pointing right, drawn over him so he stands behind its rail. sx: how far it has still to come (or has gone).
  const ship = (c, sx, seed, ph, sailing) => {
    c.save(); c.translate(sx - 16, 0); c.lineCap = c.lineJoin = 'round';
    const seen = x => x + sx > 8 && x + sx < 262;
    c.fillStyle = WOOD; c.strokeStyle = CREAM; c.lineWidth = 3;
    closedPath(c, boil([[-120, 178], [0, 178], [110, 178], [180, 172], [236, 158], [229, 186], [217, 214], [206, 246], [-108, 246], [-123, 212]], seed + 7, 1.2), [4, 7, 8]); c.fill(); c.stroke();
    c.fillStyle = GRAIN; c.beginPath(); c.moveTo(-119, 181); [110, 180, 233].forEach(x => c.lineTo(x, sheer(x) + 3)); [231, 180, 110, -121].forEach(x => c.lineTo(x, sheer(x) + 13)); c.fill();
    c.strokeStyle = GRAIN; c.lineWidth = 2.2;                                                                             // planking
    openPath(c, [[-121, 206], [110, 206], [180, 203], [221, 199]]); c.stroke(); openPath(c, [[-114, 222], [110, 222], [175, 221], [213, 220]]); c.stroke();
    c.beginPath(); [[-60, 191, 206], [58, 191, 206], [168, 187, 204], [-20, 206, 222], [112, 206, 222], [20, 222, 236], [150, 222, 236]].forEach(([x, a, b]) => { if (seen(x)) { c.moveTo(x, a); c.lineTo(x, b); } }); c.stroke();
    c.fillStyle = DARK; c.strokeStyle = CREAM; c.lineWidth = 2.2;                                                         // portholes
    [-76, -20, 30, 86, 142].forEach(x => { if (seen(x)) { c.beginPath(); c.arc(x, 199, 5.5, 0, TAU); c.fill(); c.stroke(); } });
    c.beginPath(); c.ellipse(196, 186, 4, 3, 0, 0, TAU); c.fill();
    c.strokeStyle = GREY; c.lineWidth = 2.6; c.beginPath();                                                               // an anchor, catted at the bow
    c.moveTo(196, 187); c.lineTo(196, 211); c.moveTo(189, 195); c.lineTo(203, 195); c.moveTo(185, 203); c.quadraticCurveTo(196, 219, 207, 203); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath();                                                              // the rail: posts, a wire, and a wooden cap
    for (let x = -105; x < 230; x += 30) if (seen(x)) { c.moveTo(x, sheer(x)); c.lineTo(x, sheer(x) - 27); }
    c.moveTo(234, 158); c.lineTo(234, 99); c.stroke();
    c.lineWidth = 1.6; openPath(c, [-120, 110, 180, 234].map(x => [x, sheer(x) - 14])); c.stroke();
    const cap = [-120, 110, 180, 234].map(x => [x, sheer(x) - 28]);
    c.lineWidth = 7; openPath(c, cap); c.stroke(); c.strokeStyle = RAIL; c.lineWidth = 3; openPath(c, cap); c.stroke();
    c.fillStyle = RED; c.strokeStyle = CREAM; c.lineWidth = 2; const f = [0, 3, -2][ph];                                  // a pennant on the jackstaff, streaming back
    c.beginPath(); c.moveTo(234, 100); c.quadraticCurveTo(222, 100 + f, 207, 107 - f); c.quadraticCurveTo(222, 110 + f, 234, 113); c.closePath(); c.fill(); c.stroke();
    if (sailing) {                                                                                                        // spray where the stem cuts the water
      c.lineWidth = 2.6; openPath(c, [[198, 230], [208, 215 + ph * 2], [222, 214], [229, 224 - ph]]); c.stroke();
      c.fillStyle = CREAM; c.beginPath(); [[232, 208], [238, 217], [224, 204]].forEach(([x, y], i) => { c.moveTo(x + 2, y - ph * (i + 1)); c.arc(x, y - ph * (i + 1), 2, 0, TAU); }); c.fill();
    }
    c.restore();
  };
  const water = (c, ph, level) => {                                             // the sea this side of the ship
    const y = Math.max(228, level + 6);
    c.fillStyle = SEA; c.fillRect(0, y, 240, 240 - y); c.strokeStyle = BLUE; c.lineWidth = 2.6; c.beginPath(); c.moveTo(-24 - ph * 8, y);
    for (let x = -24 - ph * 8; x < 240; x += 24) c.quadraticCurveTo(x + 12, y + 8, x + 24, y); c.stroke();
  };
  // standing at (x, y), beak to the right. wing: 'up', 'down', 'fold' or 'kite' (held out on the wind).
  const gull = (c, x, y, k, wing, { tilt = 0, shut } = {}) => {
    c.save(); c.translate(x, y); c.rotate(tilt); c.scale(k, k); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.2 / k;
    const flying = wing === 'up' || wing === 'down', sweep = { up: [[6, -22], [2, -42], [-12, -58], [-24, -58], [-17, -40], [-10, -22]], down: [[6, -15], [2, 3], [-12, 17], [-24, 17], [-17, 1], [-10, -14]],
      kite: [[5, -22], [-6, -37], [-30, -45], [-45, -39], [-26, -31], [-10, -19]] }[wing];
    if (flying) { c.fillStyle = '#6E8098'; c.save(); c.translate(7, wing === 'up' ? -3 : 3); closedPath(c, sweep, [3]); c.fill(); c.stroke(); c.restore(); }
    else { c.strokeStyle = '#FFB03F'; c.beginPath(); c.moveTo(-4, -9); c.lineTo(-4, 0); c.lineTo(0, 0); c.moveTo(4, -9); c.lineTo(4, 0); c.lineTo(8, 0); c.stroke(); c.strokeStyle = CREAM; }
    c.fillStyle = GREY; poly(c, [[-12, -21], [-31, -25], [-29, -14], [-12, -12]]);
    c.fillStyle = WHITE; c.beginPath(); c.ellipse(0, -17, 17, 10, -0.12, 0, TAU); c.fill(); c.stroke();
    c.beginPath(); c.arc(14, -29, 8.5, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = YELLOW; c.lineWidth = 1.6 / k; poly(c, [[21, -33], [35, -28], [33, -24], [21, -25]]); c.lineWidth = 2.2 / k;
    if (shut) { c.strokeStyle = DARK; c.beginPath(); c.moveTo(12, -31); c.quadraticCurveTo(15, -28, 18, -31); c.stroke(); c.strokeStyle = CREAM; }
    else { c.fillStyle = DARK; c.beginPath(); c.arc(16, -31, 1.9, 0, TAU); c.fill(); }
    c.fillStyle = GREY;
    if (sweep) { closedPath(c, sweep, [3]); c.fill(); c.stroke(); }
    else { c.beginPath(); c.ellipse(-4, -18, 13, 6.5, 0.15, 0, TAU); c.fill(); c.stroke(); }
    c.fillStyle = DARK; c.beginPath(); const [tx, ty] = sweep ? sweep[3] : [-17, -14]; c.arc(tx + 3, ty + (wing === 'down' ? -3 : 2), 3.4, 0, TAU); c.fill();   // dipped wing tip
    c.restore();
  };
  const ARMS = { arm: [[80, 138], [43, 124]], arm2: [[156, 141], [193, 128]] }, HALF = { arm: [[80, 140], [51, 155]], arm2: [[156, 143], [185, 158]] };
  const DROOP = { arm: [[80, 139], [43, 134]], arm2: [[156, 142], [193, 138]] }, WAVE = [{ arm2: [[156, 141], [191, 108]] }, { arm2: [[156, 141], [196, 118]] }];
  // one drawing. bird: [wing, dx, dy from his cowlick, size, options]. blown: his cowlick streaming back (1, 2) or flattened under the gull ('sat on').
  const shot = ({ level = 132, sx = 0, sailing = true, bird, blown, ...o }, extra = {}) => {
    const d = xf(D.N, { dx: -10, shadowK: 0, ...o, extra }), [x, y] = d.curl[0];
    if (blown === 'sat on') d.curl = [[x, y], [x - 10, y - 3], [x - 21, y - 2], [x - 28, y + 3]];
    else if (blown) d.curl = [[x, y], [x - 7, y - 9], [x - 18, y - 12], [x - 27, y - 5 - blown * 2], [x - 34, y - 12 + blown * 4]];
    d.back = sea(level, sailing);
    d.front = (c, _, seed, tick) => {
      const ph = Math.floor(tick / 2) % 3;
      c.save(); ship(c, sx, seed, ph, sailing); if (level < 234) water(c, ph, level);
      if (bird) gull(c, x + 3 + bird[1], y + bird[2], bird[3] || 0.95, bird[0], bird[4]);
      c.restore();
    };
    return d;
  };
  const P = 'bow_of_the_ship_', seq = [], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };
  add('in1', 3, shot({ level: 232, sx: -252, sailing: false, shadowK: 1, face: lookl }));
  add('in2', 2, shot({ level: 204, sx: -166, sailing: false, shadowK: 1, face: lookl }));
  add('in3', 2, shot({ level: 170, sx: -86, sailing: false, face: FACE.shock }));
  add('hop', 3, shot({ level: 140, sx: -22, sailing: false, dy: -15, ky: 1.05, kx: 0.97, face: FACE.shock }));
  add('land', 3, shot({ ky: 0.9, kx: 1.06, face: FACE.shock, blown: 1 }));
  add('look', 6, shot({ face: FACE.happy, blown: 2 }));
  add('half', 2, shot({ face: FACE.happy, blown: 1 }, HALF));
  add('out', 4, shot({ face: FACE.happy, rot: 0.05, ky: 1.03, blown: 2 }, ARMS));
  const SAIL = [{ rot: 0.05, blown: 1 }, { rot: 0.06, ky: 1.01, blown: 2 }];
  SAIL.forEach((o, i) => { D[P + 'bliss' + i] = shot({ ...o, face: bliss }, ARMS); });
  for (let i = 0; i < 6; i++) seq.push([P + 'bliss' + i % 2, 4]);
  for (let i = 0; i < 7; i++) {                                            // the gull comes in from behind, slowing, and flares
    const p = i / 7, q = 1 - (1 - p) ** 2;
    add('fly' + i, 2, shot({ ...SAIL[i % 2], face: bliss, bird: [i % 2 ? 'down' : 'up', -156 * (1 - q), -14 * (1 - q) - 18 * Math.sin(p * Math.PI), 0.6 + 0.35 * q, { tilt: -0.3 * p }] }, ARMS));
  }
  add('hit', 3, shot({ rot: 0.05, ky: 0.92, kx: 1.05, face: startled, blown: 'sat on', bird: ['up', 0, 2, 0.95, { tilt: -0.12 }] }, ARMS));
  add('fold', 3, shot({ rot: 0.05, face: startled, blown: 'sat on', bird: ['fold', 0, 0] }, ARMS));
  D[P + 'dead0'] = shot({ rot: 0.05, face: deadpan, blown: 'sat on', bird: ['fold', 0, 0] }, DROOP);
  D[P + 'dead1'] = shot({ rot: 0.06, face: deadpan, blown: 'sat on', bird: ['fold', 0, 1, 0.95, { tilt: 0.06 }] }, DROOP);
  for (let i = 0; i < 3; i++) seq.push([P + 'dead' + i % 2, 4]);
  add('spread', 2, shot({ rot: 0.05, face: deadpan, blown: 'sat on', bird: ['up', 0, 0] }, DROOP));
  add('both', 16, shot({ rot: 0.06, ky: 1.01, face: bliss, blown: 'sat on', bird: ['kite', 0, 0, 0.95, { shut: true, tilt: -0.04 }] }, ARMS));
  add('off0', 2, shot({ face: FACE.lookup, ky: 1.03, bird: ['up', 6, -14, 0.95, { tilt: -0.2 }] }, HALF));
  add('off1', 2, shot({ face: FACE.lookup, bird: ['down', 50, -34, 0.85, { tilt: -0.25 }] }));
  add('off2', 2, shot({ face: FACE.lookr, ky: 0.93, kx: 1.04, sx: 24, bird: ['up', 108, -58, 0.75, { tilt: -0.25 }] }));
  add('go1', 2, shot({ face: FACE.happy, dy: -14, ky: 1.04, level: 150, sx: 110, sailing: false }, WAVE[0]));
  add('go2', 2, shot({ face: FACE.happy, dy: -6, level: 180, sx: 230, sailing: false }, WAVE[1]));
  add('go3', 2, shot({ face: FACE.happy, ky: 0.92, kx: 1.05, level: 218, sx: 372, sailing: false, shadowK: 1 }, WAVE[0]));
  add('bye', 3, xf(D.N, { dx: -5, face: FACE.happy, extra: WAVE[1] }));
  CLIPS.bow_of_the_ship = { home: 'idle', seq: [...WAKE, ...seq, ...DOZE] };
})();

// Rain dance: night, rain, a street lamp coming on. He grabs the post and swings round it, tossing a furled umbrella from hand to hand, then lets go and lands in a puddle.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath, mixHex } = window.__lump;
  const CREAM = '#FFF1DC', IRON = '#3A4656', GREY = '#9FB0C4', YELLOW = '#FFD23F', RAIN = '#7FB6E6', BLUE = '#5AB8FF', RED = '#FF5A4D', FOLD = '#C23A30', BROWN = '#6B4A1F', TAU = Math.PI * 2;
  const PX = 150, UX = 58;                                             // where the lamp post stands, and the middle of the puddle
  const joy = [...FACE.aahEyes, ['mouth',[[118,119],[138,118],[136,130],[128,134],[120,130]],[128,131,5,3]]];
  const eager = [...FACE.chooEyes, ['stroke',[[120,122],[128,127],[136,122]],2.8]];
  const rainedOn = [['stroke',[[110,101],[122,104]],2.6], ['stroke',[[136,102],[148,99]],2.6], ['dot',119,108,3.4], ['dot',143,106,3.4], ['stroke',[[122,126],[134,125]],2.8]];
  const where = (o, [x, y]) => { const k = o.k || 1, r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1);
    return [128 + (u * Math.cos(r) - v * Math.sin(r)) * k + (o.dx || 0), 201 + (u * Math.sin(r) + v * Math.cos(r)) * k + (o.dy || 0)]; };
  const COLS = [[14, 0], [48, 50], [82, 20], [116, 70], [150, 36], [184, 8], [218, 60], [250, 44]];
  // the night behind him: rain falling on twos, the lamp's glow and its shine on the wet street. Each of rain, post and lit runs 0 to 1.
  const street = (c, { rain = 1, post = 1, lit = 1 }, tick) => {
    const ph = Math.floor(tick / 2) % 3;
    c.strokeStyle = CREAM; c.globalAlpha = 0.35 * post; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke();
    if (lit) {
      c.fillStyle = YELLOW; c.globalAlpha = 0.13 * lit; [30, 50].forEach(r => { c.beginPath(); c.arc(PX, 33, r, 0, TAU); c.fill(); });
      c.strokeStyle = YELLOW; c.globalAlpha = 0.55 * lit; c.lineWidth = 2.4; c.beginPath();
      [[-26, 211, 18], [6, 216, 24], [-10, 223, 14]].forEach(([x, y, w]) => { c.moveTo(PX + x + ph * 2, y); c.lineTo(PX + x + w + ph * 2, y); }); c.stroke();
    }
    if (rain) {
      c.strokeStyle = RAIN; c.globalAlpha = 0.85 * rain; c.lineWidth = 2; c.beginPath();
      COLS.forEach(([x, off]) => { for (let y = (off + ph * 28) % 84; y < 190; y += 84) { c.moveTo(x - y * 0.2, y); c.lineTo(x - y * 0.2 - 2, y + 10); } });
      [[30, 112, 216], [70, 148, 232], [12, 96, 196]][ph].forEach(x => { c.moveTo(x - 4, 198); c.lineTo(x, 202); c.lineTo(x + 4, 198); });
      c.stroke();
    }
    c.globalAlpha = 1;
  };
  const lamp = (c, fade, lit, seed) => {
    c.save(); c.translate(PX, 0); c.globalAlpha = fade; c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.fillStyle = IRON; c.lineWidth = 3;
    c.beginPath(); c.roundRect(-3.5, 50, 7, 100, 2); c.fill(); c.stroke();
    closedPath(c, boil([[-6, 150], [6, 150], [9, 193], [-9, 193]], seed + 2, 1), [0, 1, 2, 3]); c.fill(); c.stroke();
    c.beginPath(); c.roundRect(-9, 146, 18, 7, 3); c.fill(); c.stroke(); c.beginPath(); c.roundRect(-14, 192, 28, 12, 3); c.fill(); c.stroke();
    c.lineWidth = 2.6; c.beginPath(); c.moveTo(-14, 66); c.lineTo(14, 66); c.stroke();                                   // the lamplighter's ladder bar
    c.strokeStyle = GREY; c.lineWidth = 1.6; c.beginPath(); c.moveTo(-1, 72); c.lineTo(-1, 142); c.moveTo(-3, 158); c.lineTo(-4, 188); c.moveTo(2, 158); c.lineTo(3, 188); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2.6; c.fillStyle = mixHex(IRON, YELLOW, lit);
    closedPath(c, boil([[-8, 47], [8, 47], [15, 21], [-15, 21]], seed + 5, 1), [0, 1, 2, 3]); c.fill(); c.stroke();     // the lantern's glass
    c.strokeStyle = IRON; c.lineWidth = 1.6; c.beginPath(); c.moveTo(-3, 45); c.lineTo(-5, 23); c.moveTo(3, 45); c.lineTo(5, 23); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2.6; c.fillStyle = IRON;
    closedPath(c, boil([[-19, 21], [19, 21], [6, 9], [-6, 9]], seed + 6, 1), [0, 1, 2, 3]); c.fill(); c.stroke();
    c.beginPath(); c.arc(0, 5, 3.2, 0, TAU); c.fill(); c.stroke(); c.beginPath(); c.roundRect(-6, 46, 12, 6, 2); c.fill(); c.stroke();
    c.restore();
  };
  // furled, held by its crook at (x, y) and pointing along a
  const umbrella = (c, x, y, a) => {
    c.save(); c.translate(x, y); c.rotate(a); c.lineCap = c.lineJoin = 'round';
    c.beginPath(); c.moveTo(8, 0); c.lineTo(-9, 0); c.arc(-9, 5, 5, -Math.PI / 2, Math.PI / 2, true); c.strokeStyle = CREAM; c.lineWidth = 5.6; c.stroke(); c.strokeStyle = BROWN; c.lineWidth = 2.8; c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.moveTo(56, 0); c.lineTo(66, 0); c.stroke();
    c.fillStyle = RED; c.lineWidth = 2.4; closedPath(c, [[8, -3], [16, -6.5], [36, -5.5], [57, -1.5], [57, 1.5], [36, 5.5], [16, 6.5], [8, 3]]); c.fill(); c.stroke();
    c.strokeStyle = FOLD; c.lineWidth = 1.8; c.beginPath(); c.moveTo(15, -2); c.lineTo(52, -0.5); c.moveTo(15, 2.5); c.lineTo(50, 1); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2; c.beginPath(); c.moveTo(25, -6.5); c.lineTo(25, 6.5); c.stroke();
    c.restore();
  };
  const DROPS = [[-20, -46], [20, -50], [-42, -36], [44, -32], [-62, -18], [60, -14], [-8, -64], [10, -58]];
  // size: how much of it the rain has filled. splash: how far the water has flown (0.5 rising, 1 at its height, 1.5 falling).
  const puddle = (c, size, seed, splash = 0) => {
    if (!size) return;
    c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.ellipse(UX, 206, 52 * size, 8 * size, 0, 0, TAU); c.fill(); c.stroke();
    c.globalAlpha = 0.6; c.lineWidth = 2; c.beginPath(); c.ellipse(UX + (seed % 2 ? 6 : -6) * size, 206, 22 * size, 3 * size, 0, 0, TAU); c.stroke(); c.globalAlpha = 1;
    if (!splash) return;
    const up = Math.sin(splash * 1.9) * 1.25;
    c.beginPath(); DROPS.forEach(([x, y], i) => { const r = 4 + i % 3 * 1.5; c.moveTo(UX + x * 1.25 * splash + r, 200 + y * up); c.arc(UX + x * 1.25 * splash, 200 + y * up, r, 0, TAU); }); c.fill();
    if (splash <= 1) { c.strokeStyle = BLUE; c.lineWidth = 6; c.beginPath(); [-1, 1].forEach(s => { c.moveTo(UX + s * 44, 202); c.quadraticCurveTo(UX + s * 52, 202 - 30 * up, UX + s * (44 + 40 * splash), 202 - 42 * up); }); c.stroke(); }
  };
  // one drawing. l, r: where each hand goes ([dx, dy] from its shoulder, or 'post' to grip it). umb: ['l' or 'r', angle] held in that hand,
  // or [x, y, angle] in the air. tucked: the same, but behind his back. behind: he is round the far side of the post. wading: stood in the puddle.
  const shot = (o, { l, r, umb, tucked, face = FACE.happy, behind, wading, splash, pool = 1, ...sky } = {}) => {
    const sl = where(o, [92, 140]), sr = where(o, [164, 140]), { post = 1, lit = 1 } = sky;
    const hand = (s, to, side) => to === 'post' ? [PX + side * 2, 118] : [s[0] + to[0], s[1] + to[1]];
    const hl = l && hand(sl, l, 1), hr = r && hand(sr, r, -1), held = umb && (umb.length === 3 ? umb : [...(umb[0] === 'l' ? hl : hr), umb[1]]);
    return xf(D.N, { ...o, face, extra: { ...(hl && { arm: [sl, hl] }), ...(hr && { arm2: [sr, hr] }),
      back: (c, d, seed, tick) => { c.save(); c.lineCap = c.lineJoin = 'round'; street(c, sky, tick); if (!behind && post) lamp(c, post, lit, seed); if (tucked) umbrella(c, ...tucked); if (!wading) puddle(c, pool, seed); c.restore(); },
      front: (c, d, seed, tick) => {
        c.save(); c.lineCap = c.lineJoin = 'round'; if (behind) lamp(c, post, lit, seed); if (held) umbrella(c, ...held); if (wading) puddle(c, pool, seed, splash);
        if (sky.rain === undefined) {                                   // a few drops this side of him, and more bursting on his head
          const [x, y] = d.curl[0], n = Math.floor(tick / 2) % 3; c.strokeStyle = RAIN; c.lineWidth = 2; c.beginPath();
          [[66, 30], [132, 62], [204, 10]].forEach(([rx, off]) => { for (let ry = (off + n * 28) % 84; ry < 190; ry += 84) { c.moveTo(rx - ry * 0.2, ry); c.lineTo(rx - ry * 0.2 - 2, ry + 10); } });
          [[-26, 9], [22, 6], [-6, -1]].forEach(([dx, dy], i) => { if (i !== n) { c.moveTo(x + dx - 4, y + dy - 5); c.lineTo(x + dx, y + dy); c.lineTo(x + dx + 4, y + dy - 5); } }); c.stroke();
        }
        c.restore();
      } } });
  };
  const P = 'rain_dance_', seq = [], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); }, show = (name, ticks) => seq.push([P + name, ticks]);
  const HERE = { dx: -50 }, UP = [-24, -30], UPR = [24, -30], by = off => PX - 128 + off;
  add('rain0', 3, shot({ dx: -25 }, { face: FACE.lookup, rain: 0.45, post: 0.3, lit: 0, pool: 0.3 }));
  add('rain1', 2, shot(HERE, { face: FACE.lookup, rain: 0.8, post: 0.65, lit: 0, pool: 0.6 }));
  add('rain2', 4, shot({ ...HERE, ky: 0.96 }, { face: rainedOn, lit: 0 }));
  add('flick', 2, shot(HERE, { face: FACE.lookr, lit: 0.5 }));
  add('lit', 6, shot({ ...HERE, ky: 1.02 }, { face: FACE.cute }));
  add('crouch', 4, shot({ ...HERE, ky: 0.86, kx: 1.07 }, { face: eager, r: [26, -20], tucked: [58, 142, Math.PI + 0.9] }));
  add('grab', 2, shot({ k: 0.97, dx: by(-38), dy: -5, rot: -0.12 }, { face: eager, r: 'post', l: [-22, 14], umb: ['l', Math.PI - 0.5] }));
  // round the post: out to the left, across the front, off to the right, and back round behind it. The umbrella changes hands in the air.
  const ROUND = {
    L: [{ k: 0.95, dx: by(-38), dy: -10, rot: -0.38 }, { face: joy, r: 'post', l: [-32, -16], umb: ['l', Math.PI + 1.2] }],
    FL: [{ dx: by(-18), dy: -4, rot: -0.2 }, { r: [18, -28], l: [-28, -26], umb: ['l', Math.PI + 1.4] }],
    F: [{ k: 1.03, dx: by(0), ky: 0.9, kx: 1.05 }, { face: joy, l: UP, r: UPR, umb: [PX - 38, 57, 0] }],
    FR: [{ dx: by(18), dy: -4, rot: 0.2 }, { l: [-18, -28], r: [28, -26], umb: ['r', -1.4] }],
    R: [{ k: 0.95, dx: by(38), dy: -10, rot: 0.38 }, { face: joy, l: 'post', r: [32, -16], umb: ['r', -1.2] }],
    BR: [{ k: 0.86, dx: by(18), dy: -10, rot: 0.2 }, { behind: true, l: [-18, -28], r: [28, -26], umb: ['r', -1.4] }],
    B: [{ k: 0.84, dx: by(0), dy: -10 }, { behind: true, face: joy, l: UP, r: UPR, umb: [PX + 38, 68, Math.PI] }],
    BL: [{ k: 0.86, dx: by(-18), dy: -10, rot: -0.2 }, { behind: true, r: [18, -28], l: [-28, -26], umb: ['l', Math.PI + 1.4] }],
  };
  Object.entries(ROUND).forEach(([name, [o, how]]) => { D[P + name] = shot(o, how); });
  show('L', 6);
  [4, 2].forEach(n => { ['FL', 'F', 'FR', 'R', 'BR', 'B', 'BL'].forEach(name => show(name, 2)); show('L', n); });
  add('fly0', 2, shot({ dx: -36, dy: -46, rot: -0.5, ky: 1.05, shadowK: 0.6 }, { face: joy, l: [-30, -18], r: [30, -18], umb: ['l', Math.PI + 1.1] }));
  add('fly1', 2, shot({ dx: -56, dy: -30, rot: -0.15, ky: 1.1, kx: 0.93, shadowK: 0.8 }, { l: UP, r: UPR, umb: [58, 24, -0.6] }));
  const IN = { dx: -66 }, TADA = { wading: true, face: joy, l: [-20, -30], r: [26, -28], umb: ['r', -1.62] };
  add('land', 2, shot({ ...IN, ky: 0.78, kx: 1.14 }, { ...TADA, r: [30, -16], umb: ['r', -1.1], splash: 0.5 }));
  add('splash1', 2, shot({ ...IN, ky: 1.05, kx: 0.97 }, { ...TADA, splash: 1 }));
  add('splash2', 2, shot(IN, { ...TADA, splash: 1.5 }));
  D[P + 'tada0'] = shot(IN, TADA);
  D[P + 'tada1'] = shot({ ...IN, ky: 1.03 }, { ...TADA, r: [26, -31] });
  show('tada0', 6); show('tada1', 6); show('tada0', 4);
  add('out0', 2, shot({ dx: -56 }, { rain: 0.5, post: 0.6, lit: 0, pool: 0.6, r: [16, 14], tucked: [100, 142, -0.9] }));
  add('out1', 2, shot({ dx: -34 }, { rain: 0.2, post: 0.3, lit: 0, pool: 0.3 }));
  add('out2', 3, xf(D.N, { face: FACE.happy }));
  CLIPS.rain_dance = { home: 'idle', seq: [...WAKE, ...seq, ...DOZE] };
})();

// Change my mind: he sets up behind a folding table with a blank sign and a mug, sure of himself. The sun crosses the whole sky, a tumbleweed rolls by, and nobody comes.
// group: memes
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath, inkStroke, mixHex, tint } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', WOOD = '#C89B5A', BROWN = '#6B4A1F', STEEL = '#9FB0C4', WHITE = '#F4F8FF', SHADE = '#C9D4E0', BLUE = '#5AB8FF', DEEP = '#2A6FB0', YELLOW = '#FFD23F', RED = '#FF5A4D', WALL = '#2B3440', STRAW = '#D8B878';
  const TAU = Math.PI * 2, P = 'change_my_mind_', SEAT = { k: 0.9, dx: -8, dy: -3 }, DAY = 92, R = 20, REST = [[83, 151], [162, 151]];
  const sure = [['stroke',[[109,105],[123,106]],2.6], ['dot',116,110,3.2], ['stroke',[[133,104],[147,103]],2.6], ['dot',140,108,3.2], ['stroke',[[119,122],[128,126],[138,119]],2.8]];
  const proud = [...FACE.aahEyes, ['stroke',[[119,121],[128,126],[138,119]],2.8]];
  const lookl = [['dot',110,110,3.8], ['dot',134,108,3.8], ['stroke',[[117,123],[123,126],[130,123]],2.6]];
  const lookr = [['dot',123,110,3.8], ['dot',147,108,3.8], ['stroke',[[127,124],[133,125],[139,124]],2.6]];
  const idle = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[122,124],[134,123]],2.6]];
  const bored = [['stroke',[[109,107],[123,107]],2.6], ['dot',116,111,3], ['stroke',[[133,105],[147,105]],2.6], ['dot',140,109,3], ['stroke',[[123,125],[133,125]],2.6]];
  const downl = [['dot',110,115,3.8], ['dot',134,113,3.8], ['stroke',[[119,127],[129,126]],2.6]];
  const down = [['dot',117,116,3.8], ['dot',141,114,3.8], ['stroke',[[123,128],[133,127]],2.6]];
  const downr = [['dot',124,115,3.8], ['dot',148,113,3.8], ['stroke',[[127,127],[137,126]],2.6]];
  const flat = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[121,125],[135,124]],2.8]];
  const blink = [['stroke',[[111,110],[121,110]],2.8], ['stroke',[[135,108],[145,108]],2.8], ['stroke',[[121,125],[135,124]],2.8]];
  const pt = (o, [x, y]) => { const k = o.k || 1, r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + (u * Math.cos(r) - v * Math.sin(r)) * k + (o.dx || 0), 201 + (u * Math.sin(r) + v * Math.cos(r)) * k + (o.dy || 0)]; };
  const poly = (c, pts) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); c.stroke(); };
  let dawn = 1e9, blown = 1e9;                                          // the ticks when the sun comes up and when the tumbleweed sets off
  // standing on (x, y). steam: 1 freshly poured, 0 gone cold
  const mug = (c, x, y, seed, steam) => {
    c.beginPath(); c.arc(x + 10, y - 11, 6.5, -1.3, 1.3); c.strokeStyle = CREAM; c.lineWidth = 6.4; c.stroke(); c.strokeStyle = BLUE; c.lineWidth = 2.4; c.stroke();
    c.strokeStyle = CREAM; c.fillStyle = BLUE; c.lineWidth = 2.4; c.beginPath(); c.roundRect(x - 10, y - 23, 20, 23, 4); c.fill(); c.stroke();
    c.fillStyle = DEEP; c.fillRect(x - 8.6, y - 9.5, 17.2, 4.5);
    c.fillStyle = BROWN; c.beginPath(); c.ellipse(x, y - 19.8, 7.2, 2, 0, 0, TAU); c.fill();
    if (steam <= 0) return;
    const lean = seed % 2 ? 1 : -1;
    c.globalAlpha = 0.6 * Math.min(1, steam * 2.5); c.lineWidth = 2.2;
    for (let k = 0; k < 2; k++) { openPath(c, boil([0, 1, 2, 3].map(i => [x - 4 + k * 8 + (i % 2 ? 2.5 : -2.5) * lean, y - 29 - k * 3 - i * (4.5 + 3.5 * steam)]), seed + k * 7, 1.2)); c.stroke(); }
    c.globalAlpha = 1;
  };
  // the folding table, `rise` below its place, with the sign hung on its front swung by `sway`
  const table = (c, seed, rise, sway, steam) => {
    c.save(); c.translate(0, rise); c.lineCap = c.lineJoin = 'round';
    [[55, 85], [171, 201]].forEach(([l, r]) => {
      c.beginPath(); c.moveTo(l, 160); c.lineTo(r, 203); c.moveTo(r, 160); c.lineTo(l, 203); c.strokeStyle = CREAM; c.lineWidth = 7.5; c.stroke(); c.strokeStyle = STEEL; c.lineWidth = 3.6; c.stroke();
      c.fillStyle = CREAM; c.beginPath(); c.arc((l + r) / 2, 181.5, 2.6, 0, TAU); c.fill();
    });
    c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.fillStyle = BROWN; poly(c, boil([[51, 154], [205, 154], [204, 161], [52, 161]], seed + 2, 1));
    c.fillStyle = WOOD; poly(c, boil([[60, 146], [196, 146], [205, 154], [51, 154]], seed + 4, 1));
    c.save(); c.translate(128, 161); c.rotate(sway + (seed % 3 - 1) * 0.008);
    c.lineWidth = 2; c.beginPath(); [-30, 30].forEach(x => { c.moveTo(x, 0); c.lineTo(x, 9); }); c.stroke();
    c.fillStyle = WHITE; c.lineWidth = 2.6; c.beginPath(); c.roundRect(-40, 5, 80, 34, 3); c.fill(); c.stroke();
    c.fillStyle = SHADE; c.fillRect(-38, 32, 76, 5);
    c.fillStyle = STEEL; [-30, 30].forEach(x => { c.beginPath(); c.arc(x, 10.5, 2, 0, TAU); c.fill(); });
    c.restore();
    mug(c, 188 + (seed % 3 - 1) * 0.5, 151.5, seed, steam);
    c.restore();
  };
  // behind him: the sun going over from one horizon to the other, then stars; two far-off mesas; the wind that brings the tumbleweed
  const sky = (c, tick, show, seed) => {
    const t = (tick - dawn) / DAY, high = Math.sin(Math.PI * Math.max(0, Math.min(1, t))), w = tick - blown;
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM;
    if (t > -0.1 && t < 1.1) {
      c.save(); c.beginPath(); c.rect(0, 0, 240, 204); c.clip();
      c.fillStyle = mixHex(YELLOW, RED, 0.7 * (1 - high)); c.lineWidth = 2.4; c.beginPath(); c.arc(120 - 100 * Math.cos(Math.PI * t), 212 - 182 * Math.sin(Math.PI * t), 12, 0, TAU); c.fill(); c.stroke();
      c.restore();
    }
    if (t > 0.94) {
      c.globalAlpha = Math.min(1, (t - 0.94) * 6) * show; c.lineWidth = 2; c.beginPath();
      [[34, 44, 5], [92, 26, 4], [206, 52, 5], [168, 22, 3.5]].forEach(([x, y, s], i) => { if ((seed + i) % 3) { c.moveTo(x - s, y); c.lineTo(x + s, y); c.moveTo(x, y - s); c.lineTo(x, y + s); } });
      c.stroke();
    }
    c.globalAlpha = 0.6 * show; c.fillStyle = WALL; c.lineWidth = 1.8;
    [[[-4, 204], [-4, 187], [22, 185], [32, 191], [46, 204]], [[196, 204], [208, 189], [230, 187], [244, 192], [244, 204]]].forEach(m => poly(c, m));
    c.globalAlpha = 0.35 * show; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke();
    if (w >= 0 && w < 44) { c.globalAlpha = 0.45; c.beginPath(); [40, 86, 132].forEach((y, i) => { const x = (w * 11 + i * 110) % 330 - 50; c.moveTo(x, y); c.lineTo(x + 30, y); }); c.stroke(); }
    c.restore();
  };
  const weed = (c, x, y, a) => {
    c.save(); c.translate(x, y); c.rotate(a); c.fillStyle = DARK; c.globalAlpha = 0.8; c.beginPath(); c.arc(0, 0, R, 0, TAU); c.fill(); c.globalAlpha = 1;
    c.strokeStyle = STRAW; c.lineWidth = 2.4; c.lineJoin = 'round';
    for (let i = 0; i < 4; i++) {                              // the same tangle every frame, so it turns rather than boils
      const k = R * (1 - i * 0.17);
      closedPath(c, boil(Array.from({ length: 8 }, (_, j) => { const t = j / 8 * TAU + i; return [Math.cos(t) * k, Math.sin(t) * k * (i % 2 ? 0.75 : 1)]; }), 40 + i, R * 0.5)); c.stroke();
    }
    c.restore();
  };
  const nub = (c, [x0, y0], [x1, y1], seed) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    c.save(); c.translate(x0, y0); c.rotate(Math.atan2(y1 - y0, x1 - x0));
    closedPath(c, boil([[0, -6.5], [len * 0.5, -6.5], [len, -5.5], [len + 5.5, 0], [len, 5.5], [len * 0.5, 6.5], [0, 6.5]], seed, 0.8));
    c.fillStyle = tint(); c.fill(); c.strokeStyle = CREAM; inkStroke(c, 2.8); c.restore();
  };
  // hands: where his nubs rest, [left, right]. rise: how far the table is below its place. sway: the sign's swing. show: how far the scene has faded in.
  const shot = (o, face, { hands = REST, rise = 0, sway = 0, show = 1 } = {}) => xf(D.N, { ...o, face, extra: {
    back: (c, d, seed, tick) => sky(c, Math.floor(tick / 2) * 2, show, seed),
    front: (c, d, seed, tick) => {
      const t = Math.floor(tick / 2) * 2, w = t - blown, x = -R - 6 + w * 7, wake = w - 20;
      table(c, seed, rise, sway + (wake > 0 ? 0.1 * Math.sin(wake * 0.5) * Math.exp(-wake / 12) : 0), 1 - (t - dawn) / 56);
      c.save(); c.lineCap = c.lineJoin = 'round';
      hands.forEach((h, i) => h && nub(c, pt(o, i ? [152, 140] : [102, 140]), h, seed + 98 + i));
      c.restore();
      if (w >= 0 && x < 262) weed(c, x, 226 - R - Math.abs(Math.sin(x / (R * 2.2))) * 14, (x / R) % TAU);
    } } });
  let now = 29;
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); now += ticks; }, show = (name, ticks) => { seq.push([P + name, ticks]); now += ticks; };
  // he backs round behind the table as it comes up; and the same undone at the end
  const walk = (i, face) => shot({ k: 1 - i * 0.025, dx: -i * 2, dy: -i * 0.75, rot: i % 2 ? 0.04 : -0.04 }, face, { hands: [], rise: [118, 64, 26, -4][i], show: 0.25 + i * 0.25 });
  for (let i = 0; i < 4; i++) add('sit' + i, i ? 2 : 3, walk(i, FACE.happy));
  dawn = now;
  add('sat', 2, shot({ ...SEAT, ky: 0.94, kx: 1.03 }, FACE.happy, { sway: 0.07 }));
  add('set', 2, shot({ ...SEAT, ky: 1.02 }, sure, { sway: -0.04 }));
  add('sure', 10, shot(SEAT, sure));
  add('proud', 8, shot({ ...SEAT, ky: 1.02, rot: -0.02 }, proud));
  add('left', 8, shot({ ...SEAT, rot: -0.03 }, lookl));
  add('right', 8, shot({ ...SEAT, rot: 0.03 }, lookr));
  D[P + 'tap0'] = shot(SEAT, idle, { hands: [REST[0], [164, 144]] });
  D[P + 'tap1'] = shot(SEAT, idle);
  for (let i = 0; i < 4; i++) show('tap' + i % 2, 2);
  add('bored', 6, shot({ ...SEAT, ky: 0.96, kx: 1.02, rot: -0.04 }, bored));
  blown = now;
  add('by0', 14, shot({ ...SEAT, ky: 0.97, rot: -0.03 }, downl));
  add('by1', 12, shot({ ...SEAT, ky: 0.97 }, down));
  add('by2', 14, shot({ ...SEAT, ky: 0.97, rot: 0.03 }, downr));
  add('gone', 4, shot({ ...SEAT, rot: 0.03 }, lookr));
  add('flat', 8, shot({ ...SEAT, ky: 0.97, kx: 1.01 }, flat));
  add('blink', 2, shot({ ...SEAT, ky: 0.97, kx: 1.01 }, blink));
  show('flat', 6);
  for (let i = 3; i >= 0; i--) add('go' + i, 2, walk(i, i > 1 ? flat : FACE.sheep));
  CLIPS.change_my_mind = { home: 'idle', seq: [...seq, ...DOZE] };
})();

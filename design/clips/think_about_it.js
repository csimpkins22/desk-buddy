// Think about it: he taps the side of his head with a knowing grin and a sparkle, then struts off with his eyes shut, straight into a brick wall.
// group: memes
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', BRICK = '#B55236', BURNT = '#8E3F2A', YELLOW = '#FFD23F', P = 'think_about_it_', WALL = 176, LEFT = -48;
  const smug = [['stroke',[[108,104],[122,105]],2.6], ['dot',116,109.5,3.2], ['stroke',[[133,100],[147,98]],2.6], ['dot',140,107,3.6], ['stroke',[[118,121],[127,126],[139,118]],2.8]];
  const proud = [...FACE.aahEyes, ['stroke',[[117,120],[127,126],[140,117]],2.8]];
  const crossed = [['stroke',[[110,104],[122,114]],3], ['stroke',[[122,104],[110,114]],3], ['stroke',[[134,102],[146,112]],3], ['stroke',[[146,102],[134,112]],3], ['mouth',[[123,120],[133,119],[134,127],[128,130],[122,127]]]];
  const pt = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), 201 + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
  // the floor, with marks on it that slide by as he walks
  const floor = (c, scroll, show) => {
    c.save(); c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2; c.globalAlpha = 0.35 * show;
    c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204);
    for (let i = 0; i < 4; i++) { const x = ((i * 80 - scroll) % 320 + 320) % 320 - 40, x2 = ((i * 80 + 46 - scroll * 1.4) % 320 + 320) % 320 - 40; c.moveTo(x, 213); c.lineTo(x + 14, 213); c.moveTo(x2, 224); c.lineTo(x2 + 20, 224); }
    c.stroke(); c.restore();
  };
  // a brick wall whose face is at x, running off the top and the right of the screen. hit: cracked where he met it
  const wall = (c, x, seed, hit) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.fillStyle = BRICK; c.fillRect(x, -4, 250 - x, 208);
    c.fillStyle = BURNT; [[28, 28], [14, 94], [0, 116], [56, 160]].forEach(([bx, by]) => c.fillRect(x + bx, by, 28, 22));
    c.strokeStyle = CREAM; c.globalAlpha = 0.5; c.lineWidth = 2; c.beginPath();
    for (let row = 0; row < 10; row++) { const y = row * 22 + 6; c.moveTo(x, y); c.lineTo(244, y); for (let bx = x + (row % 2 ? 28 : 14); bx < 244 && row < 9; bx += 28) { c.moveTo(bx, y); c.lineTo(bx, y + 22); } }
    c.stroke(); c.globalAlpha = 1;
    c.lineWidth = 3; openPath(c, boil([[x, -4], [x, 64], [x, 134], [x, 204]], seed + 4, 1.4)); c.stroke();
    c.beginPath(); c.moveTo(x, 204); c.lineTo(244, 204); c.stroke();
    if (hit) { c.strokeStyle = DARK; c.lineWidth = 2.4; [[[2, 116], [12, 106], [18, 114], [31, 101]], [[2, 126], [13, 135], [20, 129], [33, 144]], [[3, 121], [17, 120]]].forEach(line => { openPath(c, line.map(([px, py]) => [x + px, py])); c.stroke(); }); }
    c.restore();
  };
  const star = (c, x, y, s, seed) => {
    const pts = boil([[x, y - s], [x + s * 0.24, y - s * 0.24], [x + s, y], [x + s * 0.24, y + s * 0.24], [x, y + s], [x - s * 0.24, y + s * 0.24], [x - s, y], [x - s * 0.24, y - s * 0.24]], seed, 1);
    c.beginPath(); pts.forEach(([px, py], i) => i ? c.lineTo(px, py) : c.moveTo(px, py)); c.closePath(); c.fillStyle = YELLOW; c.fill(); c.strokeStyle = CREAM; c.lineWidth = 2.4; c.stroke();
  };
  // scroll: how far the floor has gone by. wallAt: where the wall's face is. hit: it has cracked. hand: his nub at his temple. tap: the little lines as it lands.
  // glint: the sparkle's size. swing: his arms as he struts, -1 to 1. dust: [how far the crumbs have fallen]. show: how far the floor has faded in.
  const shot = (base, o, face, { scroll = 0, wallAt, hit, hand, tap, glint, swing, dust, show = 1 } = {}) => xf(base, { ...o, ...(face && { face }), extra: {
    ...(hand && { arm2: [pt(o, [181, 143]), hand] }),
    ...(swing !== undefined && { arm: [pt(o, [92, 142]), pt(o, [78 - swing * 5, 158 - swing * 6])], arm2: [pt(o, [164, 140]), pt(o, [178 - swing * 5, 156 + swing * 6])] }),
    back: (c, d, seed) => { floor(c, scroll, show); if (wallAt) wall(c, wallAt, seed, hit); },
    front: (c, d, seed) => {
      c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.4;
      if (tap) { c.beginPath(); [[176, 93, 182, 86], [180, 103, 188, 101]].forEach(([x0, y0, x1, y1]) => { c.moveTo(x0, y0); c.lineTo(x1, y1); }); c.stroke(); }
      if (glint) star(c, 197, 72, glint, seed);
      if (dust !== undefined) {
        if (dust < 2) { c.beginPath(); [[-8, 68, -13, 55], [-20, 72, -31, 63], [-4, 52, -5, 40]].forEach(([x0, y0, x1, y1]) => { c.moveTo(WALL + x0 - dust * 3, y0 - dust * 3); c.lineTo(WALL + x1 - dust * 3, y1 - dust * 3); }); c.stroke(); }
        c.fillStyle = BRICK; c.lineWidth = 1.4; [[-7, 62, -9, -6, 6], [-11, 50, -6, -9, 5], [-4, 44, -11, -3, 4.5]].forEach(([px, py, vx, vy, s]) => { c.beginPath(); c.rect(WALL + px + vx * dust, py + vy * dust + dust * dust * 5, s, s); c.fill(); c.stroke(); });
      }
      c.restore();
    } } });
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); }, show = (name, ticks) => seq.push([P + name, ticks]);
  const TEMPLE = [163, 110], LEAN = { rot: 0.03 };
  add('hm', 3, shot(D.N, {}, FACE.happy, { show: 0.5 }));
  add('lift', 2, shot(D.N, { ky: 0.96, kx: 1.02 }, smug, { hand: [186, 122] }));
  D[P + 'off'] = shot(D.N, LEAN, smug, { hand: [170, 114] });
  D[P + 'on'] = shot(D.N, { rot: 0.045, ky: 0.99 }, smug, { hand: TEMPLE, tap: true });
  for (let i = 0; i < 3; i++) { show('off', 2); show('on', i < 2 ? 2 : 4); }
  [5, 11, 16].forEach((glint, i) => add('ting' + i, 2, shot(D.N, { ...LEAN, ky: 1 + i * 0.012 }, i ? proud : smug, { hand: TEMPLE, glint })));
  add('know', 10, shot(D.N, { ...LEAN, ky: 1.02 }, proud, { hand: TEMPLE, glint: 13 }));
  add('turn', 2, shot(D.N, { ky: 0.9, kx: 1.06 }, proud, { hand: [188, 128], glint: 6 }));
  // the strut: chin up, eyes shut. The view runs on ahead of him until a wall comes into it and stops there; he keeps going
  let scroll = 0;
  for (let j = 0; j < 11; j++) {
    const dx = j < 4 ? LEFT / 3 * j : j < 9 ? LEFT : LEFT + (j - 8) * 11; scroll += j < 4 ? 28 : j < 9 ? 15 : 0;
    add('strut' + j, 2, shot(D.N, j % 2 ? { dx, rot: -0.05, ky: 0.95, kx: 1.03 } : { dx, dy: -6, rot: -0.09, ky: 1.05, kx: 0.97, shadowK: 0.85 }, proud, { scroll, swing: j % 2 ? -1 : 1, ...(j > 3 && { wallAt: Math.max(WALL, 236 - (j - 4) * 15) }) }));
  }
  const HIT = WALL - 187, SPLAT = { ox: 187, dx: HIT }, HERE = { scroll, wallAt: WALL, hit: true };
  add('bonk', 2, shot(D.N, { ...SPLAT, kx: 0.74, ky: 1.12 }, crossed, { ...HERE, wallAt: WALL + 3, dust: 0 }));
  add('stuck0', 2, shot(D.N, { ...SPLAT, kx: 0.82, ky: 1.08 }, crossed, { ...HERE, dust: 1 }));
  add('stuck1', 4, shot(D.N, { ...SPLAT, kx: 0.86, ky: 1.05 }, FACE.spiral, { ...HERE, dust: 2 }));
  add('peel', 2, shot(D.N, { ox: 72, dx: HIT + 2, rot: -0.2, ky: 1.03 }, FACE.spiral, HERE));
  add('tip', 2, shot(D.N, { ox: 72, dx: HIT + 6, rot: -0.65 }, FACE.spiral, HERE));
  add('thud', 2, shot(D.O2, { dx: HIT - 19, ky: 0.78, kx: 0.96 }, null, HERE));
  add('flat', 16, shot(D.O2, { dx: HIT - 16, kx: 0.9 }, null, HERE));
  add('up0', 2, shot(D.A1, { dx: HIT - 11 }, null, { ...HERE, wallAt: WALL + 26, show: 0.8 }));
  add('up1', 2, shot(D.N, { dx: -8, ky: 1.05, kx: 0.97 }, FACE.sheep, { ...HERE, wallAt: WALL + 56, show: 0.55 }));
  add('up2', 2, shot(D.N, {}, FACE.sheep, { scroll, show: 0.3 }));
  CLIPS.think_about_it = { home: 'idle', seq: [...seq, ...DOZE] };
})();

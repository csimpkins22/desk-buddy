// Balloon house: a bunch of balloons ties itself to his cowlick, and lifts him and the little house roped to it up past the clouds. He comes back down under the last balloon.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil } = window.__lump;
  const CREAM = '#FFF1DC', RED = '#FF5A4D', YELLOW = '#FFD23F', BLUE = '#5AB8FF', GREEN = '#58D68D', GREY = '#9FB0C4', TAU = Math.PI * 2, P = 'balloon_house_';
  const down = [['dot',114,116,4], ['dot',138,114,4], ['mouth',[[122,125],[130,124],[131,131],[126,134],[121,131]]]];
  const serene = [...FACE.aahEyes, ['stroke',[[120,121],[128,127],[136,121]],2.8]];
  // each balloon: where it floats from the knot on his cowlick, and its colour; the back row first
  const BUNCH = [[-38, -52, BLUE], [-7, -71, YELLOW], [25, -67, GREEN], [52, -46, RED], [-22, -37, RED], [8, -45, BLUE], [36, -33, YELLOW]], LAST = [[4, -27, RED]];
  const PUFFS = [[-22, 4, 13], [-7, -6, 16], [11, -4, 15], [25, 5, 12], [1, 8, 14]];
  // hanging from its roof ridge, which is (0, 0); w(n) is a line n wide on the screen
  const house = (c, w, x, y, rot) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.strokeStyle = CREAM;
    c.fillStyle = GREY; c.lineWidth = w(2.4); c.beginPath(); c.rect(11, 3, 9, 20); c.rect(9, 0, 13, 4.5); c.fill(); c.stroke();
    c.fillStyle = '#F4F8FF'; c.lineWidth = w(3); c.beginPath(); c.rect(-23, 25, 46, 30); c.fill(); c.stroke();
    c.fillStyle = '#C9D4E0'; c.fillRect(12, 27, 9.5, 26.5);
    c.fillStyle = RED; c.beginPath(); c.moveTo(-31, 27); c.lineTo(0, 0); c.lineTo(31, 27); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = '#C8402F'; c.beginPath(); c.moveTo(-23, 23); c.lineTo(23, 23); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = w(2); c.fillStyle = '#6B4A1F'; c.beginPath(); c.rect(-15, 36, 11, 19); c.fill(); c.stroke();
    c.fillStyle = YELLOW; c.beginPath(); c.rect(3, 33, 13, 12); c.fill(); c.moveTo(9.5, 33); c.lineTo(9.5, 45); c.moveTo(3, 39); c.lineTo(16, 39); c.stroke();
    c.fillStyle = CREAM; c.beginPath(); c.arc(-7, 46, 1.4, 0, TAU); c.fill();
    c.restore();
  };
  // Everything but him, drawn as the wide shot sees it and then brought as close as the camera is.
  // u: 0 close on him, 1 pulled right back. sway: where the balloons are in their swaying. tug: how hard they pull. drop: how far the bunch is above his cowlick.
  // ground: how far the ground has fallen away (undefined: none), grass: how solid it is. home: the house, [across, down, tilt] from where it stood. climb: how far the clouds have gone by.
  const scene = ({ u = 1, sway = 0, tug = 1, drop = 0, ground, grass = 1, home = [0, 0, 0], climb, bunch = BUNCH }) => (c, d, seed) => {
    const z = (1 - 0.3 * u) / 0.7, fx = 128 - 36 * u, w = n => n / z;
    const gx = 92 + (d.curl[2][0] - fx) / z, gy = 201 + (d.curl[2][1] - 201) / z - drop;
    c.save(); c.lineCap = c.lineJoin = 'round'; c.translate(fx, 201); c.scale(z, z); c.translate(-92, -201);
    if (climb !== undefined) [[138, -40, 1.15], [26, -130, 0.85]].forEach(([x, y0, k]) => {
      const y = y0 + climb;
      if (y < -40 || y > 270) return;
      c.beginPath(); PUFFS.forEach(([px, py, r]) => { c.moveTo(x + (px + r) * k, y + py * k); c.arc(x + px * k, y + py * k, r * k, 0, TAU); });
      c.strokeStyle = CREAM; c.lineWidth = w(4.5); c.stroke(); c.fillStyle = GREY; c.fill();
    });
    const hx = 182 + home[0] + 22 * (1 - u) * (1 - u), hy = 146 + home[1];
    if (ground !== undefined && ground < 60) {
      const y = 203 + ground;
      c.fillStyle = 'rgba(255,241,220,.10)'; c.beginPath(); c.ellipse(hx + 4, y + 1, 32, 4.5, 0, 0, TAU); c.fill();
      if (ground) { c.beginPath(); c.ellipse(96, y + 1, 30, 4.5, 0, 0, TAU); c.fill(); }
      c.globalAlpha = grass * 0.5; c.strokeStyle = CREAM; c.lineWidth = w(2); c.beginPath(); c.moveTo(-60, y); c.lineTo(300, y); c.stroke();
      c.globalAlpha = grass; c.strokeStyle = GREEN; c.lineWidth = w(2.4); c.beginPath();
      [22, 140, 228].forEach(x => { c.moveTo(x - 4, y - 8); c.lineTo(x, y); c.lineTo(x + 5, y - 6); });
      c.stroke(); c.globalAlpha = 1;
    }
    if (bunch === BUNCH) {
      c.strokeStyle = '#C89B5A'; c.lineWidth = w(2); c.beginPath(); c.moveTo(gx, gy); c.quadraticCurveTo((gx + hx) / 2, (gy + hy) / 2 + Math.max(0, 8 - ground), hx, hy); c.stroke();
      house(c, w, hx, hy, home[2] + (seed % 3 - 1) * 0.008);
    }
    const B = bunch.map(([bx, by], i) => {
      const [x, y] = boil([[gx + bx * tug + Math.sin(sway + i * 0.9) * by * -0.07, gy + by * tug]], seed + i, 1.2)[0], a = Math.atan2(gy - y, gx - x);
      return { x, y, a, kx: x + Math.cos(a) * 17, ky: y + Math.sin(a) * 17 };
    });
    c.strokeStyle = CREAM; c.lineWidth = w(1.6); c.beginPath();
    B.forEach(({ kx, ky }, i) => { c.moveTo(gx, gy); c.quadraticCurveTo((gx + kx) / 2 + Math.sin(sway + i) * 3, (gy + ky) / 2 + 2, kx, ky); });
    c.stroke();
    c.lineWidth = w(2.8);
    B.forEach(({ x, y, a, kx, ky }, i) => {
      c.fillStyle = bunch[i][2]; c.beginPath(); c.ellipse(x, y, 17, 14, a, 0, TAU);
      c.moveTo(kx - Math.cos(a), ky - Math.sin(a)); c.lineTo(kx + Math.cos(a + 0.7) * 5, ky + Math.sin(a + 0.7) * 5); c.lineTo(kx + Math.cos(a - 0.7) * 5, ky + Math.sin(a - 0.7) * 5); c.closePath();
      c.fill(); c.stroke();
    });
    c.lineWidth = w(2.2); c.beginPath();
    B.forEach(({ x, y }) => { c.moveTo(x - 9.5 * 0.9, y - 9.5 * 0.43); c.arc(x, y, 9.5, -2.7, -1.9); });
    c.stroke();
    c.restore();
  };
  const lump = (o, face, shot) => { const u = shot.u ?? 1; return xf(D.N, { k: 1 - 0.3 * u, dx: -36 * u, shadowK: shot.ground ? 0 : 1, ...o, face, extra: { back: scene(shot) } }); };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };

  [46, 24, 8].forEach((drop, i) => add('down' + i, i ? 2 : 3, lump({}, FACE.lookup, { u: 0, drop, sway: i * 0.7, ground: 0, grass: (i + 1) / 4 })));
  add('tied', 4, lump({ ky: 1.06, kx: 0.97 }, FACE.shock, { u: 0, tug: 1.05, sway: 2, ground: 0 }));
  add('huh', 2, lump({}, FACE.lookup, { u: 0, sway: 2.6, ground: 0 }));
  [0.12, 0.36, 0.64, 0.86, 1].forEach((u, i) => add('back' + i, 2, lump({}, i < 2 ? FACE.lookup : FACE.lookr, { u, sway: 3.2 + i * 0.6, ground: 0 })));
  add('wide0', 4, lump({}, FACE.lookr, { sway: 6.2, ground: 0 }));
  add('wide1', 4, lump({}, FACE.lookup, { sway: 6.9, ground: 0 }));
  add('tug', 4, lump({ ky: 1.1, kx: 0.95 }, FACE.shock, { tug: 1.06, sway: 7.5, ground: 0 }));
  // off the ground: it falls away, the rope takes up the house a beat after him, and then they bob along as the clouds go by
  const GROUND = [4, 12, 26, 46], HOME = [[0, 4, -0.07], [-1, 9, 0.09], [-3, 6, -0.05], [-4, 1, 0.04], [-4, -3, -0.03]], bob = i => 5 + 3 * Math.sin(i * TAU / 8);
  const aloft = (i, rise = 0, climb = i * 11) => lump({ dy: -rise - (i < 3 ? 3 + i * 2 : bob(i)), ...(i < 2 ? { ky: 1.06, kx: 0.97 } : {}) }, i < 5 ? FACE.shock : i < 11 ? down : serene, {
    sway: 8 + i * 0.6, ground: GROUND[i] ?? 99, climb,
    home: [...(HOME[i] || [-4, 4 - bob(i - 2), 0]).slice(0, 2).map((v, n) => v - n * rise), HOME[i] ? HOME[i][2] : 0.06 * Math.sin(i * TAU / 10)] });
  for (let i = 0; i < 24; i++) add('up' + i, 2, aloft(i));
  [[16, 20], [44, 54], [88, 104], [150, 174], [240, 264]].forEach(([rise, more], i) => add('away' + i, 2, aloft(24 + i, rise, 23 * 11 + more)));
  [-215, -150, -95, -52, -22, -6].forEach((dy, i) => add('back_down' + i, 2, lump({ dy, shadowK: 0.4 + i * 0.1 }, down, { u: 0, bunch: LAST, sway: i * 0.8 })));
  add('land', 4, lump({ ky: 0.93, kx: 1.04 }, down, { u: 0, bunch: LAST, sway: 5 }));
  [0, 12, 40, 90].forEach((drop, i) => add('let_go' + i, 2, lump({}, FACE.lookup, { u: 0, bunch: LAST, drop, sway: 5.6 + i * 0.7 })));
  CLIPS.balloon_house = { home: 'idle', seq: [...seq, ...DOZE] };
})();

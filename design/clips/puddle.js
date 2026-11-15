// Puddle: he hops in for a splash, stomps again harder, and goes straight down. It was deep.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', BLUE = '#5AB8FF', PX = 172;
  const eager = [...FACE.chooEyes, ['stroke',[[120,122],[128,127],[136,122]],2.8]];
  const peeking = [['dot',116,110,3.8], ['dot',140,108,3.8]];
  const blink = [['stroke',[[111,110],[121,110]],2.8], ['stroke',[[135,108],[145,108]],2.8]];
  const DROPS = [[-20, -46], [20, -50], [-42, -36], [44, -32], [-62, -18], [60, -14], [-8, -64], [10, -58]];
  // splash: how far the water has flown (0.5 rising, 1 at its height, 1.5 falling). deep: he is under the floor, so
  // everything below it is hidden. bubbles: 1 or 2, coming up. drips: still on him.
  const water = ({ splash = 0, big = 1, deep = false, bubbles = 0, drips = false } = {}) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    if (deep) { c.fillStyle = '#000000'; c.fillRect(0, 205, 240, 35); }
    c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 2.4;
    c.beginPath(); c.ellipse(PX, 205, 62, 9, 0, 0, Math.PI * 2); c.fill(); c.stroke();
    c.globalAlpha = 0.6; c.lineWidth = 2; c.beginPath(); c.ellipse(PX + (seed % 2 ? 6 : -6), 205, 26, 3, 0, 0, Math.PI * 2); c.stroke(); c.globalAlpha = 1;
    if (splash) {
      const up = Math.sin(splash * 1.9) * big;
      c.beginPath(); DROPS.forEach(([x, y], i) => { const r = 4 + i % 3 * 1.5; c.moveTo(PX + x * big * splash + r, 200 + y * up); c.arc(PX + x * big * splash, 200 + y * up, r, 0, Math.PI * 2); }); c.fill();
      if (splash <= 1) {
        c.strokeStyle = BLUE; c.lineWidth = 6; c.beginPath();
        [-1, 1].forEach(s => { c.moveTo(PX + s * 42, 202); c.quadraticCurveTo(PX + s * 50, 202 - 30 * up, PX + s * (42 + 34 * big * splash), 202 - 42 * up); }); c.stroke();
      }
    }
    c.strokeStyle = CREAM; c.lineWidth = 2;
    if (bubbles) { c.beginPath(); [[-10, 14, 5], [10, 30, 4], [-2, 48, 3]].forEach(([x, y, r]) => { const by = 196 - y - bubbles * 10; c.moveTo(PX + x + r, by); c.arc(PX + x, by, r, 0, Math.PI * 2); }); c.stroke(); }
    if (drips) { c.beginPath(); [[98, 152], [198, 136], [168, 178]].forEach(([x, y]) => { c.moveTo(x, y - 7); c.quadraticCurveTo(x + 6, y + 3, x, y + 5); c.quadraticCurveTo(x - 6, y + 3, x, y - 7); }); c.fill(); c.stroke(); }
    c.restore();
  };
  const P = 'puddle_', IN = { dx: 44 }, SUNK = { dx: 44, dy: 132, face: peeking };
  D[P + 1] = xf(D.N, { face: FACE.lookr, dx: -22, rot: -0.04, extra: { back: water() } });
  D[P + 2] = xf(D.N, { face: FACE.cute, dx: -44, extra: { back: water() } });
  D[P + 3] = xf(D.N, { face: eager, dx: -44, ky: 0.86, kx: 1.07, extra: { back: water() } });
  D[P + 4] = xf(D.N, { face: FACE.happy, dy: -44, ky: 1.06, kx: 0.96, shadowK: 0.7, extra: { back: water() } });
  D[P + 5] = xf(D.N, { face: FACE.aah, ...IN, ky: 0.86, kx: 1.08, extra: { front: water({ splash: 0.5 }) } });
  D[P + 6] = xf(D.N, { face: FACE.happy, ...IN, extra: { front: water({ splash: 1 }) } });
  D[P + 7] = xf(D.N, { face: FACE.happy, ...IN, extra: { front: water({ splash: 1.5 }) } });
  D[P + 8] = xf(D.N, { face: FACE.happy, ...IN, extra: { front: water() } });
  D[P + 9] = xf(D.N, { face: eager, ...IN, ky: 0.82, kx: 1.1, extra: { front: water() } });
  D[P + 10] = xf(D.N, { face: FACE.happy, ...IN, dy: -50, ky: 1.06, kx: 0.95, shadowK: 0.6, extra: { front: water() } });
  D[P + 11] = xf(D.N, { face: FACE.happy, ...IN, dy: -58, shadowK: 0.5, extra: { front: water() } });
  D[P + 12] = xf(D.N, { face: FACE.shock, ...IN, dy: 44, extra: { front: water({ splash: 0.5, big: 1.6, deep: true }) } });
  D[P + 13] = xf(D.N, { face: FACE.shock, ...IN, dy: 100, extra: { front: water({ splash: 1, big: 1.6, deep: true }) } });
  D[P + 14] = xf(D.N, { ...SUNK, extra: { front: water({ splash: 1.5, big: 1.6, deep: true }) } });
  D[P + 15] = xf(D.N, { ...SUNK, extra: { front: water({ deep: true, bubbles: 1 }) } });
  D[P + 16] = xf(D.N, { ...SUNK, extra: { front: water({ deep: true, bubbles: 2 }) } });
  D[P + 17] = xf(D.N, { face: peeking, ...IN, dy: 78, extra: { front: water({ deep: true }) } });
  D[P + 18] = xf(D.N, { face: blink, ...IN, dy: 78, extra: { front: water({ deep: true }) } });
  D[P + 19] = xf(D.N, { face: FACE.grump, dx: 40, dy: 34, extra: { front: water({ deep: true }) } });
  D[P + 20] = xf(D.N, { face: FACE.grump, dx: 22, extra: { front: water({ drips: true }) } });
  CLIPS.puddle = { home: 'idle', seq: [...WAKE, [P + 1, 4], [P + 2, 8], [P + 3, 3], [P + 4, 3], [P + 5, 2], [P + 6, 3], [P + 7, 3], [P + 8, 5], [P + 9, 4], [P + 10, 3], [P + 11, 3],
    [P + 12, 2], [P + 13, 2], [P + 14, 3], [P + 15, 5], [P + 16, 5], [P + 17, 10], [P + 18, 3], [P + 17, 6], [P + 19, 3], [P + 20, 8], ...DOZE] };
})();

// Snowman: he pats a snowball up into a small snow Lump and gives it a face. It winks whenever he isn't looking.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', SNOW = '#F4F8FF', SX = 199, K = 0.58;
  const flat = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[121,125],[135,124]],2.8]];
  const at = ([x, y], h = 1) => [SX + (x - 128) * K, 201 + (y - 201) * K * h];      // his own outline, made small
  const snowfall = (c, d, seed, tick) => {
    const s = Math.floor(tick / 2);
    c.save(); c.fillStyle = SNOW; c.beginPath();
    for (let i = 0; i < 9; i++) { const x = 12 + i * 61 % 220 + Math.sin(s * 0.5 + i) * 5, y = (i * 53 + s * 6) % 196, r = 2 + i % 2; c.moveTo(x + r, y); c.arc(x, y, r, 0, Math.PI * 2); }
    c.roundRect(-10, 199, 260, 16, 8); c.fill(); c.restore();
  };
  // grown: 1 a snowball, 2 half built, 3 all there. Then its twig, eyes (2: winking) and mouth.
  const snowLump = (grown, twig, eyes, mouth) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.fillStyle = SNOW; c.strokeStyle = CREAM; c.lineWidth = 3;
    if (grown === 1) { c.beginPath(); c.arc(SX, 187, 15, 0, Math.PI * 2); }
    else closedPath(c, boil(D.N.body.map(p => at(p, grown === 2 ? 0.6 : 1)), seed, 1.2));
    c.fill(); c.stroke();
    if (twig) { c.strokeStyle = '#C89B5A'; openPath(c, D.N.curl.map(p => at(p))); c.stroke(); }
    c.fillStyle = c.strokeStyle = '#17161A'; c.lineWidth = 2.8;
    if (eyes) {
      c.beginPath(); c.arc(...at([116, 110]), 3.2, 0, Math.PI * 2); c.fill();
      if (eyes === 2) { openPath(c, [[132, 111], [140, 103], [148, 111]].map(p => at(p))); c.stroke(); }
      else { c.beginPath(); c.arc(...at([140, 108]), 3.2, 0, Math.PI * 2); c.fill(); }
    }
    if (mouth) { openPath(c, [[119, 122], [128, 128], [137, 122]].map(p => at(p))); c.stroke(); }
    c.restore();
  };
  const P = 'snowman_', HERE = { dx: -34 }, SHOULDER = [132, 140];
  const pat = (hand, ...lump) => ({ back: snowfall, front: snowLump(...lump), arm2: [SHOULDER, hand] });
  D[P + 1] = xf(D.N, { face: FACE.lookup, dx: -17, extra: { back: snowfall } });
  D[P + 2] = xf(D.N, { face: FACE.lookr, ...HERE, rot: 0.06, extra: pat([174, 172], 1) });
  D[P + 3] = xf(D.N, { face: FACE.lookr, ...HERE, extra: pat([168, 150], 1) });
  D[P + 4] = xf(D.N, { face: FACE.lookr, ...HERE, rot: 0.06, extra: pat([176, 160], 2) });
  D[P + 5] = xf(D.N, { face: FACE.lookr, ...HERE, extra: pat([168, 142], 2) });
  D[P + 6] = xf(D.N, { face: FACE.lookr, ...HERE, rot: 0.05, extra: pat([176, 136], 3) });
  D[P + 7] = xf(D.N, { face: FACE.lookr, ...HERE, extra: pat([166, 126], 3) });
  D[P + 8] = xf(D.N, { face: FACE.lookr, ...HERE, rot: 0.05, extra: pat([182, 120], 3, true) });
  D[P + 9] = xf(D.N, { face: FACE.lookr, ...HERE, rot: 0.05, extra: pat([176, 144], 3, true, 1) });
  D[P + 10] = xf(D.N, { face: FACE.lookr, ...HERE, rot: 0.05, extra: pat([176, 154], 3, true, 1, true) });
  D[P + 11] = xf(D.N, { face: FACE.happy, ...HERE, extra: { back: snowfall, front: snowLump(3, true, 1, true) } });
  D[P + 12] = xf(D.N, { face: FACE.happy, ...HERE, extra: { back: snowfall, front: snowLump(3, true, 2, true) } });
  D[P + 13] = xf(D.N, { face: FACE.shock, ...HERE, rot: 0.05, extra: { back: snowfall, front: snowLump(3, true, 1, true), fxm: 'alert', fx: [110, 52] } });
  D[P + 14] = xf(D.N, { face: FACE.grump, ...HERE, rot: 0.1, extra: { back: snowfall, front: snowLump(3, true, 1, true) } });
  D[P + 15] = xf(D.N, { face: flat, ...HERE, extra: { back: snowfall, front: snowLump(3, true, 2, true) } });
  D[P + 16] = xf(D.N, { face: flat, dx: -17, extra: { back: snowfall, front: snowLump(3, true, 2, true) } });
  CLIPS.snowman = { home: 'idle', seq: [...WAKE, [P + 1, 5], [P + 2, 4], [P + 3, 3], [P + 4, 4], [P + 5, 3], [P + 6, 4], [P + 7, 4], [P + 8, 6], [P + 9, 6], [P + 10, 6],
    [P + 11, 10], [P + 12, 8], [P + 13, 8], [P + 14, 10], [P + 15, 10], [P + 16, 3], ...DOZE] };
})();

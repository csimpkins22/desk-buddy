// Tumbleweed: nobody comes. A tumbleweed rolls past instead, and then a very small one hurrying after it.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', BIG = 49, SMALL = 99;
  const lookl = [['dot',110,110,3.8], ['dot',134,108,3.8], ['stroke',[[118,124],[123,126],[128,124]],2.6]];
  const downl = [['dot',110,115,3.8], ['dot',134,113,3.8], ['stroke',[[119,127],[129,126]],2.6]];
  const down = [['dot',117,116,3.8], ['dot',141,114,3.8], ['stroke',[[123,128],[133,127]],2.6]];
  const downr = [['dot',124,115,3.8], ['dot',148,113,3.8], ['stroke',[[127,127],[137,126]],2.6]];
  const flat = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[121,125],[135,124]],2.8]];
  const blink = [['stroke',[[111,110],[121,110]],2.8], ['stroke',[[135,108],[145,108]],2.8], ['stroke',[[121,125],[135,124]],2.8]];
  const weed = (c, x, y, r, a) => {
    c.save(); c.translate(x, y); c.rotate(a); c.fillStyle = '#17161A'; c.globalAlpha = 0.45; c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.fill(); c.globalAlpha = 1;
    c.strokeStyle = '#D8B878'; c.lineWidth = Math.max(2, r * 0.11); c.lineJoin = 'round';
    for (let i = 0; i < 4; i++) {                              // the same tangle every frame, so it turns rather than boils
      const k = r * (1 - i * 0.17);
      closedPath(c, boil(Array.from({ length: 8 }, (_, j) => { const t = j / 8 * Math.PI * 2 + i; return [Math.cos(t) * k, Math.sin(t) * k * (i % 2 ? 0.75 : 1)]; }), 40 + i, r * 0.5)); c.stroke();
    }
    c.restore();
  };
  // rolls in from the left in low hops, with the wind that carries it
  const roll = (start, r, speed, hop) => (c, d, seed, tick) => {
    const t = Math.floor((tick - start) / 2) * 2, x = -r - 6 + t * speed;
    weed(c, x, 200 - r - Math.abs(Math.sin(x / (r * 2.2))) * hop, r, (x / r) % (Math.PI * 2));      // within one turn: the board's limit is about 8 radians
  };
  const wind = start => (c, d, seed, tick) => {
    const t = Math.floor((tick - start) / 2) * 2;
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2; c.lineCap = 'round'; c.globalAlpha = 0.45; c.beginPath();
    [52, 98, 156].forEach((y, i) => { const x = (t * 11 + i * 110) % 330 - 50; c.moveTo(x, y); c.lineTo(x + 30, y); });
    c.stroke(); c.restore();
  };
  const pass = (start, r, speed, hop) => [downl, down, downr].map(face => xf(D.N, { face, rot: 0.025, extra: { front: roll(start, r, speed, hop), back: wind(start) } }));
  D.tumbleweed_1 = xf(D.N, { face: lookl });
  D.tumbleweed_2 = xf(D.N, { face: FACE.lookr });
  D.tumbleweed_3 = xf(D.N, { face: flat });
  [D.tumbleweed_4, D.tumbleweed_5, D.tumbleweed_6] = pass(BIG, 24, 7, 16);
  D.tumbleweed_7 = xf(D.N, { face: FACE.lookr });
  [D.tumbleweed_8, D.tumbleweed_9, D.tumbleweed_10] = pass(SMALL, 10, 8, 12);
  D.tumbleweed_11 = xf(D.N, { face: blink });
  CLIPS.tumbleweed = { home: 'idle', seq: [...WAKE, ['tumbleweed_1', 7], ['tumbleweed_2', 7], ['tumbleweed_3', 6], ['tumbleweed_4', 14], ['tumbleweed_5', 12], ['tumbleweed_6', 16],
    ['tumbleweed_7', 8], ['tumbleweed_8', 10], ['tumbleweed_9', 10], ['tumbleweed_10', 14], ['tumbleweed_3', 8], ['tumbleweed_11', 3], ['tumbleweed_3', 6], ...DOZE] };
})();

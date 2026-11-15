// Extra life: three tiny Lumps in the corner count his lives. He trips on a pebble and one pops; he looks up, alarmed, and stands very still.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath, tint } = window.__lump;
  const CREAM = '#FFF1DC', TAU = Math.PI * 2, P = 'extra_life_';
  const ICON = D.N.body.map(([x, y]) => [(x - 128) * 0.18, (y - 201) * 0.18]);
  const ouch = [...FACE.chooEyes, ['stroke',[[120,126],[124,123],[128,126],[132,123],[136,126]],2.8]];
  const upLeft = [['dot',106,103,4.2], ['dot',130,101,4.2], ['stroke',[[112,121],[118,120],[124,121]],2.6]];
  const gasp = [['dot',106,102,5], ['dot',130,100,5], ['mouth',[[113,116],[125,115],[127,128],[119,132],[111,128]]]];
  const wide = (x, y) => [['oval',114 + x,108 + y,6.5,7.5], ['oval',142 + x,106 + y,6.5,7.5], ['shine',116 + x,105 + y,2.2], ['shine',144 + x,103 + y,2.2], ['stroke',[[122,127],[134,127]],2.8]];
  // the counter: `n` lives, with the third one fading ('dim') or just gone ('pop'); and the pebble at px
  const scene = (n, third, px = 216, py = 196) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const x = 24 + i * 27, y = 38;
      if (i < n || (i === 2 && third === 'dim')) {
        closedPath(c, ICON.map(q => [x + q[0], y + q[1]]));
        if (i < n) { c.fillStyle = tint(); c.fill(); }
        c.stroke();
        c.fillStyle = i < n ? '#17161A' : CREAM;
        [-3, 3].forEach(e => { c.beginPath(); c.arc(x + e, y - 15, 1.6, 0, TAU); c.fill(); });
      } else if (third === 'pop') {
        c.beginPath();
        for (let k = 0; k < 6; k++) { const a = k * TAU / 6 + 0.5; c.moveTo(x + Math.cos(a) * 6, y - 12 + Math.sin(a) * 6); c.lineTo(x + Math.cos(a) * 14, y - 12 + Math.sin(a) * 14); }
        c.stroke();
      }
    }
    c.fillStyle = '#9FB0C4'; c.lineWidth = 2.2;
    closedPath(c, boil([[px - 8, py + 4], [px - 5, py - 4], [px + 3, py - 6], [px + 8, py - 1], [px + 7, py + 5]], seed, 0.8)); c.fill(); c.stroke();
    c.restore();
  };
  const thud = c => {
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.6; c.lineCap = 'round'; c.beginPath();
    [[60, 190, 46, 180], [58, 199, 40, 197], [100, 150, 92, 136], [150, 142, 152, 126]].forEach(([x0, y0, x1, y1]) => { c.moveTo(x0, y0); c.lineTo(x1, y1); }); c.stroke(); c.restore();
  };
  const sweat = c => {
    c.save(); c.fillStyle = '#5AB8FF'; c.beginPath(); c.moveTo(198, 70); c.quadraticCurveTo(206, 84, 198, 86); c.quadraticCurveTo(190, 84, 198, 70); c.fill(); c.restore();
  };
  const at = (o, back, front) => xf(D.N, { ...o, extra: { back, ...(front && { front }), ...o.extra } });
  const flat = { dx: 22, ky: 0.42, kx: 1.3 };
  D[P + 'w1'] = at({ face: FACE.happy }, scene(3));
  D[P + 'w2'] = at({ face: FACE.happy, dx: 10, dy: -6, rot: 0.05 }, scene(3));
  D[P + 'w3'] = at({ face: FACE.happy, dx: 20, ky: 0.96 }, scene(3));
  D[P + 'w4'] = at({ face: FACE.happy, dx: 30, dy: -6, rot: 0.05 }, scene(3));
  D[P + 'trip'] = at({ face: FACE.shock, dx: 38, dy: -10, rot: 0.32 }, scene(3, 0, 228, 186));
  D[P + 'splat'] = at({ ...flat, ky: 0.34, face: ouch }, scene(3, 0, 234, 196), thud);
  D[P + 'down1'] = at({ ...flat, face: FACE.spiral }, scene(2, 'dim', 234));
  D[P + 'down2'] = at({ ...flat, face: FACE.spiral }, scene(3, 0, 234));
  D[P + 'down3'] = at({ ...flat, face: FACE.spiral }, scene(2, 'pop', 234));
  D[P + 'down4'] = at({ ...flat, face: FACE.spiral }, scene(2, 0, 234));
  D[P + 'getup'] = at({ dx: 26, ky: 0.8, kx: 1.1, face: FACE.sheep }, scene(2, 0, 234));
  D[P + 'look'] = at({ dx: 20, face: upLeft }, scene(2, 0, 234));
  D[P + 'gasp'] = at({ dx: 20, ky: 1.04, face: gasp, extra: { fxm: 'alert', fx: [170, 60] } }, scene(2, 0, 234));
  D[P + 'still'] = at({ dx: 20, ky: 1.05, kx: 0.95, face: wide(0, 0) }, scene(2, 0, 234), sweat);
  D[P + 'peek'] = at({ dx: 20, ky: 1.05, kx: 0.95, face: wide(-6, -4) }, scene(2, 0, 234), sweat);
  const s = (...a) => a.map(([n, t]) => [P + n, t]);
  CLIPS.extra_life = { home: 'idle', seq: [...WAKE, ...s(['w1', 7], ['w2', 3], ['w3', 3], ['w4', 3], ['trip', 2], ['splat', 4], ['down1', 3], ['down2', 2], ['down1', 3], ['down2', 2], ['down3', 3], ['down4', 6],
    ['getup', 3], ['look', 8], ['gasp', 9], ['still', 16], ['peek', 7], ['still', 14]), ...DOZE] };
})();

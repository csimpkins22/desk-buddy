// Rain cloud: a small cloud finds him and rains on him. He steps aside; it follows. It rains itself out.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath, mixHex, tint } = window.__lump;
  const CREAM = '#FFF1DC';
  const flat = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[121,125],[135,124]],2.8]];
  const relieved = [['stroke',[[110,110],[116,105],[122,110]],3], ['stroke',[[134,108],[140,103],[146,108]],3], ['stroke',[[120,122],[128,127],[136,122]],2.8]];
  const blink = [['stroke',[[111,110],[121,110]],2.8], ['stroke',[[135,108],[145,108]],2.8], ['stroke',[[122,124],[128,126],[134,124]],2.6]];
  // k: size. rain: 0 none, 1 drizzle, 2 pouring. Drawn in front so the drops cross him.
  const cloud = (cx, cy, k, rain) => (c, d, seed, tick) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    if (rain) {
      c.strokeStyle = '#7FB6E6'; c.lineWidth = 2.2; c.beginPath();
      const n = rain > 1 ? 9 : 5, step = Math.floor(tick / 2);
      for (let i = 0; i < n; i++) {
        const x = cx + (-28 + i * 56 / (n - 1)) * k, fall = (step * 14 + i * 23) % 110, y = cy + 14 * k + fall;
        if (y < 192) { c.moveTo(x, y); c.lineTo(x - 2, y + 8); }
      }
      c.stroke();
    }
    const puffs = [[-22, 4, 13], [-7, -6, 16], [11, -4, 15], [25, 5, 12], [1, 8, 14]];
    c.beginPath();
    puffs.forEach(([x, y, r]) => { c.moveTo(cx + (x + r) * k, cy + y * k); c.arc(cx + x * k, cy + y * k, r * k, 0, Math.PI * 2); });
    c.strokeStyle = CREAM; c.lineWidth = 5; c.stroke(); c.fillStyle = '#9FB0C4'; c.fill();
    c.restore();
  };
  D.rain1 = xf(D.N, { face: FACE.lookup, extra: { front: cloud(60, 36, 1, 0) } });
  D.rain2 = xf(D.N, { face: FACE.lookup, extra: { front: cloud(128, 34, 1, 0) } });
  D.rain3 = xf(D.N, { face: FACE.grump, ky: 0.97, extra: { front: cloud(128, 34, 1, 1) } });
  D.rain4 = xf(D.N, { face: FACE.grump, ky: 0.95, extra: { front: cloud(128, 34, 1, 2) } });
  D.rain5 = xf(D.N, { face: FACE.lookr, dx: 22, rot: 0.05, extra: { front: cloud(128, 34, 1, 2) } });
  D.rain6 = xf(D.N, { face: relieved, dx: 44, extra: { front: cloud(120, 34, 1, 2) } });
  D.rain7 = xf(D.N, { face: FACE.lookup, dx: 44, extra: { front: cloud(148, 34, 1, 1) } });
  D.rain8 = xf(D.N, { face: FACE.grump, dx: 44, ky: 0.95, extra: { front: cloud(172, 34, 1, 2) } });
  D.rain9 = xf(D.N, { face: flat, dx: 44, ky: 0.93, kx: 1.03, extra: { front: cloud(172, 36, 0.8, 2) } });
  D.rain10 = xf(D.N, { face: flat, dx: 44, extra: { front: cloud(172, 40, 0.55, 1) } });
  D.rain11 = xf(D.N, { face: FACE.lookup, dx: 44, extra: { front: cloud(172, 44, 0.3, 0) } });
  D.rain12 = xf(D.N, { face: blink, dx: 40, rot: -0.05 });
  D.rain13 = xf(D.N, { face: blink, dx: 48, rot: 0.05 });
  D.rain14 = xf(D.N, { face: relieved, dx: 22 });
  CLIPS.raincloud = { home: 'idle', seq: [...WAKE, ['rain1', 6], ['rain2', 10], ['rain3', 10], ['rain4', 14], ['rain5', 4], ['rain6', 14], ['rain7', 6],
    ['rain8', 16], ['rain9', 14], ['rain10', 8], ['rain11', 8], ['rain12', 3], ['rain13', 3], ['rain12', 3], ['rain13', 3], ['rain14', 8], ...DOZE] };
})();

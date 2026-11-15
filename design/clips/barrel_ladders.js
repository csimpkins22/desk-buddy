// Barrel ladders: barrels roll down two sloped planks. He hops two on the floor, climbs the ladder, and the third rolls him all the way back down.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', TAU = Math.PI * 2, K = 0.4, R = 12, P = 'barrel_ladders_';
  const calm = [['dot',113,108,8], ['dot',143,106,8], ['stroke',[[120,126],[128,130],[136,126]],5]];
  const glad = [['dot',113,108,8], ['dot',143,106,8], ['mouth',[[114,120],[142,119],[139,136],[128,141],[117,136]]]];
  const yikes = [['dot',113,106,9], ['dot',143,104,9], ['mouth',[[120,120],[136,119],[139,138],[128,144],[117,138]]]];
  const dizzy = [['spiral',112,108,11], ['spiral',144,106,11], ['stroke',[[116,128],[122,124],[128,128],[134,124],[140,128]],5]];
  const TOP = [[-10, 24], [196, 43]], MID = [[244, 104], [84, 128]], LADDER = 150;
  // a barrel's middle at [time, x, y]: along the top plank, down to the middle one, down to the floor and away
  const WAY = [[0, -14, 9], [22, 206, 29], [27, 208, 94], [41, 76, 114], [47, 70, 190], [66, 262, 190]];
  const barrel = u => {
    for (let i = 1; i < WAY.length; i++) {
      const [t0, x0, y0] = WAY[i - 1], [t1, x1, y1] = WAY[i];
      if (u >= t0 && u <= t1) { const p = (u - t0) / (t1 - t0); return [x0 + (x1 - x0) * p, y0 + (y1 - y0) * p]; }
    }
  };
  const planks = c => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.strokeStyle = CREAM; c.lineWidth = 2.6; c.globalAlpha = 0.75; c.beginPath();
    c.moveTo(LADDER - 11, 201); c.lineTo(LADDER - 11, 112); c.moveTo(LADDER + 11, 201); c.lineTo(LADDER + 11, 116);
    for (let y = 190; y > 122; y -= 15) { c.moveTo(LADDER - 11, y); c.lineTo(LADDER + 11, y); }
    c.stroke(); c.globalAlpha = 1;
    [TOP, MID].forEach(([a, b]) => {
      c.strokeStyle = CREAM; c.lineWidth = 9; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke();
      c.strokeStyle = '#17161A'; c.lineWidth = 4; c.stroke();
    });
    c.restore();
  };
  // the barrels at time t; each started `from` ticks before the scene did
  const barrels = t => c => {
    c.save(); c.strokeStyle = CREAM; c.lineCap = 'round';
    [37, 21, -38].forEach(from => {
      const u = t + from, at = barrel(u); if (!at) return;
      const [x, y] = at, a = u * 0.8;
      c.fillStyle = '#A0672A'; c.lineWidth = 2.6; c.beginPath(); c.arc(x, y, R, 0, TAU); c.fill(); c.stroke();
      c.strokeStyle = '#3A2710'; c.lineWidth = 2.2; c.beginPath(); c.arc(x, y, R * 0.55, 0, TAU);
      c.moveTo(x - Math.cos(a) * R * 0.55, y - Math.sin(a) * R * 0.55); c.lineTo(x + Math.cos(a) * R * 0.55, y + Math.sin(a) * R * 0.55); c.stroke(); c.strokeStyle = CREAM;
    });
    c.restore();
  };
  const seq = [...WAKE], HOP = [24, 38, 34, 16], top = x => 100 + (244 - x) * 0.15;   // top(x): where he stands on the middle plank
  const put = (t, o) => { D[P + t] = xf(D.N, { k: K, ...o, extra: { back: planks, front: barrels(Math.max(0, t)), ...o.extra } }); seq.push([P + t, 2]); };
  put(-4, { k: 0.75, face: FACE.lookup }); put(-2, { k: 0.55, face: calm });
  seq[seq.length - 2][1] = 3;                // an odd hold, so each drawing after it keeps one wobble for its two ticks
  for (let t = 0; t < 100; t += 2) {
    const hop = HOP[(t - 14) / 2] ?? HOP[(t - 30) / 2];
    if (t < 38) put(t, hop ? { dy: -hop, ky: 1.12, kx: 0.94, face: glad, shadowK: 0.6 } : { face: calm, ky: t === 12 || t === 28 ? 0.85 : 1 });
    else if (t < 42) put(t, { dx: (t - 36) * 5.5, face: calm, rot: 0.08 });
    else if (t < 56) put(t, { dx: 22, dy: -(t - 40) / 14 * (201 - top(LADDER)), rot: t % 4 ? 0.1 : -0.1, face: calm, shadowK: 0 });
    else if (t < 62) put(t, { dx: 22, dy: top(LADDER) - 201 - (t === 58 ? 8 : 0), face: glad, shadowK: 0 });
    else if (t < 68) put(t, { dx: 22, dy: top(LADDER) - 201, ky: 0.9, face: yikes, shadowK: 0, extra: { fxm: 'alert', fx: [128, 66] } });
    else if (t < 80) {                       // bowled along ahead of the barrel, then off the low end
      const [bx, by] = barrel(t - 38);
      put(t, { ox: 128, oy: 136, dx: bx - 26 - 128, dy: (t < 78 ? top(bx - 26) - 22 : by - 6) - 136, rot: -(t - 66) * 0.6, face: yikes, shadowK: 0 });
    } else put(t, { dx: -90, ky: t === 80 ? 0.45 : 0.6, kx: 1.3, face: dizzy, extra: t < 86 ? { fxm: 'alert', fx: [40, 150] } : {} });
  }
  D[P + 'up'] = xf(D.N, { k: 0.7, dx: -45, face: FACE.spiral });
  D[P + 'd1'] = xf(D.N, { rot: 0.05, face: FACE.spiral }); D[P + 'd2'] = xf(D.N, { rot: -0.05, face: FACE.spiral });
  seq.push([P + 'up', 2], [P + 'd1', 4], [P + 'd2', 4], [P + 'd1', 4], [P + 'd2', 4], ...DOZE);
  CLIPS.barrel_ladders = { home: 'idle', seq };
})();

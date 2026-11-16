// Umbrella: a gust turns it inside out and carries him off the top of the screen. He comes back down without it.
// group: gadgets
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, openPath } = window.__lump;
  const CREAM = '#FFF1DC', RED = '#FF5A4D', SHOULDER = [156, 140];
  const uneasy = [['dot',113,110,3.8], ['dot',137,108,3.8], ['dot',125,125,2.8]];
  const strain = [...FACE.chooEyes, ['stroke',[[120,125],[124,122],[128,125],[132,122],[136,125]],2.6]];
  // its handle at (x, y), leaning by a. flipped: blown inside out
  const umbrella = (x, y, a, flipped) => (c, d, seed) => {
    c.save(); c.translate(x, y); c.rotate(a); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.fillStyle = RED;
    c.lineWidth = 3; c.beginPath(); c.moveTo(0, -64); c.lineTo(0, 6); c.arc(5, 6, 5, Math.PI, 0, true); c.stroke();
    c.lineWidth = 2.6; c.beginPath();
    if (flipped) {
      c.ellipse(0, -88, 42, 25, 0, Math.PI, 0, true); [[28, -77, 14, -88], [0, -77, -14, -88], [-28, -77, -42, -88]].forEach(q => c.quadraticCurveTo(...q));
      c.closePath(); c.fill(); c.stroke();
      c.lineWidth = 1.8; c.beginPath(); [-42, -14, 14, 42].forEach(rx => { c.moveTo(0, -64); c.lineTo(rx, -88); }); c.stroke();
    } else {
      c.ellipse(0, -58, 48, 30, 0, Math.PI, 0); [[32, -68, 16, -58], [0, -68, -16, -58], [-32, -68, -48, -58]].forEach(q => c.quadraticCurveTo(...q));
      c.closePath(); c.fill(); c.stroke();
    }
    c.restore();
  };
  const wind = (c, d, seed, tick) => {                    // streaks blowing across, drawn on twos
    const step = Math.floor(tick / 2);
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.4; c.lineCap = 'round'; c.globalAlpha = 0.6;
    [40, 150, 186].forEach((y, i) => { const x = (step * 26 + i * 90) % 300 - 50; openPath(c, [[x, y], [x + 16, y - 3], [x + 32, y + 2], [x + 48, y]]); c.stroke(); });
    c.restore();
  };
  const both = (...f) => (c, d, seed, tick) => f.forEach(g => g(c, d, seed, tick));
  // hanging from it as it climbs
  const lift = (dx, dy) => xf(D.N, { dx: dx - 10, dy, ky: 1.05, face: FACE.shock, shadowK: Math.max(0.4, 1 + dy / 200),
    extra: { arm2: [[156 + dx, 138 + dy], [164 + dx, 114 + dy]], front: both(wind, umbrella(166 + dx, 112 + dy, 0.06, true)) } });
  D.umbrella_1 = xf(D.N, { dx: -10, face: FACE.happy, extra: { arm2: [SHOULDER, [176, 127]], front: umbrella(182, 124, -0.42) } });
  D.umbrella_2 = xf(D.N, { dx: -10, face: uneasy, rot: 0.03, extra: { arm2: [SHOULDER, [178, 126]], front: both(wind, umbrella(184, 123, -0.15)) } });
  D.umbrella_3 = xf(D.N, { dx: -10, face: strain, rot: 0.08, extra: { arm2: [[160, 138], [182, 124]], front: both(wind, umbrella(188, 121, 0.22)) } });
  D.umbrella_4 = xf(D.N, { dx: -10, face: FACE.shock, rot: 0.05, extra: { arm2: [[158, 138], [180, 122]], front: both(wind, umbrella(186, 119, 0.1, true)), fxm: 'alert', fx: [100, 62] } });
  [[2, -12], [10, -36], [22, -76], [38, -130]].forEach(([dx, dy], i) => { D['umbrella_' + (5 + i)] = lift(dx, dy); });
  D.umbrella_9 = xf(D.N, { dy: -330, shadowK: 0.35, extra: { front: wind } });
  D.umbrella_10 = xf(D.N, { dy: -130, ky: 1.1, kx: 0.94, face: FACE.shock, shadowK: 0.5 });
  D.umbrella_11 = xf(D.N, { dy: -45, ky: 1.1, kx: 0.94, face: FACE.shock, shadowK: 0.8 });
  D.umbrella_12 = xf(D.N, { ky: 0.8, kx: 1.14, face: FACE.spiral });
  D.umbrella_13 = xf(D.N, { rot: -0.05, face: FACE.spiral });
  D.umbrella_14 = xf(D.N, { rot: 0.05, face: FACE.spiral });
  D.umbrella_15 = xf(D.N, { face: FACE.sheep });
  CLIPS.umbrella = { home: 'idle', seq: [...WAKE, ['umbrella_1', 8], ['umbrella_2', 4], ['umbrella_3', 4], ['umbrella_4', 5], ['umbrella_5', 3], ['umbrella_6', 3], ['umbrella_7', 3], ['umbrella_8', 3],
    ['umbrella_9', 8], ['umbrella_10', 2], ['umbrella_11', 2], ['umbrella_12', 5], ['umbrella_13', 5], ['umbrella_14', 5], ['umbrella_15', 6], ...DOZE] };
})();

// Jetpack: it lifts him off and he loves it. Then it sputters, coughs, goes quiet, and drops him.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', GREY = '#9FB0C4';
  const set = [['stroke',[[108,100],[121,104]],2.6], ['stroke',[[136,102],[149,98]],2.6], ['dot',116,111,3.6], ['dot',140,109,3.6], ['stroke',[[121,125],[128,127],[135,125]],2.8]];
  const wow = [['dot',116,108,4.4], ['dot',140,106,4.4], ['dot',128,124,3]];
  const uhoh = [['dot',118,114,3.8], ['dot',142,112,3.8], ['stroke',[[122,127],[134,126]],2.8]];
  // behind him: a tank either side, dy off the floor. burn: how long the flames are. puffs: 1 coughing out below, 2 smoking above
  const pack = (dy, burn, puffs) => (c, d, seed) => {
    c.save(); c.translate(0, dy); c.lineJoin = c.lineCap = 'round';
    [63, 193].forEach((x, i) => {
      const flame = (w, L, colour) => { c.fillStyle = colour; c.beginPath(); c.moveTo(x - w, 172); c.quadraticCurveTo(x - w, 172 + L * 0.7, x, 172 + L); c.quadraticCurveTo(x + w, 172 + L * 0.7, x + w, 172); c.fill(); };
      if (burn) { const L = burn * (1 + ((seed + i) % 2) * 0.3); flame(10, L, '#FF5A4D'); flame(5.5, L * 0.6, '#FFD23F'); }
      c.fillStyle = '#5E6B7A'; c.strokeStyle = CREAM; c.lineWidth = 2.4;
      c.beginPath(); c.moveTo(x - 7, 162); c.lineTo(x + 7, 162); c.lineTo(x + 10, 173); c.lineTo(x - 10, 173); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = GREY; c.lineWidth = 2.6; c.beginPath(); c.roundRect(x - 13, 108, 26, 56, 10); c.fill(); c.stroke();
      if (puffs) {
        const up = puffs === 2 ? -1 : 1, y = up > 0 ? 182 : 98, s = (seed + i) % 2 ? 5 : -5;
        c.globalAlpha = 0.75; c.beginPath(); c.arc(x + s, y, 6, 0, Math.PI * 2); c.moveTo(x - s + 9, y + up * 15); c.arc(x - s, y + up * 15, 9, 0, Math.PI * 2); c.fill(); c.globalAlpha = 1;
      }
    });
    c.restore();
  };
  const fly = (dy, face, burn, puffs, o = {}) => xf(D.N, { dy, face, shadowK: Math.max(0.5, 1 + dy / 110), ...o, extra: { back: pack(dy, burn, puffs) } });
  D.jetpack_1 = fly(0, set, 0);
  D.jetpack_2 = fly(0, set, 12, 0, { ky: 0.94 });
  D.jetpack_3 = fly(-12, wow, 38, 0, { ky: 1.05 });
  D.jetpack_4 = fly(-32, wow, 44);
  D.jetpack_5 = fly(-48, wow, 40);
  D.jetpack_6 = fly(-56, FACE.happy, 34);
  D.jetpack_7 = fly(-52, FACE.happy, 28);
  D.jetpack_8 = fly(-50, uhoh, 0, 1);
  D.jetpack_9 = fly(-54, uhoh, 10);
  D.jetpack_10 = fly(-46, uhoh, 0, 1);
  D.jetpack_11 = fly(-50, uhoh, 6);
  D.jetpack_12 = fly(-48, FACE.sheep, 0, 1);
  D.jetpack_13 = fly(-22, FACE.shock, 0, 0, { ky: 1.1, kx: 0.95 });
  D.jetpack_14 = fly(0, FACE.spiral, 0, 2, { ky: 0.78, kx: 1.16 });
  D.jetpack_15 = fly(0, FACE.spiral, 0, 2, { rot: -0.05 });
  D.jetpack_16 = fly(0, FACE.spiral, 0, 2, { rot: 0.05 });
  CLIPS.jetpack = { home: 'idle', seq: [...WAKE, ['jetpack_1', 6], ['jetpack_2', 4], ['jetpack_3', 2], ['jetpack_4', 2], ['jetpack_5', 3],
    ['jetpack_6', 3], ['jetpack_7', 3], ['jetpack_6', 3], ['jetpack_7', 3], ['jetpack_6', 3], ['jetpack_7', 3], ['jetpack_8', 3], ['jetpack_9', 3], ['jetpack_10', 3], ['jetpack_11', 3],
    ['jetpack_12', 7], ['jetpack_13', 2], ['jetpack_14', 5], ['jetpack_15', 5], ['jetpack_16', 5], ...DOZE] };
})();

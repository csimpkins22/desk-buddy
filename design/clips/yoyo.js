// Yo-yo: down and up, down and up, then it sticks at the bottom. He tugs. It comes back harder than he meant.
// group: pastimes
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  const watching = [['dot',119,112,3.8], ['dot',143,110,3.8], ['stroke',[[121,124],[128,127],[135,124]],2.8]];
  const puzzled = [['dot',119,112,3.8], ['dot',143,110,3.8], ['stroke',[[121,126],[128,124],[135,126]],2.8], ['stroke',[[108,100],[120,97]],2.4]];
  const tugging = [['stroke',[[108,104],[116,109],[108,114]],3], ['stroke',[[148,102],[140,107],[148,112]],3], ['stroke',[[120,126],[136,125]],2.8]];
  const yoyo = (c, hx, hy, x, y) => {
    c.save(); c.lineCap = 'round';
    c.strokeStyle = CREAM; c.globalAlpha = 0.8; c.lineWidth = 1.6; c.beginPath(); c.moveTo(hx, hy); c.lineTo(x, y); c.stroke(); c.globalAlpha = 1;
    c.fillStyle = '#FF5A4D'; c.lineWidth = 2.4; c.beginPath(); c.arc(x, y, 8.5, 0, Math.PI * 2); c.fill(); c.stroke();
    c.fillStyle = CREAM; c.beginPath(); c.arc(x, y, 2.4, 0, Math.PI * 2); c.fill();
    c.restore();
  };
  const HAND = [204, 126];
  // bobbing: two full trips down and back, drawn on twos
  const bob = start => (c, d, seed, tick) => { const t = Math.floor((tick - start) / 2) * 2, drop = Math.abs(Math.sin(t / 20 * Math.PI)) * 58; yoyo(c, ...HAND, HAND[0], HAND[1] + 12 + drop); };
  const stuck = (hy, spin) => (c, d, seed) => {
    yoyo(c, HAND[0], hy, HAND[0], 184);
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 1.8; c.lineCap = 'round'; c.globalAlpha = 0.7;
    c.beginPath(); c.arc(HAND[0], 184, 13, spin, spin + 1.1); c.stroke(); c.beginPath(); c.arc(HAND[0], 184, 13, spin + Math.PI, spin + Math.PI + 1.1); c.stroke(); c.restore();
  };
  const at = (x, y, hy = HAND[1]) => (c, d, seed) => yoyo(c, HAND[0], hy, x, y);
  const ARM = { arm2: [[166, 138], HAND] };
  D.yo1 = xf(D.N, { face: watching, extra: { ...ARM, front: bob(29) } });
  D.yo2 = xf(D.N, { face: puzzled, extra: { ...ARM, front: stuck(HAND[1], 0) } });
  D.yo3 = xf(D.N, { face: puzzled, extra: { ...ARM, front: stuck(HAND[1], 1.2) } });
  D.yo4 = xf(D.N, { face: tugging, rot: -0.07, extra: { arm2: [[162, 136], [200, 108]], front: stuck(108, 2.4) } });
  D.yo5 = xf(D.N, { face: tugging, rot: -0.1, ky: 1.03, extra: { arm2: [[160, 134], [196, 98]], front: at(196, 150, 98) } });
  D.yo6 = xf(D.N, { face: FACE.shock, extra: { arm2: [[166, 138], [198, 112]], front: at(176, 74, 112) } });
  D.yo7 = xf(D.N, { face: FACE.spiral, ky: 0.86, kx: 1.08, extra: { arm2: [[168, 150], [200, 150]], front: at(146, 72, 150), fxm: 'alert', fx: [112, 84] } });
  D.yo8 = xf(D.N, { face: FACE.spiral, rot: 0.05, extra: { arm2: [[168, 146], [202, 142]], front: at(204, 176, 142) } });
  D.yo9 = xf(D.N, { face: FACE.spiral, rot: -0.05, extra: { arm2: [[168, 146], [202, 142]], front: at(200, 178, 142) } });
  CLIPS.yoyo = { home: 'idle', seq: [...WAKE, ['yo1', 40], ['yo2', 6], ['yo3', 6], ['yo2', 6], ['yo4', 4], ['yo3', 5], ['yo4', 4], ['yo2', 5], ['yo5', 3], ['yo6', 2], ['yo7', 8],
    ['yo8', 5], ['yo9', 5], ['yo8', 5], ['yo9', 5], ...DOZE] };
})();

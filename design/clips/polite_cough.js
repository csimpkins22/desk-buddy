// Polite cough: he waits, gives a small "ahem" behind his hand, then whistles as if it wasn't him.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath } = window.__lump;
  const CREAM = '#FFF1DC';
  const waiting = [['dot',120,110,3.6], ['dot',144,108,3.6], ['stroke',[[124,125],[136,124]],2.8]];
  const ahem = [['stroke',[[110,110],[116,106],[122,110]],3], ['stroke',[[134,108],[140,104],[146,108]],3], ['mouth',[[125,120],[133,120],[134,127],[129,130],[124,127]]]];
  const whistle = [['dot',110,106,3.6], ['dot',134,104,3.6], ['stroke',[[104,97],[114,94]],2.4], ['stroke',[[130,92],[140,93]],2.4], ['dot',128,123,3]];
  const whistle2 = [['dot',122,106,3.6], ['dot',146,104,3.6], ['stroke',[[116,95],[126,93]],2.4], ['stroke',[[142,91],[152,93]],2.4], ['dot',132,123,3]];
  const peek = [['dot',122,110,3.6], ['dot',146,108,3.6], ['stroke',[[116,100],[126,99]],2.4], ['stroke',[[142,97],[152,99]],2.4], ['stroke',[[124,124],[130,126],[136,124]],2.6]];
  // k: how far the little cough cloud has drifted and grown
  const puff = k => (c, d, seed) => {
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.4; c.lineCap = 'round'; c.globalAlpha = 1 - k * 0.5;
    [[0, 0, 7], [11, -7, 5], [12, 6, 4]].forEach(([x, y, r], i) => { c.beginPath(); c.arc(196 + k * 6 + x * (1 + k * 0.6), 118 - k * 8 + y * (1 + k * 0.6), r * (1 + k * 0.5), 0, Math.PI * 2); c.stroke(); });
    c.restore();
  };
  const note = (c, x, y, s, two) => {
    c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = CREAM; c.strokeStyle = CREAM; c.lineWidth = 2.6; c.lineCap = c.lineJoin = 'round';
    c.beginPath(); c.ellipse(0, 0, 6, 4.5, -0.4, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.moveTo(5, -1); c.lineTo(5, -22);
    if (two) { c.lineTo(23, -26); c.lineTo(23, -5); } else c.quadraticCurveTo(14, -18, 13, -10);
    c.stroke();
    if (two) { c.beginPath(); c.ellipse(18, -4, 6, 4.5, -0.4, 0, Math.PI * 2); c.fill(); }
    c.restore();
  };
  // notes drift up and away from his mouth, drawn on twos
  const notes = start => (c, d, seed, tick) => {
    const t = Math.floor((tick - start) / 2) * 2;
    for (let i = 0; i < 3; i++) {
      const p = ((t + i * 16) % 48) / 48;
      c.save(); c.globalAlpha = Math.min(1, 3 * (1 - p));
      note(c, 182 + p * 30 + Math.sin(p * 7 + i) * 5, 110 - p * 80, 0.8 + p * 0.4, i === 1);
      c.restore();
    }
  };
  const HAND = { arm2: [[166, 140], [150, 126]] };
  const START = 29 + 12 + 6 + 3 + 4 + 3 + 6 + 8;
  D.polite_cough_1 = xf(D.N, { face: waiting });
  D.polite_cough_2 = xf(D.N, { face: FACE.lookr });
  D.polite_cough_3 = xf(D.N, { face: ahem, ky: 0.95, rot: 0.04, extra: { ...HAND, front: puff(0) } });
  D.polite_cough_4 = xf(D.N, { face: ahem, ky: 1.02, extra: { ...HAND, front: puff(0.5) } });
  D.polite_cough_5 = xf(D.N, { face: ahem, ky: 0.95, rot: 0.04, extra: { ...HAND, front: puff(1) } });
  D.polite_cough_6 = xf(D.N, { face: peek, dx: -8 });
  D.polite_cough_7 = xf(D.N, { face: whistle, rot: -0.05, dx: -14, extra: { front: notes(START) } });
  D.polite_cough_8 = xf(D.N, { face: whistle2, rot: 0.05, dx: -14, extra: { front: notes(START) } });
  const sway = [['polite_cough_7', 12], ['polite_cough_8', 12]];
  CLIPS.polite_cough = { home: 'idle', seq: [...WAKE, ['polite_cough_1', 12], ['polite_cough_2', 6], ['polite_cough_3', 3], ['polite_cough_4', 4], ['polite_cough_5', 3], ['polite_cough_4', 6],
    ['polite_cough_6', 8], ...sway, ...sway, ['polite_cough_6', 6], ...DOZE] };
})();

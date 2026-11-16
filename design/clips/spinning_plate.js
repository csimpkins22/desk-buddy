// Spinning plate: it spins on his cowlick, the wobble gets away from him, and he dives and catches it on one nub.
// group: pastimes
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  const worried = [['dot',118,104,4.2], ['dot',142,102,4.2], ['stroke',[[121,123],[125,120],[129,123],[133,120],[137,123]],2.6], ['stroke',[[108,93],[120,90]],2.4], ['stroke',[[136,88],[148,91]],2.4]];
  const phew = [...FACE.aahEyes, ['stroke',[[121,123],[128,127],[135,123]],2.8]];
  // spin: how far round its blue mark has got. ry: how much of its face we see. whirl: lines that say it is spinning
  const plate = (x, y, tilt, spin, ry = 8, whirl = true) => (c, d, seed) => {
    c.save(); c.translate(x, y); c.rotate(tilt); c.lineCap = 'round';
    c.fillStyle = '#9FB0C4'; c.beginPath(); c.ellipse(0, 4, 22, ry * 0.7, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = CREAM; c.beginPath(); c.ellipse(0, 0, 32, ry, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#9FB0C4'; c.lineWidth = 2; c.beginPath(); c.ellipse(0, 0, 19, ry * 0.55, 0, 0, Math.PI * 2); c.stroke();
    c.strokeStyle = '#5AB8FF'; c.lineWidth = 3; c.beginPath(); c.ellipse(0, 0, 27, ry * 0.78, 0, spin, spin + 1.3); c.stroke();
    if (whirl) { c.strokeStyle = CREAM; c.lineWidth = 2; c.globalAlpha = 0.7; for (const a of [0.35 + spin % 0.5, Math.PI + 0.35 + spin % 0.5]) { c.beginPath(); c.ellipse(0, 0, 41, ry + 6, 0, a, a + 0.7); c.stroke(); } }
    c.restore();
  };
  // balanced on the tip of his cowlick, wherever this pose puts it
  const on = (o, tilt, slide, spin) => {
    const lean = (o.rot || 0) * 60, d = xf(D.N, { ky: 0.95, ...o, extra: { arm: [[92 + lean, 142], [68 + lean, 132 + lean / 2]], arm2: [[164 + lean, 142], [188 + lean, 132 - lean / 2]] } });
    d.front = plate(d.curl[2][0] + slide, d.curl[2][1] - 5, tilt, spin);
    return d;
  };
  const seq = [...WAKE];
  for (let i = 0; i < 9; i++) { if (i < 3) D['spinning_plate_s' + i] = on({ face: FACE.lookup }, 0, 0, i * 2.1); seq.push(['spinning_plate_s' + i % 3, 3]); }
  [[0.05, 0.14, 6], [-0.07, -0.2, -9], [0.09, 0.28, 13], [-0.1, -0.32, -15], [0.1, 0.42, 24]].forEach(([rot, tilt, slide], i) => {
    D['spinning_plate_w' + i] = on({ face: worried, rot }, tilt, slide, i * 2.1); seq.push(['spinning_plate_w' + i, 4]);
  });
  D.spinning_plate_f1 = xf(D.N, { face: FACE.shock, rot: 0.06, extra: { front: plate(190, 78, 0.9, 1, 12, false), fxm: 'alert', fx: [96, 60] } });
  D.spinning_plate_f2 = xf(D.N, { face: FACE.shock, rot: 0.18, extra: { arm2: [[176, 148], [198, 150]], front: plate(206, 122, 1.25, 3, 15, false) } });
  const dive = { rot: 0.34, dx: -8, ky: 0.94 }, REACH = { arm2: [[178, 160], [200, 180]] };
  D.spinning_plate_c1 = xf(D.N, { ...dive, face: FACE.shock, extra: { ...REACH, front: plate(204, 164, 0.3, 5, 10, false) } });
  D.spinning_plate_c2 = xf(D.N, { ...dive, face: FACE.shock, extra: { ...REACH, front: plate(204, 171, -0.1, 0.9) } });
  D.spinning_plate_c3 = xf(D.N, { ...dive, face: phew, extra: { ...REACH, front: plate(204, 171, 0.08, 3) } });
  D.spinning_plate_c4 = xf(D.N, { ...dive, face: phew, extra: { ...REACH, front: plate(204, 171, -0.05, 5.1) } });
  const UP = { arm2: [[166, 136], [192, 106]] };
  D.spinning_plate_u1 = xf(D.N, { face: FACE.happy, extra: { ...UP, front: plate(198, 94, 0, 1), fxm: 'done' } });
  D.spinning_plate_u2 = xf(D.N, { face: FACE.happy, ky: 1.02, extra: { ...UP, front: plate(198, 94, 0, 3.1), fxm: 'done' } });
  CLIPS.spinning_plate = { home: 'idle', seq: [...seq, ['spinning_plate_f1', 3], ['spinning_plate_f2', 2], ['spinning_plate_c1', 3], ['spinning_plate_c2', 4],
    ['spinning_plate_c3', 4], ['spinning_plate_c4', 4], ['spinning_plate_c3', 4], ['spinning_plate_c4', 4],
    ['spinning_plate_u1', 4], ['spinning_plate_u2', 4], ['spinning_plate_u1', 4], ['spinning_plate_u2', 4], ...DOZE] };
})();

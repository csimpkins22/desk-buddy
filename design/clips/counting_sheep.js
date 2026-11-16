// Counting sheep: he lies awake keeping a tally while sheep hop over him. The third one lands on him and falls asleep instead.
// group: pastimes
(() => {
  const { D, CLIPS, xf, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A';
  const mouth = ['stroke',[[183,180],[189,180]],2.6];
  const awake = [['dot',174,165,3.4], mouth];
  const deadpan = [['stroke',[[166,162],[182,162]],2.8], ['dot',174,167,2.6], mouth];
  const startled = [['dot',174,164,4.6], ['dot',187,181,3]];
  // pose: 'run' legs flung out, 'drop' legs straight down, 'nap' legs tucked and eye shut
  const sheep = (c, x, y, rot, pose) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.scale(1.35, 1.35); c.lineJoin = c.lineCap = 'round';
    if (pose !== 'nap') {
      const fling = pose === 'run' ? 8 : 0; c.strokeStyle = CREAM; c.lineWidth = 3;
      c.beginPath(); [[-13, -1], [-6, -0.4], [7, 0.4], [14, 1]].forEach(([lx, k]) => { c.moveTo(lx, 10); c.lineTo(lx + k * fling, 25); }); c.stroke();
    }
    c.beginPath(); [[-14, 2, 11], [-4, -7, 12], [9, -5, 11], [14, 4, 10], [0, 6, 12]].forEach(([px, py, r]) => { c.moveTo(px + r, py); c.arc(px, py, r, 0, Math.PI * 2); });
    c.strokeStyle = DARK; c.lineWidth = 4; c.stroke(); c.fillStyle = CREAM; c.fill();
    c.fillStyle = DARK; c.strokeStyle = CREAM; c.lineWidth = 2.2;
    c.beginPath(); c.ellipse(15, -11, 5, 2.8, -0.5, 0, Math.PI * 2); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(23, -3, 8, 10, 0.35, 0, Math.PI * 2); c.fill(); c.stroke();
    if (pose === 'nap') { c.lineWidth = 1.8; c.beginPath(); c.moveTo(21, -5); c.lineTo(27, -4); c.stroke(); }
    else { c.fillStyle = CREAM; c.beginPath(); c.arc(24, -5, 2, 0, Math.PI * 2); c.fill(); }
    c.restore();
  };
  const zed = (c, x, y, s) => { c.beginPath(); c.moveTo(x, y); c.lineTo(x + s, y); c.lineTo(x, y + s); c.lineTo(x + s, y + s); c.stroke(); };
  // the tally so far, then whatever else is in the air
  const scene = (count, draw) => (c, d, seed) => {
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = c.lineJoin = 'round';
    c.beginPath(); for (let k = 0; k < count; k++) { c.moveTo(24 + k * 11, 18); c.lineTo(21 + k * 11, 38); } c.stroke();
    if (draw) draw(c);
    c.restore();
  };
  const lying = (face, count, draw, o = {}) => xf(D.S1, { ...o, face, extra: { front: scene(count, draw) } });
  // one hop over him, left to right, in 11 drawings; the third sheep only gets halfway
  const STEPS = 11, hop = h => Array.from({ length: h < 2 ? STEPS : 6 }, (_, j) => {
    const p = (j + 0.5) / STEPS, a = p * Math.PI;
    D[`counting_sheep_${h}_${j}`] = lying(h ? deadpan : awake, h + (p > 0.5 ? 1 : 0), c => sheep(c, -34 + 308 * p, 172 - 110 * Math.sin(a), Math.atan(-Math.cos(a)) * 0.6, 'run'));
    return [`counting_sheep_${h}_${j}`, 2];
  });
  D.counting_sheep_lie0 = lying(awake, 0);
  D.counting_sheep_lie1 = lying(awake, 1);
  D.counting_sheep_lie2 = lying(deadpan, 2);
  D.counting_sheep_fall1 = lying(awake, 2, c => sheep(c, 124, 80, 0.1, 'drop'));
  D.counting_sheep_fall2 = lying(startled, 2, c => sheep(c, 126, 100, 0, 'drop'));
  D.counting_sheep_land = lying(startled, 3, c => sheep(c, 128, 129, 0, 'nap'), { ky: 0.82, kx: 1.05 });
  D.counting_sheep_oof = lying(startled, 3, c => sheep(c, 128, 119, 0, 'nap'));
  [0, 1].forEach(i => { D['counting_sheep_nap' + i] = lying(deadpan, 3, c => { sheep(c, 128, 119 - i, 0, 'nap'); c.strokeStyle = CREAM; c.lineWidth = 2.6; zed(c, 172, 84 - i * 4, 8); if (i) zed(c, 186, 62, 11); }); });
  const nap = [['counting_sheep_nap0', 6], ['counting_sheep_nap1', 6]];
  CLIPS.counting_sheep = { home: 'idle', seq: [...WAKE, ['T2', 4], ['counting_sheep_lie0', 6], ...hop(0), ['counting_sheep_lie1', 4], ...hop(1), ['counting_sheep_lie2', 4], ...hop(2),
    ['counting_sheep_fall1', 2], ['counting_sheep_fall2', 2], ['counting_sheep_land', 3], ['counting_sheep_oof', 7], ...nap, ...nap, ...DOZE] };
})();

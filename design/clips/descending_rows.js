// Descending rows: rows of plain shapes step down the screen at him while he fires puffs up from his cowlick, and he clears the last one just above his head.
// group: games
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', YELLOW = '#FFD23F', RED = '#FF5A4D', GREEN = '#58D68D', BLUE = '#5AB8FF', TAU = Math.PI * 2, P = 'descending_rows_';
  // each shape: x, the height it starts at, kind, colour, and the two-tick frame he fires at it on (it pops two frames later, the last one at once)
  const SHAPES = [[78, 47, 'square', RED, 0], [128, 47, 'circle', BLUE, 3], [178, 47, 'triangle', YELLOW, 6],
                  [178, 17, 'square', BLUE, 9], [78, 17, 'circle', YELLOW, 14], [128, 17, 'triangle', GREEN, 20]];
  const LAST = 20, down = f => 11 * Math.floor((f + 1) / 3), popAt = fire => fire + (fire === LAST ? 1 : 2);
  const shape = (c, x, y, kind, colour) => {
    c.fillStyle = colour; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath();
    if (kind === 'circle') c.arc(x, y, 12, 0, TAU);
    else if (kind === 'square') c.roundRect(x - 11, y - 11, 22, 22, 4);
    else { c.moveTo(x, y - 13); c.lineTo(x + 14, y + 10); c.lineTo(x - 14, y + 10); c.closePath(); }
    c.fill(); c.stroke();
  };
  // the shapes at frame f (lift: still arriving from above), with his puffs on their way up and the pops where they land
  const rows = (f, lift = 0) => (c, d) => {
    const tip = d.curl[2][1];
    c.save(); c.lineJoin = c.lineCap = 'round';
    SHAPES.forEach(([x, y0, kind, colour, fire]) => {
      const y = y0 + down(f) - lift, pop = popAt(fire);
      if (f < pop) shape(c, x, y, kind, colour);
      c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath();
      if (f === pop) for (let k = 0; k < 7; k++) { const a = k * TAU / 7 + 0.3; c.moveTo(x + Math.cos(a) * 7, y + Math.sin(a) * 7); c.lineTo(x + Math.cos(a) * 19, y + Math.sin(a) * 19); }
      else if (f >= fire && f < pop && fire !== LAST) { const py = f === fire ? tip - 11 : (tip + y) / 2; c.arc(x, py, 7, 0, TAU); c.moveTo(x + 7, py + 13); c.arc(x + 4, py + 13, 3, 0, TAU); }
      c.stroke();
    });
    c.restore();
  };
  // he slides along so his cowlick is under each shape on the frame he fires at it
  const aim = f => {
    const i = SHAPES.findIndex(s => s[4] >= f);
    if (i <= 0) return SHAPES[i < 0 ? SHAPES.length - 1 : 0][0];
    const [x0, , , , f0] = SHAPES[i - 1], [x1, , , , f1] = SHAPES[i];
    return x0 + (x1 - x0) * (f - f0) / (f1 - f0);
  };
  const seq = [...WAKE, [P + 'in1', 5], [P + 'in2', 2]];
  D[P + 'in1'] = xf(D.N, { face: FACE.lookup, extra: { front: rows(-1, 44), fxm: 'alert', fx: [150, 56] } });
  D[P + 'in2'] = xf(D.N, { k: 0.8, dx: -24, face: FACE.lookup, extra: { front: rows(-1, 22) } });
  for (let f = 0; f < 24; f++) {
    const firing = SHAPES.some(s => s[4] === f), face = firing ? FACE.puff : f > LAST ? FACE.aah : f >= 16 ? FACE.shock : FACE.lookup;
    D[P + f] = xf(D.N, { k: 0.62, dx: aim(f) - 127, ky: firing ? 0.88 : 1, face, extra: { front: rows(f) } });
    seq.push([P + f, f > LAST ? 3 : 2]);
  }
  D[P + 'out'] = xf(D.N, { k: 0.8, face: FACE.happy });
  D[P + 'won'] = xf(D.N, { face: FACE.happy, extra: { fxm: 'done' } });
  CLIPS.descending_rows = { home: 'idle', seq: [...seq, [P + 'out', 2], [P + 'won', 10], ...DOZE] };
})();

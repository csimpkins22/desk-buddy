// Sticky notes: he sticks one yellow note on his belly, then more and faster until even his eyes are covered. One peels off and he peeks out.
// group: work
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const DARK = '#17161A', YELLOW = '#FFD23F';
  const peek = dx => [['oval',140 + dx,109,5.5,6.5], ['shine',142 + dx,106,2]];
  const keen = [['oval',116,108,5.5,6.5], ['oval',140,106,5.5,6.5], ['shine',118,105,2], ['shine',142,103,2], ['stroke',[[119,122],[128,128],[137,122]],2.8]];
  const note = (c, x, y, rot) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = YELLOW; c.strokeStyle = DARK; c.lineWidth = 2; c.beginPath(); c.rect(-13, -13, 26, 26); c.fill(); c.stroke();
    c.fillStyle = '#C99A14'; c.beginPath(); c.moveTo(13, 3); c.lineTo(13, 13); c.lineTo(3, 13); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-8, -6); c.lineTo(7, -6); c.moveTo(-8, 0); c.lineTo(1, 0); c.stroke();
    c.restore();
  };
  // where each goes, in the order he sticks them: belly first, eyes and mouth last
  const SPOTS = [[104, 160, -0.1], [152, 164, 0.15], [128, 184, 0.05], [165, 128, -0.2], [96, 130, 0.2], [129, 86, -0.08], [115, 111, 0.12], [141, 108, -0.15], [128, 137, 0.1]];
  const stuck = (n, loose) => (c, d, seed) => {                  // loose: where the note over his right eye has peeled off to
    SPOTS.slice(0, n).forEach(([x, y, rot], i) => { if (!(loose && i === 7)) note(c, x, y, rot); });
    if (loose) note(c, ...loose);
  };
  const reach = ([x, y]) => x > 136 ? { arm: [[90, 142], [x - 16, y + 2]] } : { arm2: [[166, 142], [x + 16, y + 2]] };   // across himself, so the arm shows
  D.sticky_notes_0 = xf(D.N, { face: FACE.lookr, extra: { arm2: [[166, 140], [196, 124]], front: (c) => note(c, 208, 114, 0.1) } });
  SPOTS.forEach((spot, i) => {
    D['sticky_notes_' + (i + 1)] = xf(D.N, { face: i < 2 ? FACE.happy : keen, ky: i % 2 ? 1 : 0.97, extra: { ...reach(spot), front: stuck(i + 1) } });
  });
  D.sticky_notes_done = xf(D.N, { face: [], extra: { front: stuck(9) } });
  D.sticky_notes_peel1 = xf(D.N, { face: peek(0), extra: { front: stuck(9, [154, 124, 0.5]) } });
  D.sticky_notes_peel2 = xf(D.N, { face: peek(0), extra: { front: stuck(9, [180, 162, 1.1]) } });
  [-3, 3, 0].forEach((dx, i) => { D['sticky_notes_peek' + i] = xf(D.N, { face: peek(dx), extra: { front: stuck(9, [204, 189, 1.5]) } }); });
  D.sticky_notes_blink = xf(D.N, { face: [['stroke',[[134,108],[146,108]],2.8]], extra: { front: stuck(9, [204, 189, 1.5]) } });
  const n = s => 'sticky_notes_' + s, held = [8, 6, 5, 4, 3, 3, 3, 3, 3];
  CLIPS.sticky_notes = { home: 'idle', seq: [...WAKE, [n(0), 10], ...held.map((t, i) => [n(i + 1), t]), [n('done'), 12], [n('peel1'), 2], [n('peel2'), 2],
    [n('peek2'), 6], [n('peek0'), 6], [n('peek1'), 6], [n('blink'), 3], [n('peek2'), 10], ...DOZE] };
})();

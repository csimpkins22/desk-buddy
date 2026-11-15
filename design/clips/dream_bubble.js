// Dream bubble: asleep, he dreams of a smaller himself, who is dreaming of a smaller one still. The smallest wakes, and the bubbles pop all the way back up to him.
(() => {
  const { D, CLIPS, xf, WAKE, DOZE, boil, openPath, closedPath, tint } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A';
  const awake = [['dot',174,165,4.2], ['dot',187,181,3]];
  const blink = [['stroke',[[167,165],[181,165]],2.8], ['dot',187,181,3]];
  // a sleeping him, k times life size, lying with his middle at x and the floor at y
  const lump = (c, x, y, k, seed, up) => {
    const at = pts => pts.map(([px, py]) => [x + (px - 124) * k, y + (py - 201) * k]);
    closedPath(c, boil(at(D.S1.body), seed, 2.2 * k)); c.fillStyle = tint(); c.fill(); c.strokeStyle = CREAM; c.lineWidth = Math.max(1.6, 4 * k); c.stroke();
    openPath(c, at(D.S1.curl)); c.lineWidth = Math.max(1.3, 3.4 * k); c.stroke();
    c.fillStyle = c.strokeStyle = DARK;
    if (up) { const [[ex, ey]] = at([[174, 165]]); c.beginPath(); c.arc(ex, ey, Math.max(1.7, 4.6 * k), 0, Math.PI * 2); c.fill(); }
    else { openPath(c, at([[168, 166], [174, 171], [181, 167]])); c.lineWidth = Math.max(1.4, 3 * k); c.stroke(); }
  };
  // n: how much of the dream has formed, from the first puff (1) to the dot in the smallest bubble (7).
  // pop: [x, y, rx, ry] of a bubble that has just burst. mini, tiny: that dreamer is awake.
  const dream = (n, { pop, mini = false, tiny = false } = {}) => (c, d, seed) => {
    const oval = (x, y, rx, ry, w) => { c.fillStyle = DARK; c.strokeStyle = CREAM; c.lineWidth = w; c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); c.fill(); c.stroke(); };
    c.save(); c.lineJoin = c.lineCap = 'round';
    if (n >= 1) oval(181, 131, 3.2, 3.2, 2.2);
    if (n >= 2) oval(173, 121, 5, 5, 2.4);
    if (n >= 3) oval(118, 62, 112, 58, 3);
    if (n >= 4) lump(c, 74, 99, 0.5, seed, mini);
    if (n >= 5) { oval(104, 64, 2, 2, 1.6); oval(109, 57, 3, 3, 1.8); }
    if (n >= 6) { oval(162, 46, 52, 30, 2.4); lump(c, 150, 63, 0.27, seed + 1, tiny); }
    if (n >= 7) { oval(170, 42, 1.5, 1.5, 1.3); oval(189, 36, 12, 11, 1.8); c.fillStyle = tint(); c.beginPath(); c.ellipse(188, 40, 6.5, 3.2, 0, 0, Math.PI * 2); c.fill(); }
    if (pop) {
      const [x, y, rx, ry] = pop; c.strokeStyle = CREAM; c.lineWidth = rx > 40 ? 2.8 : 1.8; c.beginPath();
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + 0.26, u = Math.cos(a), v = Math.sin(a), far = 1 + (i % 2) * 0.06; c.moveTo(x + u * rx * 0.78, y + v * ry * 0.78); c.lineTo(x + u * (rx * far + 3), y + v * (ry * far + 3)); }
      c.stroke();
    }
    c.restore();
  };
  for (let n = 0; n <= 7; n++) D['dream_bubble_' + n] = xf(D.S1, { extra: { front: dream(n) } });
  D.dream_bubble_deep = xf(D.S2, { extra: { front: dream(7) } });
  D.dream_bubble_pop1 = xf(D.S1, { extra: { front: dream(6, { tiny: true, pop: [189, 36, 12, 11] }) } });
  D.dream_bubble_pop2 = xf(D.S1, { extra: { front: dream(5, { mini: true, pop: [162, 46, 52, 30] }) } });
  D.dream_bubble_pop3 = xf(D.S1, { face: awake, extra: { front: dream(2, { pop: [118, 62, 112, 58] }) } });
  D.dream_bubble_up = xf(D.S1, { face: awake, ky: 1.12, extra: { fxm: 'alert', fx: [204, 116] } });
  D.dream_bubble_huh = xf(D.S1, { face: awake });
  D.dream_bubble_blink = xf(D.S1, { face: blink });
  const deep = [['dream_bubble_7', 6], ['dream_bubble_deep', 6]];
  CLIPS.dream_bubble = { home: 'idle', seq: [...WAKE, ['T2', 4], ['dream_bubble_0', 4], ['dream_bubble_1', 3], ['dream_bubble_2', 3], ['dream_bubble_3', 3], ['dream_bubble_4', 8], ['dream_bubble_5', 3], ['dream_bubble_6', 8],
    ...deep, ...deep, ['dream_bubble_pop1', 4], ['dream_bubble_pop2', 4], ['dream_bubble_pop3', 3], ['dream_bubble_up', 5], ['dream_bubble_huh', 5], ['dream_bubble_blink', 2], ['dream_bubble_huh', 5], ...DOZE] };
})();

// He breathes on the screen until a pale patch of mist covers it, draws a smiley in it with one nub, admires it, and it fades from the edges in.
// Staging: he stands on the left; the mist comes out of him onto the right of the glass; normal view; 7 seconds; slow build, long admire; walks back to rest.
(() => {
  const { D, xf, openPath } = window.__lump, kit = window.__lump.kit, k = kit.clip('fogged_glass');
  const X = -46, CX = 170, CY = 108, MIST = '#C3CEDA', LIGHT = '#DCE4EC';
  const BLOBS = [[0, 0, 40], [-34, 8, 26], [34, -6, 30], [-12, -28, 26], [18, 26, 26], [-26, 30, 20], [44, 22, 20], [26, -32, 20]].map(b => b.map(v => v * 1.2));
  const SMILE = [[151, 110], [160, 121], [170, 126], [181, 122], [190, 110]];
  const patch = (c, g) => { c.beginPath(); BLOBS.forEach(([x, y, r]) => { c.moveTo(CX + x * g + r * g, CY + y * g); c.arc(CX + x * g, CY + y * g, r * g, 0, kit.TAU); }); };
  // the mist at size g, the smiley as far as stroke s, and the arm that is drawing it
  const mist = (g, s = 0, arm) => (c, d, seed) => {
    if (g > 0.02) {
      c.save(); c.fillStyle = MIST; patch(c, g); c.fill();
      c.fillStyle = LIGHT; c.beginPath(); c.arc(CX - 8 * g, CY - 6 * g, 24 * g, 0, kit.TAU); c.fill();
      if (s) {
        patch(c, g); c.clip(); c.fillStyle = c.strokeStyle = kit.DARK; c.lineCap = c.lineJoin = 'round'; c.lineWidth = 6;
        c.beginPath(); c.arc(157, 92, 5.5, 0, kit.TAU); c.fill();
        if (s > 1) { c.beginPath(); c.arc(183, 90, 5.5, 0, kit.TAU); c.fill(); }
        if (s > 2) { openPath(c, SMILE.slice(0, s)); c.stroke(); }
      }
      c.restore();
    }
    if (arm) kit.arm(c, arm, seed + 98);
  };
  const shut = kit.faces.closed.slice(0, 2), at = (o, face, front) => xf(D.N, { dx: X, ...o, face, extra: { front } });

  kit.walk(0, X, 4, { face: kit.look(-3, 0, 'smile') }).forEach((o, i) => k.add('go' + i, 2, xf(D.N, o)));
  const G = [0, 0.16, 0.3, 0.42, 0.52, 0.64, 0.74, 0.82, 0.92, 1];
  for (let b = 0; b < 3; b++) {
    k.add('in' + b, 6, at({ ky: 1.07, kx: 0.96 }, [...shut, kit.look(0, 0, 'o')[2]], mist(G[b * 3])));
    for (let i = 1; i <= 3; i++) k.add('ex' + b + i, 2, at({ k: 1.05, ky: 0.97 }, [...shut, kit.look(0, 0, 'open')[2]], mist(G[b * 3 + i])));
  }
  k.add('see', 4, at({}, kit.look(5, -1, 'smile'), mist(1)));

  const reach = { dx: X, rot: 0.1 }, sh = kit.pt(reach, [166, 140]), busy = kit.look(5, -2, 'flat');
  const draw = (s, hand) => xf(D.N, { ...reach, face: busy, extra: { front: mist(1, s, [sh, hand]) } });
  k.add('d0', 2, draw(0, [148, 102]));
  k.add('d1', 4, draw(1, [155, 96]));
  k.add('d2', 4, draw(2, [181, 94]));
  k.add('d3', 2, draw(3, [168, 129]));
  k.add('d4', 2, draw(4, [179, 125]));
  k.add('d5', 4, draw(5, [188, 114]));
  k.add('admire', 20, at({ rot: -0.05 }, kit.faces.closed, mist(1, 5)));

  kit.steps(1, 0, 9).slice(1).filter(g => g > 0.1).forEach((g, i) => k.add('fade' + i, 2, at({}, kit.look(5, -1, i < 4 ? 'smile' : 'o'), mist(g, 5))));
  k.add('aw', 6, at({ ky: 0.97 }, kit.look(5, 0, 'flat')));
  kit.walk(X, 0, 4, { face: kit.look(0, 0, 'smile') }).forEach((o, i) => k.add('home' + i, 2, xf(D.N, o)));
  k.done();
})();

// Git push: he hops into a cannon, the fuse burns down, and it fires him off the top of the screen. He drops back in, dizzy.
// group: work
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', TAU = Math.PI * 2, TILT = -0.45, PIVOT = [196, 164];
  const local = (x, y) => [PIVOT[0] + x * Math.cos(TILT) - y * Math.sin(TILT), PIVOT[1] + x * Math.sin(TILT) + y * Math.cos(TILT)];
  const along = n => local(0, -n);                                                        // a point n up the barrel from where it pivots
  const star = (c, x, y, r, colour) => {
    c.fillStyle = colour; c.beginPath();
    for (let i = 0; i < 8; i++) { const a = i / 8 * TAU, q = i % 2 ? r * 0.3 : r; i ? c.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q) : c.moveTo(x + Math.cos(a) * q, y + Math.sin(a) * q); }
    c.closePath(); c.fill();
  };
  // fuse: 0 none, else how much is left (1 to 0). kick: recoil. bang: the muzzle flash. smoke: how far the puffs have risen.
  const cannon = ({ fuse = 0, kick = 0, bang = false, smoke = 0, twinkle = 0 } = {}) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3;
    if (fuse) {
      const from = local(28, 14), end = [from[0] - fuse * 4, from[1] - 10 - fuse * 30];
      c.lineWidth = 2.4; c.beginPath(); c.moveTo(from[0], from[1]); c.quadraticCurveTo(from[0] + 8, from[1] - 14, end[0], end[1]); c.stroke(); c.lineWidth = 3;
      star(c, end[0], end[1], 11 + (seed % 2) * 4, '#FFD23F');
    }
    c.save(); c.translate(PIVOT[0] + kick, PIVOT[1] + kick * 0.6); c.rotate(TILT);
    c.fillStyle = '#17161A'; c.beginPath(); c.moveTo(-28, -96); c.lineTo(28, -96); c.lineTo(34, 12); c.bezierCurveTo(34, 46, -34, 46, -34, 12); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#9FB0C4'; c.beginPath(); c.roundRect(-32, -102, 64, 14, 5); c.fill(); c.stroke();
    c.restore();
    const wx = 200 + kick, wy = 179;
    c.fillStyle = '#6B4A1F'; c.beginPath(); c.arc(wx, wy, 22, 0, TAU); c.fill(); c.stroke();
    c.lineWidth = 2.2; c.beginPath();
    for (let i = 0; i < 4; i++) { const a = i * Math.PI / 4 + kick * 0.1; c.moveTo(wx - Math.cos(a) * 20, wy - Math.sin(a) * 20); c.lineTo(wx + Math.cos(a) * 20, wy + Math.sin(a) * 20); }
    c.stroke();
    c.fillStyle = CREAM; c.beginPath(); c.arc(wx, wy, 4.5, 0, TAU); c.fill();
    const [mx, my] = along(102);
    if (bang) { star(c, mx, my, 46, '#FFD23F'); star(c, mx, my, 24, CREAM); }
    if (smoke) {
      c.fillStyle = '#9FB0C4'; c.globalAlpha = Math.max(0.15, 0.8 - smoke * 0.12);
      [[-12, 0, 13], [8, -10, 16], [22, 6, 11]].forEach(([x, y, r]) => { c.beginPath(); c.arc(mx + x - smoke * 3, my + y - smoke * 7, r + smoke, 0, TAU); c.fill(); });
      c.globalAlpha = 1;
    }
    if (twinkle) star(c, 118, 16, twinkle, CREAM);
    c.restore();
  };
  const peek = [['dot',116,108,4.4], ['dot',140,106,4.4]];
  // inside the barrel, feet n up from its base; the cannon is drawn over him, so only what clears the rim shows
  const loaded = (n, o, gun) => { const [x, y] = along(n); return xf(D.N, { k: 0.46, rot: TILT, dx: x - 128, dy: y - 201, shadowK: 0, face: peek, ...o, extra: { front: cannon(gun) } }); };
  const beside = (o, gun) => xf(D.N, { dx: -54, ...o, extra: { ...o.extra, front: cannon(gun) } });
  D.git_push_step = xf(D.N, { dx: -27, rot: -0.05, face: FACE.lookr });
  D.git_push_eye = beside({ face: FACE.lookr });
  D.git_push_duck = beside({ face: FACE.lookr, ky: 0.86, kx: 1.07 });
  D.git_push_leap = beside({ k: 0.8, dx: -24, dy: -84, rot: 0.2, shadowK: 0.5, face: FACE.happy });
  D.git_push_drop = xf(D.N, { k: 0.56, rot: -0.2, dx: along(120)[0] - 128, dy: along(120)[1] - 201, shadowK: 0, face: FACE.happy, extra: { front: cannon() } });
  D.git_push_in = loaded(64, {});
  D.git_push_lit = loaded(64, {}, { fuse: 1 });
  D.git_push_burn = loaded(56, {}, { fuse: 0.5 });
  D.git_push_gulp = loaded(48, {}, { fuse: 0.1 });
  D.git_push_bang = loaded(104, { ky: 1.3, kx: 0.9, face: FACE.shock }, { kick: 9, bang: true });
  D.git_push_gone = loaded(160, { ky: 1.4, kx: 0.85, face: FACE.shock }, { kick: 5, smoke: 1 });
  [2, 3.5, 5].forEach((smoke, i) => { D['git_push_puff' + i] = loaded(400, {}, { smoke, twinkle: [0, 13, 7][i] }); });
  D.git_push_fall = beside({ dy: -150, ky: 1.15, kx: 0.92, shadowK: 0.4, face: FACE.shock }, { smoke: 6 });
  D.git_push_land = beside({ ky: 0.74, kx: 1.16, face: FACE.spiral, extra: { fxm: 'alert', fx: [110, 92] } });
  D.git_push_daze0 = beside({ rot: -0.05, face: FACE.spiral, extra: { fxm: 'oops', fx: [74, 58] } });
  D.git_push_daze1 = beside({ rot: 0.05, face: FACE.spiral, extra: { fxm: 'oops', fx: [74, 58] } });
  D.git_push_back = xf(D.N, { dx: -27, rot: 0.05, face: FACE.spiral });
  const s = (id, n) => ['git_push_' + id, n];
  CLIPS.git_push = { home: 'idle', seq: [...WAKE, s('step', 3), s('eye', 8), s('duck', 3), s('leap', 3), s('drop', 2), s('in', 8), s('lit', 6), s('burn', 6), s('gulp', 6),
    s('bang', 2), s('gone', 2), s('puff0', 4), s('puff1', 4), s('puff2', 6), s('fall', 2), s('land', 5),
    s('daze0', 5), s('daze1', 5), s('daze0', 5), s('daze1', 5), s('back', 3), ...DOZE] };
})();

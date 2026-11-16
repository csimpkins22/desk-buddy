// Tuning fork: the tap sets him ringing. The hum dies away, except in his cowlick, which he has to hold still. It gets the last ting.
// group: tap
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, closedPath, tint } = window.__lump;
  const CREAM = '#FFF1DC';
  const ringing = [['dot',116,108,4.4], ['dot',140,106,4.4], ['stroke',[[118,125],[123,122],[128,125],[133,122],[138,125]],2.8]];
  const crossed = [['dot',121,104,3.8], ['dot',137,103,3.8], ['stroke',[[123,122],[128,121],[133,122]],2.6], ['stroke',[[108,95],[119,92]],2.4], ['stroke',[[139,91],[150,93]],2.4]];
  const firm = [['stroke',[[110,109],[122,110]],3], ['stroke',[[134,108],[146,107]],3], ['stroke',[[121,125],[135,124]],2.8]];
  const tap = (x, y, r) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineCap = 'round'; c.lineWidth = 3;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke();
    c.globalAlpha = 0.5; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r * 1.8, 0, Math.PI * 2); c.stroke(); c.restore();
  };
  // n rings of sound leaving both sides of (cx, cy), starting r0 out; ph 0 or 1 steps them outwards
  const waves = (n, ph, cx = 128, cy = 136, r0 = 76, gap = 13) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.6; c.lineCap = 'round';
    for (let i = 0; i < n; i++) {
      const r = r0 + (i + ph / 2) * gap; c.globalAlpha = 0.9 - i * 0.25;
      c.beginPath(); c.arc(cx, cy, r, -0.42, 0.42); c.stroke(); c.beginPath(); c.arc(cx, cy, r, Math.PI - 0.42, Math.PI + 0.42); c.stroke();
    }
    c.restore();
  };
  // where he was half a shake ago, faintly
  const ghost = off => (c, d) => { c.save(); c.globalAlpha = 0.35; c.fillStyle = tint(); c.strokeStyle = CREAM; c.lineWidth = 2.5; closedPath(c, d.body.map(([x, y]) => [x + off, y])); c.fill(); c.stroke(); c.restore(); };
  const P = 'tuning_fork_', seq = [...WAKE, [P + 'tap', 4], [P + 'ding', 2]];
  D[P + 'tap'] = xf(D.N, { face: FACE.lookr, extra: { front: tap(208, 118, 8) } });
  D[P + 'ding'] = xf(D.N, { face: FACE.shock, ky: 1.1, kx: 0.9, extra: { front: tap(208, 118, 16) } });
  for (let i = 0; i < 15; i++) {
    const a = (i % 2 ? -1 : 1) * 10 * Math.exp(-i / 7);
    D[P + 'hum' + i] = xf(D.N, { face: ringing, ky: 1.05, kx: 0.96, dx: a, extra: { back: ghost(-2 * a), front: waves(i < 6 ? 3 : i < 11 ? 2 : 1, i % 2) } });
    seq.push([P + 'hum' + i, 2]);
  }
  // only his cowlick still going: s is which way it has swung
  const twang = (s, face, o = {}) => { const d = xf(D.N, { face, extra: { front: s ? waves(2, s > 0 ? 1 : 0, 127, 58, 15, 8) : undefined, ...o } }); return { ...d, curl: d.curl.map(([x, y]) => [x + s * (71 - y) * 0.55, y]) }; };
  D[P + 'phew'] = xf(D.C1, {});
  D[P + 'still1'] = twang(1, D.C1.face); D[P + 'still2'] = twang(-1, D.C1.face);
  D[P + 'see1'] = twang(1, crossed); D[P + 'see2'] = twang(-1, crossed);
  D[P + 'hold'] = { ...twang(0, firm, { arm2: [[166, 110], [139, 62]] }), curl: [[128, 71], [123, 67], [127, 63], [134, 64], [132, 68]] };
  D[P + 'let'] = twang(0, crossed, { arm2: [[166, 118], [176, 84]] });
  D[P + 'glare'] = xf(D.N, { face: FACE.grump });
  const s = (...a) => a.map(([n, t]) => [P + n, t]);
  seq.push(...s(['phew', 8], ['still1', 2], ['still2', 2], ['still1', 2], ['still2', 2], ['see1', 2], ['see2', 2], ['see1', 2], ['see2', 2], ['see1', 2], ['see2', 2],
    ['hold', 12], ['let', 6], ['see1', 2], ['see2', 2], ['see1', 2], ['glare', 12]), ...DOZE);
  CLIPS.tuning_fork = { home: 'idle', seq };
})();

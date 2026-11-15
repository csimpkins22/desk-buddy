// Trapdoor: the tap springs a door in the floor. He hangs there a moment, drops out of sight, and comes back in from the top.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', FY = 205, L = 54, R = 202, W = 74;
  const down = [['dot',118,117,3.8], ['dot',140,116,3.8], ['stroke',[[123,130],[133,130]],2.6]];
  const uhoh = [['dot',116,108,4.4], ['dot',140,106,4.4], ['stroke',[[119,125],[123,122],[128,125],[133,122],[137,125]],2.6]];
  const blink = [['stroke',[[111,109],[121,109]],2.8], ['stroke',[[135,107],[145,107]],2.8], ['stroke',[[119,125],[123,122],[128,125],[133,122],[137,125]],2.6]];
  const tap = (x, y, r) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineCap = 'round'; c.lineWidth = 3;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke();
    c.globalAlpha = 0.5; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r * 1.8, 0, Math.PI * 2); c.stroke(); c.restore();
  };
  // the floor with its two flaps swung down by angle a (0 is shut)
  const floor = a => c => {
    c.save(); c.lineWidth = 3; c.lineCap = c.lineJoin = 'round';
    if (a) { c.fillStyle = '#17161A'; c.fillRect(L, FY, R - L, 40); }
    c.strokeStyle = c.fillStyle = CREAM; c.beginPath();
    c.moveTo(0, FY); c.lineTo(L, FY); c.lineTo(L + W * Math.cos(a), FY + W * Math.sin(a));
    c.moveTo(240, FY); c.lineTo(R, FY); c.lineTo(R - W * Math.cos(a), FY + W * Math.sin(a));
    if (!a) { c.moveTo(128, FY - 5); c.lineTo(128, FY + 5); }
    c.stroke();
    [L, R].forEach(x => { c.beginPath(); c.arc(x, FY, 4.5, 0, Math.PI * 2); c.fill(); });
    c.restore();
  };
  const P = 'trapdoor_', at = (base, a, o = {}) => xf(base, { ...o, extra: { back: floor(a), fxm: 'none', ...o.extra } });
  D[P + 'tap'] = xf(D.N, { face: FACE.lookr, extra: { front: tap(210, 150, 8) } });
  D[P + 'seam'] = at(D.N, 0, { face: down, extra: { front: tap(210, 150, 15) } });
  D[P + 'look'] = at(D.N, 0, { face: down });
  D[P + 'open1'] = at(D.N, 0.7, { face: down, shadowK: 0 });
  D[P + 'hang1'] = at(D.N, 1.35, { face: down, shadowK: 0, dy: -3 });
  D[P + 'hang2'] = at(D.N, 1.35, { face: uhoh, shadowK: 0, dy: -3 });
  D[P + 'hang3'] = at(D.N, 1.35, { face: blink, shadowK: 0, dy: -3 });
  D[P + 'fall1'] = at(D.N, 1.35, { face: FACE.shock, shadowK: 0, dy: 40, ky: 1.2, kx: 0.9 });
  D[P + 'fall2'] = at(D.N, 1.35, { face: FACE.shock, shadowK: 0, dy: 135, ky: 1.3, kx: 0.85 });
  D[P + 'gone'] = at(D.N, 1.35, { shadowK: 0, dy: 320 });
  D[P + 'shut1'] = at(D.N, 0.6, { shadowK: 0, dy: 320 });
  D[P + 'shut'] = at(D.N, 0, { shadowK: 0, dy: 320 });
  D[P + 'in1'] = at(D.N, 0, { face: FACE.shock, shadowK: 0.4, dy: -150, ky: 1.25, kx: 0.88 });
  D[P + 'in2'] = at(D.N, 0, { face: FACE.shock, shadowK: 0.7, dy: -60, ky: 1.25, kx: 0.88 });
  D[P + 'land'] = at(D.N, 0, { face: FACE.spiral, ky: 0.6, kx: 1.25 });
  D[P + 'daze1'] = at(D.N, 0, { face: FACE.spiral, rot: 0.05 });
  D[P + 'daze2'] = at(D.N, 0, { face: FACE.spiral, rot: -0.05 });
  D[P + 'wary'] = at(D.N, 0, { face: down });
  const s = (...a) => a.map(([n, t]) => [P + n, t]);
  CLIPS.trapdoor = { home: 'idle', seq: [...WAKE, ...s(['tap', 4], ['seam', 4], ['look', 6], ['open1', 2], ['hang1', 6], ['hang2', 8], ['hang3', 3], ['hang2', 5],
    ['fall1', 2], ['fall2', 2], ['gone', 5], ['shut1', 2], ['shut', 10], ['in1', 2], ['in2', 2], ['land', 4],
    ['daze1', 4], ['daze2', 4], ['daze1', 4], ['daze2', 4], ['wary', 10]), ...DOZE] };
})();

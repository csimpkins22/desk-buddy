// Heatwave: under a blazing sun he sags and melts into a puddle, then pulls himself together when it moves on.
// group: weather
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath } = window.__lump;
  const CREAM = '#FFF1DC';
  const hot = [['stroke',[[109,111],[121,108]],3], ['stroke',[[135,106],[147,109]],3], ['mouth',[[121,120],[135,119],[136,130],[128,134],[120,130]],[128,131,5,3]]];
  // drooping eyes, with the mouth kept a fixed distance below them however far he has sunk
  const sag = (ky, eyes = hot.slice(0, 2)) => { const m = 110 + 14 / ky; return [...eyes, ['stroke',[[120,m],[124,m + 3],[128,m],[132,m + 3],[136,m]],2.6]]; };
  const dots = [['dot',116,110,3.6], ['dot',140,108,3.6]];
  const sun = (x, y, shimmer = true) => (c, d, seed, tick) => {
    const turn = Math.floor(tick / 4) % 2 * 0.39;
    c.save(); c.lineCap = 'round'; c.strokeStyle = '#FFD23F'; c.lineWidth = 5; c.beginPath();
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + turn; c.moveTo(x + Math.cos(a) * 38, y + Math.sin(a) * 38); c.lineTo(x + Math.cos(a) * 50, y + Math.sin(a) * 50); }
    c.stroke();
    c.fillStyle = '#FFD23F'; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.arc(x, y, 30, 0, Math.PI * 2); c.fill(); c.stroke();
    if (shimmer) { c.globalAlpha = 0.5; c.lineWidth = 2.4; [20, 46, 220].forEach((hx, k) => { openPath(c, boil([[hx, 192], [hx + 5, 178], [hx - 5, 164], [hx + 5, 150], [hx, 136]], seed + k, 3)); c.stroke(); }); }
    c.restore();
  };
  const sweat = (c, d, seed) => {
    c.save(); c.fillStyle = '#5AB8FF'; c.strokeStyle = CREAM; c.lineWidth = 1.6; c.beginPath();
    [[96, 108], [162, 104]].forEach(([x, y]) => { c.moveTo(x, y - 8); c.quadraticCurveTo(x + 7, y + 3, x, y + 5); c.quadraticCurveTo(x - 7, y + 3, x, y - 8); });
    c.fill(); c.stroke(); c.restore();
  };
  const P = 'heatwave_', SUN = { back: sun(196, 42) };
  const pool = (face, extra) => ({ ...D.N, face, shadow: [128, 96], fx: [128, 168], ...extra,
    body: [[36,199],[80,202],[128,201],[176,202],[220,199],[226,191],[210,182],[172,177],[128,176],[84,177],[46,182],[30,191]], curl: [[128,177],[123,169],[127,163],[134,166],[131,171]] });
  const lookingUp = [['dot',118,186,3.2], ['dot',140,185,3.2], ['stroke',[[124,194],[134,194]],2.6]];
  D[P + 1] = xf(D.N, { face: FACE.lookup, extra: SUN });
  D[P + 2] = xf(D.N, { face: hot, ky: 0.96, extra: { ...SUN, front: sweat } });
  [[0.8, 1.1], [0.6, 1.22], [0.42, 1.38], [0.27, 1.5]].forEach(([ky, kx], i) => { D[P + 'melt' + i] = xf(D.N, { face: sag(ky), ky, kx, extra: SUN }); });
  D[P + 3] = pool(lookingUp, SUN);
  D[P + 4] = pool([['stroke',[[113,187],[123,187]],2.8], ['stroke',[[135,186],[145,186]],2.8], lookingUp[2]], SUN);
  D[P + 5] = pool(lookingUp, { back: sun(232, 16, false) });
  D[P + 6] = pool(lookingUp);
  D[P + 7] = xf(D.N, { face: sag(0.42, dots), ky: 0.42, kx: 1.38 });
  D[P + 8] = xf(D.N, { face: sag(0.8, dots), ky: 0.8, kx: 1.1 });
  D[P + 9] = xf(D.N, { face: FACE.shock, ky: 1.1, kx: 0.93 });
  D[P + 10] = xf(D.N, { face: FACE.ah });
  D[P + 11] = xf(D.N, { face: FACE.grump, extra: { back: sun(226, 14, false) } });
  CLIPS.heatwave = { home: 'idle', seq: [...WAKE, [P + 1, 6], [P + 2, 8], [P + 'melt0', 5], [P + 'melt1', 5], [P + 'melt2', 4], [P + 'melt3', 4], [P + 3, 12], [P + 4, 3], [P + 3, 5],
    [P + 5, 5], [P + 6, 4], [P + 7, 2], [P + 8, 2], [P + 9, 3], [P + 10, 8], [P + 11, 8], ...DOZE] };
})();

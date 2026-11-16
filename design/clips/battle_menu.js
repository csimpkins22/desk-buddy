// Battle menu: he squares up to a pebble and a menu pops up with three choices. The cursor dithers between the bop and the bottle; he picks the arrow and runs for it.
// group: games
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', YELLOW = '#FFD23F', TAU = Math.PI * 2, P = 'battle_menu_', ROWS = [-38, 0, 38];
  const eyeing = [['dot',106,113,3.8], ['dot',130,111,3.8], ['stroke',[[112,127],[118,125],[124,127]],2.6], ['stroke',[[100,103],[112,105]],2.4], ['stroke',[[126,103],[138,100]],2.4]];
  const hmm = [['dot',124,110,3.8], ['dot',148,108,3.8], ['stroke',[[128,125],[133,123],[138,125]],2.6], ['stroke',[[118,99],[130,96]],2.4]];
  const oh = [['dot',124,112,4.4], ['dot',148,110,4.4], ['mouth',[[129,122],[139,121],[140,129],[134,132],[128,129]]]];
  const sure = [['dot',122,111,3.8], ['dot',146,109,3.8], ['stroke',[[124,125],[138,124]],2.8], ['stroke',[[114,101],[127,105]],2.8], ['stroke',[[141,103],[154,98]],2.8]];
  const pebble = (c, seed) => {
    c.save(); c.fillStyle = '#9FB0C4'; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.lineJoin = 'round';
    closedPath(c, boil([[10, 198], [14, 187], [25, 183], [34, 189], [35, 198], [22, 201]], seed, 0.8)); c.fill(); c.stroke(); c.restore();
  };
  // the three choices, the cursor beside choice `at`, and a box round the last one once it is picked; k grows it in
  const menu = (at, picked, k = 1) => (c, d, seed) => {
    c.save(); c.translate(204, 122); c.scale(k, k); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = '#17161A'; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.roundRect(-32, -62, 64, 124, 8); c.fill(); c.stroke();
    c.fillStyle = '#FF5A4D'; c.lineWidth = 2; c.beginPath();
    for (let i = 0; i < 16; i++) { const a = i * TAU / 16, r = i % 2 ? 6.5 : 13; c.lineTo(10 + Math.cos(a) * r, ROWS[0] + Math.sin(a) * r); }
    c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#58D68D'; c.beginPath(); c.rect(6, -15, 8, 9); c.fill(); c.stroke(); c.beginPath(); c.arc(10, 4, 10, 0, TAU); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-10, 33); c.lineTo(-5, 33); c.moveTo(-12, 43); c.lineTo(-6, 43); c.stroke();
    c.strokeStyle = YELLOW; c.lineWidth = 5; c.beginPath(); c.moveTo(-1, 38); c.lineTo(20, 38); c.moveTo(11, 29); c.lineTo(21, 38); c.lineTo(11, 47); c.stroke();
    if (picked) { c.lineWidth = 3; c.beginPath(); c.roundRect(-28, ROWS[2] - 18, 56, 36, 6); c.stroke(); }
    if (at >= 0) { const x = -25 + seed % 2 * 2, y = ROWS[at]; c.fillStyle = CREAM; c.beginPath(); c.moveTo(x, y - 7); c.lineTo(x + 10, y); c.lineTo(x, y + 7); c.closePath(); c.fill(); }
    c.restore();
  };
  // streaks trailing behind him as he bolts, from x
  const streaks = x => (c, d, seed) => {
    pebble(c, seed); if (x === undefined) return;
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.6; c.lineCap = 'round'; c.globalAlpha = 0.7; c.beginPath();
    [[110, 34], [140, 50], [172, 28]].forEach(([y, n]) => { c.moveTo(x, y); c.lineTo(x - n, y); }); c.stroke(); c.restore();
  };
  const at = (o, front, trail) => xf(D.N, { dx: -26, ...o, extra: { back: streaks(trail), ...(front && { front }), ...o.extra } });
  const point = y => ({ arm2: [[140, 139], [165, 122 + y * 0.72]] });
  D[P + 'step'] = at({ dx: -13, face: eyeing });
  D[P + 'see'] = at({ face: eyeing });
  D[P + 'pop1'] = at({ face: eyeing }, menu(-1, false, 0.5));
  D[P + 'pop2'] = at({ face: hmm }, menu(-1, false, 0.9));
  ROWS.forEach((y, i) => { D[P + 'c' + i] = at({ face: i < 2 ? hmm : oh, extra: point(y) }, menu(i)); });
  D[P + 'pick1'] = at({ face: sure, ky: 1.03, extra: point(ROWS[2]) }, menu(2, true));
  D[P + 'pick2'] = at({ face: sure, extra: point(ROWS[2]) }, menu(-1));
  D[P + 'ready'] = at({ face: sure, rot: -0.1, ky: 0.92, kx: 1.05 });
  [10, 80, 160, 260].forEach((dx, i) => { D[P + 'run' + i] = at({ dx, rot: 0.2, kx: 1.12, ky: 0.94, face: FACE.aah }, null, dx + 50); });
  D[P + 'gone'] = at({ dx: 260 });
  D[P + 'peek'] = at({ dx: 150, rot: -0.08, face: eyeing });
  D[P + 'back1'] = at({ dx: 75, face: eyeing });
  D[P + 'back2'] = at({ dx: 0, face: FACE.sheep });
  const s = (...a) => a.map(([n, t]) => [P + n, t]);
  CLIPS.battle_menu = { home: 'idle', seq: [...WAKE, ...s(['step', 3], ['see', 7], ['pop1', 2], ['pop2', 2], ['c0', 10], ['c1', 9], ['c0', 7], ['c1', 7], ['c2', 6],
    ['pick1', 3], ['pick2', 2], ['pick1', 3], ['pick2', 2], ['pick1', 3], ['ready', 4], ['run0', 2], ['run1', 2], ['run2', 2], ['run3', 2], ['gone', 10], ['peek', 9], ['back1', 3], ['back2', 8]), ...DOZE] };
})();

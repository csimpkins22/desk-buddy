// Carrier pigeon: a pigeon flaps in and lands on his cowlick, drops him a note with a heart on it, then settles in to roost up there.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', GREY = '#9FB0C4', SLATE = '#6E8098';
  const eyes = (dx, dy, r = 3.8) => [['dot',116 + dx,110 + dy,r], ['dot',140 + dx,108 + dy,r]];
  const tracking = [...eyes(7, -5), ['stroke',[[125,123],[130,125],[135,123]],2.6]];
  const oof = [['stroke',[[110,106],[116,110],[122,106]],3], ['stroke',[[134,104],[140,108],[146,104]],3], ['stroke',[[122,124],[128,122],[134,124]],2.8]];
  const reading = [...eyes(-7, 1), ['stroke',[[112,123],[119,127],[126,123]],2.8]];
  const resigned = [...eyes(2, -6, 3.4), ['stroke',[[122,124],[134,123]],2.8]];
  const tri = (c, pts) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); c.stroke(); };
  const paper = (c, x, y, rot, k) => {                          // k = 1 in the beak; bigger once he's holding it, when the heart shows
    c.save(); c.translate(x, y); c.rotate(rot); c.lineJoin = 'round';
    c.fillStyle = CREAM; c.strokeStyle = DARK; c.lineWidth = 2; c.beginPath(); c.roundRect(-8 * k, -6 * k, 16 * k, 12 * k, 2); c.fill(); c.stroke();
    if (k > 1) { c.fillStyle = '#FF5A4D'; c.beginPath(); c.moveTo(0, 7); c.bezierCurveTo(-15, -4, -5, -12, 0, -5); c.bezierCurveTo(5, -12, 15, -4, 0, 7); c.fill(); }
    c.restore();
  };
  // wing: 'up', 'down' or 'fold'. He faces left, the way he flew in.
  const bird = (c, x, y, { wing = 'fold', note, tilt = 0, roost } = {}) => {
    c.save(); c.translate(x, y); c.rotate(tilt); c.scale(1.3, 1.3); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.2;
    if (!roost && wing === 'fold') { c.beginPath(); c.moveTo(-4, 11); c.lineTo(-4, 20); c.moveTo(6, 11); c.lineTo(6, 20); c.stroke(); }
    c.fillStyle = SLATE; tri(c, [[13, -3], [32, -8], [30, 6], [12, 6]]);
    c.fillStyle = GREY; c.beginPath(); c.ellipse(0, 0, 19, 13, 0, 0, Math.PI * 2); c.fill(); c.stroke();
    c.beginPath(); c.arc(-15, -13, 9.5, 0, Math.PI * 2); c.fill(); c.stroke();
    c.fillStyle = '#FFD23F'; c.lineWidth = 1.6; tri(c, [[-23, -16], [-33, -12], [-23, -9]]); c.lineWidth = 2.2;
    if (roost) { c.strokeStyle = DARK; c.lineWidth = 2; c.beginPath(); c.moveTo(-20, -14); c.lineTo(-14, -14); c.stroke(); c.strokeStyle = CREAM; c.lineWidth = 2.2; }
    else { c.fillStyle = DARK; c.beginPath(); c.arc(-17, -15, 2, 0, Math.PI * 2); c.fill(); }
    c.fillStyle = SLATE;
    if (wing === 'up') tri(c, [[-6, -5], [8, -32], [15, -4]]);
    else if (wing === 'down') tri(c, [[-6, -1], [8, 24], [15, 0]]);
    else { c.beginPath(); c.ellipse(4, 1, 12, 7, 0.2, 0, Math.PI * 2); c.fill(); c.stroke(); }
    if (note) paper(c, -36, -6, 0.2, 1);
    c.restore();
  };
  const PERCH = [132, 36];
  const flyIn = (c, d, seed, tick) => {                         // in from the right and up onto his head in 20 ticks, flapping on twos
    const t = Math.min(20, Math.floor((tick - 29) / 2) * 2), p = t / 20, q = 1 - p;
    bird(c, PERCH[0] + 130 * q, PERCH[1] + 60 * q - 22 * Math.sin(p * Math.PI), { wing: (t / 2) % 2 ? 'down' : 'up', note: true, tilt: 0.2 * q });
  };
  const perched = (o = {}, dy = 0) => (c, d, seed) => bird(c, PERCH[0], PERCH[1] + dy, o);
  const with2 = (a, b) => (c, d, seed, tick) => { a(c, d, seed, tick); b(c, d, seed, tick); };
  const HOLD = { arm: [[92, 142], [70, 118]] };
  D.carrier_pigeon_fly = xf(D.N, { face: tracking, extra: { front: flyIn } });
  D.carrier_pigeon_land = xf(D.N, { face: oof, ky: 0.92, kx: 1.04, extra: { front: perched({ wing: 'up', note: true }, 12) } });
  D.carrier_pigeon_sit = xf(D.N, { face: FACE.lookup, extra: { front: perched({ note: true }) } });
  D.carrier_pigeon_bow = xf(D.N, { face: FACE.lookup, extra: { front: perched({ note: true, tilt: -0.4 }, 2) } });
  D.carrier_pigeon_drop1 = xf(D.N, { face: reading, extra: { arm: [[92, 142], [72, 132]], front: with2(perched(), c => paper(c, 76, 64, -0.5, 1.3)) } });
  D.carrier_pigeon_drop2 = xf(D.N, { face: reading, extra: { arm: [[92, 142], [70, 122]], front: with2(perched(), c => paper(c, 66, 96, 0.3, 1.6)) } });
  D.carrier_pigeon_read = xf(D.N, { face: reading, extra: { ...HOLD, front: with2(perched(), c => paper(c, 56, 104, -0.12, 2.2)) } });
  D.carrier_pigeon_aww = xf(D.N, { face: FACE.cute, ky: 1.02, extra: { ...HOLD, front: with2(perched(), c => paper(c, 56, 102, -0.12, 2.2)) } });
  D.carrier_pigeon_roost1 = xf(D.N, { face: resigned, extra: { front: perched({ roost: true }, 12) } });
  D.carrier_pigeon_roost2 = xf(D.N, { face: [...FACE.aahEyes, ['stroke',[[121,123],[128,126],[135,123]],2.8]], ky: 0.98, extra: { front: perched({ roost: true }, 14) } });
  const n = s => 'carrier_pigeon_' + s;
  CLIPS.carrier_pigeon = { home: 'idle', seq: [...WAKE, [n('fly'), 22], [n('land'), 3], [n('sit'), 9], [n('bow'), 5], [n('drop1'), 3], [n('drop2'), 3], [n('read'), 12], [n('aww'), 14],
    [n('roost1'), 12], [n('roost2'), 14], ...DOZE] };
})();

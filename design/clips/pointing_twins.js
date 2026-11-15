// Pointing twins: he hops out of sight, and two Lumps exactly like him stroll in from either side, see each other and point in alarm. Then he drops in between them, pointing at both.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath, inkStroke, tint } = window.__lump;
  const CREAM = '#FFF1DC', TAU = Math.PI * 2, K = 0.72, P = 'pointing_twins_', MID = -8;
  // faces for the twin on the left, looking across at the other one (the one on the right is the same drawing turned round)
  const stroll = [['dot',123,110,3.8], ['dot',147,108,3.8], ['stroke',[[127,124],[133,126.5],[139,123]],2.6]];
  const blank = [['dot',124,110,3.8], ['dot',148,108,3.8], ['stroke',[[129,125],[138,124]],2.6]];
  const jolt = [['dot',123,108,5], ['dot',148,106,5], ['mouth',[[130,121],[139,120],[140,129],[135,132],[129,129]]]];
  const alarm = (dx, dy = 0) => [['stroke',[[110 + dx,96 + dy],[123 + dx,93.5 + dy]],2.8], ['stroke',[[137 + dx,92 + dy],[150 + dx,94 + dy]],2.8], ['dot',116 + dx,108 + dy,4.8], ['dot',141 + dx,106 + dy,4.8],
    ['mouth',[[119 + dx,119],[139 + dx,118],[140 + dx,132],[129 + dx,137],[118 + dx,131]]]];
  const upward = [['dot',124,101,4.4], ['dot',147,99,4.4], ['mouth',[[131,117],[139,116.5],[140,124],[135,127],[130,124]]]];
  const sheepish = [['dot',120,111,3.6], ['dot',144,109,3.6], ['stroke',[[124,125],[129,122.5],[134,125],[139,122.5]],2.6]];
  const pt = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1), k = o.k || 1; return [128 + (u * Math.cos(r) - v * Math.sin(r)) * k + (o.dx || 0), 201 + (u * Math.sin(r) + v * Math.cos(r)) * k + (o.dy || 0)]; };
  // another Lump, drawn the way the page draws him
  const twin = (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = 'rgba(255,241,220,.10)'; c.beginPath(); c.ellipse(d.shadow[0] + 4, 203, d.shadow[1], 6, 0, 0, TAU); c.fill();
    c.save(); c.translate(4, 2.5); closedPath(c, boil(d.body, seed + 57, 2.2)); c.fillStyle = tint(); c.fill(); c.restore();
    c.strokeStyle = CREAM; closedPath(c, boil(d.body, seed + 7, 2.2)); inkStroke(c, 4);
    openPath(c, boil(d.curl, seed + 27, 1.2)); inkStroke(c, 3.4);
    c.fillStyle = c.strokeStyle = '#0B0E14';
    d.face.forEach(mk => {
      if (mk[0] === 'dot') { c.beginPath(); c.arc(mk[1], mk[2], mk[3], 0, TAU); c.fill(); }
      else if (mk[0] === 'stroke') { openPath(c, mk[1]); c.lineWidth = mk[2]; c.stroke(); }
      else { closedPath(c, mk[1]); c.fill(); }
    });
    c.restore();
  };
  const nub = (c, [x0, y0], [x1, y1], seed) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    c.save(); c.translate(x0, y0); c.rotate(Math.atan2(y1 - y0, x1 - x0));
    closedPath(c, boil([[0, -7], [len * 0.5, -7], [len, -6], [len + 6, 0], [len, 6], [len * 0.5, 7], [0, 7]], seed, 0.8));
    c.fillStyle = tint(); c.fill(); c.strokeStyle = CREAM; inkStroke(c, 3); c.restore();
  };
  // the twin on the left, stood at x. reach: where its pointing hand is, from the shoulder. bang: a "!" over its head. low: it points from lower down.
  const lefty = (x, face, o = {}, reach, bang, low = 0) => {
    const q = { k: K, dx: x - 128, ...o }, s = pt(q, [163, 146 + low]);
    return { d: xf(D.N, { ...q, face }), arm: reach && [s, [s[0] + reach[0], s[1] + reach[1]]], bang: bang && pt(q, [150, 44]) };
  };
  const mx = ([x, y]) => [240 - x, y];
  const turned = ({ d, arm, bang }) => ({ arm: arm && arm.map(mx), bang: bang && mx(bang), d: { shadow: [232 - d.shadow[0], d.shadow[1]], body: d.body.map(mx), curl: d.curl.map(mx),
    face: d.face.map(mk => mk[0] === 'dot' ? ['dot', 240 - mk[1], mk[2], mk[3]] : [mk[0], mk[1].map(mx), mk[2]]) } });
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); }, show = (name, ticks) => seq.push([P + name, ticks]);
  // one drawing: him (`me`, which may be out of sight), the twin on the left, and the same twin turned round on the right.
  // fade: how much of the pavement is there. shade: his shadow arriving before he does. thud: lines where he lands. zip: lines off the pointing hands.
  const scene = (me, left, { fade = 1, shade, thud, zip } = {}) => {
    const two = left ? [left, turned(left)] : [];
    return { ...me, back: (c, d, seed) => {
      c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2;
      c.globalAlpha = 0.35 * fade; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke();
      c.globalAlpha = 0.2 * fade; c.beginPath(); c.moveTo(0, 218); c.lineTo(240, 218); [22, 84, 150, 212].forEach(x => { c.moveTo(x, 206); c.lineTo(x - 5, 218); }); c.stroke();
      c.globalAlpha = 1;
      if (shade) { c.fillStyle = 'rgba(255,241,220,.10)'; c.beginPath(); c.ellipse(124, 203, shade, 6, 0, 0, TAU); c.fill(); }
      two.forEach(t => twin(c, t.d, seed));
      c.restore();
    }, front: (c, d, seed) => {
      c.save(); c.lineCap = c.lineJoin = 'round';
      two.forEach((t, i) => {
        if (t.arm) nub(c, t.arm[0], t.arm[1], seed + 98 + i);
        if (t.bang) { c.strokeStyle = c.fillStyle = CREAM; c.lineWidth = 4; openPath(c, boil([[t.bang[0], t.bang[1] - 14], [t.bang[0] + 1, t.bang[1] - 4], [t.bang[0] + 1.5, t.bang[1] + 2]], seed + 11 + i, 1.2)); c.stroke(); c.beginPath(); c.arc(t.bang[0] + 2, t.bang[1] + 9, 2.6, 0, TAU); c.fill(); }
        if (zip && t.arm) { const s = i ? -1 : 1, [x, y] = t.arm[1]; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); [[-8, -13, -16, -19], [-12, 12, -20, 17]].forEach(([u0, v0, u1, v1]) => { c.moveTo(x + s * u0, y + v0); c.lineTo(x + s * u1, y + v1); }); c.stroke(); }
      });
      if (thud) { c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath(); [[-62, -4, -76, -10], [-56, -16, -66, -28], [62, -4, 76, -10], [56, -16, 66, -28]].forEach(([x0, y0, x1, y1]) => { c.moveTo(120 + x0, 202 + y0); c.lineTo(120 + x1, 202 + y1); }); c.stroke(); }
      c.restore();
    } };
  };
  const AWAY = xf(D.N, { dy: -400, shadowK: 0 }), squash = ky => ({ ky, kx: 1 + (1 - ky) * 0.6 });

  // he hears something on both sides and makes himself scarce
  add('hark0', 3, scene(xf(D.N, { face: [['dot',110,110,3.8], ['dot',134,108,3.8], ['stroke',[[118,124],[123,126],[128,124]],2.6]] }), null, { fade: 0.5 }));
  add('hark1', 2, scene(xf(D.N, { face: FACE.lookr }), null));
  add('crouch', 4, scene(xf(D.A1, {}), null));
  add('hop0', 2, scene(xf(D.A2, { dy: -46 }), null));
  add('hop1', 2, scene(xf(D.A3, { dy: -150, k: 0.86, shadowK: 0.4 }), null));
  // the two of them waddle in
  [-30, -7, 16, 39, 62].forEach((x, i) => add('walk' + i, 2, scene(AWAY, lefty(x, stroll, i % 2 ? { rot: 0.08, dy: -5 } : { rot: -0.04, ...squash(0.96) }))));
  add('meet', 4, scene(AWAY, lefty(62, blank)));
  add('jolt0', 2, scene(AWAY, lefty(60, jolt, squash(0.86))));
  add('jolt1', 2, scene(AWAY, lefty(58, jolt, { ...squash(1.08), rot: -0.05 }, null, true)));
  add('wind', 2, scene(AWAY, lefty(56, alarm(6), { rot: -0.12 }, [6, -26])));
  add('point0', 2, scene(AWAY, lefty(63, alarm(7), { rot: 0.1, ...squash(1.03) }, [27, -6]), { zip: true }));
  add('point1', 2, scene(AWAY, lefty(62, alarm(7), { rot: 0.07 }, [26, -3])));
  add('point2', 2, scene(AWAY, lefty(62.6, alarm(7), { rot: 0.08, ...squash(1.02) }, [27, -5])));
  ['point1', 'point2', 'point1', 'point2'].forEach(name => show(name, 2));
  // a shadow between them: they look up
  add('up0', 2, scene(AWAY, lefty(61, upward, { rot: 0.02 }, [22, 4]), { shade: 14 }));
  add('up1', 2, scene(AWAY, lefty(59, upward, { rot: -0.05, ...squash(1.03) }, [16, 10]), { shade: 28 }));
  add('drop', 2, scene(xf(D.A3, { k: K, dx: MID, dy: -92, shadowK: 0.7 }), lefty(56, upward, { rot: -0.1 })));
  add('land', 2, scene(xf(D.A1, { k: K, dx: MID }), lefty(38, jolt, { rot: -0.22, dy: -7 }), { thud: true }));
  add('rise', 2, scene(xf(D.N, { k: K, dx: MID, ky: 1.1, kx: 0.94, face: alarm(0, -2) }), lefty(42, alarm(7), { rot: -0.12 }, [8, -24])));
  // all three pointing
  const ME = { k: K, dx: MID }, SL = pt(ME, [93, 127]), SR = pt(ME, [165, 125]);
  const trio = (jig, ky) => scene(xf(D.N, { ...ME, ky, face: alarm(0), extra: { arm: [SL, [SL[0] - 20 - jig, SL[1] - 24 + jig]], arm2: [SR, [SR[0] + 20 + jig, SR[1] - 24 + jig]] } }),
    lefty(42 - jig, alarm(7), { rot: -0.06 + jig * 0.02 }, [28 + jig, 2 - jig], false, 14));
  add('all0', 4, scene(xf(D.N, { ...ME, ky: 1.03, face: alarm(0), extra: { arm: [SL, [SL[0] - 22, SL[1] - 27]], arm2: [SR, [SR[0] + 22, SR[1] - 27]] } }), lefty(43, alarm(7), { rot: -0.03, ...squash(1.02) }, [30, 0], false, 14), { zip: true }));
  add('all1', 4, trio(0, 1)); add('all2', 4, trio(1.5, 0.985)); show('all1', 4); show('all2', 2);
  // the twins back away the way they came, and he steps forward
  [[30, 0.8, -5], [6, 0.9, -2.5], [-26, 0.96, -1]].forEach(([x, k, dx], i) => add('out' + i, 2, scene(xf(D.N, { k, dx, face: i ? FACE.happy : sheepish }), lefty(x, sheepish, i % 2 ? { rot: -0.08, dy: -4 } : { rot: 0.03 }), { fade: 1 - i * 0.3 })));
  CLIPS.pointing_twins = { home: 'idle', seq: [...seq, ...DOZE] };
})();

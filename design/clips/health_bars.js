// Health bars: his shadow stands up to face him under two bars. He bops it and both bars halve; it bops him back and both empty at once.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath, tint } = window.__lump;
  const CREAM = '#FFF1DC', GREY = '#9FB0C4', DARK = '#33363B', TAU = Math.PI * 2, P = 'health_bars_', SIDE = { k: 0.7, dx: -50 };
  const brows = [['stroke',[[112,98],[127,103]],3.2], ['stroke',[[140,101],[155,95]],3.2]];
  const ready = [['dot',122,110,5], ['dot',146,108,5], ['stroke',[[127,125],[141,124]],3.4], ...brows];
  const huh = [['dot',124,102,5], ['dot',148,100,5], ['stroke',[[130,122],[135,120],[140,122]],3]];
  const ouch = [['stroke',[[110,102],[122,109],[110,116]],4], ['stroke',[[154,100],[142,107],[154,114]],4], ['stroke',[[122,126],[127,123],[132,126],[137,123],[142,126]],3.4]];
  const dizzy = [['spiral',118,110,8], ['spiral',144,108,8], ouch[2]];
  const out = [[[112,104],[124,116]], [[124,104],[112,116]], [[138,102],[150,114]], [[150,102],[138,114]]].map(l => ['stroke', l, 3.4]).concat([ouch[2]]);
  // his shadow, standing: the same pose mirrored on the right, `rise` of the way up off the floor; faces of dots and strokes only
  const twin = (pose, rise = 1, arm) => {
    const t = xf(D.N, { ...SIDE, ...pose }), flip = ([x, y]) => [256 - x, 201 - (201 - y) * rise];
    return (c, d, seed) => {
      c.save(); c.lineJoin = c.lineCap = 'round'; c.fillStyle = DARK; c.strokeStyle = GREY; c.lineWidth = 3;
      closedPath(c, boil(t.body.map(flip), seed + 9, 2)); c.fill(); c.stroke();
      if (rise < 1) return c.restore();
      openPath(c, boil(t.curl.map(flip), seed + 4, 1)); c.stroke();
      if (arm) { c.lineWidth = 15; c.beginPath(); c.moveTo(...arm[0]); c.lineTo(...arm[1]); c.stroke(); c.strokeStyle = DARK; c.lineWidth = 9; c.stroke(); }
      c.fillStyle = c.strokeStyle = CREAM;
      t.face.forEach(mk => {
        if (mk[0] === 'dot') { c.beginPath(); c.arc(...flip([mk[1], mk[2]]), mk[3], 0, TAU); c.fill(); }
        else { c.lineWidth = mk[2]; openPath(c, mk[1].map(flip)); c.stroke(); }
      });
      c.restore();
    };
  };
  // the bars, his on the left: how full each is, and where a bop lands
  const bars = (a, b, hit) => c => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.4;
    [[26, a, tint(), 14, 0], [128, b, DARK, 226, 1]].forEach(([x, full, pip, px, right]) => {
      c.fillStyle = '#17161A'; c.beginPath(); c.roundRect(x, 10, 86, 13, 4); c.fill();
      c.fillStyle = full > 0.6 ? '#58D68D' : full > 0.3 ? '#FFD23F' : '#FF5A4D';
      if (full) { c.beginPath(); c.roundRect(right ? x + 86 * (1 - full) : x, 10, 86 * full, 13, 4); c.fill(); }
      c.beginPath(); c.roundRect(x, 10, 86, 13, 4); c.stroke();
      c.fillStyle = pip; c.beginPath(); c.arc(px, 16.5, 7, 0, TAU); c.fill(); c.stroke();
    });
    if (hit) {
      c.lineWidth = 3; c.beginPath();
      for (let k = 0; k < 7; k++) { const g = k * TAU / 7 + 0.2; c.moveTo(hit[0] + Math.cos(g) * 9, hit[1] + Math.sin(g) * 9); c.lineTo(hit[0] + Math.cos(g) * 18, hit[1] + Math.sin(g) * 18); }
      c.stroke();
    }
    c.restore();
  };
  const seq = [...WAKE];
  // one moment of the bout: his pose, the shadow's pose, how full the bars are, and anything else
  const put = (name, ticks, mine, its, full, extra = {}, rise = 1) => {
    D[P + name] = xf(D.N, { ...SIDE, shadowK: 0, ...mine, extra: { back: twin(its, rise, extra.arm3), ...(full !== undefined && { front: bars(full, full, extra.hit) }), ...extra } });
    seq.push([P + name, ticks]);
  };
  const flat = { ky: 0.45, kx: 1.3 };
  put('in1', 3, { k: 0.85, dx: -25, face: FACE.lookr }, {}, undefined, {}, 0.06);
  put('in2', 2, { face: huh }, {}, undefined, {}, 0.5);
  put('up', 5, { face: huh }, { face: ready }, 1);
  for (let i = 0; i < 2; i++) { put('sq1' + i, 3, { face: ready, rot: 0.04 }, { face: ready, rot: 0.04 }, 1); put('sq2' + i, 3, { face: ready, dy: -6 }, { face: ready, dy: -6 }, 1); }
  put('wind', 3, { face: ready, rot: -0.15 }, { face: ready }, 1);
  put('bop', 5, { face: ready, rot: 0.14, dx: -42 }, { face: ouch, rot: -0.2 }, 1, { arm2: [[118, 156], [152, 140]], hit: [166, 136] });
  put('half', 2, { face: ready }, { face: ouch, rot: -0.08 }, 0.5);
  put('huh', 9, { face: huh }, { face: huh }, 0.5);
  put('twind', 3, { face: huh }, { face: ready, rot: -0.15 }, 0.5);
  put('tbop', 5, { face: ouch, rot: -0.2 }, { face: ready, rot: 0.14, dx: -42 }, 0.5, { arm3: [[138, 156], [104, 140]], hit: [90, 136] });
  put('drain', 2, { face: ouch, rot: -0.08 }, { face: ready }, 0.2);
  put('ko1', 3, { face: dizzy, rot: 0.06 }, { face: out, rot: 0.06 }, 0);
  put('ko2', 3, { face: dizzy, rot: -0.08 }, { face: out, rot: -0.08 }, 0);
  for (let i = 0; i < 2; i++) { put('ko3' + i, 4, { face: dizzy, ...flat }, { face: out, ...flat }, 0); put('ko4' + i, 4, { face: dizzy, ...flat, kx: 1.34 }, { face: out, ...flat, kx: 1.34 }, 0); }
  put('melt', 2, { face: dizzy, ...flat }, flat, undefined, {}, 0.25);
  D[P + 'back'] = xf(D.N, { k: 0.85, dx: -25, ky: 0.85, face: FACE.spiral });
  D[P + 'd1'] = xf(D.N, { rot: 0.05, face: FACE.spiral }); D[P + 'd2'] = xf(D.N, { rot: -0.05, face: FACE.spiral });
  seq.push([P + 'back', 2], [P + 'd1', 4], [P + 'd2', 4], [P + 'd1', 4], ...DOZE);
  CLIPS.health_bars = { home: 'idle', seq };
})();

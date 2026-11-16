// Pocket universe: he plucks a sun from his cowlick, becomes its planet, then puts it back.
// group: nonsense
// Staging: centre -> a full-screen orbit -> centre; everything comes out of his hair.
// View: normal, then his body shrinks into a celestial silhouette; the camera stays still.
// Rhythm: curious tug, sudden weightlessness, one tumbling revolution, embarrassed recovery.
// Ending: the universe folds into his cowlick; a last little twinkle, then ordinary sleep.
(() => {
  const { D, xf, FACE, kit, boil, openPath } = window.__lump;
  const { CREAM, YELLOW, BLUE, GREEN, GREY, TAU } = kit;
  const k = kit.clip('pocket_universe');
  const mix = (a, b, t) => a + (b - a) * t;
  const tinyFace = [['dot', 115, 108, 5], ['dot', 141, 106, 5],
    ['stroke', [[122, 126], [134, 126]], 3.5]];
  const bald = { ...D.N, curl: D.N.curl.map(() => [...D.N.curl[0]]) };

  // One continuous sun, with a hand-drawn curl inside it to explain where it came from.
  const sun = (c, x, y, r, seed, turn = 0) => {
    if (r <= 0) return;
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.8;
    c.fillStyle = YELLOW;
    c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.stroke();
    for (let j = 0; j < 8; j++) {
      const a = j * TAU / 8 + turn;
      c.beginPath(); c.moveTo(x + Math.cos(a) * (r + 5), y + Math.sin(a) * (r + 5));
      c.lineTo(x + Math.cos(a) * (r + 10), y + Math.sin(a) * (r + 10)); c.stroke();
    }
    c.strokeStyle = '#6B4A1F'; c.lineWidth = 2.4;
    openPath(c, boil([[x - r * .4, y + r * .35], [x - r * .5, y - r * .25],
      [x, y - r * .5], [x + r * .4, y - r * .1], [x + r * .1, y + r * .2]], seed, .5)); c.stroke();
    c.restore();
  };
  const cosmos = (x, y, r, spread = 0, angle = 0) => (c, d, seed) => {
    c.save(); c.lineCap = 'round';
    if (spread > 0) {
      c.strokeStyle = '#414B58'; c.lineWidth = 2.4;
      c.beginPath(); c.ellipse(x, y, 76 * spread, 61 * spread, 0, 0, TAU); c.stroke();
      [[BLUE, 0, 43, 31, 8], [GREEN, Math.PI, 57, 42, 6]].forEach(([colour, phase, rx, ry, size]) => {
        const a = -angle * 1.4 + phase;
        c.fillStyle = colour; c.strokeStyle = CREAM; c.lineWidth = 2.4;
        c.beginPath(); c.arc(x + Math.cos(a) * rx * spread, y + Math.sin(a) * ry * spread,
          size * spread, 0, TAU); c.fill(); c.stroke();
      });
      [[30, 38], [201, 42], [28, 174], [203, 193]].forEach(([sx, sy], j) =>
        kit.sparkle(c, sx, sy, (j % 2 ? 6 : 4) * spread, GREY));
    }
    sun(c, x, y, r, seed, angle * .25); c.restore();
  };
  const pose = (o = {}, extra = {}, base = bald) => xf(base, { ...o, extra: { fxm: 'none', ...extra } });

  k.add('notice', 10, pose({ face: kit.look(0, -7, 'o') }, {}, D.N));
  kit.steps(0, 1, 4).forEach((t, i) => k.add('reach' + i, 2,
    pose({ face: kit.look(0, -7, 'flat') }, { arm2: [[166, 140], [mix(182, 132, t), mix(133, 58, t)]] }, D.N)));
  k.add('tug', 8, pose({ ky: .95, kx: 1.04, face: kit.faces.closed },
    { arm2: [[166, 143], [132, 54]], curl: [[128, 78], [121, 64], [125, 46], [134, 47], [132, 54]] }));
  kit.steps(0, 1, 5).forEach((t, i) => k.add('pluck' + i, 2,
    pose({ face: FACE.shock }, { arm2: [[166, 140], [mix(132, 177, t), mix(54, 61, t)]],
      front: cosmos(mix(132, 177, t), mix(54, 61, t), mix(2, 12, t)) })));
  k.add('discovery', 12, pose({ face: kit.look(7, -7, 'open') },
    { arm2: [[166, 140], [177, 76]], front: cosmos(177, 61, 12) }));

  // The sun drifts to centre as gravity lifts him. Tiny expressions are deliberately simple.
  kit.steps(0, 1, 9).forEach((t, i) => {
    const o = { k: mix(1, .43, t), ox: 128, oy: 135, dx: -8 * t, dy: 38 * t,
      rot: -.22 * Math.sin(t * Math.PI), shadowK: 1 - t, face: t < .6 ? FACE.shock : tinyFace };
    k.add('lift' + i, 2, pose(o, {
      arm: [kit.pt(o, [90, 140]), kit.pt(o, [65, 117])],
      arm2: [kit.pt(o, [166, 140]), kit.pt(o, [188, 116])],
      back: cosmos(mix(177, 120, t), mix(61, 112, t), mix(12, 19, t), t, 0),
    }));
  });
  // A full revolution; no face acting is needed to read the flailing satellite silhouette.
  for (let i = 1; i <= 36; i++) {
    const a = i / 36 * TAU, o = { k: .43, ox: 128, oy: 135, dx: -8 - 76 * Math.sin(a),
      dy: -23 + 61 * Math.cos(a), rot: -a, shadowK: 0, face: tinyFace };
    k.add('orbit' + i, 2, pose(o, {
      arm: [kit.pt(o, [90, 140]), kit.pt(o, [58, 111])],
      arm2: [kit.pt(o, [166, 140]), kit.pt(o, [198, 113])],
      back: cosmos(120, 112, 19, 1, a),
    }));
  }

  // He reels the whole thing back in, with the sun always visible above his right hand.
  kit.steps(0, 1, 9).forEach((t, i) => {
    const o = { k: mix(.43, 1, t), ox: 128, oy: 135, dx: -8 * (1 - t), dy: 38 * (1 - t),
      shadowK: t, face: t < .45 ? tinyFace : FACE.grump };
    const x = mix(120, 177, t), y = mix(112, 61, t);
    k.add('catch' + i, 2, pose(o, { arm2: [kit.pt(o, [166, 140]), [x, y + 15]],
      back: cosmos(x, y, mix(19, 12, t), 1 - t, TAU),
      front: (c, d, seed) => sun(c, x, y, mix(19, 12, t), seed, TAU * .25) }));
  });
  k.add('enough', 14, pose({ face: FACE.grump },
    { arm2: [[166, 140], [177, 76]], front: cosmos(177, 61, 12) }));
  kit.steps(0, 1, 6).forEach((t, i) => k.add('put_back' + i, 2,
    pose({ face: kit.faces.closed }, { arm2: [[166, 140], [mix(177, 131, t), mix(76, 61, t)]],
      front: t < 1 ? cosmos(mix(177, 129, t), mix(61, 58, t), 12 * (1 - t)) : undefined,
      curl: D.N.curl.map(([x, y]) => [mix(128, x, t), mix(71, y, t)]) })));
  kit.steps(0, 1, 4).forEach((t, i) => k.add('lower' + i, 2,
    pose({ face: FACE.sheep }, { arm2: [[166, 140], [mix(131, 174, t), mix(61, 145, t)]] }, D.N)));
  k.add('innocent', 14, pose({ face: FACE.sheep }, {}, D.N));
  [4, 9, 4].forEach((s, i) => k.add('twinkle' + i, 2, pose({ face: kit.look(0, -6, 'flat') },
    { front: c => kit.sparkle(c, 129, 55, s, YELLOW) }, D.N)));
  k.add('settle', 8, pose({ face: kit.faces.closed }, {}, D.N));
  k.done();
})();

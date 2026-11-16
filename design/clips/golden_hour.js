// Golden hour: the low sun turns everything amber. He squints, puts on sunglasses and strikes a couple of poses.
// group: clock
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  const lookl = [['dot',110,110,3.8], ['dot',134,108,3.8], ['stroke',[[118,124],[123,126],[128,124]],2.6]];
  const squint = [...FACE.chooEyes, ['stroke',[[120,126],[124,124],[128,126],[132,124],[136,126]],2.6]];
  const smirk = [['stroke',[[121,125],[129,128],[138,122]],2.8]];
  const grin = [FACE.happy[2]];
  // a: how far the light has come up, 0 to 1. The sun sits on the floor line to his left; his shadow runs long to the right.
  const light = a => (c, d, seed) => {
    c.save();
    c.fillStyle = '#FF9A2E'; c.globalAlpha = 0.24 * a; c.fillRect(0, 0, 240, 201);
    c.globalAlpha = 0.4 * a; c.fillRect(0, 201, 240, 39);
    c.fillStyle = '#000000'; c.globalAlpha = 0.5 * a; c.beginPath(); c.ellipse(196, 207, 62, 5, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.rect(0, 0, 240, 201); c.clip();
    c.fillStyle = '#FFD23F'; c.globalAlpha = a; c.beginPath(); c.arc(34, 201, 38, 0, Math.PI * 2); c.fill();
    c.restore();
  };
  // rot: his lean, so they stay on his face. at: held out in his hand instead. glint: size of the flash off one lens.
  const shades = ({ rot = 0, at, glint = 0 } = {}) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.fillStyle = '#17161A'; c.lineWidth = 2.6;
    if (at) c.translate(at[0] - 128, at[1] - 107); else { c.translate(128, 201); c.rotate(rot); c.translate(-128, -201); }
    c.beginPath(); c.moveTo(126, 107); c.lineTo(131, 106);
    if (!at) { c.moveTo(91, 105); c.lineTo(102, 107); c.moveTo(155, 105); c.lineTo(174, 102); }
    c.stroke();
    c.beginPath(); c.roundRect(102, 99, 24, 17, 6); c.fill(); c.stroke(); c.beginPath(); c.roundRect(131, 97, 24, 17, 6); c.fill(); c.stroke();
    c.globalAlpha = 0.7; c.lineWidth = 2; c.beginPath(); c.moveTo(108, 111); c.lineTo(114, 103); c.moveTo(137, 109); c.lineTo(143, 101); c.stroke();
    if (glint) {
      const x = 153, y = 98, s = glint; c.globalAlpha = 1; c.fillStyle = CREAM;
      c.beginPath(); [[0, -1], [0.2, -0.2], [1, 0], [0.2, 0.2], [0, 1], [-0.2, 0.2], [-1, 0], [-0.2, -0.2]].forEach(([u, v], i) => i ? c.lineTo(x + u * s, y + v * s) : c.moveTo(x + u * s, y + v * s)); c.closePath(); c.fill();
    }
    c.restore();
  };
  D.golden_hour_1 = xf(D.N, { extra: { back: light(0.35) } });
  D.golden_hour_2 = xf(D.N, { face: lookl, extra: { back: light(0.7) } });
  D.golden_hour_3 = xf(D.N, { face: lookl, extra: { back: light(1) } });
  D.golden_hour_4 = xf(D.N, { face: squint, rot: 0.05, extra: { back: light(1) } });
  D.golden_hour_5 = xf(D.N, { face: squint, extra: { back: light(1), arm2: [[166, 140], [196, 126]], front: shades({ at: [206, 118] }) } });
  D.golden_hour_6 = xf(D.N, { face: smirk, extra: { back: light(1), arm2: [[166, 134], [174, 116]], front: shades() } });
  D.golden_hour_7 = xf(D.N, { face: smirk, extra: { back: light(1), front: shades() } });
  [10, 5].forEach((glint, i) => {
    D['golden_hour_' + (8 + i)] = xf(D.N, { face: smirk, rot: -0.1, extra: { back: light(1), arm2: [[160, 137], [198, 112]], front: shades({ rot: -0.1, glint }) } });
    D['golden_hour_' + (10 + i)] = xf(D.N, { face: grin, rot: 0.1, extra: { back: light(1), arm: [[96, 137], [62, 110]], front: shades({ rot: 0.1, glint }) } });
  });
  D.golden_hour_12 = xf(D.N, { face: smirk, extra: { back: light(0.5), front: shades() } });
  D.golden_hour_13 = xf(D.N, { face: D.C1.face, extra: { back: light(0.2) } });
  const pose = n => [['golden_hour_' + n, 4], ['golden_hour_' + (n + 1), 3], ['golden_hour_' + n, 4]];
  CLIPS.golden_hour = { home: 'idle', seq: [...WAKE, ['golden_hour_1', 3], ['golden_hour_2', 3], ['golden_hour_3', 8], ['golden_hour_4', 9], ['golden_hour_5', 7], ['golden_hour_6', 3], ['golden_hour_7', 6],
    ...pose(8), ...pose(10), ...pose(8), ['golden_hour_12', 4], ['golden_hour_13', 4], ...DOZE] };
})();

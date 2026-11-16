// Deal with it: the sun comes out and he squints. A pair of sunglasses comes down from the top a step at a time, settles on his face with a glint, and he allows himself the faintest smirk.
// group: memes
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', SLATE = '#3A4656', YELLOW = '#FFD23F', TAU = Math.PI * 2, P = 'deal_with_it_', SUN = [45, 46], ON = 108;
  const mouth = ['stroke',[[122,125],[134,124]],2.8];
  const squint = [...FACE.chooEyes, ['stroke',[[120,126],[124,124],[128,126],[132,124],[136,126]],2.6]];
  const lookl = [['dot',110,108,3.8], ['dot',134,106,3.8], ['stroke',[[118,124],[123,126],[128,124]],2.6]];
  const eyes = (dx, dy, r = 3.8) => [['dot',116 + dx,110 + dy,r], ['dot',140 - dx,108 + dy,r], mouth];
  const smirk = [['stroke',[[121,125],[129,127.5],[137,122.5]],2.8], ['stroke',[[140,119],[142,123]],2]];
  // a: how far the sun has come out, 0 to 1
  const sky = a => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.strokeStyle = CREAM; c.globalAlpha = 0.35 * a; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke();
    c.fillStyle = YELLOW; c.globalAlpha = 0.11 * a; [27, 40].forEach(r => { c.beginPath(); c.arc(...SUN, r, 0, TAU); c.fill(); });
    c.globalAlpha = a; c.strokeStyle = YELLOW; c.lineWidth = 3; c.beginPath();
    for (let i = 0; i < 8; i++) { const t = i / 8 * TAU + 0.2, r = (i + seed) % 2 ? 33 : 28; c.moveTo(SUN[0] + Math.cos(t) * 22, SUN[1] + Math.sin(t) * 22); c.lineTo(SUN[0] + Math.cos(t) * r, SUN[1] + Math.sin(t) * r); }
    c.stroke();
    closedPath(c, boil(Array.from({ length: 10 }, (_, i) => [SUN[0] + Math.cos(i / 10 * TAU) * 15, SUN[1] + Math.sin(i / 10 * TAU) * 15]), seed + 3, 1.2)); c.fill();
    c.strokeStyle = CREAM; c.lineWidth = 2.4; c.stroke();
    c.restore();
  };
  const LENS = [[-12, -8.5], [0, -9.5], [13.5, -9], [14, -1], [10, 7], [1, 10], [-8, 8], [-12.5, 0]];
  // the sunglasses with their bridge at (128.5, y), leaning with him by lean. worn: the arms end at the sides of his head. glint: the size of the flash off one lens.
  const shades = (y, { lean = 0, tip = -0.04, worn, glint = 0 } = {}) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM;
    c.translate(128, 201); c.rotate(lean); c.translate(0.5 + (seed % 3 - 1) * 0.4, y - 201); c.rotate(tip);
    c.lineWidth = 2.8; c.beginPath(); c.moveTo(-28, -6); c.lineTo(-39, -7.5); if (!worn) c.lineTo(-42, -1); c.moveTo(28, -6); c.lineTo(43, -9); if (!worn) c.lineTo(46.5, -2.5); c.stroke();
    c.lineWidth = 3; c.beginPath(); c.moveTo(-4, -3); c.quadraticCurveTo(0, -8, 4, -3); c.stroke();
    [-1, 1].forEach(s => {
      const lx = s * 15.5;
      closedPath(c, boil(LENS.map(([u, v]) => [lx + u * s, v]), seed + 4 + s, 0.8)); c.fillStyle = DARK; c.fill(); c.lineWidth = 2.6; c.stroke();
      closedPath(c, [[lx - 8, 3], [lx, 5], [lx + 8, 3], [lx + 6, 6.6], [lx, 7.6], [lx - 6, 6.6]]); c.fillStyle = SLATE; c.fill();
      c.globalAlpha = 0.8; c.lineWidth = 2; c.beginPath(); c.moveTo(lx - 8, -0.5); c.lineTo(lx - 3, -6); c.moveTo(lx - 3.5, 0.5); c.lineTo(lx + 0.5, -4); c.stroke(); c.globalAlpha = 1;
      c.fillStyle = CREAM; c.beginPath(); c.arc(s * 26.5, -6.5, 1.2, 0, TAU); c.fill();
    });
    if (glint) {
      c.fillStyle = CREAM; c.beginPath();
      [[0, -1], [0.18, -0.18], [1, 0], [0.18, 0.18], [0, 1], [-0.18, 0.18], [-1, 0], [-0.18, -0.18]].forEach(([u, v], i) => i ? c.lineTo(23 + u * glint, -5 + v * glint) : c.moveTo(23 + u * glint, -5 + v * glint));
      c.closePath(); c.fill();
    }
    c.restore();
  };
  const seq = [...WAKE], add = (name, ticks, o, a = 1, front) => { D[P + name] = xf(D.N, { ...o, extra: { ...o.extra, back: sky(a), ...(front && { front }) } }); seq.push([P + name, ticks]); };
  const SHIELD = { arm: [[91, 131], [77, 105]] }, squash = ky => ({ ky, kx: 1 + (1 - ky) * 0.6 });

  add('dawn0', 3, {}, 0.35);
  add('dawn1', 2, { face: lookl }, 0.7);
  add('glare', 4, { face: squint, rot: 0.05, ...squash(0.94) });
  add('shield', 8, { face: squint, rot: 0.04, extra: SHIELD });
  // ten small steps down; he stops squinting to watch them come
  const WATCH = [null, null, { face: eyes(1, -5), extra: { arm: [[90, 136], [72, 122]] } }, { face: eyes(1.5, -7, 4.2) }, { face: eyes(1.5, -7, 4.2) }, { face: eyes(2, -6.5, 4.2) },
    { face: eyes(2.5, -6, 4.2) }, { face: eyes(3, -5, 4.2) }, { face: eyes(3.5, -4) }, { face: eyes(1, 2.5, 3.4) }];
  WATCH.forEach((o, i) => add('down' + i, 4, o || { face: squint, rot: 0.04, extra: SHIELD }, 1, shades(ON - 14 - (9 - i) * 10.4)));
  const WORN = { worn: true, tip: -0.083 };
  add('land', 2, { face: [mouth], ...squash(0.955) }, 1, shades(ON + 4, WORN));
  add('bounce', 2, { face: [mouth], ...squash(1.02) }, 1, shades(ON - 3, WORN));
  add('on', 4, { face: [mouth] }, 1, shades(ON, WORN));
  [6, 14, 8].forEach((glint, i) => add('glint' + i, 2, { face: [mouth] }, 1, shades(ON, { ...WORN, glint })));
  add('beat', 4, { face: [mouth] }, 1, shades(ON, WORN));
  add('smirk0', 2, { face: [['stroke',[[122,125],[129,126],[135,124]],2.8]], rot: -0.02 }, 1, shades(ON, { ...WORN, lean: -0.02 }));
  add('smirk', 18, { face: smirk, rot: -0.05 }, 1, shades(ON, { ...WORN, lean: -0.05 }));
  // and up they go again
  add('up0', 2, { face: eyes(1, -3), ...squash(1.02) }, 1, shades(90));
  add('up1', 2, { face: eyes(1.5, -7) }, 0.7, shades(58));
  add('up2', 2, { face: eyes(1.5, -7) }, 0.4, shades(12));
  add('up3', 2, { face: FACE.happy }, 0.15, shades(-34));
  CLIPS.deal_with_it = { home: 'idle', seq: [...seq, ...DOZE] };
})();

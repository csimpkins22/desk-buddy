// In the dark there are only his eyes, close up. A bulb clicks on above him and the view pulls back on the whole lit room; he is delighted; it goes out, and it is eyes in the dark again.
(() => {
  const { D, xf, FACE } = window.__lump, kit = window.__lump.kit, { CREAM, YELLOW, GREY, TAU } = kit;
  const k = kit.clip('lightbulb_idea');
  const lerp = (a, b, t) => a + (b - a) * t, WALL = '#2A3442', FAR = 0.85, NEAR = 2.2;
  const cam = z => kit.view(z, [128, 110], [120, lerp(112, 125, (NEAR - z) / (NEAR - FAR))]);
  // darkness with a round hole at (x, y): one outline that runs in to the hole and back, so no fill rule is needed
  const dark = (x, y, r) => c => {
    c.save(); c.fillStyle = '#000000'; c.beginPath(); c.moveTo(-600, y); c.lineTo(-600, -600); c.lineTo(900, -600); c.lineTo(900, 900); c.lineTo(-600, 900); c.lineTo(-600, y);
    c.lineTo(x - r, y); c.arc(x, y, r, Math.PI, -Math.PI, true); c.closePath(); c.fill(); c.restore();
  };
  // his eyes alone in the dark: s 0 is far off, 1 is close up; gaze is [-1..1, -1..1]; lid 0 open, 0.5 heavy, 1 shut
  const eyes = (s, gaze = [0, 0], lid = 0) => kit.gone({ front: c => {
    const rx = lerp(6, 13, s), ry = lerp(7.5, 16, s) * (1 - lid * 0.55);
    c.save(); c.lineCap = 'round';
    [[lerp(110, 94, s), lerp(125, 112, s)], [lerp(130, 146, s), lerp(123, 108, s)]].forEach(([x, y]) => {
      if (lid >= 1) { c.strokeStyle = CREAM; c.lineWidth = lerp(3, 4.5, s); c.beginPath(); c.moveTo(x - rx, y); c.quadraticCurveTo(x, y + ry * 0.9, x + rx, y); c.stroke(); return; }
      c.fillStyle = CREAM; c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, TAU); c.fill();
      c.fillStyle = '#000000'; c.beginPath(); c.arc(x + gaze[0] * rx * 0.42, y + gaze[1] * ry * 0.42, rx * 0.46, 0, TAU); c.fill();
    });
    c.restore();
  } });
  const bulb = (c, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3;
    c.beginPath(); c.moveTo(128, -90); c.lineTo(128, -6); c.stroke();
    c.fillStyle = GREY; c.beginPath(); c.rect(121, -6, 14, 11); c.fill(); c.stroke();
    c.fillStyle = YELLOW; c.beginPath(); c.arc(128, 20, 15, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = YELLOW; c.lineWidth = 3.5;
    [-0.25, 0.3, 0.85, 2.29, 2.84, 3.39].forEach((a, i) => { const r0 = 23 + (seed + i) % 2 * 2, r1 = r0 + 11; c.beginPath(); c.moveTo(128 + Math.cos(a) * r0, 20 + Math.sin(a) * r0); c.lineTo(128 + Math.cos(a) * r1, 20 + Math.sin(a) * r1); c.stroke(); });
    c.restore();
  };
  const room = (c, d, seed) => {
    c.save(); c.fillStyle = WALL; c.fillRect(-90, -90, 440, 280); c.restore();
    kit.room(c, { wall: WALL, picture: [48, 92] }); kit.table(c, 212, seed); kit.mug(c, 212, 159, { seed });
    bulb(c, seed);
  };
  const lit = (z, o, face, arms) => xf(D.N, { ...o, face, extra: { view: cam(z), back: room, ...(arms ? { arm: [[90, 140 + (o.dy || 0)], [68, 96 + (o.dy || 0)]], arm2: [[166, 140 + (o.dy || 0)], [190, 94 + (o.dy || 0)]] } : {}) } });
  const close = z => kit.zoom(z, [128, 110], [120, 112]);

  k.add('i0', 2, xf(D.N, { face: kit.look(0, 0, 'flat'), extra: { view: close(1.4), front: dark(128, 110, 72) } }));
  k.add('i1', 2, xf(D.N, { face: kit.look(0, 0, 'o'), extra: { view: close(1.8), front: dark(128, 110, 38) } }));
  k.add('i2', 2, xf(D.N, { face: kit.faces.wide, extra: { view: close(NEAR), front: dark(128, 109, 19) } }));
  k.add('dk_c', 4, eyes(1));
  k.add('dk_l', 6, eyes(1, [-1, 0]));
  k.add('dk_r', 6, eyes(1, [1, 0]));
  k.add('dk_b', 2, eyes(1, [0, 0], 1));
  k.add('dk_c', 4);
  k.add('dk_u', 4, eyes(1, [0, -1]));
  // click
  k.add('on0', 2, lit(1.7, {}, FACE.lookup));
  k.add('on1', 2, lit(1.15, {}, FACE.lookup));
  k.add('on2', 4, lit(FAR, {}, kit.faces.wide));
  k.add('joy0', 2, lit(FAR, { ky: 0.9, kx: 1.05 }, FACE.happy));
  k.add('joy1', 4, lit(FAR, { dy: -9, ky: 1.04, shadowK: 0.8 }, FACE.happy, true));
  k.add('joy2', 2, lit(FAR, { ky: 0.94, kx: 1.03 }, FACE.happy, true));
  k.add('joy1', 4);
  k.add('joy2', 2);
  k.add('glad', 12, lit(FAR, {}, FACE.cute, true));
  // and out
  k.add('ds_u', 2, eyes(0, [0, -1]));
  k.add('hm', 2, lit(FAR, {}, kit.look(0, -5, 'o')));
  k.add('ds_u', 6);
  k.add('ds_b', 2, eyes(0, [0, 0], 1));
  [0.3, 0.68].forEach((s, i) => k.add('near' + i, 2, eyes(s, [0, -1])));
  k.add('dk_u', 6);
  k.add('dk_sad', 8, eyes(1, [0, 0.7], 0.5));
  k.add('dk_b', 4);
  // he has gone to sleep by the time we can see him again
  k.add('blk', 2, kit.gone());
  [26, 70, 150].forEach((r, i) => k.add('o' + i, 2, xf(D.S1, { extra: { fxm: 'idle', front: dark(170, 168, r) } })));
  k.done({ doze: false });
})();

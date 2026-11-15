// Rapid fire: he flies past in a cape three times (far, nearer, huge), crashes off the right edge, and walks back in with the cape over his head.
(() => {
  const { D, xf, FACE, boil, closedPath, openPath, kit } = window.__lump;
  const { CREAM, RED, YELLOW, pt, look } = kit;
  const k = kit.clip('cape_b');
  const lin = (a, b, n) => Array.from({ length: n }, (_, i) => a + (b - a) * i / (n - 1));
  const cloth = (c, P) => { c.lineJoin = c.lineCap = 'round'; closedPath(c, P); c.fillStyle = RED; c.fill(); c.strokeStyle = CREAM; c.lineWidth = 2.8; c.stroke(); };

  // hanging behind him as he stands: s widens it until it shows either side
  const hang = (o, s) => (c, d, seed) => cloth(c, boil([[128 - 50 * s, 104], [128 + 50 * s, 104], [128 + 84 * s, 199], [128 - 84 * s, 199]].map(q => pt(o, q)), seed, 2));
  // streaming out behind him in flight, from his neck to well past his feet
  const cape = (o, flap) => (c, d, seed) => cloth(c, boil([[92, 96], [164, 96], [198, 150], [204, 236 + flap * 10], [166, 262 - flap * 8], [128, 246 + flap * 8], [90, 262 - flap * 8], [52, 236 - flap * 10], [58, 150]].map(q => pt(o, q)), seed, 2 * o.k));
  // over his head, hiding his eyes
  const hood = (o, seed) => c => {
    cloth(c, boil([[58, 154], [66, 104], [88, 72], [128, 58], [168, 72], [190, 104], [198, 154], [182, 146], [164, 121], [128, 116], [92, 121], [74, 146]].map(q => pt(o, q)), seed, 2));
    c.lineWidth = 2.2; openPath(c, [[104, 76], [99, 96], [103, 116]].map(q => pt(o, q))); c.stroke(); openPath(c, [[150, 74], [156, 94], [152, 114]].map(q => pt(o, q))); c.stroke();
  };

  // xf options that put the middle of his body at (cx, cy), scaled by s and turned by rot
  const fly = (cx, cy, s, rot) => ({ k: s, rot, dx: cx - 128 - 61 * Math.sin(rot) * s, dy: cy - 201 + 61 * Math.cos(rot) * s, shadowK: 0 });
  const flyer = (cx, cy, s, rot, i, face) => {
    const o = fly(cx, cy, s, rot), right = rot > 0, extra = { back: cape(o, i % 2 ? 1 : -1) };
    if (s > 0.5) extra[right ? 'arm2' : 'arm'] = [pt(o, [right ? 166 : 90, 140]), pt(o, [right ? 178 : 78, 66])];
    return xf(D.N, { ...o, face, extra });
  };

  const c0 = { ky: 0.9, kx: 1.05 }, c1 = { ky: 0.78, kx: 1.1 }, u0 = { ky: 1.22, kx: 0.9, dy: -70, k: 1 }, u1 = { ky: 1.3, kx: 0.86, dy: -250, k: 1 };
  k.add('crouch0', 2, xf(D.N, { ...c0, face: look(0, -3, 'smile'), extra: { back: hang(c0, 0.8) } }));
  k.add('crouch1', 4, xf(D.N, { ...c1, face: look(0, -4, 'smile'), extra: { back: hang(c1, 1) } }));
  k.add('up0', 2, xf(D.N, { ...u0, shadowK: 0.5, face: FACE.happy, extra: { back: cape(u0, 1), arm2: [pt(u0, [166, 140]), pt(u0, [178, 80])] } }));
  k.add('up1', 2, xf(D.N, { ...u1, shadowK: 0, face: FACE.happy, extra: { back: cape(u1, -1) } }));

  lin(-28, 268, 7).forEach((x, i) => k.add('far' + i, 2, flyer(x, 60 - Math.sin(i / 6 * Math.PI) * 10, 0.36, 1.25, i, FACE.happy)));
  lin(312, -72, 6).forEach((x, i) => k.add('mid' + i, 2, flyer(x, 122 - Math.sin(i / 5 * Math.PI) * 16, 0.75, -1.25, i, FACE.happy)));
  lin(-225, 465, 5).forEach((x, i) => k.add('huge' + i, 2, flyer(x, 124, 2, 1.3, i, kit.faces.wide)));

  const burst = (s, puff) => (c, d, seed) => {
    c.lineCap = 'round'; c.strokeStyle = YELLOW; c.lineWidth = 4.5;
    for (let i = 0; i < 5; i++) {
      const a = Math.PI + (i - 2) * 0.44, r0 = 16 * s, r1 = (38 + (i % 2) * 18) * s;
      c.beginPath(); c.moveTo(240 + Math.cos(a) * r0, 128 + Math.sin(a) * r0); c.lineTo(240 + Math.cos(a) * r1, 128 + Math.sin(a) * r1); c.stroke();
    }
    if (puff) kit.puff(c, 222, 160, seed, puff);
  };
  [[1.3, -8, 0, 2], [1.6, 6, 12, 4], [1, -3, 15, 4]].forEach(([s, shift, puff, ticks], i) => k.add('crash' + i, ticks, kit.gone({ view: kit.view(1, [120, 120], [120 + shift, 120]), front: burst(s, puff) })));

  const glum = [['stroke', [[121, 128], [128, 124], [135, 128]], 2.8]];
  kit.walk(176, 0, 6).forEach((o, i) => k.add('back' + i, 2, xf(D.N, { ...o, face: glum, extra: { front: hood(o, i) } })));
  k.add('stand', 10, xf(D.N, { face: glum, extra: { front: hood({}, 3) } }));
  k.add('off0', 2, xf(D.N, { face: FACE.sheep, extra: { back: hang({ dy: 6 }, 1.05) } }));
  k.add('off1', 2, xf(D.N, { face: FACE.sheep, extra: { back: (c, d, seed) => kit.fade(c, 0.6, () => hang({ ky: 0.6 }, 1.1)(c, d, seed)) } }));
  k.add('off2', 2, xf(D.N, { face: FACE.sheep, extra: { back: (c, d, seed) => kit.fade(c, 0.3, () => hang({ ky: 0.35 }, 1.15)(c, d, seed)) } }));
  k.done();
})();

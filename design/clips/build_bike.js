// Build bike: he pedals a tiny exercise bike wired to a lightbulb. It slowly lights; he stops to admire it and it goes out.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, mixHex, tint } = window.__lump;
  const CREAM = '#FFF1DC', TAU = Math.PI * 2;
  const steady = [['dot',118,108,3.8], ['dot',142,106,3.8], ['stroke',[[122,123],[128,124],[134,123]],2.8], ['stroke',[[108,97],[120,99]],2.4], ['stroke',[[136,97],[148,95]],2.4]];
  const puffing = [['stroke',[[108,104],[116,109],[108,114]],3], ['stroke',[[148,102],[140,107],[148,112]],3], ['mouth',[[122,119],[134,118],[135,128],[128,131],[121,128]]]];
  const flat = [['dot',122,110,3.6], ['dot',146,108,3.6], ['stroke',[[124,125],[138,124]],2.8]];
  // turn: how far round the pedals are. glow: 0 dark to 1 fully lit.
  const rig = (turn, glow) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM;
    c.lineWidth = 2.2; c.beginPath(); c.moveTo(158, 197); c.lineTo(200, 197); c.lineTo(200, 116); c.stroke();     // the wire
    if (glow > 0.1) { c.globalAlpha = glow * 0.22; c.fillStyle = '#FFD23F'; c.beginPath(); c.arc(200, 86, 21 + glow * 14, 0, TAU); c.fill(); c.globalAlpha = 1; }
    c.lineWidth = 3; c.fillStyle = '#9FB0C4'; c.beginPath(); c.rect(192, 105, 16, 11); c.fill(); c.stroke();
    c.fillStyle = mixHex('#17161A', '#FFD23F', glow); c.beginPath(); c.arc(200, 86, 20, 0, TAU); c.fill(); c.stroke();
    if (glow >= 1) {
      c.strokeStyle = '#FFD23F'; c.lineWidth = 3; c.beginPath();
      for (let i = 0; i < 7; i++) { const a = Math.PI * (0.9 + i * 0.2 + (seed % 2) * 0.1); c.moveTo(200 + Math.cos(a) * 28, 86 + Math.sin(a) * 28); c.lineTo(200 + Math.cos(a) * 37, 86 + Math.sin(a) * 37); }
      c.stroke(); c.strokeStyle = CREAM;
    }
    c.lineWidth = 4; c.beginPath(); c.moveTo(72, 198); c.lineTo(160, 198); c.moveTo(94, 198); c.lineTo(94, 176); c.moveTo(94, 186); c.lineTo(140, 180); c.lineTo(148, 126); c.stroke();
    c.lineWidth = 6; c.beginPath(); c.moveTo(80, 175); c.lineTo(108, 175); c.moveTo(140, 123); c.lineTo(157, 128); c.stroke();
    c.lineWidth = 3; c.fillStyle = '#17161A'; c.beginPath(); c.arc(140, 180, 17, 0, TAU); c.fill(); c.stroke();
    c.lineWidth = 2; c.beginPath();
    for (let i = 0; i < 3; i++) { const a = turn + i * TAU / 3; c.moveTo(140, 180); c.lineTo(140 + Math.cos(a) * 15, 180 + Math.sin(a) * 15); }
    c.stroke();
    const px = Math.cos(turn) * 9, py = Math.sin(turn) * 9;                                                          // pedals, and his feet on them
    c.lineWidth = 3; c.beginPath(); c.moveTo(110 - px, 186 - py); c.lineTo(110 + px, 186 + py); c.stroke();
    c.fillStyle = tint(); c.lineWidth = 2.4;
    for (const s of [-1, 1]) { c.beginPath(); c.ellipse(110 + px * s, 186 + py * s - 2, 7.5, 4.5, 0, 0, TAU); c.fill(); c.stroke(); }
    c.restore();
  };
  const sat = (o, turn, glow, bob = 0) => xf(D.N, { k: 0.75, dx: -36, dy: bob - 28, shadowK: 0.9, ...o, extra: { arm2: [[120, 130 + bob], [146, 127]], front: rig(turn, glow) } });
  D.build_bike_hop = xf(D.N, { k: 0.88, dx: -18, dy: -44, rot: -0.12, shadowK: 0.7, face: FACE.lookr, extra: { front: rig(0, 0) } });
  D.build_bike_on = sat({ face: FACE.lookr }, 0, 0);
  const N = 26, spin = [];
  for (let i = 0; i < N; i++) {
    const glow = Math.max(0, (i - 5) / (N - 6)) ** 1.5;
    D['build_bike_' + i] = sat({ face: i < 10 ? steady : puffing, rot: i % 2 ? 0.03 : -0.03 }, i * Math.PI / 3, glow * 0.92, i % 2 ? 3 : 0);
    spin.push(['build_bike_' + i, i < 4 ? 4 : i < 10 ? 3 : 2]);
  }
  D.build_bike_lit = sat({ face: FACE.happy }, 0.4, 1);
  D.build_bike_fade = sat({ face: FACE.lookr }, 0.4, 0.45);
  D.build_bike_out = sat({ face: flat }, 0.4, 0);
  D.build_bike_sag = sat({ face: flat, ky: 0.95 }, 0.4, 0);
  CLIPS.build_bike = { home: 'idle', seq: [...WAKE, ['build_bike_hop', 3], ['build_bike_on', 8], ...spin, ['build_bike_lit', 14], ['build_bike_fade', 4],
    ['build_bike_out', 10], ['build_bike_sag', 8], ['build_bike_hop', 3], ...DOZE] };
})();

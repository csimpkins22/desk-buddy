// Magnet: a magnet lands where the glass was tapped. He digs in, loses, and is yanked flat against the glass, then slides off.
// group: tap
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', MX = 198, MY = 42;
  const resist = [['stroke',[[108,104],[116,109],[108,114]],3], ['stroke',[[148,102],[140,107],[148,112]],3], ['stroke',[[120,126],[136,125]],2.8]];
  const eyeing = [['dot',122,104,3.8], ['dot',146,101,3.8], ['stroke',[[125,122],[130,123],[135,121]],2.6]];
  const tap = (x, y, r) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineCap = 'round'; c.lineWidth = 3;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke();
    c.globalAlpha = 0.5; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r * 1.8, 0, Math.PI * 2); c.stroke(); c.restore();
  };
  // a horseshoe magnet in the corner, poles towards him; pull 0 or 1 draws its tug as arcs, alternating
  const magnet = (s = 1, pull = -1) => c => {
    c.save(); c.translate(MX, MY); c.rotate(Math.PI / 4); c.scale(s, s); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3;
    c.fillStyle = '#FF5A4D'; c.beginPath(); c.moveTo(-24, 18); c.lineTo(-24, 0); c.arc(0, 0, 24, Math.PI, 0); c.lineTo(24, 18); c.lineTo(9, 18); c.lineTo(9, 0);
    c.arc(0, 0, 9, 0, Math.PI, true); c.lineTo(-9, 18); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#9FB0C4'; [-24, 9].forEach(x => { c.beginPath(); c.rect(x, 18, 15, 11); c.fill(); c.stroke(); });
    if (pull >= 0) { c.globalAlpha = 0.6; c.lineWidth = 2.5; for (let i = 0; i < 2; i++) { c.beginPath(); c.arc(0, 24, 13 + i * 11 + pull * 5, Math.PI / 2 - 0.5, Math.PI / 2 + 0.5); c.stroke(); } }
    c.restore();
  };
  const hair = d => ({ ...d, curl: [[128, 71], [138, 62], [148, 54], [156, 47], [162, 42]] });      // his cowlick goes first
  // flat against the glass, cheek first
  const stuck = (o, front) => xf(D.FG3, { k: 0.62, ox: 142, oy: 130, dx: 4, dy: -44, ...o, extra: { fxm: 'none', glare: false, front } });
  const P = 'magnet_';
  D[P + 'tap'] = xf(D.N, { face: FACE.lookup, extra: { front: tap(MX, MY, 8) } });
  D[P + 'land'] = xf(D.N, { face: eyeing, extra: { front: c => { tap(MX, MY, 16)(c); magnet(0.6)(c); } } });
  D[P + 'hum1'] = hair(xf(D.N, { face: eyeing, extra: { front: magnet(1, 0) } }));
  D[P + 'hum2'] = hair(xf(D.N, { face: eyeing, extra: { front: magnet(1, 1) } }));
  D[P + 'dig1'] = hair(xf(D.N, { face: resist, rot: 0.16, ky: 1.05, extra: { front: magnet(1, 0) } }));
  D[P + 'dig2'] = hair(xf(D.N, { face: resist, rot: 0.26, ky: 1.12, kx: 0.95, extra: { front: magnet(1, 1) } }));
  D[P + 'fly'] = xf(D.N, { face: FACE.shock, rot: 0.6, ky: 1.25, kx: 0.85, k: 0.9, dx: 14, dy: -34, shadowK: 0.4, extra: { front: magnet(1, 0) } });
  D[P + 'smack'] = stuck({ k: 0.7 }, magnet(1));
  D[P + 'stuck1'] = stuck({ rot: 0.03 }, magnet(1));
  D[P + 'stuck2'] = stuck({ rot: -0.03 }, magnet(1));
  D[P + 'left'] = stuck({}, magnet(0.5));
  D[P + 'alone'] = stuck({});
  D[P + 'slide1'] = stuck({ dx: 0, dy: -14, ky: 1.12 });
  D[P + 'slide2'] = stuck({ dx: -8, dy: 22, ky: 1.18 });
  D[P + 'plop'] = xf(D.N, { face: FACE.spiral, ky: 0.7, kx: 1.18 });
  D[P + 'daze1'] = xf(D.N, { face: FACE.spiral, rot: 0.05 });
  D[P + 'daze2'] = xf(D.N, { face: FACE.spiral, rot: -0.05 });
  const s = (...a) => a.map(([n, t]) => [P + n, t]);
  CLIPS.magnet = { home: 'idle', seq: [...WAKE, ...s(['tap', 4], ['land', 3], ['hum1', 4], ['hum2', 4], ['dig1', 3], ['dig2', 3], ['dig1', 3], ['dig2', 4], ['fly', 2],
    ['smack', 3], ['stuck1', 5], ['stuck2', 5], ['stuck1', 5], ['left', 2], ['alone', 8], ['slide1', 4], ['slide2', 3], ['plop', 3],
    ['daze1', 4], ['daze2', 4], ['daze1', 4], ['daze2', 4]), ...DOZE] };
})();

// Four quick poses at a tall mirror, each copied a beat late; then the reflection shrugs, walks out of the frame and off, and he is left staring at empty glass.
// Written with him on the left and the mirror on the right: the clip is mirrored, so on screen he is on the right.
(() => {
  const { D, xf, FACE, kit } = window.__lump;
  const k = kit.clip('mirror_b', { mirror: true }), K = 0.8, ME = -66, RF = -44, HOME = -16;

  const mirror = (c, mx) => {
    c.save(); c.translate(mx, 0); c.lineCap = c.lineJoin = 'round';
    c.fillStyle = kit.BROWN; c.strokeStyle = kit.CREAM; c.lineWidth = 3; c.beginPath(); c.roundRect(114, 34, 114, 169, 10); c.fill(); c.stroke();
    c.fillStyle = '#1C3148'; c.lineWidth = 2.4; c.beginPath(); c.roundRect(121, 41, 100, 155, 6); c.fill(); c.stroke();
    c.strokeStyle = kit.BLUE; c.globalAlpha = 0.6; c.lineWidth = 3; c.beginPath(); c.moveTo(198, 50); c.lineTo(213, 74); c.moveTo(186, 50); c.lineTo(194, 62); c.stroke();
    c.restore();
  };

  const arms = (l, r) => o => { const a = kit.pt(o, [90, 140]), b = kit.pt(o, [166, 140]); return { ...(l ? { arm: [a, [a[0] + l[0], a[1] + l[1]]] } : {}), ...(r ? { arm2: [b, [b[0] + r[0], b[1] + r[1]]] } : {}) }; };
  const P = {
    stand: { face: kit.look(4, 0, 'smile') },
    wave1: { face: FACE.happy, arms: arms(null, [5, -34]) },
    wave2: { face: FACE.happy, arms: arms(null, [17, -27]) },
    lean: { o: { rot: -0.22 }, face: kit.faces.smug },
    crouch: { o: { ky: 0.88, kx: 1.05 }, face: FACE.happy },
    hop: { o: { dy: -28, ky: 1.08, kx: 0.95, shadowK: 0.7 }, face: FACE.happy },
    squash: { o: { ky: 0.6, kx: 1.1 }, face: kit.faces.wide },
    tada: { face: FACE.happy, arms: arms([-12, -32], [12, -32]) },
    unmoved: { face: kit.look(4, 0, 'flat') },
    puzzled: { face: kit.look(4, 0, 'o') },
    shrug: { o: { ky: 0.95 }, face: kit.faces.smug, arms: arms([-20, -12], [20, -12]) },
    gape: { face: FACE.shock },
    stare: { face: kit.faces.wide },
    peer: { o: { rot: 0.12 }, face: kit.look(5, 0, 'o') },
  };
  const pose = (p, dx, dy = 0) => { const o = { k: K, dx, ...p.o, dy: (p.o?.dy || 0) + dy }; return xf(D.N, { ...o, face: p.face, extra: p.arms ? p.arms(o) : {} }); };
  // the reflection: his pose drawn the other way round, standing in the glass
  const refl = p => kit.flip(pose(p, RF, -7));
  const shot = (me, rf, mx = 0) => ({ ...me, back: (c, d, seed) => { mirror(c, mx); if (rf) kit.twin(c, rf, seed, mx, 0); } });
  let n = 0;
  const beat = (ticks, p, r) => k.add('p' + n++, ticks, shot(pose(P[p], ME), r && refl(P[r])));

  // he steps aside as the mirror rolls in. The first and last drawings are flipped back, so they sit exactly on the standing pose either side of the clip.
  const home = face => kit.flip(xf(D.N, { dx: -HOME, face }));
  const SLIDE = kit.steps(130, 0, 5);
  kit.walk(HOME, ME, 5, {}).forEach((w, i) => k.add('in' + i, 2, shot(i ? xf(D.N, { ...w, k: 1 - (1 - K) * i / 4, face: P.stand.face }) : home(kit.look(-4, 0, 'smile')), refl(P.stand), SLIDE[i])));

  // four poses, the reflection a beat behind each time
  beat(2, 'wave1', 'stand'); beat(2, 'wave2', 'stand'); beat(2, 'wave1', 'stand');
  beat(2, 'wave2', 'wave1'); beat(2, 'wave1', 'wave2');
  beat(2, 'lean', 'wave1'); beat(2, 'lean', 'wave2'); beat(2, 'lean', 'stand');
  beat(4, 'lean', 'lean');
  beat(2, 'crouch', 'lean'); beat(2, 'hop', 'lean'); beat(2, 'stand', 'lean');
  beat(2, 'stand', 'crouch'); beat(2, 'stand', 'hop');
  beat(6, 'squash', 'stand');
  beat(4, 'squash', 'squash');

  // a fifth, and the reflection has had enough
  beat(2, 'tada', 'squash'); beat(8, 'tada', 'unmoved');
  beat(6, 'puzzled', 'unmoved');
  beat(8, 'puzzled', 'shrug');
  kit.walk(RF, -204, 7, { k: K }).forEach((w, i) => k.add('out' + i, 2, shot(pose(P.gape, ME), kit.flip(xf(D.N, { ...w, dy: i < 2 ? -7 + i * 4 : 0, face: kit.faces.smug })))));

  // nobody in the glass
  beat(16, 'stare'); beat(6, 'peer');
  kit.walk(ME, HOME, 5, {}).forEach((w, i) => k.add('away' + i, 2, shot(i < 4 ? xf(D.N, { ...w, k: K + (1 - K) * i / 4, face: kit.faces.sad }) : home(kit.faces.sad), null, SLIDE[4 - i])));
  k.done();
})();

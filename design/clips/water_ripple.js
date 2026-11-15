// Water ripple: a mug of water slides in beside him. Far-off thuds ring the water and bounce the mug, harder each time, until a huge shadow falls across him and he slowly looks up.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', MUG = '#F4F8FF', BLUE = '#5AB8FF', FLOOR = '#2B3440', TAU = Math.PI * 2, HOME = 196;
  const atCup = [['dot',126,113,3.8], ['dot',150,111,3.8], ['stroke',[[128,126],[133,125],[138,126]],2.6]];
  const worried = [['dot',126,113,4.2], ['dot',150,111,4.2], ['stroke',[[113,101],[125,97]],2.4], ['stroke',[[141,95],[153,97]],2.4], ['stroke',[[125,127],[129,125],[133,127],[137,125],[141,127]],2.4]];
  const jolt = [['dot',126,111,4.6], ['dot',150,109,4.6], ['mouth',[[127,120],[139,119],[140,129],[134,133],[126,129]]]];
  const dread = [['dot',116,110,4.4], ['dot',140,108,4.4], ['stroke',[[104,98],[118,95]],2.4], ['stroke',[[138,93],[152,95]],2.4], ['stroke',[[123,125],[133,125]],2.6]];
  const upA = [['dot',119,104,4.4], ['dot',143,102,4.4], ['stroke',[[108,93],[121,90]],2.4], ['stroke',[[140,88],[153,90]],2.4], ['stroke',[[124,121],[132,121]],2.6]];
  const upB = [['oval',121,97,5.4,6.2], ['oval',145,95,5.4,6.2], ['shine',122.5,93.5,2], ['shine',146.5,91.5,2], ['stroke',[[111,85],[124,82]],2.4], ['stroke',[[141,80],[154,82]],2.4], ['mouth',[[125,112],[134,111],[135,119],[130,122],[124,119]]]];
  const ducked = [...FACE.chooEyes, ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6]];
  const TREMBLE = [[0.3, 0.8], [0.5, 1], [0.15, 0.65]];
  // an enamel mug seen from a little above. lift: how far it has jumped. rings: sizes of the rings on the water, 0 to 1 ('tremble': never still). drops: how far the splashes have flown.
  const mug = (c, { x = HOME, lift = 0, tilt = 0, rings = [], drops, slosh = 0 }, seed, tick) => {
    c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.ellipse(x + 4, 202, Math.max(6, 27 - lift * 0.25), 5, 0, 0, TAU); c.fill();
    c.save(); c.translate(x, 200 - lift); c.rotate(tilt); c.strokeStyle = CREAM;
    c.beginPath(); c.moveTo(24, -39); c.bezierCurveTo(48, -42, 47, -9, 21, -13); c.lineWidth = 11; c.stroke(); c.strokeStyle = MUG; c.lineWidth = 5.5; c.stroke();
    const body = () => { c.beginPath(); c.moveTo(-28, -50); c.lineTo(-22, -5); c.bezierCurveTo(-20, 3, 20, 3, 22, -5); c.lineTo(28, -50); c.closePath(); };
    body(); c.fillStyle = MUG; c.fill();
    c.save(); c.clip(); c.fillStyle = '#C4CFDD'; c.fillRect(9, -54, 24, 60);
    c.strokeStyle = BLUE; c.lineWidth = 4.5; c.beginPath(); c.ellipse(0, -42, 28, 10, 0, 0, Math.PI); c.stroke(); c.restore();
    c.strokeStyle = CREAM; c.lineWidth = 3; body(); c.stroke();
    c.fillStyle = '#8794A6'; c.beginPath(); c.ellipse(0, -50, 28, 10, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = BLUE; c.beginPath(); c.ellipse(0, -47, 23.5, 7.4, slosh, 0, TAU); c.fill();
    c.strokeStyle = '#EAF6FF'; c.lineWidth = 1.8;
    (rings === 'tremble' ? TREMBLE[Math.floor(tick / 2) % 3] : rings).forEach(f => { c.globalAlpha = 1.15 - f * 0.75; c.beginPath(); c.ellipse(0, -47, 23.5 * f, 7.4 * f, 0, 0, TAU); c.stroke(); });
    c.globalAlpha = 1;
    if (drops !== undefined) {
      c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 1.4;
      [[-20, -62, -1], [-4, -72, 0], [16, -64, 1]].forEach(([dx, dy, out]) => { c.beginPath(); c.ellipse(dx + out * drops * 5, dy - drops * 9 + drops * drops * 5, 2.8, 3.8, 0, 0, TAU); c.fill(); c.stroke(); });
    }
    c.restore();
  };
  // floor: how solid the ground is. thud: how hard the grit on it has been bounced, 0 to 3. wave: where each ripple running through the ground has got to.
  const ground = ({ floor = 1, thud = 0, wave, cup }) => (c, d, seed, tick) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    c.globalAlpha = floor; c.fillStyle = FLOOR; c.fillRect(0, 199, 240, 41);
    c.strokeStyle = CREAM; c.lineWidth = 2; c.globalAlpha = floor * 0.45; c.beginPath(); c.moveTo(0, 199); c.lineTo(240, 199); c.stroke();
    c.globalAlpha = floor; c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.ellipse(d.shadow[0] + 4, 204, d.shadow[1], 6, 0, 0, TAU); c.fill();
    c.fillStyle = CREAM; c.globalAlpha = floor * 0.7; [[14, 2.2], [160, 1.8], [232, 2.4]].forEach(([x, r], i) => { c.beginPath(); c.arc(x, 196 - thud * (2 + i), r, 0, TAU); c.fill(); });
    if (wave) {                                      // the thud coming through the ground from the left
      c.save(); c.beginPath(); c.rect(0, 203, 240, 37); c.clip(); c.lineWidth = 3;
      wave.forEach((x, i) => { c.globalAlpha = Math.max(0.2, 1 - x / 300); c.beginPath(); c.arc(x - 34 - i * 11, 222, 30, -0.75, 0.75); c.stroke(); });
      c.restore();
    }
    c.globalAlpha = 1;
    if (cup) mug(c, cup, seed, tick);
    c.restore();
  };
  // shade: how far the shadow has come across, 0 to 1
  const shadow = shade => c => { c.save(); c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.arc(-190 + shade * 310, -40 + shade * 140, 250, 0, TAU); c.fill(); c.restore(); };
  const P = 'water_ripple_', HERE = { dx: -40 };
  const put = (name, o, scene, shade) => { D[P + name] = xf(D.N, { shadowK: 0, ...o, extra: { back: ground(scene), ...(shade ? { front: shadow(shade) } : {}), ...o.extra } }); };
  put('in1', { dx: -12, rot: -0.04, face: FACE.lookr }, { floor: 0.4, cup: { x: 268, tilt: 0.14 } });
  put('in2', { dx: -28, rot: -0.04, face: FACE.lookr }, { floor: 0.8, cup: { x: 226, tilt: 0.14, slosh: 0.12 } });
  put('in3', { ...HERE, face: FACE.lookr }, { cup: { x: 191, tilt: -0.07, slosh: -0.1 } });
  put('in4', { ...HERE, face: FACE.lookr }, { cup: { rings: [0.5] } });
  put('calm', { ...HERE, face: D.N.face }, { cup: {} });
  // one thud: the mug hops, lands, and the rings run out to the rim. n: which thud, 1 to 3.
  const thud = (n, faces, o = {}) => {
    const lift = [0, 4, 8, 14][n], ringed = [[0.3], [0.6, 0.25], [0.9, 0.55, 0.2], [1, 0.75]].map(r => r.slice(0, n === 1 ? 1 : 3)), waves = x => [x, x, x].slice(0, n);
    put(`t${n}a`, { ...HERE, face: faces[0], ...o }, { thud: n, wave: waves(60), cup: { lift, tilt: n * 0.02, drops: n === 3 ? 0.4 : undefined } });
    ringed.forEach((rings, i) => put(`t${n}${'bcde'[i]}`, { ...HERE, face: faces[Math.min(i + 1, faces.length - 1)] }, { thud: i ? 0 : n * 0.4, wave: i < 2 ? waves(130 + i * 80) : undefined, cup: { rings, lift: i ? 0 : -1, drops: n === 3 && i < 2 ? 1.2 + i : undefined } }));
  };
  thud(1, [D.N.face, D.N.face, FACE.lookr]);
  thud(2, [atCup, atCup, atCup, worried]);
  thud(3, [jolt, jolt, worried], { ky: 0.93, kx: 1.05 });
  const TREM = { cup: { rings: 'tremble' } };
  put('still', { ...HERE, face: worried }, { cup: {} });
  [0.1, 0.22, 0.36, 0.5, 0.75].forEach((shade, i) => put('dark' + i, { ...HERE, face: worried }, TREM, shade));
  put('dread', { ...HERE, face: dread }, TREM, 1);
  put('up1', { ...HERE, face: upA, ky: 1.02 }, TREM, 1);
  put('up2', { ...HERE, face: upB, ky: 1.04, kx: 0.98, rot: -0.04 }, TREM, 1);
  put('out1', { ...HERE, face: ducked, ky: 0.8, kx: 1.12 }, { thud: 3, wave: [90, 90, 90], cup: { lift: 36, tilt: 0.2, drops: 0.5 } }, 0.75);
  put('out2', { ...HERE, face: ducked, ky: 0.84, kx: 1.1 }, { wave: [190, 190, 190], cup: { lift: 100, tilt: 0.6, x: 204, drops: 1.4 } }, 0.45);
  put('out3', { ...HERE, face: FACE.lookup, ky: 0.95 }, { cup: { lift: 190, tilt: 1.1, x: 214 } }, 0.15);
  put('out4', { dx: -26, face: FACE.lookup }, { floor: 0.7 });
  put('out5', { dx: -10, face: FACE.sheep }, { floor: 0.3 });
  const s = (id, n) => [P + id, n], hit = (n, hold) => [s(`t${n}a`, 2), ...'bcde'.split('').map(k => s(`t${n}${k}`, 2)), ...hold];
  CLIPS.water_ripple = { home: 'idle', seq: [...WAKE, s('in1', 2), s('in2', 2), s('in3', 2), s('in4', 3), s('calm', 5),
    ...hit(1, [s('calm', 5)]), ...hit(2, [s('still', 4)]), ...hit(3, []), s('dark0', 2), s('dark1', 2), s('dark2', 2), s('dark3', 2), s('dark4', 2), s('dread', 6), s('up1', 5), s('up2', 14),
    s('out1', 2), s('out2', 2), s('out3', 2), s('out4', 2), s('out5', 2), ...DOZE] };
})();

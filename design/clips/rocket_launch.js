// Rocket launch: fins on, three lights count down, and he lifts off, leaning further and further over, out of the top corner. He comes back down sooty.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', RED = '#FF5A4D', YELLOW = '#FFD23F', TAU = Math.PI * 2;
  const set = [['dot',117,107,3.8], ['dot',141,105,3.8], ['stroke',[[122,124],[128,125],[134,124]],2.8], ['stroke',[[108,97],[121,100]],2.4], ['stroke',[[136,98],[149,95]],2.4]];
  const brace = [...FACE.chooEyes, ['stroke',[[119,126],[124,123],[129,126],[134,123],[138,126]],2.8]];
  const SMOKE = [[], [[98, 197, 9], [158, 197, 9]], [[84, 194, 13], [108, 199, 10], [150, 199, 10], [174, 194, 13]],
    [[62, 190, 17], [92, 197, 13], [128, 199, 11], [164, 197, 13], [194, 190, 17], [42, 197, 10], [214, 197, 10]], [[50, 176, 19], [90, 188, 15], [166, 188, 15], [206, 176, 19]]];
  // drawn behind him: smoke on the floor, then the fins and flame, which lean and climb as he does
  const rig = (o, flame, smoke, fins) => (c, _, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = '#9FB0C4'; c.globalAlpha = smoke === 4 ? 0.45 : 0.85; c.beginPath();
    SMOKE[smoke].forEach(([x, y, r], i) => { const rr = r + (seed + i) % 3; c.moveTo(x + rr, y); c.arc(x, y, rr, 0, TAU); }); c.fill(); c.globalAlpha = 1;
    c.translate(128 + (o.dx || 0), 201 + (o.dy || 0)); c.rotate(o.rot || 0); c.translate(-128, -201);
    if (flame) {
      const n = flame + seed % 2 * 7;
      c.fillStyle = RED; c.beginPath(); c.moveTo(100, 196); c.quadraticCurveTo(106, 198 + n * 0.7, 128, 198 + n); c.quadraticCurveTo(150, 198 + n * 0.7, 156, 196); c.closePath(); c.fill();
      c.fillStyle = YELLOW; c.beginPath(); c.moveTo(112, 196); c.quadraticCurveTo(116, 198 + n * 0.4, 128, 198 + n * 0.6); c.quadraticCurveTo(140, 198 + n * 0.4, 144, 196); c.closePath(); c.fill();
    }
    if (fins) {
      c.fillStyle = RED; c.strokeStyle = CREAM; c.lineWidth = 3;
      [[[80, 160], [44, 204], [86, 198]], [[176, 160], [212, 204], [170, 198]]].forEach(P => { c.beginPath(); c.moveTo(...P[0]); c.lineTo(...P[1]); c.lineTo(...P[2]); c.closePath(); c.fill(); c.stroke(); });
    }
    c.restore();
  };
  // the countdown: `lit` red lights left, or all three green for go
  const lights = (lit, go) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.4;
    for (let i = 0; i < 3; i++) { c.fillStyle = go ? '#58D68D' : i < lit ? RED : '#17161A'; c.beginPath(); c.arc(100 + i * 28, 22, 9, 0, TAU); c.fill(); c.stroke(); }
    c.restore();
  };
  const soot = a => c => {
    c.save(); c.fillStyle = '#17161A'; c.globalAlpha = a; c.beginPath();
    [[102, 98, 15, 10], [152, 124, 13, 9], [112, 156, 17, 10], [162, 176, 11, 7], [136, 84, 9, 6]].forEach(([x, y, rx, ry]) => { c.moveTo(x + rx, y); c.ellipse(x, y, rx, ry, 0, 0, TAU); });
    c.fill(); c.restore();
  };
  const twinkle = c => { c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(214, 10); c.lineTo(214, 38); c.moveTo(200, 24); c.lineTo(228, 24); c.moveTo(205, 15); c.lineTo(223, 33); c.moveTo(223, 15); c.lineTo(205, 33); c.stroke(); c.restore(); };
  const ship = (o, face, { flame = 0, smoke = 0, fins = true, front } = {}) => xf(D.N, { ...o, face, shadowK: Math.max(0, 1 + (o.dy || 0) / 90), extra: { back: rig(o, flame, smoke, fins), front } });
  D.rocket_launch_1 = ship({}, set, { front: lights(0) });
  D.rocket_launch_2 = ship({ ky: 0.98 }, set, { front: lights(3) });
  D.rocket_launch_3 = ship({ ky: 0.95, kx: 1.02 }, set, { front: lights(2) });
  D.rocket_launch_4 = ship({ ky: 0.9, kx: 1.05 }, brace, { front: lights(1), smoke: 1 });
  D.rocket_launch_5 = ship({ ky: 1.05, kx: 0.97, dx: -2 }, brace, { front: lights(0, true), smoke: 2, flame: 12 });
  D.rocket_launch_6 = ship({ ky: 1.05, kx: 0.97, dx: 2 }, brace, { front: lights(0, true), smoke: 2, flame: 12 });
  const climb = [[0, -8, 0.02], [3, -22, 0.07], [10, -42, 0.14], [24, -70, 0.22], [46, -106, 0.3], [78, -150, 0.38], [118, -204, 0.46]];
  climb.forEach(([dx, dy, rot], i) => { D['rocket_launch_c' + i] = ship({ dx, dy, rot }, i < 2 ? brace : FACE.shock, { flame: 26 + i * 4, smoke: 3, front: i < 3 ? lights(0, true) : undefined }); });
  D.rocket_launch_7 = ship({ dy: -400 }, [], { smoke: 3, fins: false });
  D.rocket_launch_8 = ship({ dy: -400 }, [], { smoke: 4, fins: false, front: twinkle });
  D.rocket_launch_9 = ship({ dy: -400 }, [], { smoke: 4, fins: false });
  D.rocket_launch_10 = xf(D.N, { ox: 128, oy: 136, rot: 2.6, dx: 44, dy: -150, shadowK: 0.3, face: FACE.shock });
  D.rocket_launch_11 = xf(D.N, { ox: 128, oy: 136, rot: 4.6, dx: 18, dy: -66, shadowK: 0.6, face: FACE.shock });
  const smudged = (o, a = 0.5, smoke = 0) => xf(D.N, { ...o, extra: { back: rig({}, 0, smoke, false), front: soot(a), ...o.extra } });
  D.rocket_launch_12 = smudged({ ky: 0.62, kx: 1.28, face: brace, extra: { fxm: 'alert', fx: [150, 100] } }, 0, 3);
  D.rocket_launch_13 = smudged({ rot: -0.05, face: FACE.spiral }, 0.5, 4);
  D.rocket_launch_14 = smudged({ rot: 0.05, face: FACE.spiral });
  D.rocket_launch_15 = smudged({ face: [['dot',116,110,3.6], ['dot',140,108,3.6], ['oval',128,126,4,5]], extra: { front: c => { soot(0.5)(c); c.save(); c.fillStyle = '#9FB0C4'; c.globalAlpha = 0.8; c.beginPath(); c.arc(150, 132, 7, 0, TAU); c.arc(164, 124, 9, 0, TAU); c.fill(); c.restore(); } } });
  D.rocket_launch_16 = smudged({ face: FACE.sheep });
  D.rocket_launch_17 = smudged({ face: FACE.sheep }, 0.25);
  const each = (p, n, t) => Array.from({ length: n }, (_, i) => [p + i, typeof t === 'function' ? t(i) : t]);
  CLIPS.rocket_launch = { home: 'idle', seq: [...WAKE, ['rocket_launch_1', 5], ['rocket_launch_2', 8], ['rocket_launch_3', 8], ['rocket_launch_4', 8],
    ['rocket_launch_5', 2], ['rocket_launch_6', 2], ['rocket_launch_5', 2], ['rocket_launch_6', 2], ...each('rocket_launch_c', 7, i => i < 3 ? 3 : 2),
    ['rocket_launch_7', 5], ['rocket_launch_8', 3], ['rocket_launch_9', 4], ['rocket_launch_10', 2], ['rocket_launch_11', 2], ['rocket_launch_12', 4],
    ['rocket_launch_13', 4], ['rocket_launch_14', 4], ['rocket_launch_13', 4], ['rocket_launch_15', 5], ['rocket_launch_16', 6], ['rocket_launch_17', 2], ...DOZE] };
})();

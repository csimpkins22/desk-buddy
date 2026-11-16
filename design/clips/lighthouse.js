// In the dark he turns once on the spot and a beam of light from his face sweeps round the screen, lighting the sea, a boat, a cloud and a rock as it crosses them.
// group: odd
(() => {
  const { D, xf, boil, openPath, closedPath, kit } = window.__lump, { TAU, CREAM, RED, WHITE, BLUE } = kit;
  const k = kit.clip('lighthouse'), Z = 0.75, V = kit.view(Z, [128, 140], [120, 125]), N = 60;
  const DIM = '#2A3038', BEAM = '#55522A';
  // each thing takes lit: dim shapes with no outline in the dark, colour and a cream line in the beam
  const things = {
    rock: (c, seed, lit) => {
      closedPath(c, boil([[-14, 203], [-8, 160], [8, 130], [30, 136], [48, 166], [56, 203]], seed, 1.2)); c.fillStyle = lit ? '#7C8898' : DIM; c.fill();
      if (lit) { c.stroke(); c.beginPath(); c.moveTo(14, 150); c.lineTo(22, 170); c.lineTo(16, 184); c.stroke(); }
    },
    boat: (c, seed, lit) => {
      c.beginPath(); c.moveTo(214, 158); c.lineTo(270, 158); c.lineTo(260, 176); c.lineTo(224, 176); c.closePath(); c.fillStyle = lit ? RED : DIM; c.fill(); if (lit) c.stroke();
      c.beginPath(); c.moveTo(246, 152); c.lineTo(246, 118); c.lineTo(268, 152); c.closePath(); c.fillStyle = lit ? WHITE : DIM; c.fill(); if (lit) c.stroke();
    },
    cloud: (c, seed, lit) => {
      c.fillStyle = lit ? '#C9D3E0' : DIM;
      [[96, 14, 13], [116, 6, 17], [138, 14, 13]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); if (lit) c.stroke(); });
      c.fillRect(96, 12, 42, 14);
    },
    sea: (c, seed, lit) => {
      c.strokeStyle = lit ? BLUE : '#1D2A38'; c.lineWidth = 4 / Z;
      [[56, 246], [148, 262], [92, 280]].forEach(([x, y], i) => { openPath(c, boil([0, 1, 2, 3, 4].map(n => [x + n * 14, y + (n % 2 ? -4 : 4)]), seed + i, 1)); c.stroke(); });
    },
  };
  const scene = (c, seed, lit, only) => { c.lineCap = c.lineJoin = 'round'; Object.keys(things).filter(n => !only || only.includes(n)).forEach(n => { c.strokeStyle = CREAM; c.lineWidth = 3 / Z; things[n](c, seed, lit); }); };
  // the beam points at a spot that goes once round him on the ground: towards us is down the screen, away is up
  const aim = phi => Math.atan2(52 + 110 * Math.cos(phi), 168 * Math.sin(phi));
  const lamp = (phi, len, alpha = 1) => (c, d, seed) => {
    c.save(); kit.fade(c, alpha, () => scene(c, seed, false));
    if (len) {
      const x = 128 + 22 * Math.sin(phi), y = 108, a = aim(phi), s = Math.sin(phi), co = Math.cos(phi);
      c.beginPath(); c.moveTo(x, y); c.lineTo(x + len * Math.cos(a - 0.33), y + len * Math.sin(a - 0.33)); c.lineTo(x + len * Math.cos(a + 0.33), y + len * Math.sin(a + 0.33)); c.closePath();
      c.fillStyle = BEAM; c.fill(); c.clip();
      scene(c, seed, true, [co > 0 && 'sea', s > 0.2 && 'boat', co < -0.2 && 'cloud', s < -0.2 && 'rock']);
    }
    c.restore();
  };
  const face = phi => { const dx = 24 * Math.sin(phi); return Math.cos(phi) < -0.15 ? [] : [['dot', 116 + dx, 109, 4.4], ['dot', 140 + dx, 107, 4.4], ['oval', 128 + dx, 125, 4, 5]]; };
  const keeper = (phi, face, view, back) => xf(D.N, { rot: 0.03 * Math.sin(phi), face, extra: { view, back } });

  kit.steps(0, 1, 5).forEach((t, i) => k.add('out' + i, 2, keeper(0, kit.faces.closed, kit.cam(t, kit.HOME, V), i ? lamp(0, 0, i / 4) : undefined)));
  [140, 280, 420].forEach((len, i) => k.add('on' + i, 2, keeper(0, face(0), V, lamp(0, len))));
  for (let f = 1; f <= N; f++) { const phi = TAU * f / N; k.add('turn' + f, 2, keeper(phi, face(phi), V, lamp(phi, 420))); }
  [280, 140].forEach((len, i) => k.add('off' + i, 2, keeper(0, face(0), V, lamp(0, len))));
  kit.steps(0, 1, 5).forEach((t, i) => k.add('home' + i, 2, keeper(0, kit.faces.closed, kit.cam(t, V, kit.HOME), i < 4 ? lamp(0, 0, 1 - i / 4) : undefined)));
  k.done();
})();

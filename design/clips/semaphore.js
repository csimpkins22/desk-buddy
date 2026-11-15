// Semaphore: he signals frantically with two flags, holds the last pose hopefully, and droops when nobody answers.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', L = [90, 140], R = [166, 140];
  const ready = [['dot',116,108,3.8], ['dot',140,106,3.8], ['stroke',[[122,124],[134,123]],2.8]];
  const frantic = [['dot',116,108,3.8], ['dot',140,106,3.8], ['stroke',[[108,98],[121,101]],2.6], ['stroke',[[136,99],[149,95]],2.6], ['mouth',[[123,120],[133,120],[134,127],[128,130],[122,127]]]];
  const hoping = [['dot',116,106,4.4], ['dot',140,104,4.4], ['stroke',[[108,95],[120,93]],2.4], ['stroke',[[136,91],[148,92]],2.4], ['stroke',[[122,122],[128,125],[134,122]],2.8]];
  const flag = (c, [x, y], a, side) => {
    c.save(); c.translate(x, y); c.rotate(a); c.scale(1, side); c.lineJoin = c.lineCap = 'round';
    c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath(); c.moveTo(-4, 0); c.lineTo(42, 0); c.stroke();
    c.fillStyle = '#FFD23F'; c.beginPath(); c.rect(14, -28, 28, 28); c.fill();
    c.fillStyle = '#FF5A4D'; c.beginPath(); c.moveTo(14, -28); c.lineTo(42, -28); c.lineTo(42, 0); c.closePath(); c.fill();
    c.lineWidth = 2; c.beginPath(); c.rect(14, -28, 28, 28); c.stroke();
    c.restore();
  };
  // each arm's angle from straight out (minus is up); the flags fly on the side away from his head
  const pose = (aL, aR, o = {}) => {
    const hl = [L[0] - Math.cos(aL) * 24, L[1] + Math.sin(aL) * 24], hr = [R[0] + Math.cos(aR) * 24, R[1] + Math.sin(aR) * 24];
    return xf(D.N, { ...o, extra: { arm: [L, hl], arm2: [R, hr],
      front: c => { flag(c, hl, Math.PI - aL, aL < -1.2 ? 1 : -1); flag(c, hr, aR, aR < -1.2 ? -1 : 1); } } });
  };
  const SIGNS = [[0, 0], [-0.8, 0.8], [-1.5, -1.5], [0.8, -0.8], [-1.5, 0], [0, -1.5], [-0.8, -0.8], [0.8, 0.8], [-1.5, 0.8], [0, -0.8], [0.8, -1.5], [-0.8, 0]];
  D.semaphore_rest = pose(1, 1, { face: ready });
  SIGNS.forEach(([a, b], i) => { D['semaphore_' + i] = pose(a, b, { face: frantic, rot: i % 2 ? 0.05 : -0.05, ky: i % 2 ? 1 : 0.97 }); });
  D.semaphore_hold1 = pose(-1.05, -1.05, { face: hoping, ky: 1.04 });
  D.semaphore_hold2 = pose(-1.0, -1.1, { face: hoping, ky: 1.03 });
  D.semaphore_droop1 = pose(1.1, 1.1, { face: FACE.puff, ky: 0.93, kx: 1.03 });
  D.semaphore_droop2 = pose(1.05, 1.05, { face: FACE.puff, ky: 0.96 });
  CLIPS.semaphore = { home: 'idle', seq: [...WAKE, ['semaphore_rest', 8], ...SIGNS.map((_, i) => ['semaphore_' + i, 3]),
    ['semaphore_hold1', 6], ['semaphore_hold2', 6], ['semaphore_hold1', 6], ['semaphore_droop1', 5], ['semaphore_droop2', 5], ['semaphore_droop1', 5], ['semaphore_droop2', 5], ...DOZE] };
})();

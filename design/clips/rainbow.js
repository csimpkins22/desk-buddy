// Rainbow: one arcs in behind him. He leaps up out of sight, comes sliding down it, and skids back in beaming.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const BANDS = ['#FF5A4D', '#FF9F1C', '#FFD23F', '#58D68D', '#5AB8FF'], CX = 70, CY = 270, R = 205;
  // drawn from off the left edge round as far as `to` (radians; -1.57 is the top of the arc)
  const rainbow = (to = -0.5, alpha = 1) => c => {
    c.save(); c.globalAlpha = alpha; c.lineWidth = 7.6;
    BANDS.forEach((band, i) => { c.strokeStyle = band; c.beginPath(); c.arc(CX, CY, R - 3.5 - i * 7, -2.2, to); c.stroke(); });
    c.restore();
  };
  const sky = { back: rainbow() };
  // small and far away, sitting on the arc at angle th
  const ride = (th, o = {}) => xf(D.N, { k: 0.5, rot: th + Math.PI / 2, dx: CX + R * Math.cos(th) - 128, dy: CY + R * Math.sin(th) - 201, face: FACE.aah, shadowK: 0.5, extra: sky, ...o });
  const P = 'rainbow_';
  D[P + 1] = xf(D.N, { face: FACE.lookup, extra: { back: rainbow(-1.75) } });
  D[P + 2] = xf(D.N, { face: FACE.lookup, extra: { back: rainbow(-1.2) } });
  D[P + 3] = xf(D.N, { face: FACE.cute, extra: sky });
  D[P + 4] = xf(D.A1, { extra: sky });
  D[P + 5] = xf(D.A2, { dy: -50, extra: sky });
  D[P + 6] = xf(D.A3, { dy: -150, shadowK: 0.5, extra: sky });
  D[P + 7] = xf(D.N, { dx: 300, extra: sky });                    // out of sight: just the rainbow
  D[P + 8] = ride(-1.57, { dy: CY - R - 201 - 44 });
  D[P + 9] = ride(-1.57, { ky: 0.8, kx: 1.1 });
  [-1.5, -1.38, -1.22, -1.02, -0.8, -0.6].forEach((th, i) => { D[P + 'slide' + i] = ride(th); });
  D[P + 10] = xf(D.N, { face: FACE.happy, dx: 110, rot: 0.12, extra: sky });
  D[P + 11] = xf(D.N, { face: FACE.happy, dx: 50, rot: 0.1, extra: sky });
  D[P + 12] = xf(D.N, { face: FACE.happy, dx: 14, rot: 0.05, ky: 0.96, extra: sky });
  D[P + 13] = xf(D.N, { face: FACE.happy, extra: { ...sky, fxm: 'done', fx: [128, 52] } });
  D[P + 14] = xf(D.N, { face: FACE.happy, extra: { back: rainbow(-0.5, 0.4) } });
  CLIPS.rainbow = { home: 'idle', seq: [...WAKE, [P + 1, 3], [P + 2, 3], [P + 3, 10], [P + 4, 4], [P + 5, 2], [P + 6, 2], [P + 7, 4], [P + 8, 2], [P + 9, 3],
    ...[3, 3, 2, 2, 2, 2].map((n, i) => [P + 'slide' + i, n]), [P + 7, 3], [P + 10, 2], [P + 11, 3], [P + 12, 3], [P + 13, 10], [P + 14, 4], ...DOZE] };
})();

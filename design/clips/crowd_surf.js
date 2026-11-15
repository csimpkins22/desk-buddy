// Crowd surf: tiny hands come up from below, he hops on and they pass him along and back. Then they throw him up and leave.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  const lookdown = [['dot',116,114,3.8], ['dot',140,112,3.8], ['stroke',[[123,127],[128,125],[133,127]],2.6], ['stroke',[[108,102],[120,100]],2.4], ['stroke',[[136,98],[148,99]],2.4]];
  const flat = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[121,125],[135,124]],2.8]];
  const hand = (c, x, y, lean) => {
    c.strokeStyle = CREAM; c.lineWidth = 4; c.beginPath(); c.moveTo(x, 244); c.lineTo(x + lean, y + 6); c.stroke();
    c.lineWidth = 2.8; c.beginPath(); [-0.7, 0, 0.7].forEach(a => { c.moveTo(x + lean, y); c.lineTo(x + lean + Math.sin(a) * 11, y - Math.cos(a) * 11); }); c.stroke();
    c.fillStyle = CREAM; c.beginPath(); c.arc(x + lean, y, 6, 0, Math.PI * 2); c.fill();
  };
  // a row of hands along the bottom; those under him (middle at cx, underside at `base`, sloping by `tilt`) hold him up
  const crowd = (phase, cx, base, tilt = 0) => (c, d, seed) => {
    c.save(); c.lineCap = 'round';
    for (let i = 0; i < 10; i++) {
      const x = 12 + i * 24, under = base && Math.abs(x - cx) < 58;
      hand(c, x, under ? base + (x - cx) * tilt + 5 : 216 - 10 * Math.abs(Math.sin(phase + i * 1.9)), under ? 0 : (i + phase) % 2 ? 3 : -3);
    }
    c.restore();
  };
  const surf = (dx, lift, rot, face, phase) => {
    const P = ([x, y]) => [128 + (x - 128) * Math.cos(rot) - (y - 201) * Math.sin(rot) + dx, 201 + (x - 128) * Math.sin(rot) + (y - 201) * Math.cos(rot) - lift];
    return xf(D.N, { face, rot, dx, dy: -lift, shadowK: 0.6, extra: { arm: [P([94, 134]), P([66, 118])], arm2: [P([162, 132]), P([190, 116])], front: crowd(phase, 128 + dx, 201 - lift, Math.sin(rot)) } });
  };
  D.crowd_surf_1 = xf(D.N, { face: lookdown, extra: { fxm: 'alert', fx: [150, 58], front: crowd(0) } });
  D.crowd_surf_2 = xf(D.N, { face: lookdown, extra: { front: crowd(1) } });
  D.crowd_surf_3 = xf(D.N, { face: FACE.happy, dy: -44, ky: 1.08, kx: 0.94, shadowK: 0.7, extra: { front: crowd(0, 128, 172) } });
  D.crowd_surf_4 = surf(0, 22, -0.1, FACE.happy, 1);
  const PASS = [28, 56, 84, 56, 28, 0, -28, -56, -84, -56, -28, 0];
  PASS.forEach((dx, i) => { D['crowd_surf_pass' + i] = surf(dx, i % 2 ? 26 : 36, i % 2 ? -0.26 : -0.1, i % 2 ? FACE.happy : FACE.aah, i % 2); });
  D.crowd_surf_5 = xf(D.N, { face: FACE.aah, dy: -62, ky: 1.06, shadowK: 0.5, extra: { arm: [[94, 72], [70, 50]], arm2: [[162, 70], [186, 48]], front: crowd(0, 128, 178) } });
  D.crowd_surf_6 = xf(D.N, { face: FACE.shock, dy: -66, shadowK: 0.5 });
  D.crowd_surf_7 = xf(D.N, { face: FACE.shock, dy: -24, ky: 1.08, kx: 0.95, shadowK: 0.8 });
  D.crowd_surf_8 = xf(D.N, { face: FACE.chooEyes, ky: 0.66, kx: 1.2, extra: { fxm: 'alert', fx: [176, 100] } });
  D.crowd_surf_9 = xf(D.N, { face: flat, ky: 0.95, kx: 1.02 });
  D.crowd_surf_10 = xf(D.N, { face: FACE.grump });
  CLIPS.crowd_surf = { home: 'idle', seq: [...WAKE, ['crowd_surf_1', 4], ['crowd_surf_2', 4], ['crowd_surf_1', 4], ['crowd_surf_3', 3], ['crowd_surf_4', 4],
    ...PASS.map((_, i) => ['crowd_surf_pass' + i, 3]), ['crowd_surf_4', 3], ['crowd_surf_5', 3], ['crowd_surf_6', 4], ['crowd_surf_7', 2], ['crowd_surf_8', 4], ['crowd_surf_9', 6], ['crowd_surf_10', 10], ...DOZE] };
})();

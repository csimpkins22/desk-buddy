// Magnifying glass: he peers through one and that eye goes huge. He puts it down, and the eye stays huge for a beat.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, mixHex, tint } = window.__lump;
  const CREAM = '#FFF1DC';
  const smile = ['stroke',[[122,124],[128,126],[134,124]],2.6], oh = ['dot',128,125,3];
  const curious = [['dot',119,110,3.8], ['dot',143,108,3.8], smile];
  const stuck = mouth => [['dot',116,110,3.8], ['oval',143,104,14,16], ['shine',148,98,4], mouth];
  const blink = [['stroke',[[110,110],[122,110]],2.8], ['stroke',[[132,107],[152,107]],3.2], smile];
  // lens at (x, y) with its handle off at angle a. look: where the huge eye is looking, 'blink', or nothing when he isn't behind it
  const glass = (x, y, r, a, look) => (c, d, seed) => {
    const ux = Math.cos(a), uy = Math.sin(a);
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.beginPath(); c.moveTo(x + ux * r, y + uy * r); c.lineTo(x + ux * (r + 28), y + uy * (r + 28));
    c.strokeStyle = CREAM; c.lineWidth = 10; c.stroke(); c.strokeStyle = '#6B4A1F'; c.lineWidth = 6; c.stroke();
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2);
    c.fillStyle = look ? mixHex(tint(), '#FFFFFF', 0.3) : 'rgba(159,176,196,.3)'; c.fill(); c.strokeStyle = CREAM; c.lineWidth = 4.5; c.stroke();
    if (look === 'blink') { c.strokeStyle = '#0B0E14'; c.lineWidth = 4; c.beginPath(); c.moveTo(x - r * 0.6, y); c.quadraticCurveTo(x, y + r * 0.3, x + r * 0.6, y); c.stroke(); }
    else if (look) {
      const ex = x + look[0], ey = y + look[1];
      c.fillStyle = '#0B0E14'; c.beginPath(); c.ellipse(ex, ey, r * 0.52, r * 0.6, 0, 0, Math.PI * 2); c.fill();
      c.fillStyle = CREAM; c.beginPath(); c.arc(ex + r * 0.2, ey - r * 0.26, r * 0.15, 0, Math.PI * 2); c.fill();
    } else { c.globalAlpha = 0.7; c.lineWidth = 2.2; c.beginPath(); c.arc(x, y, r * 0.62, -2.5, -1.7); c.stroke(); }
    c.restore();
  };
  const SIDE = { arm2: [[166, 142], [188, 148]], front: glass(206, 108, 18, 1.9) };
  const UP = { arm2: [[166, 142], [182, 136]] };
  const peer = look => ({ ...UP, front: glass(144, 106, 24, 0.6, look) });
  const close = look => ({ arm2: [[170, 136], [188, 126]], front: glass(144, 95, 31, 0.6, look) });
  D.magnifying_glass_1 = xf(D.N, { face: curious, extra: SIDE });
  D.magnifying_glass_2 = xf(D.N, { face: curious, extra: { arm2: [[166, 142], [190, 144]], front: glass(178, 104, 21, 1.2) } });
  D.magnifying_glass_3 = xf(D.N, { face: [smile], extra: peer([0, 0]) });
  D.magnifying_glass_4 = xf(D.N, { face: [smile], rot: -0.04, extra: peer([-6, 1]) });
  D.magnifying_glass_5 = xf(D.N, { face: [smile], rot: 0.04, extra: peer([6, -1]) });
  D.magnifying_glass_6 = xf(D.N, { face: [oh], k: 1.12, extra: close([0, 0]) });
  D.magnifying_glass_7 = xf(D.N, { face: [oh], k: 1.12, extra: close('blink') });
  D.magnifying_glass_8 = xf(D.N, { face: stuck(smile), extra: SIDE });
  D.magnifying_glass_9 = xf(D.N, { face: stuck(oh), ky: 0.96, extra: { ...SIDE, fxm: 'alert', fx: [112, 60] } });
  D.magnifying_glass_10 = xf(D.N, { face: blink, ky: 0.93, kx: 1.04, extra: SIDE });
  D.magnifying_glass_11 = xf(D.N, { face: FACE.sheep, extra: SIDE });
  CLIPS.magnifying_glass = { home: 'idle', seq: [...WAKE, ['magnifying_glass_1', 8], ['magnifying_glass_2', 3], ['magnifying_glass_3', 8],
    ['magnifying_glass_4', 5], ['magnifying_glass_5', 5], ['magnifying_glass_6', 8], ['magnifying_glass_7', 2], ['magnifying_glass_6', 6],
    ['magnifying_glass_2', 3], ['magnifying_glass_8', 10], ['magnifying_glass_9', 7], ['magnifying_glass_10', 3], ['magnifying_glass_11', 8], ...DOZE] };
})();

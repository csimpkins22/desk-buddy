// Hiccups: the tap leaves him with hiccups that holding his breath won't shift. A second, bigger tap frightens them out of him.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  const jolt = [['dot',116,107,4.4], ['dot',140,105,4.4], ['mouth',[[124,119],[132,119],[133,126],[128,129],[123,126]]]];
  const hm = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[122,125],[128,123],[134,125]],2.6], ['stroke',[[108,99],[120,96]],2.4]];
  const lookl = [['dot',110,110,3.8], ['dot',134,108,3.8], ['stroke',[[118,125],[124,124],[130,125]],2.6]];
  const tap = (x, y, r) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineCap = 'round'; c.lineWidth = 3;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke();
    c.globalAlpha = 0.5; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r * 1.8, 0, Math.PI * 2); c.stroke(); c.restore();
  };
  // "HIC!" in strokes, k times life size
  const hic = (x, y, tilt, k = 1) => c => {
    c.save(); c.translate(x, y); c.rotate(tilt); c.scale(k, k); c.strokeStyle = c.fillStyle = CREAM; c.lineWidth = 3.2; c.lineCap = c.lineJoin = 'round';
    c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 16); c.moveTo(10, 0); c.lineTo(10, 16); c.moveTo(0, 8); c.lineTo(10, 8); c.moveTo(18, 0); c.lineTo(18, 16);
    c.moveTo(39, 3); c.arc(33, 8, 8, -0.7, 0.7, true); c.moveTo(48, 0); c.lineTo(48, 9); c.stroke();
    c.beginPath(); c.arc(48, 16, 2, 0, Math.PI * 2); c.fill();
    c.restore();
  };
  const P = 'hiccups_', up = (h, front) => xf(D.N, { face: jolt, dy: -h, ky: 1.1, kx: 0.93, shadowK: 0.8, extra: { front } });
  D[P + 'tap'] = xf(D.N, { face: FACE.lookr, extra: { front: tap(208, 112, 8) } });
  D[P + 'start'] = xf(D.K1, { extra: { front: tap(208, 112, 16), fxm: 'none' } });
  D[P + 'hic1'] = up(12, hic(180, 60, -0.2));
  D[P + 'hm'] = xf(D.N, { face: hm });
  D[P + 'hic2'] = up(14, hic(24, 78, 0.18));
  D[P + 'cross'] = xf(D.N, { face: FACE.grump });
  D[P + 'hold1'] = xf(D.N, { face: FACE.puff, kx: 1.04 });
  D[P + 'hold2'] = xf(D.N, { face: FACE.puff, kx: 1.09, ky: 1.02 });
  D[P + 'hic3'] = up(22, hic(170, 40, -0.2, 1.25));
  D[P + 'fedup'] = xf(D.R1, {});
  D[P + 'boo1'] = xf(D.R1, { extra: { front: tap(40, 120, 14) } });
  D[P + 'boo2'] = xf(D.N, { face: FACE.shock, dy: -34, ky: 1.16, kx: 0.9, shadowK: 0.6, extra: { front: tap(40, 120, 26), fxm: 'alert', fx: [176, 40] } });
  D[P + 'boo3'] = xf(D.N, { face: FACE.shock, ky: 0.82, kx: 1.12 });
  D[P + 'frozen'] = xf(D.N, { face: FACE.shock });
  D[P + 'wait1'] = xf(D.N, { face: lookl });
  D[P + 'wait2'] = xf(D.N, { face: FACE.lookr });
  D[P + 'cured'] = xf(D.P1, { extra: { fxm: 'none' } });
  const s = (...a) => a.map(([n, t]) => [P + n, t]);
  CLIPS.hiccups = { home: 'idle', seq: [...WAKE, ...s(['tap', 4], ['start', 4], ['hic1', 3], ['hm', 10], ['hic2', 3], ['cross', 8], ['hold1', 5], ['hold2', 7], ['hic3', 4], ['fedup', 8],
    ['boo1', 2], ['boo2', 3], ['boo3', 2], ['frozen', 6], ['wait1', 6], ['wait2', 6], ['cured', 3]), ['C1', 10], ...DOZE] };
})();

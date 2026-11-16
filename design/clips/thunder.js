// Thunder: a dark cloud, a bolt and a flash. He dives under a blanket, and peeks out once it has gone quiet.
// group: weather
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A';
  const wary = [['dot',112,104,3.8], ['dot',136,102,3.8], ['stroke',[[122,124],[128,122],[134,124]],2.6]];
  const nervous = [['dot',112,104,3.8], ['dot',136,102,3.8], ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6]];
  // behind him. cx: where the cloud is (undefined: gone). flash: the whole sky lit.
  const storm = (cx, bolt, flash) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM;
    if (flash) { c.fillStyle = CREAM; c.fillRect(0, 0, 240, 240); }
    if (bolt) {
      c.fillStyle = '#FFD23F'; c.lineWidth = 2.6; c.beginPath();
      [[46, 40], [22, 112], [40, 112], [20, 188], [66, 96], [46, 96], [66, 40]].forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y));
      c.closePath(); c.fill(); c.stroke();
    }
    if (cx !== undefined) {
      c.beginPath(); [[-26, 4, 15], [-8, -8, 19], [14, -5, 17], [30, 6, 14], [2, 9, 16]].forEach(([x, y, r]) => { c.moveTo(cx + x + r, 30 + y); c.arc(cx + x, 30 + y, r, 0, Math.PI * 2); });
      c.lineWidth = 5; c.stroke(); c.fillStyle = '#6F7C8C'; c.fill();
    }
    c.restore();
  };
  // over him, in front. shake: sideways shiver. squash: its height. look: eyes in a gap, -1 left, 0, 1 right, 'shut'.
  const blanket = ({ shake = 0, squash = 1, look } = {}) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.translate(128 + shake, 201); c.scale(1, squash); c.translate(-128, -201);
    c.fillStyle = '#5AB8FF'; c.strokeStyle = CREAM; c.lineWidth = 3;
    closedPath(c, boil([[46, 203], [56, 160], [76, 118], [104, 96], [132, 88], [160, 96], [182, 120], [198, 160], [210, 203]], seed + 3, 1.6), [0, 8]); c.fill(); c.stroke();
    c.lineWidth = 2; c.setLineDash([4, 6]); openPath(c, [[58, 190], [128, 184], [198, 190]]); c.stroke(); c.setLineDash([]);
    if (look !== undefined) {
      c.fillStyle = DARK; c.beginPath(); c.ellipse(128, 148, 36, 21, 0, 0, Math.PI * 2); c.fill(); c.stroke();
      [-14, 14].forEach(x => {
        if (look === 'shut') { c.lineWidth = 3; c.beginPath(); c.moveTo(120 + x, 149); c.lineTo(136 + x, 149); c.stroke(); return; }
        c.fillStyle = CREAM; c.beginPath(); c.ellipse(128 + x, 148, 9, 11, 0, 0, Math.PI * 2); c.fill();
        c.fillStyle = DARK; c.beginPath(); c.arc(128 + x + look * 4, 149, 4.6, 0, Math.PI * 2); c.fill();
      });
    }
    c.restore();
  };
  const dropped = (c, d, seed) => {
    c.save(); c.lineJoin = 'round'; c.fillStyle = '#5AB8FF'; c.strokeStyle = CREAM; c.lineWidth = 3;
    closedPath(c, boil([[44, 203], [60, 186], [92, 178], [128, 185], [164, 177], [198, 186], [212, 203]], seed + 3, 1.6), [0, 6]); c.fill(); c.stroke(); c.restore();
  };
  const P = 'thunder_', JUMP = { ky: 0.84, kx: 1.1, face: FACE.shock }, UNDER = { ky: 0.6, kx: 0.95 };
  const hid = (sky, b) => xf(D.N, { ...UNDER, extra: { back: storm(...sky), front: blanket(b) } });
  D[P + 1] = xf(D.N, { face: wary, extra: { back: storm(14) } });
  D[P + 2] = xf(D.N, { face: nervous, extra: { back: storm(72) } });
  D[P + 3] = xf(D.N, { ...JUMP, extra: { back: storm(72, true), fxm: 'alert', fx: [150, 84] } });
  D[P + 4] = xf(D.N, { ...JUMP, extra: { back: storm(72, false, true) } });
  D[P + 5] = hid([72], { squash: 1.12 });
  D[P + 6] = hid([72], { shake: -2 });
  D[P + 7] = hid([72], { shake: 2 });
  D[P + 8] = hid([72, true], { squash: 0.88 });
  D[P + 9] = hid([72, false, true], { squash: 0.88 });
  D[P + 10] = hid([34]);
  D[P + 11] = hid([4], { look: -1 });
  D[P + 12] = hid([], { look: 1 });
  D[P + 13] = hid([], { look: 0 });
  D[P + 14] = hid([], { look: 'shut' });
  D[P + 15] = xf(D.N, { face: FACE.sheep, extra: { front: dropped } });
  const shiver = n => Array.from({ length: n }, (_, i) => [P + (6 + i % 2), 2]);
  CLIPS.thunder = { home: 'idle', seq: [...WAKE, [P + 1, 4], [P + 2, 8], [P + 3, 3], [P + 4, 2], [P + 5, 2], ...shiver(6), [P + 8, 3], [P + 9, 2], ...shiver(4),
    [P + 10, 5], [P + 11, 8], [P + 12, 8], [P + 13, 4], [P + 14, 3], [P + 13, 5], [P + 15, 8], ...DOZE] };
})();

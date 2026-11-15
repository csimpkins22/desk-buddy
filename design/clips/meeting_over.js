// Meeting over: the meeting's flip-chart page drops in front of him. Two thumps from behind, then he bursts out through it and what's left falls away.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', TAN = '#C9B99A';
  const whoop = [...FACE.aahEyes, ['mouth',[[114,118],[142,116],[139,133],[128,138],[117,133]],[128,134,8,4]]];
  const poly = (c, pts) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); };
  // the page, pulled down as far as y = h: an agenda and a little chart
  const page = (c, h) => {
    const y0 = h - 240;
    c.lineJoin = c.lineCap = 'round'; c.fillStyle = CREAM; c.fillRect(0, y0, 240, 240);
    c.strokeStyle = TAN; c.lineWidth = 6; c.beginPath();
    [[22, 30, 112], [36, 54, 150], [36, 74, 128], [36, 94, 158]].forEach(([x, y, x1]) => { c.moveTo(x, y0 + y); c.lineTo(x1, y0 + y); });
    c.stroke(); c.lineWidth = 12; c.beginPath();
    [[172, 30], [192, 54], [212, 22]].forEach(([x, up]) => { c.moveTo(x, y0 + 216); c.lineTo(x, y0 + 216 - up); });
    c.stroke();
  };
  const dent = k => { const body = xf(D.N, { k }).body; return (c, d, seed) => {      // him, pushing into it from behind
    page(c, 240);
    closedPath(c, boil(body, seed, 2)); c.strokeStyle = TAN; c.lineWidth = 5; c.stroke();
    if (k > 1) {                                                                       // second thump: it starts to tear
      c.strokeStyle = DARK; c.lineWidth = 2.6; c.beginPath();
      for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + 0.4, p = r => [128 + Math.cos(a + (r > 40 ? 0.18 : 0)) * r, 128 + Math.sin(a + (r > 40 ? 0.18 : 0)) * r]; c.moveTo(...p(14)); c.lineTo(...p(40)); c.lineTo(...p(40 + (i % 3) * 14 + 22)); }
      c.stroke();
    }
  }; };
  // what's left of the page around a ragged hole; drop: how far it has fallen away
  const torn = (r, drop = 0) => (c, d, seed) => {
    const P = Array.from({ length: 16 }, (_, i) => { const a = i / 16 * Math.PI * 2, rr = r * (i % 2 ? 0.78 : 1.1); return [128 + Math.cos(a) * rr * 1.06, 118 + Math.sin(a) * rr]; });
    c.save(); c.translate(0, drop); c.rotate(drop * 0.0012);
    page(c, 240);
    c.fillStyle = '#E3D3B4'; poly(c, P.filter((_, i) => i % 2 === 0)); c.fill();                                // the torn teeth, in shadow
    c.fillStyle = '#000000'; c.strokeStyle = DARK; c.lineWidth = 2.6; poly(c, P); c.fill(); c.stroke();
    c.restore();
  };
  const scraps = k => (c, d, seed) => {
    c.save(); c.fillStyle = CREAM; c.strokeStyle = DARK; c.lineWidth = 1.6; c.lineJoin = 'round';
    for (let i = 0; i < 9; i++) {
      const a = i / 9 * Math.PI * 2 + 0.3, r = 66 + Math.min(k, 3.5) * 16 + (i % 3) * 9;
      c.save(); c.translate(128 + Math.cos(a) * r * 1.05, Math.min(196, 112 + Math.sin(a) * r + k * k * 3)); c.rotate(a * 2 + k);
      poly(c, [[-12, -8], [13, -3], [-4, 12]]); c.fill(); c.stroke(); c.restore();
    }
    c.restore();
  };
  const UP = { arm: [[92, 128], [74, 96]], arm2: [[164, 128], [182, 96]] };
  [80, 160].forEach((h, i) => { D['meeting_over_down' + i] = xf(D.N, { face: FACE.lookup, extra: { front: c => page(c, h) } }); });
  D.meeting_over_flat = xf(D.N, { extra: { front: c => page(c, 240) } });
  D.meeting_over_thump1 = xf(D.N, { extra: { front: dent(0.92) } });
  D.meeting_over_thump2 = xf(D.N, { extra: { front: dent(1.08) } });
  D.meeting_over_out1 = xf(D.N, { k: 1.1, dy: -20, shadowK: 0.7, face: whoop, extra: { arm: [[88, 116], [66, 84]], arm2: [[168, 116], [190, 84]], back: torn(80), front: scraps(0) } });
  D.meeting_over_out2 = xf(D.N, { k: 1.3, dy: -8, shadowK: 0.8, face: whoop, extra: { arm: [[80, 112], [52, 74]], arm2: [[176, 112], [204, 74]], back: torn(104), front: scraps(1.5) } });
  D.meeting_over_land = xf(D.N, { ky: 0.84, kx: 1.1, face: whoop, extra: { back: torn(104), front: scraps(3) } });
  D.meeting_over_yay1 = xf(D.N, { face: FACE.happy, extra: { ...UP, back: torn(104), front: scraps(5) } });
  D.meeting_over_yay2 = xf(D.N, { face: FACE.happy, ky: 1.04, extra: { arm: [[92, 126], [78, 90]], arm2: [[164, 126], [178, 90]], back: torn(104), front: scraps(8) } });
  D.meeting_over_fall1 = xf(D.N, { face: FACE.happy, extra: { back: torn(104, 70), front: scraps(8) } });
  D.meeting_over_fall2 = xf(D.N, { face: FACE.happy, extra: { back: torn(104, 170), front: scraps(8) } });
  D.meeting_over_free = xf(D.C1, { extra: { front: scraps(8) } });
  const n = s => 'meeting_over_' + s;
  CLIPS.meeting_over = { home: 'idle', seq: [...WAKE, [n('down0'), 2], [n('down1'), 2], [n('flat'), 8], [n('thump1'), 3], [n('flat'), 5], [n('thump2'), 8],
    [n('out1'), 2], [n('out2'), 6], [n('land'), 3], [n('yay1'), 4], [n('yay2'), 4], [n('yay1'), 4], [n('fall1'), 2], [n('fall2'), 2], [n('free'), 14], ...DOZE] };
})();

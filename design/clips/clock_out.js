// Clock out: he drops his card into a little time clock (ka-chunk, green light), then moonwalks off one side of the screen and back in the other.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  const cool = [['stroke',[[112,109],[124,109]],3], ['stroke',[[136,107],[148,107]],3], ['stroke',[[123,125],[131,128],[140,122]],2.8]];
  // card: where his card is (drawn first, so the clock swallows its end). drop: the clock knocked down as it stamps. lit: the green light.
  const clock = ({ card, drop = 0, lit = false } = {}) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    if (card) {
      c.fillStyle = CREAM; c.beginPath(); c.roundRect(card[0] - 8, card[1] - 11, 16, 22, 2); c.fill();
      c.strokeStyle = '#17161A'; c.lineWidth = 1.6; c.beginPath(); [-4, 1].forEach(y => { c.moveTo(card[0] - 4, card[1] + y); c.lineTo(card[0] + 4, card[1] + y); }); c.stroke();
    }
    c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.moveTo(212, 150); c.lineTo(212, 200); c.moveTo(200, 200); c.lineTo(224, 200); c.stroke();
    c.translate(0, drop);
    c.fillStyle = '#17161A'; c.beginPath(); c.roundRect(190, 90, 44, 62, 7); c.fill(); c.stroke();
    c.beginPath(); c.arc(212, 116, 14, 0, Math.PI * 2); c.moveTo(212, 116); c.lineTo(212, 106); c.moveTo(212, 116); c.lineTo(217, 124); c.stroke();
    c.fillStyle = lit ? '#58D68D' : '#9FB0C4'; c.globalAlpha = lit ? 1 : 0.5; c.beginPath(); c.arc(212, 141, 4.5, 0, Math.PI * 2); c.fill(); c.globalAlpha = 1;
    if (drop) { c.beginPath(); [[186, 84, 178, 76], [238, 84, 240, 74], [184, 100, 174, 98]].forEach(([x0, y0, x1, y1]) => { c.moveTo(x0, y0); c.lineTo(x1, y1); }); c.stroke(); }
    c.restore();
  };
  D.clock_out_1 = xf(D.N, { face: FACE.lookr, extra: { front: clock() } });
  D.clock_out_2 = xf(D.N, { face: FACE.happy, extra: { arm2: [[166, 140], [188, 118]], front: clock({ card: [196, 106] }) } });
  D.clock_out_3 = xf(D.N, { face: FACE.lookr, rot: 0.05, extra: { arm2: [[168, 132], [200, 84]], front: clock({ card: [212, 76] }) } });
  D.clock_out_4 = xf(D.N, { face: FACE.grump, rot: 0.07, extra: { arm2: [[168, 132], [202, 92]], front: clock({ card: [212, 86], drop: 3 }) } });
  D.clock_out_5 = xf(D.N, { face: FACE.grump, rot: 0.06, extra: { arm2: [[168, 132], [202, 90]], front: clock({ card: [212, 84], drop: 1, lit: true }) } });
  D.clock_out_6 = xf(D.N, { face: FACE.happy, extra: { arm2: [[166, 140], [188, 118]], front: clock({ card: [196, 106], lit: true }) } });
  D.clock_out_7 = xf(D.N, { face: cool, extra: { front: clock({ lit: true }) } });
  // the moonwalk: facing the clock, gliding backwards away from it, on twos
  const glide = (name, dx, i, front) => {
    const lines = (c, d, seed) => {
      if (front) front(c, d, seed);
      c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.4; c.lineCap = 'round'; c.globalAlpha = 0.7;
      c.beginPath(); c.moveTo(196 + dx, 196); c.lineTo(212 + dx, 196); c.moveTo(200 + dx, 186); c.lineTo(212 + dx, 186); c.stroke(); c.restore();
    };
    D[name] = xf(D.N, { face: cool, dx, ...(i % 2 ? { rot: 0.02, ky: 0.95, kx: 1.04 } : { rot: 0.08, ky: 1.03, kx: 0.98 }),
      extra: { front: lines, ...(i % 2 ? { arm: [[92 + dx, 142], [68 + dx, 152]] } : { arm2: [[168 + dx, 138], [196 + dx, 130]] }) } });
    return [name, 2];
  };
  const away = Array.from({ length: 16 }, (_, i) => glide('clock_out_away' + i, -12 * (i + 1), i, clock({ lit: true })));
  const back = Array.from({ length: 15 }, (_, i) => glide('clock_out_back' + i, 180 - 12 * i, i));
  CLIPS.clock_out = { home: 'idle', seq: [...WAKE, ['clock_out_1', 8], ['clock_out_2', 8], ['clock_out_3', 4], ['clock_out_4', 2], ['clock_out_5', 3], ['clock_out_6', 8], ['clock_out_7', 5],
    ...away, ...back, ['C1', 6], ...DOZE] };
})();

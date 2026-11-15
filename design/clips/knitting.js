// Knitting: his needles click and a striped scarf runs off one side of the screen and back in the other. Nobody to give it to, so he wears it.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', BLUE = '#5AB8FF', STRIPE = 12;
  const busy = [['dot',117,113,3.6], ['dot',141,111,3.6], ['stroke',[[123,125],[128,127],[133,125]],2.6]];
  const lookl = [['dot',108,110,3.8], ['dot',132,108,3.8], ['stroke',[[116,124],[121,126],[126,124]],2.6]];
  const shrug = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[121,125],[135,124]],2.8], ['stroke',[[108,99],[120,96]],2.4], ['stroke',[[136,94],[148,95]],2.4]];
  // the scarf is a path: down from the needles, along the floor off the right edge, then in again from the left
  const LEGS = [[46, s => [114, 150 + s, 28, 0]], [98, s => [142 + s, 185, 0, 12]], [70, s => [s, 185, 0, 12]]];
  const scarf = (c, len) => {
    for (let k = 0, e = len; e > 0; k++, e -= STRIPE) {  // stripes are counted from the far end, so they travel as it grows
      c.fillStyle = k % 2 ? CREAM : BLUE;
      let from = 0;
      for (const [size, place] of LEGS) {
        const lo = Math.max(e - STRIPE, from) - from, hi = Math.min(e, from + size) - from;
        if (hi > lo) { const [x, y, w, h] = place(lo); c.fillRect(x, y, w || hi - lo, h || hi - lo); }
        from += size;
      }
    }
  };
  const knit = (len, up) => (c, d, seed) => {
    c.save(); c.lineCap = 'round'; scarf(c, len);
    c.strokeStyle = CREAM; c.lineWidth = 3.2; c.fillStyle = CREAM;
    for (const side of [-1, 1]) {
      const a = side * (0.62 + (up ? 0.16 : 0) * side), dx = Math.sin(a) * 30, dy = Math.cos(a) * 30;
      c.beginPath(); c.moveTo(128 - dx, 148 + dy); c.lineTo(128 + dx, 148 - dy); c.stroke();
      c.beginPath(); c.arc(128 + dx, 148 - dy, 3.6, 0, Math.PI * 2); c.fill();
    }
    c.restore();
  };
  const worn = (c, d, seed) => {
    c.save(); scarf(c, 0);
    [[76, 118, 118], [70, 140, 126], [63, 162, 130]].forEach(([x, y, w], i) => {
      c.save(); c.beginPath(); c.roundRect(x, y, w, 23, 10); c.clip();
      for (let k = 0; k * STRIPE < w; k++) { c.fillStyle = (k + i) % 2 ? CREAM : BLUE; c.fillRect(x + k * STRIPE, y, STRIPE, 23); }
      c.restore();
      c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.roundRect(x, y, w, 23, 10); c.stroke();
    });
    for (let k = 0; k < 6; k++) { c.fillStyle = k % 2 ? CREAM : BLUE; c.fillRect(193 + k * STRIPE, 185, STRIPE, 12); c.fillRect(63 - (k + 1) * STRIPE, 185, STRIPE, 12); }
    c.restore();
  };
  const hands = up => ({ arm: [[94, 146], [108, 158 - (up ? 5 : 0)]], arm2: [[162, 146], [148, 153 + (up ? 5 : 0)]] });
  const LENGTHS = [6, 14, 30, 46, 78, 110, 146, 178, 212], seq = [...WAKE];
  LENGTHS.forEach((len, i) => {
    for (const up of [0, 1]) D[`knitting_${i}${up}`] = xf(D.N, { face: busy, extra: { ...hands(up), front: knit(len, up) } });
    for (let n = i ? 1 : 2; n--;) seq.push([`knitting_${i}0`, 3], [`knitting_${i}1`, 3]);
  });
  const still = { ...hands(0), front: knit(214, 0) };
  D.knitting_l = xf(D.N, { face: lookl, extra: still });
  D.knitting_r = xf(D.N, { face: FACE.lookr, extra: still });
  D.knitting_s = xf(D.N, { face: shrug, extra: still });
  D.knitting_w1 = xf(D.N, { face: FACE.aahEyes, extra: { front: worn } });
  D.knitting_w2 = xf(D.N, { face: FACE.aahEyes, ky: 0.97, kx: 1.02, extra: { front: worn } });
  CLIPS.knitting = { home: 'idle', seq: [...seq, ['knitting_l', 8], ['knitting_r', 8], ['knitting_s', 8],
    ['knitting_w1', 5], ['knitting_w2', 5], ['knitting_w1', 5], ['knitting_w2', 5], ['knitting_w1', 5], ['knitting_w2', 5], ...DOZE] };
})();

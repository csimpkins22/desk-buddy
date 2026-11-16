// Slow clap: one deadpan clap, then another, a little sooner each time, until his arms are a blur and his hands are smoking.
// group: celebrations
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, tint } = window.__lump;
  const CREAM = '#FFF1DC';
  const deadpan = [['stroke',[[109,106],[123,106]],2.6], ['dot',116,110,2.8], ['stroke',[[133,104],[147,104]],2.6], ['dot',140,108,2.8], ['stroke',[[122,124],[134,124]],2.6]];
  const warming = [['dot',116,109,3.8], ['dot',140,107,3.8], ['stroke',[[121,122],[128,125],[135,122]],2.8]];
  const manic = [['oval',114,105,7,8], ['oval',142,103,7,8], ['shine',116,102,2.4], ['shine',144,100,2.4], ['mouth',[[114,118],[144,116],[141,130],[129,135],[118,130]],[129,132,8,3.5]]];
  const ouch = [...FACE.chooEyes, ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6]];
  const APART = { arm: [[94, 150], [70, 134]], arm2: [[162, 150], [186, 134]] }, TOGETHER = { arm: [[96, 162], [121, 164]], arm2: [[160, 162], [135, 164]] };
  const smack = c => { c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); [[-15, -12, -23, -21], [0, -14, 0, -25], [15, -12, 23, -21]].forEach(([a, b, x, y]) => { c.moveTo(128 + a, 164 + b); c.lineTo(128 + x, 164 + y); }); c.stroke(); c.restore(); };
  // too fast to see: each arm drawn four times over between apart and together, and the arcs their hands leave
  const blur = turn => c => {
    c.save(); c.lineCap = 'round';
    [-1, 1].forEach(side => {
      for (let i = 0; i < 4; i++) {
        const p = Math.min(1, (i + turn) / 3.5), x = 128 + side * (58 - 51 * p), y = 134 + 30 * p;
        c.beginPath(); c.moveTo(128 + side * 34, 152 + 10 * p); c.lineTo(x, y);
        c.globalAlpha = 0.75; c.strokeStyle = CREAM; c.lineWidth = 17; c.stroke(); c.globalAlpha = 1; c.strokeStyle = tint(); c.lineWidth = 12; c.stroke();
      }
      c.strokeStyle = CREAM; c.lineWidth = 2.6; c.globalAlpha = 0.7;
      for (let i = 0; i < 2; i++) { const r = 44 + i * 9 + turn * 6, a = side > 0 ? -0.9 : Math.PI + 0.2; c.beginPath(); c.arc(128 + side * 34, 160, r, a, a + 0.7); c.stroke(); }
    });
    c.restore(); smack(c);
  };
  const smoke = (c, d, seed) => {
    c.save(); c.lineCap = 'round';
    [70, 186].forEach((x, k) => {
      c.globalAlpha = 0.75; c.fillStyle = '#FF5A4D'; c.beginPath(); c.arc(x, 134, 9, 0, Math.PI * 2); c.fill();
      c.globalAlpha = 0.65; c.strokeStyle = CREAM; c.lineWidth = 2.4; openPath(c, boil([[x, 120], [x - 5, 110], [x + 4, 100], [x - 3, 90]], seed + k * 5, 2)); c.stroke();
    });
    c.restore();
  };
  D.slow_clap_1 = xf(D.N, { face: deadpan, extra: APART });
  D.slow_clap_2 = xf(D.N, { face: deadpan, extra: { ...TOGETHER, front: smack } });
  D.slow_clap_3 = xf(D.N, { face: warming, extra: APART });
  D.slow_clap_4 = xf(D.N, { face: warming, ky: 0.98, extra: { ...TOGETHER, front: smack } });
  D.slow_clap_5 = xf(D.N, { face: FACE.happy, extra: APART });
  D.slow_clap_6 = xf(D.N, { face: FACE.happy, ky: 0.97, extra: { ...TOGETHER, front: smack } });
  D.slow_clap_7 = xf(D.N, { face: manic, dx: -2, ky: 1.02, extra: { front: blur(0) } });
  D.slow_clap_8 = xf(D.N, { face: manic, dx: 2, ky: 1.02, extra: { front: blur(0.5) } });
  D.slow_clap_9 = xf(D.N, { face: FACE.shock, extra: { ...APART, front: smoke } });
  D.slow_clap_10 = xf(D.N, { face: ouch, ky: 0.96, extra: { ...APART, front: smoke } });
  const clap = (a, b, gaps) => gaps.flatMap(([open, shut]) => [[a, open], [b, shut]]);
  CLIPS.slow_clap = { home: 'idle', seq: [...WAKE, ...clap('slow_clap_1', 'slow_clap_2', [[12, 4], [11, 4]]), ...clap('slow_clap_3', 'slow_clap_4', [[8, 3], [6, 3]]),
    ...clap('slow_clap_5', 'slow_clap_6', [[4, 2], [3, 2], [2, 2], [2, 2]]), ...clap('slow_clap_7', 'slow_clap_8', Array(7).fill([2, 2])),
    ['slow_clap_9', 6], ['slow_clap_10', 5], ['slow_clap_9', 4], ['slow_clap_10', 8], ...DOZE] };
})();

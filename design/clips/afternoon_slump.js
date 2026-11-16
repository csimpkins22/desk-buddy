// Afternoon slump: his eyelids droop and he slides slowly down the screen into a flat heap. One try at getting up. No.
// group: clock
(() => {
  const { D, CLIPS, xf, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  // eyes: 0 half shut, 1 shut, 2 one open. Heights are divided by ky so the face keeps its spacing while he flattens.
  const face = (ky, eyes) => {
    const g = v => 110 + v / ky, lid = x => ['stroke', [[x - 7, g(eyes ? 0 : -4)], [x + 7, g(eyes ? 0 : -4)]], 2.7];
    return [lid(116), lid(140), ...(eyes === 0 ? [['dot',116,110,2.8], ['dot',140,110,2.8]] : eyes === 2 ? [['dot',140,g(5),3]] : []), ['stroke', [[123, g(15)], [133, g(15)]], 2.4]];
  };
  // the marks he leaves on the glass, from where his head was down to where it is now
  const streaks = top => (c, d, seed) => {
    if (top < 92) return;
    c.save(); c.strokeStyle = CREAM; c.globalAlpha = 0.28; c.lineWidth = 3; c.lineCap = 'round';
    c.beginPath(); [104, 128, 152].forEach((x, i) => { c.moveTo(x, 80 + i % 2 * 8); c.lineTo(x, top - 10); }); c.stroke(); c.restore();
  };
  const heap = (ky, kx, eyes, rot = 0) => xf(D.N, { ky, kx, rot, face: face(ky, eyes), shadowK: kx, extra: { back: streaks(201 - 131 * ky) } });
  const STEPS = 13, slide = [];
  for (let i = 0; i < STEPS; i++) {
    const t = i / (STEPS - 1), e = t * t * (3 - 2 * t);
    D['afternoon_slump_' + i] = heap(1 - 0.74 * e, 1 + 0.5 * e, t < 0.35 ? 0 : 1, Math.sin(t * Math.PI) * 0.05);
    slide.push(['afternoon_slump_' + i, i ? 3 : 8]);
  }
  D.afternoon_slump_try = heap(0.4, 1.36, 2);
  D.afternoon_slump_no = heap(0.21, 1.58, 1);
  D.afternoon_slump_flat = heap(0.25, 1.52, 1);
  CLIPS.afternoon_slump = { home: 'idle', seq: [...WAKE, ...slide, ['afternoon_slump_12', 8], ['afternoon_slump_try', 7], ['afternoon_slump_no', 3], ['afternoon_slump_flat', 16], ...DOZE] };
})();

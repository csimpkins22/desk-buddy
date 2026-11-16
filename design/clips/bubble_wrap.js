// Bubble wrap: a sheet slides in. He pokes one bubble, loves it, and rolls the length of the sheet popping the rest. The last one gets him when he sits down.
// group: nonsense
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', BLUE = '#5AB8FF', K = 0.7, X = i => 106 + i * 24;
  const bliss = [...FACE.aahEyes, ['stroke',[[119,121],[128,128],[137,121]],3], ['blush',102,120,8,5], ['blush',154,118,8,5]];
  // the sheet, slid off to the right by `off`; the first `flat` bubbles are popped, and `pop` is the one going right now
  const sheet = (off, flat, pop) => (c, _, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM;
    c.globalAlpha = 0.5; c.lineWidth = 2; c.beginPath(); c.moveTo(92 + off, 202); c.lineTo(240 + off, 202); c.stroke();
    for (let i = 0; i < 6; i++) {
      const x = X(i) + off, h = i < flat ? 2.5 : 13;
      c.globalAlpha = 0.75; c.fillStyle = BLUE; c.beginPath(); c.ellipse(x, 201, 10, h, 0, Math.PI, Math.PI * 2); c.closePath(); c.fill();
      c.globalAlpha = 1; c.lineWidth = 2.2; c.stroke();
      if (i >= flat) { c.lineWidth = 1.8; c.beginPath(); c.arc(x, 201, 7, -2.5, -1.7); c.stroke(); }
    }
    if (pop !== undefined) {
      c.lineWidth = 3; c.beginPath();
      [-1.1, -0.35, 0.35, 1.1].forEach((a, n) => { const r = 17 + (seed + n) % 2 * 3; c.moveTo(X(pop) + Math.sin(a) * r, 197 - Math.cos(a) * r); c.lineTo(X(pop) + Math.sin(a) * (r + 10), 197 - Math.cos(a) * (r + 10)); });
      c.stroke();
    }
    c.restore();
  };
  const at = (dx, o, flat, pop, off = 0) => { const { extra, ...rest } = o; return xf(D.N, { k: K, dx, ...rest, extra: { ...extra, front: sheet(off, flat, pop) } }); };
  // rolling: turned about his middle, then set back down on the floor
  const roll = (i, flat, pop) => {
    const o = { k: K, ox: 128, oy: 136, rot: i * Math.PI / 4, dx: -78 + i * 17, face: bliss }, low = Math.max(...xf(D.N, o).body.map(p => p[1]));
    return { ...xf(D.N, { ...o, dy: 200 - low, extra: { front: sheet(0, flat, pop) } }), shadow: [128 + o.dx, 46] };
  };
  D.bubble_wrap_1 = xf(D.N, { k: 0.85, dx: -36, face: FACE.lookr, extra: { front: sheet(90, 0) } });
  D.bubble_wrap_2 = at(-78, { face: FACE.lookr }, 0, undefined, 40);
  D.bubble_wrap_3 = at(-78, { face: FACE.cute }, 0);
  D.bubble_wrap_4 = at(-78, { face: FACE.cute, extra: { arm2: [[78, 158], [96, 170]] } }, 0);
  D.bubble_wrap_5 = at(-78, { face: FACE.shock, rot: 0.05, extra: { arm2: [[80, 160], [101, 184]] } }, 1, 0);
  D.bubble_wrap_6 = at(-78, { face: FACE.happy, ky: 1.05, extra: { fxm: 'done', fx: [50, 96] } }, 1);
  const pops = [1, 1, 1, 1, 2, 2, 3, 4, 5];
  const rolling = pops.slice(1).map((flat, n) => { D['bubble_wrap_r' + n] = roll(n + 1, flat, flat > pops[n] ? flat - 1 : undefined); return ['bubble_wrap_r' + n, 3]; });
  D.bubble_wrap_7 = at(58, { face: FACE.spiral, rot: 0.05 }, 5);
  D.bubble_wrap_8 = at(58, { face: bliss }, 5);
  D.bubble_wrap_9 = at(58, { face: bliss, ky: 0.9, kx: 1.05 }, 6, 5);
  D.bubble_wrap_10 = at(58, { face: FACE.shock, dy: -12, ky: 1.08, shadowK: 0.7, extra: { fxm: 'alert', fx: [206, 84] } }, 6);
  D.bubble_wrap_11 = at(58, { face: FACE.happy, rot: -0.05 }, 6);
  D.bubble_wrap_12 = at(58, { face: FACE.happy, rot: 0.05 }, 6);
  D.bubble_wrap_13 = xf(D.N, { k: 0.85, dx: 30, face: FACE.happy, extra: { front: sheet(70, 6) } });
  CLIPS.bubble_wrap = { home: 'idle', seq: [...WAKE, ['bubble_wrap_1', 3], ['bubble_wrap_2', 3], ['bubble_wrap_3', 7], ['bubble_wrap_4', 3], ['bubble_wrap_5', 4], ['bubble_wrap_6', 7], ...rolling,
    ['bubble_wrap_7', 5], ['bubble_wrap_8', 6], ['bubble_wrap_9', 3], ['bubble_wrap_10', 4], ['bubble_wrap_11', 3], ['bubble_wrap_12', 3], ['bubble_wrap_11', 3], ['bubble_wrap_12', 3], ['bubble_wrap_13', 3], ...DOZE] };
})();

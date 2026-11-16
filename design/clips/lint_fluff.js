// Lint: he tweezes two bits of fluff off himself, then mistakes his cowlick for a third and gets a nasty surprise.
// group: work
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', TAU = Math.PI * 2;
  const down = [['dot',118,113,3.6], ['dot',142,111,3.6], ['stroke',[[122,126],[128,124],[134,126]],2.6]];
  const careful = [['dot',118,112,3.6], ['dot',142,110,3.6], ['stroke',[[123,125],[128,126],[133,125]],2.6], ['stroke',[[110,101],[122,103]],2.4], ['stroke',[[136,101],[148,99]],2.4]];
  const wince = [...FACE.chooEyes, ['stroke',[[120,125],[124,122],[128,125],[132,122],[136,125]],2.6]];
  const SPOTS = [[160, 170], [102, 152]];
  const fluff = (c, x, y) => { c.fillStyle = CREAM; [[-4, 1, 4], [2, -2, 5], [5, 3, 3.5]].forEach(([dx, dy, r]) => { c.beginPath(); c.arc(x + dx, y + dy, r, 0, TAU); c.fill(); }); };
  // on: which bits are still stuck to him. hand, tip: the tweezers. gap: how far open. held: a bit in their grip. loose: one falling away.
  const scene = ({ on = [], hand, tip, gap = 5, held, loose }) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    SPOTS.forEach(([x, y], i) => { if (on[i]) fluff(c, x, y); });
    if (hand) {
      const a = Math.atan2(tip[1] - hand[1], tip[0] - hand[0]), nx = -Math.sin(a) * gap, ny = Math.cos(a) * gap;
      c.strokeStyle = '#9FB0C4'; c.lineWidth = 4; c.beginPath(); c.moveTo(tip[0] + nx, tip[1] + ny); c.lineTo(hand[0], hand[1]); c.lineTo(tip[0] - nx, tip[1] - ny); c.stroke();
      if (held) fluff(c, tip[0], tip[1]);
    }
    if (loose) fluff(c, loose[0], loose[1]);
    c.restore();
  };
  // reach to a point: his arm stops short and the tweezers cover the rest
  const pose = (name, face, at, o = {}, body = {}) => {
    const hand = at && [at[0], at[1]], shoulder = o.shoulder || [166, 142];
    D['lint_fluff_' + name] = xf(D.N, { face, ...body, extra: { ...(at && { arm2: [shoulder, hand] }), ...body.extra, front: scene({ ...o, hand }) } });
  };
  const READY = [198, 128], UP = [192, 90];
  pose('see', down, null, { on: [1, 1] });
  pose('out', careful, READY, { on: [1, 1], tip: UP });
  pose('a0', careful, [192, 152], { on: [1, 1], tip: SPOTS[0] });
  pose('a1', careful, [192, 152], { on: [1, 1], tip: SPOTS[0], gap: 0 });
  pose('a2', careful, [204, 138], { on: [0, 1], tip: [176, 156], gap: 0, held: true });
  pose('a3', careful, READY, { on: [0, 1], tip: UP, loose: [212, 118] });
  pose('a4', careful, READY, { on: [0, 1], tip: UP, loose: [218, 158] });
  pose('b0', careful, [136, 149], { on: [0, 1], tip: SPOTS[1] });
  pose('b1', careful, [136, 149], { on: [0, 1], tip: SPOTS[1], gap: 0 });
  pose('b2', careful, [156, 142], { tip: [122, 147], gap: 0, held: true });
  pose('b3', FACE.happy, READY, { tip: UP, loose: [212, 118] });
  pose('b4', FACE.happy, READY, { tip: UP, loose: [218, 158] });
  pose('c0', FACE.lookup, READY, { tip: UP });
  pose('c1', FACE.lookup, [160, 86], { tip: [132, 56], shoulder: [164, 128] });
  pose('c2', FACE.lookup, [160, 86], { tip: [132, 56], shoulder: [164, 128], gap: 0 });
  pose('c3', wince, [162, 68], { tip: [134, 38], shoulder: [163, 124], gap: 0 }, { ky: 1.06, extra: { curl: [[128, 62], [130, 50], [133, 39]] } });
  pose('c4', wince, [164, 54], { tip: [136, 24], shoulder: [162, 120], gap: 0 }, { ky: 1.1, kx: 0.97, extra: { curl: [[128, 57], [131, 40], [135, 25]] } });
  pose('c5', FACE.shock, [198, 114], { tip: [216, 80], gap: 9 }, { ky: 0.88, kx: 1.07, extra: { curl: [[128, 86], [119, 77], [135, 71], [121, 63], [131, 56]], fxm: 'alert', fx: [160, 62] } });
  pose('c6', FACE.sheep, null, {}, { extra: { curl: [[128, 71], [119, 63], [121, 52], [130, 49]] } });
  pose('c7', FACE.sheep, null, {}, { extra: { curl: [[128, 71], [137, 63], [136, 52], [127, 49]] } });
  const s = (id, n) => ['lint_fluff_' + id, n];
  CLIPS.lint_fluff = { home: 'idle', seq: [...WAKE, s('see', 8), s('out', 6), s('a0', 4), s('a1', 3), s('a2', 4), s('a3', 3), s('a4', 3),
    s('b0', 4), s('b1', 3), s('b2', 4), s('b3', 3), s('b4', 4), s('c0', 7), s('c1', 4), s('c2', 3), s('c3', 4), s('c4', 6), s('c5', 6),
    s('c6', 4), s('c7', 4), s('c6', 4), s('c7', 4), ...DOZE] };
})();

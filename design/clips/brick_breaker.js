// Brick breaker: a paddle bats him up into a wall of bricks. He knocks them out one by one, and the last one comes down on his head.
// group: games
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', STONE = '#9FB0C4', BLUE = '#5AB8FF', P = 'brick_breaker_', W = 56, H = 24;
  const BRICKS = [[64, 28], [120, 28], [36, 4], [148, 4], [92, 4]];        // in the order he hits them; the last is the one over his head
  const wheee = [['dot',112,108,8], ['dot',144,106,8], ['mouth',[[118,122],[138,121],[140,138],[128,144],[116,138]]]];
  const oof = [...FACE.chooEyes, ['mouth',[[121,118],[135,117],[137,131],[128,136],[119,131]]]];
  const brick = (c, x, y, rot = 0) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.lineJoin = c.lineCap = 'round'; c.fillStyle = STONE; c.strokeStyle = CREAM; c.lineWidth = 3;
    c.beginPath(); c.roundRect(-W / 2 + 2, -H / 2 + 2, W - 4, H - 4, 4); c.fill(); c.stroke();
    c.globalAlpha = 0.7; c.lineWidth = 2; c.beginPath(); c.moveTo(-W / 2 + 10, -H / 2 + 9); c.lineTo(-W / 2 + 22, -H / 2 + 9); c.stroke();
    c.restore();
  };
  // gone: how many bricks are knocked out; smash: the one breaking now; pad: where the paddle is; last: the last brick's [x, y, tilt]; lift: the wall still arriving
  const scene = ({ gone = 0, smash = -1, pad, last = [120, 16, 0], lift = 0 }) => ({
    back: c => {
      BRICKS.slice(0, 4).forEach(([x, y], i) => {
        const cx = x + W / 2, cy = y + H / 2 - lift;
        if (i >= gone) return brick(c, cx, cy);
        if (i !== smash) return;
        c.save(); c.fillStyle = STONE; c.strokeStyle = CREAM; c.lineWidth = 2; c.lineJoin = 'round';
        [[-22, -8, 0.5], [20, -10, -0.4], [-14, 12, -0.7], [22, 10, 0.9], [2, -2, 0.2]].forEach(([sx, sy, r]) => {
          c.save(); c.translate(cx + sx, cy + sy); c.rotate(r); c.beginPath(); c.rect(-6, -4, 12, 8); c.fill(); c.stroke(); c.restore();
        });
        c.restore();
      });
    },
    front: c => {
      if (last) brick(c, last[0], last[1] - lift, last[2]);
      if (pad === undefined) return;
      c.save(); c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.roundRect(pad - 34, 197, 68, 12, 6); c.fill(); c.stroke(); c.restore();
    },
  });
  const seq = [...WAKE];
  let n = 0;
  const add = (ticks, o, s) => { D[P + n] = xf(D.N, { ...o, extra: { ...scene(s), ...o.extra } }); seq.push([P + n++, ticks]); };
  const ball = (x, y, o) => ({ k: 0.42, ox: 128, oy: 136, dx: x - 128, dy: y - 136, shadowK: 0, ...o });
  add(4, { face: FACE.lookup }, { lift: 36 });
  add(4, { face: FACE.lookup }, { pad: 40 });
  add(3, { face: FACE.shock, ky: 0.8, kx: 1.1 }, { pad: 128 });
  add(2, { k: 0.68, ky: 1.2, dy: -14, face: wheee, shadowK: 0.5 }, { pad: 128 });
  const PADS = [120, 106, 120, 148];                                        // where the paddle catches him after each brick
  let from = 128;
  BRICKS.forEach(([x, y], i) => {
    const bx = x + W / 2, by = y + H + 22;
    add(2, ball((from + bx) / 2, (172 + by) / 2, { rot: i * 1.3 + 0.5, face: wheee }), { gone: i, pad: from });
    if (i === 4) return add(3, ball(bx, by, { ky: 0.78, face: oof }), { gone: 4, pad: from, last: [120, 14, 0.14] });
    add(3, ball(bx, by, { ky: 0.78, face: oof }), { gone: i + 1, smash: i, pad: (from + PADS[i]) / 2 });
    add(2, ball((bx + PADS[i]) / 2, (172 + by) / 2, { rot: i * 1.3 + 2, face: wheee }), { gone: i + 1, pad: PADS[i] });
    add(2, ball(PADS[i], 174, { ky: 0.78, face: wheee }), { gone: i + 1, pad: PADS[i] });
    from = PADS[i];
  });
  const up = { gone: 4 };
  add(2, { k: 0.7, dy: -44, ky: 1.1, face: FACE.shock, shadowK: 0.6 }, { ...up, pad: 200, last: [120, 16, -0.1] });
  add(3, { ky: 0.72, kx: 1.18, face: oof }, { ...up, pad: 280, last: [120, 16, 0.12] });
  add(5, { face: FACE.lookup }, { ...up, last: [120, 16, -0.14] });
  add(4, { face: FACE.lookup }, { ...up, last: [121, 17, 0.16] });
  add(4, { face: FACE.lookup }, { ...up, last: [122, 18, -0.18] });
  add(2, { face: FACE.shock }, { ...up, last: [126, 38, 0.06] });
  add(5, { ky: 0.72, kx: 1.15, face: FACE.spiral, extra: { fxm: 'alert', fx: [172, 92] } }, { ...up, last: [130, 96, -0.05] });
  add(2, { ky: 1.04, face: FACE.spiral }, { ...up, last: [172, 44, 0.7] });
  add(2, { face: FACE.spiral, rot: 0.05 }, { ...up, last: [222, 70, 1.5] });
  add(4, { face: FACE.spiral, rot: -0.05 }, { ...up, last: null });
  add(4, { face: FACE.spiral, rot: 0.05 }, { ...up, last: null });
  add(4, { face: FACE.spiral, rot: -0.05 }, { ...up, last: null });
  add(7, { face: FACE.grump }, { ...up, last: null });
  CLIPS.brick_breaker = { home: 'idle', seq: [...seq, ...DOZE] };
})();

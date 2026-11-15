// Two buttons: a console comes up with a tick button and a cross button. His hand hovers from one to the other, faster and sweatier, until he slams both.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath, inkStroke, tint } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', STEEL = '#9FB0C4', SLATE = '#6F7C8C', IRON = '#3F4855', GREEN = '#58D68D', MOSS = '#2F9E63', RED = '#FF5A4D', WINE = '#B8372D', YELLOW = '#FFD23F', BLUE = '#5AB8FF';
  const TAU = Math.PI * 2, P = 'two_buttons_', BX = [80, 176], BY = 172, HUB = [128, 168], OVER = [[85, 133], [171, 133]];
  // faces looking down at the buttons: d is how far his eyes are turned (left is negative)
  const eyes = (d, r = 3.8) => [['dot', 116 + d, 113, r], ['dot', 140 + d, 111, r]];
  const fret = [['stroke',[[106,102],[118,98]],2.4], ['stroke',[[138,96],[150,100]],2.4]];
  const calm = d => [...eyes(d), ['stroke',[[122,122],[128,124],[134,122]],2.6]];
  const uneasy = d => [...eyes(d), ...fret, ['stroke',[[120,123],[124,121],[128,123],[132,121],[136,123]],2.4]];
  const panic = d => [...eyes(d, 4.6), ['stroke',[[105,101],[118,95]],2.6], ['stroke',[[138,93],[151,99]],2.6], ['teeth',128,122,20,8]];
  const MOOD = [calm, uneasy, uneasy, panic];
  const shut = [...FACE.chooEyes, ['teeth',128,122,20,8]];
  const yell = [...FACE.chooEyes, ['mouth',[[119,117],[137,116],[138,124],[128,128],[118,124]]]];
  const peek = [['stroke',[[108,105],[116,110],[108,115]],3], ['dot',143,111,4.2], ['stroke',[[136,99],[149,97]],2.4], ['stroke',[[121,123],[125,121],[129,123],[133,121]],2.4]];
  const phew = [...FACE.aahEyes, ['mouth',[[122,118],[134,117],[133,124],[128,127],[123,124]],[128,124,4,2]]];
  const pt = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), 201 + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
  const poly = (c, pts) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); c.stroke(); };
  // one button: i 0 the tick, 1 the cross. press: 0 up, 1 pushed home, below 0 as it springs back
  const button = (c, i, press) => {
    const x = BX[i], base = BY - 4 + press * 4, h = 19 - press * 8, m = ([px, py]) => [x + px * 1.15, base - 2 + py * h / 17];
    const dome = () => { c.beginPath(); c.ellipse(x, base, 23, h, 0, Math.PI, 0); c.ellipse(x, base, 23, 5, 0, 0, Math.PI); c.closePath(); };
    c.fillStyle = SLATE; c.lineWidth = 2.4; c.beginPath(); c.ellipse(x, BY + 1, 28, 7.5, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = IRON; c.beginPath(); c.ellipse(x, BY, 24, 5.5, 0, 0, TAU); c.fill();
    dome(); c.fillStyle = i ? WINE : MOSS; c.fill();
    c.save(); dome(); c.clip(); c.fillStyle = i ? RED : GREEN; c.beginPath(); c.ellipse(x - 4, base - 3, 22, h, 0, 0, TAU); c.fill(); c.restore();
    dome(); c.lineWidth = 2.6; c.stroke();
    c.fillStyle = CREAM; c.globalAlpha = 0.8; c.beginPath(); c.ellipse(x - 14, base - h * 0.66, 5, 2.2, -0.6, 0, TAU); c.fill(); c.globalAlpha = 1;
    c.lineWidth = 3.6; c.beginPath();
    if (i) { c.moveTo(...m([-5, -12])); c.lineTo(...m([5, -3.5])); c.moveTo(...m([5, -12])); c.lineTo(...m([-5, -3.5])); }
    else { c.moveTo(...m([-7, -7.5])); c.lineTo(...m([-2, -3.5])); c.lineTo(...m([6.5, -12])); }
    c.stroke();
  };
  // the console, `rise` below its place, with a lamp under each button
  const panel = (c, seed, rise, down, lit) => {
    c.save(); c.translate((seed % 3 - 1) * 0.5, rise); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3;
    c.fillStyle = IRON; poly(c, boil([[42, 180], [214, 180], [211, 218], [45, 218]], seed + 3, 1.2));
    c.fillStyle = STEEL; poly(c, boil([[54, 164], [202, 164], [214, 180], [42, 180]], seed + 5, 1.2));
    c.fillStyle = DARK; c.lineWidth = 2; c.beginPath(); c.roundRect(109, 190, 38, 20, 4); c.fill(); c.stroke();
    c.lineWidth = 1.8; c.beginPath(); [195, 200, 205].forEach(y => { c.moveTo(115, y); c.lineTo(141, y); }); c.stroke();
    BX.forEach((x, i) => {
      if (lit[i]) { c.fillStyle = i ? RED : GREEN; c.globalAlpha = 0.3; c.beginPath(); c.arc(x, 200, 11, 0, TAU); c.fill(); c.globalAlpha = 1; }
      c.fillStyle = lit[i] ? (i ? RED : GREEN) : DARK; c.lineWidth = 2; c.beginPath(); c.arc(x, 200, 5.5, 0, TAU); c.fill(); c.stroke();
      button(c, i, down[i]);
    });
    c.restore();
  };
  // on the wall behind: a pressure gauge, its needle further round the more he frets
  const gauge = (c, level, seed, a) => {
    const turn = (1.12 + level * 0.27) * Math.PI + (level ? (seed % 3 - 1) * 0.07 : 0);
    c.save(); c.translate(38, 50); c.globalAlpha = 0.8 * a; c.fillStyle = DARK; c.strokeStyle = CREAM; c.lineWidth = 2.4;
    c.beginPath(); c.arc(0, 0, 18, 0, TAU); c.fill(); c.stroke();
    c.lineWidth = 4; [[GREEN, 1.08, 1.36], [YELLOW, 1.44, 1.62], [RED, 1.7, 1.92]].forEach(([colour, from, to]) => { c.strokeStyle = colour; c.beginPath(); c.arc(0, 3, 11, from * Math.PI, to * Math.PI); c.stroke(); });
    c.strokeStyle = c.fillStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.moveTo(0, 3); c.lineTo(Math.cos(turn) * 12, 3 + Math.sin(turn) * 12); c.stroke();
    c.beginPath(); c.arc(0, 3, 2.6, 0, TAU); c.fill();
    c.restore();
  };
  const nub = (c, [x0, y0], [x1, y1], seed) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    c.save(); c.translate(x0, y0); c.rotate(Math.atan2(y1 - y0, x1 - x0));
    closedPath(c, boil([[0, -7], [len * 0.5, -7], [len, -6], [len + 6, 0], [len, 6], [len * 0.5, 7], [0, 7]], seed, 0.8));
    c.fillStyle = tint(); c.fill(); c.strokeStyle = CREAM; inkStroke(c, 3); c.restore();
  };
  const bead = (c, x, y, s, lean = 0) => {
    c.save(); c.translate(x, y); c.rotate(lean); c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 1.8;
    c.beginPath(); c.moveTo(0, -s * 1.7); c.bezierCurveTo(s * 1.3, -s * 0.2, s, s, 0, s); c.bezierCurveTo(-s, s, -s * 1.3, -s * 0.2, 0, -s * 1.7); c.fill(); c.stroke(); c.restore();
  };
  const SWEAT = [[], [[157, 100, 4]], [[158, 103, 4.5], [97, 105, 4]], [[159, 104, 4.5], [96, 108, 4.5], [180, 86, 3.6, 0.8], [77, 90, 3.6, -0.8]]];
  // rise: how far the console is below its place. reach: where the hand he brings up from behind it is. hands: his two nubs on the buttons, [left, right].
  // down: how far each button is pressed. lit: its lamp. level: how worried he is, 0 to 3. slip: how far the sweat has run. bang: the slam. room: how far the room has faded in.
  const shot = (o, face, { rise = 0, reach, hands = [], down = [0, 0], lit = [0, 0], level = 0, slip = 0, bang, room = 1 } = {}) => xf(D.N, { ...o, face, extra: { ...(reach && { arm2: [HUB, reach] }),
    back: (c, d, seed) => {
      c.save(); c.lineCap = 'round'; c.strokeStyle = CREAM; c.globalAlpha = 0.35 * room; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke(); c.restore();
      gauge(c, level, seed, room);
    },
    front: (c, d, seed) => {
      panel(c, seed, rise, down, lit);
      c.save(); c.lineCap = c.lineJoin = 'round';
      hands.forEach((h, i) => h && nub(c, pt(o, i ? [150, 142] : [106, 142]), h, seed + 98 + i));
      SWEAT[level].forEach(([x, y, s, lean]) => bead(c, x + (lean || 0) * slip * 3, y + slip * (lean ? -2 : 3), s, lean));
      if (bang) { c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath(); [-1, 1].forEach((s, i) => [[30, -14, 40, -20], [24, -27, 31, -37], [33, 0, 44, 0]].forEach(([x0, y0, x1, y1]) => { c.moveTo(BX[i] + s * x0, BY + y0); c.lineTo(BX[i] + s * x1, BY + y1); })); c.stroke(); }
      c.restore();
    } } });
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); }, show = (name, ticks) => seq.push([P + name, ticks]);
  [70, 40, 15, -5].forEach((rise, i) => add('in' + i, i ? 2 : 3, shot(i === 3 ? { ky: 1.03, kx: 0.98 } : {}, calm(0), { rise, room: 0.25 + i * 0.25 })));
  add('tick', 4, shot({ rot: -0.02 }, calm(-7)));
  add('cross', 4, shot({ rot: 0.02 }, calm(7)));
  add('hm', 4, shot({}, [['dot',116,110,3.8], ['dot',140,108,3.8], ['stroke',[[123,123],[133,122]],2.6]]));
  add('raise', 2, shot({ ky: 0.96, kx: 1.02 }, calm(-3), { reach: [122, 148] }));
  // over one button (side 0 the tick, 1 the cross), and on the way between the two
  const hover = (side, level, slip = 0) => shot({ rot: (side ? 1 : -1) * (0.03 + level * 0.012), ky: 1 - level * 0.012 }, MOOD[level](side ? 7 : -7), { reach: [OVER[side][0] + (side ? slip : -slip) * 1.5, OVER[side][1] + slip * 2.5], level, slip });
  const between = level => shot({ ky: 1 - level * 0.012 }, MOOD[level](0), { reach: [128, 145], level, slip: 0.5 });
  for (let level = 0; level < 4; level++) { D[P + 'over' + level] = between(level); [0, 1].forEach(side => [0, 1].forEach(slip => { D[P + 'at' + side + level + slip] = hover(side, level, slip); })); }
  // [button, how worried, ticks]: slower at first, then dithering
  [[0, 0, 8], [1, 1, 8], [0, 2, 6], [1, 2, 6], [0, 3, 4], [1, 3, 4], [0, 3, 2], [1, 3, 2]].forEach(([side, level, ticks], n) => {
    if (n) show('over' + level, 2);
    if (level < 2) show('at' + side + level + 0, ticks); else for (let t = 0; t < ticks; t += 2) show('at' + side + level + (t / 2) % 2, 2);
  });
  add('duck', 2, shot({ ky: 0.86, kx: 1.07 }, shut, { reach: [128, 150], level: 3, slip: 1 }));
  add('up', 4, shot({ ky: 1.1, kx: 0.95 }, shut, { hands: [[82, 96], [174, 94]], level: 3 }));
  const both = y => ({ hands: [[BX[0] + 3, y], [BX[1] - 3, y]], down: [1, 1], lit: [1, 1] });
  add('slam', 2, shot({ ky: 0.78, kx: 1.12 }, yell, { ...both(157), rise: 4, bang: true, level: 3, slip: 2 }));
  add('jolt', 2, shot({ ky: 1.03, kx: 0.98 }, yell, { ...both(152), rise: -1, level: 2 }));
  add('held', 4, shot({ ky: 0.96, kx: 1.02 }, shut, { ...both(153), level: 1 }));
  add('peek', 6, shot({ ky: 0.97, kx: 1.01 }, peek, both(153)));
  add('phew', 10, shot({ ky: 0.98 }, phew, both(153)));
  add('let', 2, shot({ ky: 1.02 }, phew, { hands: [[92, 132], [164, 130]], down: [-0.4, -0.4] }));
  [20, 54, 100].forEach((rise, i) => add('out' + i, 2, shot({}, FACE.happy, { rise, room: 0.7 - i * 0.3 })));
  CLIPS.two_buttons = { home: 'idle', seq: [...seq, ...DOZE] };
})();

// Props and helpers that clips keep needing, as window.__lump.kit. The exporter loads this before every clip script.
(() => {
  const L = window.__lump, { D, CLIPS, xf, WAKE, DOZE, boil, openPath, closedPath, inkStroke } = L, TAU = Math.PI * 2;
  const SKIN = '#E0D8A8', PALE = '#E9E2D2';     // tones for a hand and for a drained or unpainted Lump that the board leaves alone
  const CREAM = '#FFF1DC', DARK = '#17161A', YELLOW = '#FFD23F', RED = '#FF5A4D', BROWN = '#6B4A1F', GREEN = '#58D68D', BLUE = '#5AB8FF', GREY = '#9FB0C4', WHITE = '#F4F8FF';
  const line = (c, w = 3) => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = w; };

  // A clip in the making: add(name, ticks, drawing) for each beat, then done(). Drawings are named <clip>_<name>.
  // add(name, ticks) with no drawing shows one added earlier again.
  // The first hold is made odd and the rest even, so no drawing straddles two of his wobbles and gets stored twice.
  // clip(name, { mirror: true }) plays the whole thing left to right reversed: the cheapest way to stop every clip facing the same way.
  // { asleep: true } skips the waking and dozing: the clip starts and ends on him asleep (D.S1), for things that happen while he sleeps.
  // { bare: true } adds nothing at either end: the clip's own first and last drawings should be him asleep as D.S1 has him, since the
  // idle loop is what plays before and after. That is how something can be there from the first frame, or stay to the very last.
  const clip = (name, { mirror, asleep, bare } = {}) => {
    const seq = bare ? [] : asleep ? [['S1', 3]] : [...WAKE], start = seq.length, odd = seq.reduce((n, s) => n + s[1], 0) % 2;
    return {
      add(part, ticks, drawing) {
        const id = name + '_' + part;
        if (drawing) D[id] = mirror ? { ...drawing, view: drawing.view ? [...drawing.view.slice(0, 5), !drawing.view[5], -(drawing.view[6] || 0)] : [1, 120, 0, 120, 0, true, 0] } : drawing;
        else if (!D[id]) throw new Error(`${id} has not been added with a drawing yet`);
        const first = seq.length === start, even = Math.max(2, ticks + (ticks % 2));
        seq.push([id, first && odd ? even + 1 : even]);
      },
      // done({ doze: false }) ends on the clip's own last drawing, for a clip that puts him to sleep itself. The idle loop follows at once,
      // so whatever that drawing still shows (a hat, a heap, a night sky) is on screen to the last tick and then gone.
      done({ doze = true } = {}) { CLIPS[name] = { home: 'idle', seq: [...seq, ...(bare || !doze ? [] : asleep ? [['S1', 4]] : DOZE)] }; },
    };
  };

  // The whole scene through a camera, for extra: { view }. zoom 2 with focus on his face is a close-up; 0.6 is a wide shot with room
  // for a big setting; moving `to` across drawings pans. focus is the scene point that lands on the screen point `to`.
  // The zoom is rounded to the 256ths the board stores, or a wide shot lands a fraction of a pixel off and is stored as pixels.
  // turn tips the whole scene by that many radians about `to`, as if the cube were tilted.
  const view = (zoom, focus = [128, 130], to = [120, 120], turn = 0) => [Math.round(zoom * 256) / 256, focus[0], focus[1], to[0], to[1], false, turn];
  // a view that eases: zoom(1, focus) changes nothing, and by zoom(z, focus) the focus has moved to the middle of the screen. For steps(1, 2, n).
  const zoom = (z, focus = [128, 130], to = [120, 120]) => { const t = z === 1 ? 0 : Math.min(1, Math.abs(z - 1) / 0.5); return view(z, focus, [focus[0] + (to[0] - focus[0]) * t, focus[1] + (to[1] - focus[1]) * t]); };
  // the view that changes nothing, and a view part of the way (t from 0 to 1) between two others: for pans, pull-backs and returns.
  // cam(t, HOME, view(0.6, ...)) with t from steps(0, 1, n) eases out to a wide shot; swap the two to come back.
  const HOME = [1, 120, 120, 120, 120, false, 0];
  const cam = (t, a, b) => { const m = i => (a[i] || 0) + ((b[i] || 0) - (a[i] || 0)) * t; return [Math.round(m(0) * 256) / 256, m(1), m(2), m(3), m(4), false, m(6)]; };
  // xf options that tip him over by rot and keep him on the floor (turning about his feet would bury half of him). 1.57 is flat on his side.
  const tip = (rot, o = {}) => ({ rot, ox: 128, oy: 136, dy: 65 - Math.abs(Math.sin(rot)) * 60 - Math.abs(Math.cos(rot)) * 65 + (o.dy || 0), ...o, dy: 65 - Math.abs(Math.sin(rot)) * 60 - Math.abs(Math.cos(rot)) * 65 + (o.dy || 0) });
  // a drawing with him off screen altogether, for a beat where only the setting or the props are seen
  const gone = (extra = {}) => xf(D.N, { dy: 400, shadowK: 0, extra });
  // n drawings of him waddling from dx `from` to `to`: xf options to spread into xf(D.N, { ...step, face, extra })
  const walk = (from, to, n, o = {}) => steps(from, to, n).map((dx, i) => ({ ...o, dx, rot: (i % 2 ? 0.05 : -0.05) * Math.sign(to - from || 1), ky: i % 2 ? 0.97 : 1.02 }));
  // faces beyond FACE: eyes looking (dx, dy) pixels off centre with a mouth of your choice, and a few moods
  const MOUTH = { smile: ['stroke', [[121, 123], [128, 127], [135, 123]], 2.8], flat: ['stroke', [[122, 125], [134, 125]], 2.8], frown: ['stroke', [[121, 127], [128, 123], [135, 127]], 2.8],
                  o: ['oval', 128, 125, 4, 5], open: ['mouth', [[120, 119], [136, 118], [135, 129], [128, 133], [121, 129]], [128, 130, 5, 3]], wobble: ['stroke', [[119, 126], [123, 123], [128, 126], [133, 123], [137, 126]], 2.6] };
  const look = (dx = 0, dy = 0, mouth = 'smile', r = 4) => [['dot', 116 + dx, 109 + dy, r], ['dot', 140 + dx, 107 + dy, r], MOUTH[mouth]];
  const faces = {
    closed: [['stroke', [[110, 109], [116, 112], [122, 109]], 3], ['stroke', [[134, 107], [140, 110], [146, 107]], 3], MOUTH.smile],
    wink: [['dot', 116, 109, 4], ['stroke', [[134, 108], [140, 105], [146, 108]], 3], MOUTH.smile],
    sad: [['dot', 116, 111, 3.8], ['dot', 140, 109, 3.8], ['stroke', [[108, 103], [120, 100]], 2.6], ['stroke', [[136, 98], [148, 101]], 2.6], MOUTH.frown],
    smug: [['stroke', [[109, 108], [122, 108]], 3], ['stroke', [[134, 106], [147, 106]], 3], ['dot', 118, 111, 2.6], ['dot', 143, 109, 2.6], ['stroke', [[122, 124], [130, 126], [137, 121]], 2.8]],
    worried: [['dot', 116, 110, 4.4], ['dot', 140, 108, 4.4], ['stroke', [[108, 100], [120, 97]], 2.6], ['stroke', [[136, 95], [148, 98]], 2.6], MOUTH.wobble],
    wide: [['oval', 116, 108, 6, 7], ['oval', 140, 106, 6, 7], ['shine', 118, 105, 2], ['shine', 142, 103, 2], MOUTH.o],
  };
  // n values from a to b that start and stop gently: in-betweens for anything that travels
  const steps = (a, b, n) => Array.from({ length: n }, (_, i) => { const t = n === 1 ? 1 : i / (n - 1), e = t * t * (3 - 2 * t); return a + (b - a) * e; });
  // where a point on standing Lump (say his mouth, [128, 124]) lands after xf(D.N, o), whatever o turns him about
  const pt = (o, [x, y]) => {
    const r = o.rot || 0, k = o.k ?? 1, ox = o.ox ?? 128, oy = o.oy ?? 201, u = (x - ox) * (o.kx ?? 1), v = (y - oy) * (o.ky ?? 1);
    return [ox + (u * Math.cos(r) - v * Math.sin(r)) * k + (o.dx || 0), oy + (u * Math.sin(r) + v * Math.cos(r)) * k + (o.dy || 0)];
  };
  // A drawing part of the way (t from 0 to 1) between two others: his outline, cowlick and shadow ease from a's to b's, and the face is
  // a's until half way. Both need the same number of points, which any two made with xf from the same base have, as does round().
  const morph = (a, b, t) => {
    const mix = (p, q) => p.map((v, i) => Array.isArray(v) ? mix(v, q[i]) : v + (q[i] - v) * t);
    return { ...(t < 0.5 ? a : b), body: mix(a.body, b.body), curl: mix(a.curl, b.curl), shadow: mix(a.shadow, b.shadow) };
  };
  // him as a plain oval, point for point with his standing outline, so morph(xf(D.N, ...), round(...), t) turns him into a ball, a disc
  // seen from above, a puddle (a wide flat one) or a sheet. Give it a face if it wants one.
  const round = (cx, cy, rx, ry, face = []) => {
    const B = D.N.body, mx = B.reduce((s, p) => s + p[0], 0) / B.length, my = B.reduce((s, p) => s + p[1], 0) / B.length;
    return { ...D.N, face, body: B.map(([x, y]) => { const a = Math.atan2(y - my, x - mx); return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]; }),
             curl: D.N.curl.map(([x, y]) => [cx + (x - D.N.curl[0][0]) * 0.6, cy - ry + (y - D.N.curl[0][1]) * 0.6]), shadow: [cx, rx * 0.9] };
  };
  // whether the board leaves a colour alone (true) or would repaint it as his body (false): for choosing pale and warm tones
  const safe = hex => { const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)), beta = g / 241, alpha = r / 255 - beta; return Math.max(r, g, b) < 8 || alpha <= 0.02 || b < alpha * 255 + beta * 220 - 48; };
  // a drawing mirrored left to right about the middle of the screen (x 128), arms included. Flip last: xf a drawing, then flip it.
  const flip = d => ({ ...d, shadow: [256 - d.shadow[0], d.shadow[1]], body: d.body.map(([x, y]) => [256 - x, y]), curl: d.curl.map(([x, y]) => [256 - x, y]),
    ...Object.fromEntries(['arm', 'arm2'].filter(n => d[n]).map(n => [n, d[n].map(([x, y]) => [256 - x, y])])),
    face: d.face.map(mk => mk[0] === 'stroke' || mk[0] === 'mouth' ? [mk[0], mk[1].map(([x, y]) => [256 - x, y]), ...mk.slice(2)] : [mk[0], 256 - mk[1], ...mk.slice(2)]) });
  // a stubby arm from [shoulder, hand], as the page draws his
  const arm = (c, [[x0, y0], [x1, y1]], seed = 0, { fill, line = CREAM } = {}) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    c.save(); c.lineJoin = c.lineCap = 'round'; c.translate(x0, y0); c.rotate(Math.atan2(y1 - y0, x1 - x0));
    closedPath(c, boil([[0, -7], [len * 0.5, -7], [len, -6], [len + 6, 0], [len, 6], [len * 0.5, 7], [0, 7]], seed, 0.8));
    c.fillStyle = fill || L.tint(); c.fill(); c.strokeStyle = line; inkStroke(c, 3); c.restore();
  };
  // another Lump, drawn the way the page draws him, from a drawing such as xf(D.N, { k: 0.6, dx: 60, face, extra: { arm2 } }).
  // Any face works, and arm and arm2 are drawn; other extras are not. Below 0.6 scale his face stops reading.
  const twin = (c, d, seed, dx = 0, dy = 0) => {
    const fill = d.fill || L.tint(), line = d.line || CREAM; if (d.still) seed = 0;
    c.save(); c.lineJoin = c.lineCap = 'round'; c.translate(dx, dy);
    c.fillStyle = 'rgba(255,241,220,.10)'; c.beginPath(); c.ellipse(d.shadow[0] + 4, 203, d.shadow[1], 6, 0, 0, TAU); c.fill();
    if (fill !== 'none') { c.save(); c.translate(4, 2.5); closedPath(c, boil(d.body, seed + 57, 2.2)); c.fillStyle = fill; c.fill(); c.restore(); }
    if (line !== 'none') { c.strokeStyle = line; closedPath(c, boil(d.body, seed + 7, 2.2)); inkStroke(c, 4); openPath(c, boil(d.curl, seed + 27, 1.2)); inkStroke(c, 3.4); }
    [[d.arm, 98], [d.arm2, 99]].forEach(([a, n]) => a && arm(c, a, seed + n, { fill: fill === 'none' ? undefined : fill, line: line === 'none' ? CREAM : line }));
    L.drawFace(c, d, seed);
    c.restore();
  };

  // a mug standing on (x, y): tilt in radians, steam rising if seed is given
  const mug = (c, x, y, { tilt = 0, seed, colour = WHITE, band = BLUE } = {}) => {
    c.save(); c.translate(x, y); c.rotate(tilt); line(c, 2.6);
    c.beginPath(); c.arc(13, -13, 7, -1.2, 1.2); c.stroke();
    c.fillStyle = colour; c.beginPath(); c.roundRect(-12, -26, 24, 26, 4); c.fill(); c.stroke();
    c.fillStyle = band; c.fillRect(-10.5, -15, 21, 5);
    c.fillStyle = BROWN; c.beginPath(); c.ellipse(0, -24, 9, 2.4, 0, 0, TAU); c.fill();
    c.restore();
    if (seed !== undefined) steam(c, x, y - 32, seed);
  };
  const steam = (c, x, y, seed) => {
    c.save(); c.globalAlpha = 0.55; line(c, 2.2);
    for (let k = 0; k < 2; k++) {
      const side = (seed + k) % 2 ? 1 : -1;
      openPath(c, boil([0, 1, 2, 3].map(i => [x - 5 + k * 10 + (i % 2 ? 4 : -4) * side, y - i * 7]), seed + k * 7, 1.5)); c.stroke();
    }
    c.restore();
  };
  // a small round table standing on the floor, its top w wide and centred on x at height y
  const table = (c, x, seed = 0, { y = 168, w = 76, colour = BROWN } = {}) => {
    c.save(); line(c, 2.8); c.fillStyle = colour;
    c.beginPath(); c.rect(x - 5, y, 10, 201 - y - 5); c.roundRect(x - w * 0.3, 196, w * 0.6, 6, 3); c.fill(); c.stroke();
    closedPath(c, boil([[x - w / 2, y - 4], [x, y - 9], [x + w / 2, y - 4], [x + w / 2, y + 3], [x, y + 7], [x - w / 2, y + 3]], seed + 11, 1)); c.fill(); c.stroke();
    c.restore();
  };
  // a balloon with its knot at (x, y) and a string down to (sx, sy)
  const balloon = (c, x, y, seed = 0, { r = 20, colour = RED, to } = {}) => {
    c.save(); line(c, 2.2);
    if (to) { openPath(c, boil([[x, y + 4], [(x + to[0]) / 2 + 5, (y + to[1]) / 2], to], seed + 3, 2)); c.stroke(); }
    c.lineWidth = 2.8; c.fillStyle = colour;
    c.beginPath(); c.ellipse(x, y - r * 1.15, r, r * 1.15, 0, 0, TAU); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(x - 4, y + 5); c.lineTo(x, y - 1); c.lineTo(x + 4, y + 5); c.closePath(); c.fill(); c.stroke();
    c.globalAlpha = 0.5; c.strokeStyle = WHITE; c.lineWidth = 3; c.beginPath(); c.arc(x, y - r * 1.15, r * 0.62, -2.5, -1.7); c.stroke();
    c.restore();
  };
  // a four-point sparkle of size s
  const sparkle = (c, x, y, s = 8, colour = CREAM) => {
    c.save(); c.fillStyle = colour; c.beginPath(); c.moveTo(x, y - s);
    c.quadraticCurveTo(x, y, x + s, y); c.quadraticCurveTo(x, y, x, y + s); c.quadraticCurveTo(x, y, x - s, y); c.quadraticCurveTo(x, y, x, y - s); c.fill(); c.restore();
  };
  // beads of sweat flying off him to one side (side: -1 left, 1 right)
  const sweat = (c, x, y, seed = 0, side = 1) => {
    c.save(); c.fillStyle = BLUE; line(c, 1.6);
    [[0, 0, 4], [9, -9, 3.2], [15, 4, 2.6]].forEach(([dx, dy, r], i) => {
      const px = x + side * (dx + (seed + i) % 3), py = y + dy;
      c.beginPath(); c.moveTo(px, py - r * 1.9); c.quadraticCurveTo(px + r * 1.2, py, px, py + r); c.quadraticCurveTo(px - r * 1.2, py, px, py - r * 1.9); c.fill(); c.stroke();
    });
    c.restore();
  };
  // a mark above his head, drawn as strokes: '?', '!', 'tick' or 'cross'
  const mark = (c, kind, x, y, s = 1, colour) => {
    c.save(); c.translate(x, y); c.scale(s, s); line(c, 4);
    c.strokeStyle = c.fillStyle = colour || (kind === 'tick' ? GREEN : kind === 'cross' ? RED : CREAM);
    if (kind === '?') { openPath(c, [[-7, -20], [-3, -27], [5, -27], [8, -20], [1, -12], [0, -6]]); c.stroke(); c.beginPath(); c.arc(0, 2, 2.6, 0, TAU); c.fill(); }
    else if (kind === '!') { c.beginPath(); c.moveTo(0, -27); c.lineTo(0, -8); c.stroke(); c.beginPath(); c.arc(0, 2, 2.6, 0, TAU); c.fill(); }
    else if (kind === 'tick') { c.beginPath(); c.moveTo(-10, -10); c.lineTo(-3, -2); c.lineTo(11, -20); c.stroke(); }
    else { c.beginPath(); c.moveTo(-9, -20); c.lineTo(9, -2); c.moveTo(9, -20); c.lineTo(-9, -2); c.stroke(); }
    c.restore();
  };
  // a puff of dust or smoke: a few overlapping blobs round (x, y)
  const puff = (c, x, y, seed = 0, r = 12, colour = GREY) => {
    c.save(); line(c, 2.2); c.fillStyle = colour;
    [[0, 0, 1], [-0.9, 0.3, 0.7], [0.85, 0.35, 0.75], [0.1, -0.7, 0.65]].forEach(([dx, dy, k], i) => {
      c.beginPath(); c.arc(x + dx * r + (seed + i) % 2, y + dy * r, r * k, 0, TAU); c.fill(); c.stroke();
    });
    c.restore();
  };
  // a plain room behind him: a wall tone down to the skirting, and optionally a picture frame at [x, y]
  const room = (c, { wall = '#1E232B', picture } = {}) => {
    c.save(); c.fillStyle = wall; c.fillRect(0, 0, 240, 190); line(c, 2); c.globalAlpha = 0.5; c.beginPath(); c.moveTo(0, 190); c.lineTo(240, 190); c.stroke(); c.globalAlpha = 1;
    if (picture) {
      const [x, y] = picture; c.fillStyle = BROWN; c.lineWidth = 2.4; c.beginPath(); c.rect(x - 17, y - 13, 34, 26); c.fill(); c.stroke();
      c.fillStyle = BLUE; c.fillRect(x - 12, y - 8, 24, 10); c.fillStyle = GREEN; c.fillRect(x - 12, y + 2, 24, 6);
      c.fillStyle = YELLOW; c.beginPath(); c.arc(x + 6, y - 3, 3, 0, TAU); c.fill();
    }
    c.restore();
  };
  // darkness with a round hole at (x, y): everything outside radius r covered in one opaque colour. For a spotlight, an iris, eyes in the dark.
  const iris = (c, x, y, r, colour = '#000000') => {
    c.save(); c.fillStyle = colour; c.beginPath(); c.rect(-400, -400, 1040, 1040); c.moveTo(x + r, y); c.arc(x, y, r, 0, TAU, true); c.fill(); c.restore();
  };
  // draw fn at an opacity, for a prop fading in or out
  const fade = (c, alpha, fn) => { c.save(); c.globalAlpha = alpha; fn(); c.restore(); };

  L.kit = { SKIN, PALE, morph, round, safe, CREAM, DARK, YELLOW, RED, BROWN, GREEN, BLUE, GREY, WHITE, TAU, HOME, clip, view, zoom, cam, iris, tip, gone, walk, look, faces, steps, pt, flip, twin, arm, mug, steam, table, balloon, sparkle, sweat, mark, puff, room, fade };
})();

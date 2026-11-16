// A zip runs down his front and a smaller Lump steps out; a zip on that one opens and a smaller one still steps out. The three stand in a row by size, then climb back in, in order.
// group: odd
// Staging: he steps to the left; the others come out of him to the right; the view widens to fit the row; 8 seconds; out, out again, then the whole thing in reverse; back to rest.
(() => {
  const { D, xf } = window.__lump, kit = window.__lump.kit, k = kit.clip('unzip');
  const B = -56, MID = { k: 0.68, cx: 184 }, SMALL = { k: 0.46, cx: 252 }, VIEW = kit.view(0.8125, [136, 201], [112, 204]);
  const lens = (c, cx, y0, y1, w) => { c.moveTo(cx, y0); c.quadraticCurveTo(cx + 2 * w, (y0 + y1) / 2, cx, y1); c.quadraticCurveTo(cx - 2 * w, (y0 + y1) / 2, cx, y0); };
  // a zip on a Lump of scale s standing at cx: run down as far as len, pulled open by open
  const zip = (c, cx, s, len, open) => {
    if (!len) return;
    const y0 = 201 - 67 * s, y1 = y0 + 56 * s * len, w = 13 * s * open;
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = kit.CREAM;
    if (open) { c.beginPath(); lens(c, cx, y0, y1, w); c.fillStyle = kit.DARK; c.fill(); c.lineWidth = 2.8; c.stroke(); }
    else {
      c.lineWidth = 3; c.beginPath(); c.moveTo(cx, y0); c.lineTo(cx, y1); c.stroke();
      c.lineWidth = 2.4; c.beginPath(); for (let y = y0 + 4 * s; y < y1 - 2; y += 8 * s) { c.moveTo(cx - 5 * s, y); c.lineTo(cx + 5 * s, y); } c.stroke();
    }
    c.fillStyle = kit.YELLOW; c.lineWidth = 2.2; c.beginPath(); c.roundRect(cx - 4 * s, y1 - 2, 8 * s, 12 * s, 2); c.fill(); c.stroke();
    c.restore();
  };
  // a smaller Lump on his way out of the one standing at from: step 0 is two eyes in the dark of the zip, 1 is half out, 2 and 3 are clear
  const child = (c, who, from, fromS, step, face, seed, o = {}) => {
    const cx = [from, from + (who.cx - from) * 0.4, from + (who.cx - from) * 0.78, who.cx][step];
    const d = xf(D.N, { k: who.k, dx: cx - 128, ky: step === 3 && o.squash ? 0.9 : 1, face, extra: o.extra });
    c.save();
    if (!step) {
      [-1, 1].forEach(sd => { c.fillStyle = kit.CREAM; c.beginPath(); c.arc(from + sd * 6 * fromS, 201 - 40 * fromS, 4.6 * fromS, 0, kit.TAU); c.fill(); c.fillStyle = kit.DARK; c.beginPath(); c.arc(from + sd * 6 * fromS + 1, 201 - 39 * fromS, 2.2 * fromS, 0, kit.TAU); c.fill(); });
      c.restore(); return;
    }
    if (step < 2) { c.beginPath(); lens(c, from, 201 - 67 * fromS, 201 - 11 * fromS, 13 * fromS * 1.7); c.rect(from, -100, 400, 400); c.clip(); }
    kit.twin(c, d, seed); c.restore();
  };
  const dots = (dx, dy, r, mouth) => [['dot', 115 + dx, 108 + dy, r], ['dot', 141 + dx, 106 + dy, r], ['stroke', mouth === 'o' ? [[124, 124], [128, 127], [132, 124], [128, 121], [124, 124]] : [[119, 123], [128, 128], [137, 123]], r * 0.7]];
  // st: z1 [len, open], mid (step or undefined), z2 [len, open], small (step), faces, wave
  const scene = st => xf(D.N, { dx: B, face: st.face || kit.look(0, 0, 'smile'), extra: { view: VIEW, arm: st.wave && [[90 + B, 140], [76 + B, 104]], front: (c, d, seed) => {
    zip(c, 128 + B, 1, ...(st.z1 || [0, 0]));
    if (st.mid !== undefined) child(c, MID, 128 + B, 1, st.mid, st.midFace || dots(0, 0, 5.2), seed + 11, { squash: st.squash === 'mid', extra: st.wave && { arm2: [kit.pt({ k: MID.k, dx: MID.cx - 128 }, [166, 140]), kit.pt({ k: MID.k, dx: MID.cx - 128 }, [196, 110])] } });
    if (st.z2) zip(c, MID.cx, MID.k, ...st.z2);
    if (st.small !== undefined) child(c, SMALL, MID.cx, MID.k, st.small, st.smallFace || dots(0, 0, 7), seed + 23, { squash: st.squash === 'small', extra: st.wave && { arm2: [kit.pt({ k: SMALL.k, dx: SMALL.cx - 128 }, [166, 140]), kit.pt({ k: SMALL.k, dx: SMALL.cx - 128 }, [198, 106])] } });
  } } });

  const WALK = kit.walk(0, B, 5).map((o, i, a) => xf(D.N, { ...o, face: kit.look(-3, 0, 'smile'), extra: { view: kit.cam(i / (a.length - 1), kit.HOME, VIEW) } }));
  WALK.forEach((d, i) => k.add('walk' + i, 2, d));

  const down = kit.look(0, 6, 'o'), right = kit.look(6, 2, 'o'), midDown = dots(0, 6, 5.2, 'o'), midRight = dots(5, 0, 5.2, 'o');
  const OUT = [
    ['z1a', 2, { z1: [0.34, 0], face: down }], ['z1b', 2, { z1: [0.67, 0], face: down }], ['z1c', 4, { z1: [1, 0], face: kit.look(0, 6, 'flat') }],
    ['o1a', 2, { z1: [1, 0.6], face: kit.faces.wide }], ['o1b', 2, { z1: [1, 1.2], face: kit.faces.wide }],
    ['pk1', 4, { z1: [1, 1.7], mid: 0, face: kit.faces.wide }], ['h1', 2, { z1: [1, 1.7], mid: 1, face: right }], ['c1', 2, { z1: [1, 1.2], mid: 2, face: right }],
    ['l1', 2, { z1: [1, 0.8], mid: 3, squash: 'mid', face: right }], ['s1', 6, { z1: [1, 0.8], mid: 3, face: right, midFace: dots(-5, 0, 5.2) }],
    ['z2a', 2, { z1: [1, 0.8], mid: 3, z2: [0.5, 0], face: right, midFace: midDown }], ['z2b', 2, { z1: [1, 0.8], mid: 3, z2: [1, 0], face: right, midFace: midDown }],
    ['o2', 2, { z1: [1, 0.8], mid: 3, z2: [1, 1], face: right, midFace: midDown }],
    ['pk2', 4, { z1: [1, 0.8], mid: 3, z2: [1, 1.7], small: 0, face: right, midFace: midDown }], ['h2', 2, { z1: [1, 0.8], mid: 3, z2: [1, 1.7], small: 1, face: right, midFace: midRight }],
    ['c2', 2, { z1: [1, 0.8], mid: 3, z2: [1, 1.2], small: 2, face: right, midFace: midRight }], ['l2', 2, { z1: [1, 0.8], mid: 3, z2: [1, 0.8], small: 3, squash: 'small', face: right, midFace: midRight }],
  ];
  OUT.forEach(([part, ticks, st]) => k.add(part, ticks, scene(st)));
  k.add('row', 8, scene({ z1: [1, 0.8], mid: 3, z2: [1, 0.8], small: 3 }));
  k.add('wave', 12, scene({ z1: [1, 0.8], mid: 3, z2: [1, 0.8], small: 3, wave: true, face: kit.faces.closed }));
  k.add('row', 4);
  [...OUT].reverse().forEach(([part]) => k.add(part, part === 's1' ? 4 : 2));
  k.add('z0', 2, scene({ z1: [0.12, 0] }));
  [...WALK].reverse().forEach((d, i) => k.add('walk' + (WALK.length - 1 - i), 2));
  k.done();
})();

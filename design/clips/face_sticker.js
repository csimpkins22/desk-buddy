// A sneeze launches his face onto the glass. He peels it off and puts it back upside down.
// group: odd
// Staging: recoils left, searches by touch, reaches up-right, returns to centre.
// Source: his own face; fixed normal view; about ten seconds including waking and dozing.
// Rhythm: two false starts, one sneeze, a held blank stare, a repair with a second punchline.
// Ending: he turns his face the right way up, pats it into place, and settles back to sleep.
(() => {
  const L = window.__lump, { D, xf, FACE, kit, tint, closedPath, boil } = L;
  const k = kit.clip('face_sticker'), { CREAM, TAU } = kit;
  const mix = (a, b, t) => a + (b - a) * t;
  const neutral = kit.look(0, 0, 'flat');
  const pose = (o = {}, extra = {}) => xf(D.N, { ...o, extra: { fxm: 'none', ...extra } });

  // The face is a flexible patch of Lump, drawn separately so the whole patch can turn.
  // Transform the points rather than stretching a stroked canvas: the board keeps its outlines round.
  const sticker = (x, y, { size = 1, turn = 0, squash = 1, face = neutral, edge = 1 } = {}) => (c, d, seed) => {
    const cs = Math.cos(turn), sn = Math.sin(turn);
    const points = Array.from({ length: 12 }, (_, j) => {
      const a = j * TAU / 12, u = Math.cos(a) * 29 * size, v = Math.sin(a) * 29 * size * squash;
      return [x + u * cs - v * sn, y + u * sn + v * cs];
    });
    c.save(); c.lineCap = c.lineJoin = 'round';
    closedPath(c, boil(points, seed + 61, .7)); c.fillStyle = tint(); c.fill();
    if (edge > 0) { c.globalAlpha = edge; c.strokeStyle = CREAM; c.lineWidth = 3; c.stroke(); c.globalAlpha = 1; }
    const faceDrawing = xf(D.N, { face, ox: 128, oy: 116, dx: x - 128, dy: y - 116,
      k: size, ky: squash, rot: turn });
    L.drawFace(c, faceDrawing, seed);
    c.restore();
  };
  const stuck = sticker(191, 54, { size: 1.05, face: FACE.shock });
  const blank = (o = {}, extra = {}) => pose({ ...o, face: [] }, extra);

  k.add('tickle', 8, pose({ face: kit.look(-3, -3, 'o') }));
  k.add('inhale1', 6, pose({ ky: 1.05, kx: .97, face: FACE.ah }));
  k.add('false_alarm', 8, pose({ face: neutral }));
  k.add('inhale2', 6, pose({ ky: 1.09, kx: .94, rot: -.04, face: FACE.aah }));
  k.add('squeeze', 4, pose({ ky: .93, kx: 1.06, face: FACE.choo }));

  // Face separates at its actual position, then arcs up towards the glass.
  kit.steps(0, 1, 7).forEach((t, i) => {
    const o = { dx: -25 * t, ky: mix(.93, 1, t), kx: mix(1.06, 1, t), rot: -.09 * Math.sin(t * Math.PI) };
    k.add('achoo' + i, 2, blank(o, { front: sticker(mix(128, 191, t), mix(122, 54, t) - 13 * Math.sin(t * Math.PI),
      { size: mix(1, 1.05, t), turn: -.28 * Math.sin(t * Math.PI), face: FACE.shock, edge: t }) }));
  });
  k.add('splat', 2, blank({ dx: -25 }, { front: (c, d, seed) => {
    sticker(191, 54, { size: 1.17, squash: .8, face: FACE.shock })(c, d, seed);
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round';
    [[153, 31, 148, 25], [190, 15, 190, 9], [151, 75, 145, 80]].forEach(p => {
      c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(p[2], p[3]); c.stroke();
    }); c.restore();
  } }));
  k.add('stuck', 14, blank({ dx: -25 }, { front: stuck }));

  // A faceless body cannot emote: feeling for the missing face sells the discovery.
  kit.steps(0, 1, 4).forEach((t, i) => k.add('feel' + i, 2, blank({ dx: -25 }, {
    arm: [[65, 140], [mix(57, 85, t), mix(146, 112, t)]], front: stuck,
  })));
  k.add('where_is_it', 12, blank({ dx: -25, rot: -.04 }, {
    arm: [[65, 140], [85, 112]], arm2: [[141, 140], [168, 143]], front: stuck,
  }));
  kit.steps(0, 1, 6).forEach((t, i) => k.add('find' + i, 2, blank({ dx: -25 + 15 * t }, {
    arm2: [[141 + 15 * t, 140], [mix(168, 191, t), mix(143, 78, t)]], front: stuck,
  })));
  // Peeling stretches the patch before it releases from the glass.
  [1.12, 1.25, .9, 1].forEach((s, i) => k.add('peel' + i, 2, blank({ dx: -10 }, {
    arm2: [[156, 140], [191, 78 + (s - 1) * 25]],
    front: sticker(191, 54 + (s - 1) * 13, { size: 1.05, squash: s, face: FACE.shock }),
  })));

  // It flips in his hand. The wrong orientation stays clearly visible for a whole beat.
  kit.steps(0, 1, 8).forEach((t, i) => {
    const x = mix(191, 128, t), y = mix(54, 116, t), dx = -10 * (1 - t);
    k.add('replace' + i, 2, blank({ dx }, {
      arm2: [[166 + dx, 140], [x + 23, y + 9]],
      front: sticker(x, y, { size: mix(1.05, 1, t), turn: Math.PI * t, face: neutral }),
    }));
  });
  k.add('backwards', 18, blank({}, { front: sticker(128, 116, { turn: Math.PI, face: neutral }) }));
  // He tests a smile. With the face upside down it comes out as a frown.
  k.add('wrong_smile', 12, blank({}, { front: sticker(128, 116, { turn: Math.PI, face: kit.look(0, 0, 'smile') }) }));
  kit.steps(0, 1, 3).forEach((t, i) => k.add('adjust_reach' + i, 2, blank({}, {
    arm2: [[166, 140], [mix(181, 155, t), mix(144, 116, t)]],
    front: sticker(128, 116, { turn: Math.PI, face: neutral }),
  })));
  kit.steps(Math.PI, TAU, 9).forEach((a, i) => k.add('turn' + i, 2, blank({}, {
    arm2: [[166, 140], [155, 116 + Math.sin(a - Math.PI) * 12]],
    front: sticker(128, 116, { turn: a, face: kit.faces.closed }),
  })));
  k.add('right_way', 10, blank({}, { front: sticker(128, 116, { face: FACE.sheep }) }));
  kit.steps(1, 0, 4).forEach((edge, i) => k.add('smooth' + i, 2, blank({}, {
    arm2: [[166, 140], [mix(181, 151, edge), mix(146, 121, edge)]],
    front: sticker(128, 116, { face: FACE.sheep, edge }),
  })));
  k.add('relief', 12, pose({ face: FACE.sheep }));
  // One last tickle. This time he holds his face on with both hands.
  k.add('again', 4, pose({ ky: 1.03, face: FACE.ah }));
  k.add('hold_on', 12, pose({ face: kit.faces.wide }, {
    arm: [[90, 140], [105, 118]], arm2: [[166, 140], [151, 116]],
  }));
  [0.65, 0.3, 0].forEach((t, i) => k.add('release' + i, 2, pose({ face: kit.faces.closed }, {
    arm: [[90, 140], [mix(83, 105, t), mix(145, 118, t)]],
    arm2: [[166, 140], [mix(173, 151, t), mix(145, 116, t)]],
  })));
  k.add('safe', 6, pose({ face: kit.faces.closed }));
  k.done();
})();

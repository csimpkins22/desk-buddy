// He throws a boomerang off the right edge and waits, and waits; it comes all the way round from the left and shaves his cowlick flat.
(() => {
  const { D, xf, kit } = window.__lump, k = kit.clip('boomerang'), H = 32;
  const boom = (c, x, y, a) => {
    c.save(); c.translate(x, y); c.rotate(a); c.lineCap = c.lineJoin = 'round';
    [[kit.CREAM, 13], [kit.BROWN, 7]].forEach(([col, w]) => { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(-19, 13); c.lineTo(0, -10); c.lineTo(19, 13); c.stroke(); });
    c.strokeStyle = kit.YELLOW; c.lineWidth = 7; c.beginPath(); c.moveTo(-19, 13); c.lineTo(-14, 7); c.moveTo(19, 13); c.lineTo(14, 7); c.stroke();
    c.restore();
  };
  // his cowlick knocked over, on standing Lump
  const BENT = [[128, 71], [134, 61], [144, 56], [153, 58]], FLAT = [[128, 71], [133, 64], [146, 61], [160, 61], [169, 66]], HALF = [[128, 71], [130, 60], [136, 54], [142, 56]], OVER = [[128, 71], [121, 56], [125, 45], [135, 49], [131, 58]];
  const curl = (o, pts) => pts.map(p => kit.pt(o, p));
  const SH = [166 + H, 140], BORED = kit.look(5, 0, 'flat');
  const add = (name, ticks, o, face, extra) => k.add(name, ticks, xf(D.N, { dx: H, ...o, face, extra }));

  kit.walk(0, H, 4, { face: kit.look(4, 0, 'smile') }).forEach((o, i) => k.add('go' + i, 2, xf(D.N, o)));
  // out from behind his back
  add('p0', 2, {}, kit.look(4, 3, 'smile'), { arm2: [SH, [214, 154]], back: c => boom(c, 220, 150, 0.9) });
  add('p1', 2, {}, kit.look(5, 0, 'smile'), { arm2: [SH, [220, 132]], front: c => boom(c, 224, 122, 0.5) });
  add('p2', 6, {}, kit.look(5, -3, 'open'), { arm2: [SH, [216, 112]], front: c => boom(c, 216, 94, 0.2) });
  // wind up, throw
  const BACK = { rot: -0.14 }, FWD = { rot: 0.16 };
  add('wind', 4, BACK, kit.look(5, -2, 'flat'), { arm2: [kit.pt({ dx: H, ...BACK }, [166, 140]), [198, 104]], front: c => boom(c, 198, 88, -0.5) });
  add('throw', 2, FWD, kit.look(5, 0, 'open'), { arm2: [kit.pt({ dx: H, ...FWD }, [166, 140]), [232, 136]], front: c => boom(c, 232, 116, 1.2) });
  add('after', 2, { rot: 0.1 }, kit.look(5, -1, 'open'), { arm2: [kit.pt({ dx: H, rot: 0.1 }, [166, 140]), [228, 146]] });
  // the wait
  add('watch', 14, {}, kit.look(5, -1, 'smile'));
  add('up', 10, {}, kit.look(4, -6, 'flat'));
  add('left', 10, {}, kit.look(-5, 0, 'flat'));
  add('right', 8, {}, BORED);
  const tap = [{ arm2: [SH, [212, 163]] }, { arm2: [SH, [222, 154]] }];
  add('tapa', 4, {}, BORED, tap[0]); add('tapb', 4, {}, BORED, tap[1]); k.add('tapa', 4); k.add('tapb', 4);
  // round it comes, behind him, while he is still tapping
  const X = [-16, 12, 40, 68, 96, 124, 150], Y = [74, 70, 66, 63, 61, 59, 58];
  X.forEach((x, i) => add('round' + i, 2, {}, BORED, { ...tap[(i >> 1) % 2], ...(i === 6 ? { curl: curl({ dx: H }, BENT) } : {}), front: c => boom(c, x, Y[i], i * 1.1) }));
  const JUMP = { kx: 1.06, ky: 0.9 };
  add('hit0', 2, JUMP, kit.faces.wide, { curl: curl({ dx: H, ...JUMP }, FLAT), front: c => boom(c, 176, 62, 1.4) });
  add('hit1', 2, JUMP, kit.faces.wide, { curl: curl({ dx: H, ...JUMP }, FLAT), front: c => boom(c, 204, 60, 2.5) });
  add('hit2', 2, { ky: 0.96 }, kit.look(4, -5, 'o'), { curl: curl({ dx: H, ky: 0.96 }, FLAT), front: c => boom(c, 234, 64, 3.6) });
  add('flat', 14, {}, kit.look(1, -7, 'flat'), { curl: curl({ dx: H }, FLAT) });
  // home, and it springs back up
  kit.walk(H, 0, 4, { face: kit.look(-3, 0, 'flat') }).forEach((o, i) => k.add('home' + i, 2, xf(D.N, { ...o, extra: { curl: curl(o, FLAT) } })));
  k.add('boing0', 2, xf(D.N, { ky: 0.97, face: kit.look(0, -6, 'o'), extra: { curl: curl({ ky: 0.97 }, HALF) } }));
  k.add('boing1', 2, xf(D.N, { ky: 1.03, face: kit.look(0, -6, 'smile'), extra: { curl: curl({ ky: 1.03 }, OVER) } }));
  k.done();
})();

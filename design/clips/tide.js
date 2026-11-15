// He is a rock on a shore, at the left with his eyes open: the tide comes in over his head, holds, and goes out, leaving him a strand of seaweed.
(() => {
  const { D, xf, openPath, closedPath, kit } = window.__lump, { TAU, DARK, GREEN } = kit;
  const k = kit.clip('tide'), V = kit.view(1, [128, 120], [74, 120]), FLAT = kit.look(0, 0, 'flat');
  const SEA = '#3F95DD', DEEP = '#2468A8', PALE = '#BFE6FF';
  const ramp = (v, a, b) => { const t = Math.max(0, Math.min(1, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
  const DRAPE = [[102, 80], [114, 71], [128, 67], [142, 70], [154, 79], [161, 93], [164, 108], [160, 122]];
  // the weed drifts in along the surface from x0, then settles onto his head as the water drops past it
  const weedAt = (level, ph, x0, settle) => {
    const t = settle ? ramp(level, 46, 84) : 0, top = Math.min(level, 60) + 12;
    return DRAPE.map(([dx, dy], i) => { const fx = x0 + i * 11, fy = top + 4 * Math.sin(i * 1.3 + ph); return [fx + (dx - fx) * t, fy + (dy - fy) * t]; });
  };
  const weed = (c, pts, alpha = 1) => kit.fade(c, alpha, () => {
    c.lineCap = c.lineJoin = 'round';
    openPath(c, pts); c.strokeStyle = '#1F7A45'; c.lineWidth = 9; c.stroke();
    openPath(c, pts); c.strokeStyle = GREEN; c.lineWidth = 5; c.stroke();
  });
  const sea = (level, ph, x0, settle) => (c, d) => {
    const top = [];
    for (let x = 20; x <= 320; x += 30) top.push([x, Math.round(level + 4 * Math.sin(x / 26 + ph))]);
    c.save(); c.lineCap = c.lineJoin = 'round';
    closedPath(c, [...top, [344, 300], [-4, 300]]); c.fillStyle = SEA; c.fill(); c.clip();
    closedPath(c, d.body); c.fillStyle = DEEP; c.fill(); c.strokeStyle = PALE; c.lineWidth = 3.4; c.stroke();
    openPath(c, d.curl); c.stroke();
    c.fillStyle = DARK; [[116, 109], [140, 107]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 4, 0, TAU); c.fill(); });
    c.strokeStyle = DARK; c.lineWidth = 2.8; c.beginPath(); c.moveTo(122, 125); c.lineTo(134, 125); c.stroke();
    c.restore();
    c.save(); c.lineCap = 'round'; openPath(c, top); c.strokeStyle = PALE; c.lineWidth = 3; c.stroke(); c.restore();
    if (x0 !== undefined) weed(c, weedAt(level, ph, x0, settle));
  };
  // once the water is over his cowlick only the hook's underwater drawing of him is needed
  const rock = (view, front, sunk) => xf(D.N, sunk ? { face: [], shadowK: 0, extra: { still: true, view, front, fill: 'none', line: 'none' } } : { face: FLAT, extra: { still: true, view, front } });

  kit.steps(0, 1, 4).forEach((t, i) => k.add('pan' + i, 2, rock(kit.cam(t, kit.HOME, V))));
  k.add('shore', 6, rock(V));
  const drift = kit.steps(330, 102, 26);
  let f = 0;
  kit.steps(240, 36, 40).forEach((lv, i) => k.add('in' + i, 2, rock(V, sea(lv, f++ * 0.45, i >= 29 ? drift[i - 29] : undefined), lv < 44)));
  for (let i = 0; i < 15; i++) k.add('high' + i, 2, rock(V, sea(36, f++ * 0.45, drift[i + 11]), true));
  kit.steps(36, 244, 30).forEach((lv, i) => k.add('ebb' + i, 2, rock(V, sea(lv, f++ * 0.45, 102, true), lv < 44)));
  k.add('left', 14, rock(V, c => weed(c, DRAPE)));
  kit.steps(0, 1, 5).forEach((t, i) => k.add('home' + i, 2, rock(kit.cam(t, V, kit.HOME), i < 4 ? c => weed(c, DRAPE.map(([x, y], n) => [x + i * i * 5, y + i * i * (2 + n)]), 1 - i * 0.25) : undefined)));
  k.done();
})();

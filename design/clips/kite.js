// Kite: he flies a diamond kite, a gust lifts him off the floor, and he lands with the kite draped over him.
(() => {
  const { D, xf, FACE, openPath, kit } = window.__lump, k = kit.clip('kite');
  const kite = (c, [x, y, rot], hand, a = 1) => kit.fade(c, a, () => {
    const bx = x - 30 * Math.sin(rot), by = y + 30 * Math.cos(rot);
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.moveTo(bx, by); c.quadraticCurveTo((bx + hand[0]) / 2 + 6, (by + hand[1]) / 2 + 8, hand[0], hand[1]); c.stroke();
    c.translate(x, y); c.rotate(rot);
    c.fillStyle = kit.RED; c.lineWidth = 2.8; c.beginPath(); c.moveTo(0, -30); c.lineTo(22, -6); c.lineTo(0, 30); c.lineTo(-22, -6); c.closePath(); c.fill(); c.stroke();
    c.lineWidth = 2.2; c.beginPath(); c.moveTo(0, -28); c.lineTo(0, 28); c.moveTo(-20, -6); c.lineTo(20, -6); c.stroke();
    c.lineWidth = 2.6; openPath(c, [[0, 30], [8, 38], [2, 46], [10, 54]]); c.stroke();
    c.fillStyle = kit.YELLOW; [[8, 38], [2, 46]].forEach(([px, py]) => { c.beginPath(); c.arc(px, py, 4, 0, kit.TAU); c.fill(); });
    c.restore();
  });
  const wind = (c, off) => { c.save(); c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 3; c.globalAlpha = 0.6;
    [[16, 52, 34], [30, 96, 26], [14, 150, 30]].forEach(([x, y, w]) => { c.beginPath(); c.moveTo(x + off, y); c.lineTo(Math.min(x + off + w, 226), y); c.stroke(); }); c.restore(); };
  const K = (o, kt, { a = 1, held = true, gust } = {}) => {
    const p = { dx: -24, ...o }, sh = kit.pt(p, [166, 140]), bx = kt[0] - 30 * Math.sin(kt[2]), by = kt[1] + 30 * Math.cos(kt[2]);
    const len = Math.hypot(bx - sh[0], by - sh[1]), hand = held ? [sh[0] + (bx - sh[0]) / len * 26, sh[1] + (by - sh[1]) / len * 26] : [150, 196];
    return xf(D.N, { ...p, extra: { ...(held ? { arm2: [sh, hand] } : {}), ...(gust !== undefined ? { back: c => wind(c, gust) } : {}), front: c => kite(c, kt, hand, a) } });
  };

  [0.3, 0.65, 1].forEach((a, i) => k.add('in' + i, 2, K({ face: FACE.lookr }, [194, 46, 0.1], { a })));
  k.add('b0', 4, K({ face: FACE.happy }, [194, 46, 0.1]));
  k.add('b1', 4, K({ face: FACE.happy, ky: 1.02 }, [190, 50, -0.05]));
  k.add('b0', 4); k.add('b1', 4);
  k.add('g0', 2, K({ face: FACE.lookr, rot: -0.06 }, [197, 44, 0.2], { gust: 0 }));
  k.add('g1', 2, K({ face: FACE.shock, rot: 0.04, ky: 1.05 }, [200, 42, 0.3], { gust: 30 }));
  kit.steps(-10, -44, 3).forEach((dy, i) => k.add('lift' + i, 2, K({ face: FACE.shock, dy, dx: -22 + i * 4, rot: 0.12, shadowK: 0.9 - i * 0.15 }, [200, 42, 0.3], { gust: 60 + i * 30 })));
  k.add('h0', 4, K({ face: FACE.aah, dy: -44, dx: -14, rot: 0.14, shadowK: 0.6 }, [200, 42, 0.3], { gust: 150 }));
  k.add('h1', 4, K({ face: FACE.aah, dy: -40, dx: -14, rot: 0.1, shadowK: 0.6 }, [198, 44, 0.22], { gust: 180 }));
  k.add('d0', 2, K({ face: FACE.shock, dy: -28, dx: -14, shadowK: 0.75 }, [184, 50, 0.1]));
  k.add('d1', 2, K({ face: FACE.shock, dy: -10, dx: -14, shadowK: 0.9 }, [160, 62, -0.1], { held: false }));
  k.add('d2', 2, K({ face: FACE.shock, dx: -14, ky: 0.88, kx: 1.08 }, [136, 78, -0.25], { held: false }));
  k.add('drape', 14, K({ face: FACE.grump, dx: -14 }, [114, 88, -0.4], { held: false }));
  [0.7, 0.4, 0.15].forEach((a, i) => k.add('out' + i, 2, K({ face: FACE.grump, dx: -14 }, [114, 88, -0.4], { held: false, a })));
  k.done();
})();

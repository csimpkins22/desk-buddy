// Close on his face: he rests a cheek on a cactus at the left edge and its prickles ping into him one at a time, until he gives up.
// group: scenes
(() => {
  const { D, xf, boil, closedPath, kit } = window.__lump;
  const k = kit.clip('cactus_hug'), V = kit.view(1.7, [112, 115]);
  // where each prickle lands on standing Lump, and the way its tail points
  const SPOTS = [[92, 120, 3.5], [104, 90, 4.0], [152, 86, 4.6], [108, 154, 3.2], [166, 128, 5.2], [140, 162, 2.7], [128, 146, 3.9]];
  const GRIM = [['stroke', [[110, 110], [122, 110]], 3], ['stroke', [[134, 108], [146, 108]], 3], ['stroke', [[122, 126], [134, 126]], 2.8]];
  const WINCE = [['stroke', [[111, 105], [120, 109], [111, 114]], 3], ['stroke', [[146, 103], [137, 107], [146, 112]], 3], ['oval', 128, 126, 4, 5]];
  const LEAN = { rot: -0.18 }, JOLT = { rot: -0.14, kx: 1.05, ky: 0.94, dx: 3 };

  const cactus = (c, seed, ox) => {
    c.save(); c.translate(ox, 0); c.lineJoin = c.lineCap = 'round';
    closedPath(c, boil([[20, 203], [19, 92], [28, 64], [46, 54], [64, 64], [72, 92], [73, 203]], seed + 3, 1.2));
    c.fillStyle = kit.GREEN; c.fill(); c.strokeStyle = kit.CREAM; c.lineWidth = 2.6; c.stroke();
    c.strokeStyle = '#2E9E60'; c.lineWidth = 3; c.beginPath(); c.moveTo(60, 70); c.lineTo(60, 198); c.moveTo(44, 62); c.lineTo(44, 198); c.stroke();
    c.strokeStyle = kit.CREAM; c.lineWidth = 2.2; c.beginPath();
    [[52, 72], [66, 90], [54, 108], [67, 126], [53, 144], [66, 162], [54, 180]].forEach(([x, y]) => { c.moveTo(x, y); c.lineTo(x + 7, y - 5); });
    c.stroke(); c.restore();
  };
  const prick = (c, [x, y], a) => { c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * 13, y + Math.sin(a) * 13); c.stroke(); };
  // the cactus behind him and n prickles in him; fly is one on its way over, burst the one that has just landed
  const scene = (o, n, { ox = 0, fly, burst } = {}) => ({
    back: (c, d, seed) => cactus(c, seed, ox),
    front: c => {
      c.save(); c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 3;
      SPOTS.slice(0, n).forEach(([x, y, a]) => prick(c, kit.pt(o, [x, y]), a));
      if (fly !== undefined) {
        const [x, y, a] = SPOTS[fly], q = kit.pt(o, [x, y]), from = [76, q[1] - 8], p = [(from[0] + q[0]) / 2, (from[1] + q[1]) / 2];
        prick(c, p, a); c.lineWidth = 1.8; c.beginPath(); c.moveTo(from[0], from[1]); c.lineTo(p[0] - 6, p[1] - 1); c.stroke();
      }
      if (burst !== undefined) {
        const [x, y, a] = SPOTS[burst], q = kit.pt(o, [x, y]); c.lineWidth = 2;
        [1.3, -1.3, 2.5, -2.5].forEach(t => { c.beginPath(); c.moveTo(q[0] + Math.cos(a + t) * 6, q[1] + Math.sin(a + t) * 6); c.lineTo(q[0] + Math.cos(a + t) * 12, q[1] + Math.sin(a + t) * 12); c.stroke(); });
      }
      c.restore();
    },
  });

  kit.steps(1, 1.7, 4).forEach((z, i) => k.add('in' + i, 2, xf(D.N, { face: kit.look(-5, 0, 'smile'), extra: { view: kit.zoom(z, [112, 115]), ...scene({}, 0, { ox: [-84, -52, -18, 0][i] }) } })));
  kit.steps(-0.06, -0.18, 3).forEach((rot, i) => k.add('lean' + i, i === 2 ? 6 : 2, xf(D.N, { rot, face: kit.faces.closed, extra: { view: V, ...scene({ rot }, 0) } })));
  const settled = [kit.faces.closed, kit.faces.wide, kit.faces.worried, kit.look(-5, 0, 'wobble'), kit.faces.sad, kit.faces.sad, GRIM];
  SPOTS.forEach((s, i) => {
    k.add('fly' + i, 2, xf(D.N, { ...LEAN, face: settled[i], extra: { view: V, ...scene(LEAN, i, { fly: i }) } }));
    k.add('hit' + i, 2, xf(D.N, { ...JOLT, face: i < 5 ? WINCE : GRIM, extra: { view: V, ...scene(JOLT, i + 1, { burst: i }) } }));
  });
  k.add('resigned', 12, xf(D.N, { ...LEAN, face: GRIM, extra: { view: V, ...scene(LEAN, 7) } }));
  // he slides down it to sleep, prickles and all, as the view lets go
  [[D.T1, { ky: 0.92 }, 1.6, [112, 118], 0], [D.T1, { ky: 0.92 }, 1.45, [114, 124], -16], [D.T2, { ky: 0.62, kx: 1.12 }, 1.3, [118, 140], -42],
   [D.T2, { ky: 0.62, kx: 1.12 }, 1.15, [120, 150], -72], [D.S1, { ky: 0.42, kx: 1.2 }, 1, [120, 150], -104]]
    .forEach(([base, o, z, focus, ox], i) => k.add('down' + i, i === 4 ? 6 : 2, { ...base, view: kit.zoom(z, focus), ...scene(o, 7, { ox }), ...(i === 4 ? { fxm: 'idle' } : {}) }));
  k.done({ doze: false });
})();

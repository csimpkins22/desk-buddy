// A faint, enormous eye slowly fills the screen behind him, as if someone is peering into the cube. He turns, sees it, gives a small uncertain wave, and it blinks.
// group: odd
// Staging: small in the bottom left of a wide shot; the eye grows in behind him; 8 seconds; slow burn to one blink; he drops straight into pretend sleep.
(() => {
  const { D, xf } = window.__lump, kit = window.__lump.kit, k = kit.clip('big_eye');
  const WIDE = kit.view(0.6, [128, 201], [64, 224]), FAINT = '#56616E';
  // the eye, fixed to the screen: s its size, lid 1 open to 0 shut, pupil looking (px, py) off centre
  const eye = (s, lid = 1, px = 0, py = 0, alpha = 1) => c => {
    const W = 106 * s, lower = 58 * s, upper = lower + (-78 * s - lower) * lid, P = [[-W, 0], [-W * 0.5, upper], [W * 0.5, upper], [W, 0]];
    const lids = () => { c.beginPath(); c.moveTo(-W, 0); c.bezierCurveTo(...P[1], ...P[2], W, 0); c.bezierCurveTo(W * 0.5, lower, -W * 0.5, lower, -W, 0); };
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.translate(130, 104); c.globalAlpha = alpha;
    c.strokeStyle = c.fillStyle = FAINT; c.lineCap = c.lineJoin = 'round'; c.lineWidth = 4;
    if (lid > 0.2) {
      c.save(); lids(); c.clip();
      c.beginPath(); c.arc(px * s, py * s, 38 * s, 0, kit.TAU); c.stroke();
      c.beginPath(); c.arc(px * s, py * s, 17 * s, 0, kit.TAU); c.fill();
      c.restore();
    }
    lids(); c.stroke();
    [0.16, 0.33, 0.5, 0.67, 0.84].forEach(t => {
      const u = 1 - t, b = i => u * u * u * P[0][i] + 3 * u * u * t * P[1][i] + 3 * u * t * t * P[2][i] + t * t * t * P[3][i], fan = (t - 0.5) * 1.7, up = lid > 0.2 ? -1 : 1;
      c.beginPath(); c.moveTo(b(0), b(1)); c.lineTo(b(0) + Math.sin(fan) * 18 * s, b(1) + Math.cos(fan) * 18 * s * up); c.stroke();
    });
    c.restore();
  };
  const wide = (o, face, extra) => xf(D.N, { ...o, face, extra: { view: WIDE, ...extra } });
  const turned = (o, extra) => ({ ...kit.flip(xf(D.N, { ...o, face: [] })), view: WIDE, ...extra });

  kit.steps(0, 1, 6).forEach((t, i) => k.add('out' + i, 2, xf(D.N, { face: kit.faces.closed, extra: { view: kit.cam(t, kit.HOME, WIDE) } })));
  kit.steps(0.2, 1, 14).forEach((s, i) => k.add('grow' + i, 4, wide({ ky: i % 2 ? 0.96 : 1, kx: i % 2 ? 1.02 : 1 }, kit.faces.closed, { back: eye(s, 1, 0, 0, Math.min(1, 0.4 + i * 0.3)) })));
  k.add('pup1', 2, wide({}, kit.faces.closed, { back: eye(1, 1, -13, 9) }));
  k.add('pup2', 4, wide({}, kit.faces.closed, { back: eye(1, 1, -26, 18) }));
  k.add('stiff', 6, wide({ ky: 0.94 }, kit.faces.wide, { back: eye(1, 1, -26, 18), front: c => kit.mark(c, '!', 188, 62, 1.6) }));
  k.add('turn', 2, wide({ kx: 0.55 }, [], { back: eye(1, 1, -26, 18) }));
  k.add('sees', 10, turned({ rot: 0.06 }, { back: eye(1, 1, -26, 18) }));

  const hi = [[166, 140], [196, 112]], lo = [[166, 140], [202, 126]];
  k.add('w0', 2, turned({}, { back: eye(1, 1, -26, 18), arm2: [[166, 140], [192, 148]] }));
  k.add('w1', 4, turned({}, { back: eye(1, 1, -26, 18), arm2: hi }));
  k.add('w2', 4, turned({}, { back: eye(1, 1, -26, 18), arm2: lo }));
  k.add('w1', 4);
  k.add('w2', 4);
  k.add('w1', 6);
  k.add('half', 2, turned({}, { back: eye(1, 0.45, -26, 18), arm2: hi }));
  k.add('shut', 8, turned({ ky: 0.97 }, { back: eye(1, 0, -26, 18), arm2: hi }));
  k.add('half', 2);
  k.add('froze', 14, turned({ ky: 0.92, kx: 1.04 }, { back: eye(1, 1, -26, 18), arm2: [[168, 144], [198, 118]] }));

  k.add('spin', 2, wide({ kx: 0.55, ky: 0.95 }, [], { back: eye(1, 1, -26, 18) }));
  k.add('dr1', 2, xf(D.T1, { extra: { view: kit.cam(0.3, WIDE, kit.HOME), back: eye(0.8, 1, -26, 18) } }));
  k.add('dr2', 2, xf(D.T2, { extra: { view: kit.cam(0.65, WIDE, kit.HOME), back: eye(0.55, 1, -26, 18) } }));
  k.add('dr3', 2, xf(D.S1, { extra: { view: kit.cam(0.9, WIDE, kit.HOME), back: eye(0.3, 1, -26, 18) } }));
  k.add('play', 8, xf(D.S1, {}));
  k.done({ doze: false });
})();

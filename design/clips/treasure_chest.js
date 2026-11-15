// Treasure chest: he digs at an X on the floor, hauls up a chest, opens it to a golden glow, and lifts out a single sock.
(() => {
  const { D, xf, FACE, boil, closedPath, kit } = window.__lump, k = kit.clip('treasure_chest'), { CREAM, BROWN, YELLOW, RED, WHITE, BLUE, TAU } = kit;
  const o = { k: 0.9, dx: -42 }, sh = kit.pt(o, [166, 140]), CX = 190;
  const ink = (c, w = 2.8) => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = w; };
  const cross = (c, a = 1) => kit.fade(c, a, () => { ink(c, 4.5); c.strokeStyle = RED; c.beginPath(); c.moveTo(CX - 14, 192); c.lineTo(CX + 14, 201); c.moveTo(CX + 14, 192); c.lineTo(CX - 14, 201); c.stroke(); });
  const chest = (c, sink = 0, open = 0, glow = false) => {
    c.save(); c.beginPath(); c.rect(0, 0, 240, 202); c.clip(); c.translate(CX, 200 + sink); ink(c);
    if (glow) { c.globalAlpha = 0.6; c.fillStyle = YELLOW; c.beginPath(); c.moveTo(-20, -30); c.lineTo(-34, -78); c.lineTo(20, -84); c.lineTo(22, -30); c.closePath(); c.fill(); c.globalAlpha = 1; }
    c.fillStyle = BROWN; c.beginPath(); c.roundRect(-25, -30, 50, 30, 4); c.fill(); c.stroke();
    c.fillStyle = YELLOW; c.beginPath(); c.roundRect(-5, -26, 10, 11, 2); c.fill(); c.stroke();
    c.translate(25, -30); c.rotate(open);
    c.fillStyle = BROWN; c.beginPath(); c.roundRect(-50, -15, 50, 15, 6); c.fill(); c.stroke();
    c.fillStyle = YELLOW; c.fillRect(-48, -9, 46, 4);
    c.restore();
  };
  const sock = (c, x, y, seed) => {
    c.save(); c.translate(x, y); ink(c, 2.6); c.fillStyle = WHITE;
    closedPath(c, boil([[-7, 0], [7, 0], [8, 22], [22, 28], [22, 38], [4, 40], [-8, 34]], seed, 0.8)); c.fill(); c.stroke();
    c.fillStyle = BLUE; c.fillRect(-6, 4, 12, 5); c.fillRect(-6, 13, 12, 5);
    c.restore();
  };
  const at = (face, hand, front, more = {}) => xf(D.N, { ...o, ...more, face, extra: { arm2: [sh, hand], front } });
  [0.35, 0.7].forEach((a, i) => k.add('x' + i, 2, at(FACE.lookr, [144, 160], c => cross(c, a))));
  k.add('dig1', 4, at(FACE.lookr, [166, 186], (c, d, seed) => { cross(c); kit.puff(c, 176, 190, seed, 7); }, { rot: 0.16 }));
  k.add('dig2', 4, at(FACE.lookr, [156, 160], (c, d, seed) => { cross(c); kit.puff(c, 184, 178, seed, 5); }, { rot: 0.06 }));
  k.add('dig1', 4); k.add('dig2', 4);
  [30, 14].forEach((s, i) => k.add('up' + i, 2, at(FACE.shock, [162, 176 - i * 8], c => { cross(c, 0.6 - i * 0.3); chest(c, s); }, { rot: 0.1 })));
  k.add('chest', 6, at(FACE.happy, [150, 168], c => chest(c)));
  k.add('lid', 2, at(FACE.happy, [158, 160], c => chest(c, 0, 0.45)));
  k.add('glow', 8, at(FACE.cute, [150, 166], c => { chest(c, 0, 0.95, true); kit.sparkle(c, 170, 108, 9, YELLOW); kit.sparkle(c, 204, 96, 7, YELLOW); }, { ky: 1.04 }));
  [[176, 150], [168, 126]].forEach((h, i) => k.add('lift' + i, 2, at(FACE.cute, h, (c, d, seed) => { chest(c, 0, 0.95, i === 0); sock(c, h[0] + 2, h[1], seed); })));
  k.add('sock', 14, xf(D.R1, { ...o, extra: { arm2: [sh, [164, 106]], front: (c, d, seed) => { chest(c, 0, 0.95); sock(c, 166, 106, seed); } } }));
  [0.65, 0.3].forEach((a, i) => k.add('out' + i, 2, xf(D.R1, { ...o, extra: { arm2: [sh, [162, 116 + i * 16]], front: (c, d, seed) => kit.fade(c, a, () => { chest(c, 12 + i * 12, 0.95); sock(c, 164, 116 + i * 16, seed); }) } })));
  k.done();
})();

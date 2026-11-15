// Two Lumps share one microphone, swaying; they go for the high note together, the little one's note cracks, and he gives it a look.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('karaoke', { mirror: true });
  // drawn with the pair on the left: the mirror puts them on the right
  const cam = z => kit.view(z, [120, 201], [120, 201]), HIS = -83, ITS = 20;
  const shut = kit.faces.closed.slice(0, 2), SING = [[...shut, kit.look(0, 0, 'open')[2]], [...shut, kit.look(0, 0, 'o')[2]]];
  const SIDE = [...kit.look(5, 1, 'flat'), ['stroke', [[110, 103], [125, 105]], 2.8], ['stroke', [[135, 103], [150, 102]], 2.8]];
  const stand = (c, y) => {
    c.save(); c.translate(0, y); c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 3.6;
    c.beginPath(); c.moveTo(108, 201); c.lineTo(108, 130); c.moveTo(93, 201); c.lineTo(123, 201); c.stroke();
    c.fillStyle = kit.DARK; c.lineWidth = 2.6; c.beginPath(); c.rect(103, 124, 10, 9); c.fill(); c.stroke();
    c.fillStyle = kit.GREY; c.lineWidth = 3; c.beginPath(); c.arc(108, 115, 10, 0, kit.TAU); c.fill(); c.stroke();
    c.restore();
  };
  // stem and flag on the left, so the mirror shows them the right way round
  const note = (c, x, y, s, col) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.fillStyle = c.strokeStyle = col; c.lineWidth = 3.8;
    c.beginPath(); c.ellipse(x, y, 7 * s, 5.2 * s, 0.4, 0, kit.TAU); c.fill();
    c.beginPath(); c.moveTo(x - 6 * s, y - s); c.lineTo(x - 6 * s, y - 23 * s); c.quadraticCurveTo(x - 13 * s, y - 19 * s, x - 15 * s, y - 10 * s); c.stroke();
    c.restore();
  };
  // the same note snapped in two, its halves `gap` apart and dropping
  const cracked = (c, x, y, s, gap) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.fillStyle = c.strokeStyle = kit.BLUE; c.lineWidth = 3.8;
    c.beginPath(); c.ellipse(x - gap, y + gap * 0.6, 7 * s, 5.2 * s, 0.4, 1.2, 1.2 + Math.PI); c.fill();
    c.beginPath(); c.ellipse(x + gap, y + gap * 1.4, 7 * s, 5.2 * s, 0.4, 1.2 + Math.PI, 1.2 + kit.TAU); c.fill();
    c.beginPath(); c.moveTo(x - 6 * s - gap, y - s); c.lineTo(x - 7 * s - gap * 1.6, y - 11 * s); c.stroke();
    c.beginPath(); c.moveTo(x - 4 * s + gap, y - 13 * s - gap); c.lineTo(x - 2 * s + gap * 1.5, y - 24 * s - gap); c.stroke();
    c.strokeStyle = kit.CREAM; c.lineWidth = 3.6; c.beginPath(); c.moveTo(x - 6, y - 16 - gap); c.lineTo(x + 5, y - 7); c.lineTo(x - 5, y + 2); c.lineTo(x + 6, y + 12 + gap); c.stroke();
    c.restore();
  };
  const twin = (o, face) => xf(D.N, { k: 0.75, dx: ITS, face, ...o });
  const shot = (z, him, face, it, front, standY = 0) => xf(D.N, { dx: HIS, ...him, face, extra: { view: cam(z),
    back: (c, d, seed) => kit.twin(c, it, seed),
    front: c => { stand(c, standY); if (front) front(c); } } });

  // he shuffles over, a small one joins him and a microphone comes down between them
  const Z = kit.steps(1, 0.8, 5), HX = kit.steps(-16, HIS, 5), TX = kit.steps(180, ITS, 5), SY = kit.steps(-230, 0, 5);
  Z.forEach((z, i) => k.add('in' + i, 2, shot(z, { dx: HX[i], rot: i % 2 ? -0.05 : 0.05 }, kit.look(4, 0, 'smile'), twin({ dx: TX[i], rot: i % 2 ? 0.05 : -0.05 }, kit.faces.wide), null, SY[i])));
  // singing, swaying in time, a stream of notes from each
  for (let j = 0; j < 12; j++) {
    const rot = j % 2 ? 0.07 : -0.07, f = SING[j % 2];
    k.add('sing' + j, 4, shot(0.8, { rot }, f, twin({ rot }, f), c => {
      [0, 1].forEach(n => { const a = (j * 14 + n * 44) % 88; note(c, 44 + (n ? 9 : -7), 52 - a, Math.min(1, 0.55 + a / 30), kit.YELLOW); });
      [0, 1].forEach(n => { const a = (j * 14 + 22 + n * 44) % 88; note(c, 158 + a * 0.4, 90 - a, Math.min(0.85, 0.5 + a / 30), kit.BLUE); });
    }));
  }
  // a breath, then the high note: his sails off the top, the little one's wobbles
  k.add('breath', 4, shot(0.8, { ky: 0.9, kx: 1.05 }, SING[1], twin({ ky: 0.9, kx: 1.05 }, SING[1])));
  const UP = { ky: 1.1, kx: 0.96, rot: -0.05 }, UP2 = { ky: 1.12, kx: 0.96, rot: 0.05 };
  [0, 1, 2, 3].forEach(i => k.add('high' + i, 2, shot(0.8, UP, FACE.aah, twin(UP2, FACE.aah), c => {
    note(c, 46, 34 - i * 22, 1.8, kit.YELLOW); note(c, 182 + (i % 2 ? 5 : -5), 74 - i * 13, 1.7, kit.BLUE);
    if (i > 1) { c.save(); c.strokeStyle = kit.CREAM; c.lineWidth = 2.6; c.lineCap = 'round'; c.beginPath(); [146, 214].forEach(x => { c.moveTo(x, 62 - i * 13); c.lineTo(x + 5, 68 - i * 13); c.lineTo(x, 74 - i * 13); }); c.stroke(); c.restore(); }
  })));
  k.add('crack0', 2, shot(0.8, UP, FACE.aah, twin({ ky: 1.04 }, kit.faces.wide), c => { note(c, 46, -54, 1.8, kit.YELLOW); cracked(c, 182, 34, 1.7, 5); }));
  k.add('crack1', 4, shot(0.8, { ky: 1.03 }, kit.look(0, 0, 'o'), twin({ ky: 0.96 }, kit.faces.wide), c => cracked(c, 182, 40, 1.7, 10)));
  k.add('crack2', 4, shot(0.8, {}, SIDE, twin({ ky: 0.94, rot: 0.05 }, FACE.sheep), c => cracked(c, 182, 56, 1.7, 15)));
  k.add('crack3', 4, shot(0.8, {}, SIDE, twin({ ky: 0.92, rot: 0.08 }, FACE.sheep), c => kit.fade(c, 0.5, () => cracked(c, 182, 80, 1.7, 20))));
  k.add('look', 14, shot(0.8, { rot: 0.04 }, SIDE, twin({ ky: 0.9, rot: 0.1 }, FACE.sheep)));
  // the little one slinks off, the microphone goes back up
  Z.slice().reverse().forEach((z, n) => { const i = 4 - n; k.add('out' + n, 2, shot(z, { dx: HX[i], rot: n % 2 ? 0.05 : -0.05 }, n < 2 ? SIDE : kit.look(0, 0, 'smile'), twin({ dx: TX[i], rot: n % 2 ? -0.05 : 0.05 }, FACE.sheep), null, SY[i])); });
  k.done();
})();

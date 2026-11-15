// House of cards: he builds three storeys, holds his breath, and then sneezes the lot across the floor.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', RED = '#FF5A4D';
  const focused = [['dot',122,112,3.6], ['dot',146,110,3.6], ['stroke',[[127,125],[139,124]],2.8], ['stroke',[[112,101],[125,103]],2.4], ['stroke',[[140,101],[152,98]],2.4]];
  const oops = [['dot',124,112,3.8], ['dot',148,110,3.8], ['stroke',[[124,126],[129,124],[134,126],[139,124]],2.6]];
  const CARDS = [];                                    // [x1, y1, x2, y2, colour], in the order he places them
  for (let r = 0; r < 3; r++) {
    const x0 = 156 + r * 12, y = 199 - r * 34;
    for (let i = 0; i < 3 - r; i++) CARDS.push([x0 + i * 24, y, x0 + i * 24 + 11, y - 31, CREAM], [x0 + i * 24 + 24, y, x0 + i * 24 + 13, y - 31, RED]);
    for (let i = 0; i < 2 - r; i++) CARDS.push([x0 + 8 + i * 24, y - 33, x0 + 40 + i * 24, y - 33, CREAM]);
  }
  // n: how many are placed. k: how far the sneeze has thrown them (0 standing, 'pile' once they have landed)
  const cards = (n, k = 0) => (c, d, seed) => {
    c.save(); c.lineCap = 'round'; c.lineWidth = 4;
    CARDS.slice(0, n).forEach(([x1, y1, x2, y2, colour], i) => {
      const u = (i * 7 % 15) / 15;
      let mx = (x1 + x2) / 2, my = (y1 + y2) / 2, a = Math.atan2(y2 - y1, x2 - x1);
      if (k === 'pile') { mx = 150 + i * 37 % 86; my = 196 - (i % 4) * 3; a = (i % 5 - 2) * 0.16; }
      else if (k) { mx += k * (4 + u * 8); my = Math.min(196, my - k * (6 + (i * 4 % 15) / 1.5) + 4 * k * k); a += k * (u - 0.4) * 1.6; }
      c.strokeStyle = colour; c.beginPath(); c.moveTo(mx - Math.cos(a) * 16, my - Math.sin(a) * 16); c.lineTo(mx + Math.cos(a) * 16, my + Math.sin(a) * 16); c.stroke();
    });
    c.restore();
  };
  const at = (o, n, k, extra = {}) => xf(D.N, { dx: -44, ...o, extra: { front: cards(n, k), ...extra } });
  D.card_house_in = xf(D.N, { dx: -22, rot: -0.04, face: FACE.lookr });
  D.card_house_1 = at({ face: focused }, 6, 0, { arm2: [[122, 150], [146, 172]] });
  D.card_house_2 = at({ face: focused }, 13, 0, { arm2: [[122, 144], [150, 148]] });
  D.card_house_3 = at({ face: focused, rot: 0.04 }, 14, 0, { arm2: [[124, 136], [168, 112]] });
  D.card_house_4 = at({ face: FACE.lookr }, 15, 0, { arm2: [[122, 140], [146, 132]] });
  D.card_house_h1 = at({ face: FACE.puff, ky: 1.03, kx: 1.03 }, 15);
  D.card_house_h2 = at({ face: FACE.puff, ky: 1.04, kx: 1.02, dx: -45 }, 15);
  D.card_house_a1 = at({ face: FACE.ah, rot: -0.06 }, 15);
  D.card_house_a2 = at({ face: FACE.aah, rot: -0.15, dy: -2 }, 15);
  [1, 2, 3.2, 4.5].forEach((k, i) => { D['card_house_c' + i] = at({ face: FACE.choo, rot: 0.2 - i * 0.03 }, 15, k, { spray: [120, 124, 1.5 + i * 0.3, 1 - i * 0.25] }); });
  D.card_house_p1 = at({ face: oops }, 15, 'pile');
  D.card_house_p2 = at({ face: FACE.grump }, 15, 'pile');
  CLIPS.card_house = { home: 'idle', seq: [...WAKE, ['card_house_in', 3], ['card_house_1', 7], ['card_house_2', 7], ['card_house_3', 8], ['card_house_4', 5],
    ['card_house_h1', 4], ['card_house_h2', 4], ['card_house_h1', 4], ['card_house_h2', 4], ['card_house_a1', 6], ['card_house_a2', 7],
    ['card_house_c0', 3], ['card_house_c1', 2], ['card_house_c2', 2], ['card_house_c3', 2], ['card_house_p1', 10], ['card_house_p2', 12], ['card_house_in', 3], ...DOZE] };
})();

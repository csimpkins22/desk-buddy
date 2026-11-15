// Cucumber: he is head down in a bowl of kibble when a cucumber slides quietly in behind him. He turns, sees it, and goes straight up out of sight, coming down in a heap as far from it as he can get.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', FLOOR = '#2B3440', SKIN = '#3F9E5A', RIND = '#2A7445', SHINE = '#8FE0A8', BLUE = '#5AB8FF', DEEP = '#2E7FB8', KIBBLE = '#B07A3A', BROWN = '#6B4A1F', TAU = Math.PI * 2;
  const BOWL = 50, REST = 211, P = 'cucumber_';
  const flip = d => ({ ...d, shadow: [256 - d.shadow[0], d.shadow[1]], fx: [256 - d.fx[0], d.fx[1]], body: d.body.map(([x, y]) => [256 - x, y]), curl: d.curl.map(([x, y]) => [256 - x, y]), face: [], prop: undefined });
  const DOWN = flip(D.W3), UP = flip(D.W1), MID = flip(D.W2);                 // hunched over the bowl, facing left: biting, chewing, and looking up
  const bite = [['stroke',[[70,154],[74,150],[78,154]],2.8], ['stroke',[[83,157],[87,153],[91,157]],2.8], ['mouth',[[75,161],[86,162],[86,168],[81,171],[75,167]],[81,168,4,2.5]]];
  const chew = [['stroke',[[71,146],[75,142],[79,146]],2.8], ['stroke',[[84,149],[88,145],[92,149]],2.8], ['stroke',[[74,155],[78,157],[82,155],[86,158]],2.6], ['blush',96,157,6,4]];
  const still = [['dot',75,144,3.6], ['dot',88,147,3.6], ['stroke',[[75,155],[83,156]],2.6]];
  const sidelong = [['dot',78,138,3.6], ['dot',90,141,3.6], ['stroke',[[70,130],[80,129]],2.4], ['stroke',[[86,131],[96,134]],2.4], ['stroke',[[76,150],[84,151]],2.6]];
  const atIt = [['dot',127,114,3.8], ['dot',151,113,3.8], ['stroke',[[128,127],[136,127]],2.6]];
  const frozen = [['dot',127,113,5], ['dot',151,112,5], ['stroke',[[116,99],[128,96]],2.4], ['stroke',[[146,95],[158,98]],2.4], ['stroke',[[129,128],[135,128]],2.6]];
  const dazed = [['spiral',164,167,4.6], ['spiral',181,164,4.6], ['stroke',[[168,179],[172,177],[176,179],[180,177]],2.4]];
  const wary = [['dot',167,167,4.4], ['dot',183,164,4.4], ['stroke',[[158,158],[168,155]],2.4], ['stroke',[[178,153],[189,155]],2.4], ['stroke',[[170,179],[174,177],[178,179],[182,177]],2.4]];
  const dot = (c, x, y, r) => { c.moveTo(x + r, y); c.arc(x, y, r, 0, TAU); };
  // lying on the floor with its middle at x. rock: tipped a little.
  const cucumber = (c, x, rock, seed) => {
    c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.ellipse(x + 2, 202, 30, 4, 0, 0, TAU); c.fill();
    c.save(); c.translate(x, 190); c.rotate(rock); c.strokeStyle = CREAM;
    c.lineWidth = 6; c.beginPath(); c.moveTo(-28, 0); c.lineTo(-34, -2); c.stroke(); c.strokeStyle = BROWN; c.lineWidth = 3; c.stroke();     // the stalk
    c.strokeStyle = CREAM; c.lineWidth = 2.6; c.fillStyle = SKIN;
    closedPath(c, boil([[-30, -2], [-22, -8], [-6, -10], [10, -9.5], [22, -7], [29, -2], [29, 4], [21, 9], [6, 11], [-10, 10.5], [-23, 7], [-30, 2]], seed + 6, 1.2)); c.fill(); c.stroke();
    c.strokeStyle = RIND; c.lineWidth = 2.4; openPath(c, [[-25, 1], [-8, 3.5], [10, 3.5], [25, 2]]); c.stroke(); openPath(c, [[-20, 6], [-4, 8], [14, 7.5]]); c.stroke();
    c.strokeStyle = SHINE; openPath(c, [[-20, -4.5], [-6, -6.5], [8, -6]]); c.stroke();
    c.fillStyle = RIND; c.beginPath(); [[-14, -2], [-2, -1], [12, -2.5], [20, -1], [3, 6], [-12, 5.5], [18, 5]].forEach(([bx, by]) => dot(c, bx, by, 1.3)); c.fill();
    c.fillStyle = SHINE; c.beginPath(); dot(c, 28, 1, 1.8); c.fill();
    c.restore();
  };
  // a pet's bowl of kibble, stood on (x, y) and tipped by turn. full: how much is left in it.
  const bowl = (c, x, y, turn, seed, full = 1) => {
    c.save(); c.translate(x, y); c.rotate(turn); c.scale(1.2, 1.2); c.strokeStyle = CREAM; c.lineWidth = 2.2;
    c.fillStyle = BLUE; closedPath(c, boil([[-22, 0], [22, 0], [16, -15], [-16, -15]], seed + 9, 1), [0, 1, 2, 3]); c.fill(); c.stroke();
    c.fillStyle = DEEP; c.fillRect(-19.5, -6.5, 39, 4);
    c.beginPath(); c.ellipse(0, -15, 16, 4, 0, 0, TAU); c.fill(); c.stroke();
    if (full) { c.fillStyle = KIBBLE; c.lineWidth = 1.4; c.beginPath(); [[-9, -16, 4.4], [0, -19, 5], [8, -16.5, 4.4], [-3, -15, 4], [4, -14.5, 4]].forEach(([kx, ky, r]) => dot(c, kx, ky, r)); c.fill(); c.stroke(); }
    c.restore();
  };
  // behind him. floor: how solid the floor is. cuc: the cucumber, [x, rock]. dust: where he took off or came down, and how far it has spread. streak: where he went up, and how fresh the trail is. shiver: he is trembling.
  const scene = ({ floor = 1, cuc, dust, streak, shiver }) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.globalAlpha = floor; c.fillStyle = FLOOR; c.fillRect(0, 201, 240, 39);
    c.strokeStyle = CREAM; c.lineWidth = 2; c.globalAlpha = floor * 0.4; c.beginPath(); c.moveTo(0, 201); c.lineTo(240, 201); [34, 104, 174].forEach(x => { c.moveTo(x, 201); c.lineTo(x - 14, 240); }); c.stroke(); c.globalAlpha = 1;
    if (d.shadow[1] > 1) { c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.ellipse(d.shadow[0] + 4, 204, d.shadow[1], 6, 0, 0, TAU); c.fill(); }
    if (dust) { c.fillStyle = CREAM; c.globalAlpha = 0.5; c.beginPath(); [[-44, -3, 6], [-58, -10, 4], [42, -3, 6], [56, -9, 4], [-24, -12, 3.4], [26, -13, 3.4]].forEach(([x, y, r]) => dot(c, dust[0] + x * dust[1], 201 + y * dust[1], r * (1.6 - dust[1] * 0.6))); c.fill(); c.globalAlpha = 1; }
    if (streak) { c.strokeStyle = CREAM; c.lineWidth = 2.6; c.globalAlpha = streak[1]; c.beginPath(); [[-24, 0, 34], [0, -14, 46], [24, 4, 30]].forEach(([x, y, l]) => { c.moveTo(streak[0] + x, 26 + y); c.lineTo(streak[0] + x, 26 + y + l); }); c.stroke(); c.globalAlpha = 1; }
    if (shiver) { c.strokeStyle = CREAM; c.lineWidth = 2.2; c.beginPath(); [[30, 132, 38, 140], [74, 124, 76, 134], [118, 126, 124, 135], [142, 150, 150, 154]].forEach(([x0, y0, x1, y1]) => { c.moveTo(x0, y0); c.lineTo(x1, y1); }); c.stroke(); }
    if (cuc) cucumber(c, cuc[0], cuc[1] || 0, seed);
    c.restore();
  };
  // in front of him. dish: the bowl, [x, height, tilt, how full]. bits: kibble in the air, [x, y].
  const near = ({ dish, bits }) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    if (dish) bowl(c, dish[0], 201 - (dish[1] || 0), dish[2] || 0, seed, dish[3]);
    if (bits) { c.fillStyle = KIBBLE; c.strokeStyle = CREAM; c.lineWidth = 1.4; bits.forEach(([x, y]) => { c.beginPath(); dot(c, x, y, 2.8); c.fill(); c.stroke(); }); }
    c.restore();
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); }, show = (name, ticks) => seq.push([P + name, ticks]);
  const put = (name, ticks, base, o, set) => add(name, ticks, xf(base, { ...o, extra: { back: scene(set), front: near(set) } }));
  const lookl = [['dot',108,112,3.8], ['dot',132,110,3.8], ['stroke',[[112,124],[118,127],[125,124]],2.6]];
  const DISH = [BOWL, 0, 0, 1], AT = { dx: -34 }, CRUMBS = [[[30, 172], [74, 176]], [[26, 180], [36, 166], [78, 184]]];

  put('in0', 3, D.N, { dx: -2, face: lookl }, { floor: 0.4, dish: [-30, 0, 0.1, 1] });
  put('in1', 2, D.N, { dx: -4, face: lookl }, { floor: 0.8, dish: [18, 0, 0.1, 1] });
  put('in2', 2, D.N, { dx: -4, rot: -0.05, face: FACE.happy }, { dish: [BOWL + 3, 0, -0.06, 1] });
  put('bend', 2, MID, { ...AT, dx: -22, dy: -5, face: still }, { dish: DISH });
  // head down in the bowl: a bite, then a chew
  const munch = (name, ticks, base, face, n, cuc) => put(name, ticks, base, { ...AT, face }, { dish: DISH, bits: CRUMBS[n], cuc });
  D[P + 'bite'] = xf(DOWN, { ...AT, face: bite, extra: { back: scene({}), front: near({ dish: DISH, bits: CRUMBS[0] }) } });
  D[P + 'chew'] = xf(UP, { ...AT, face: chew, extra: { back: scene({}), front: near({ dish: DISH, bits: CRUMBS[1] }) } });
  show('bite', 4); show('chew', 4); show('bite', 2);
  munch('slide0', 2, UP, chew, 1, [292]);
  munch('slide1', 2, UP, chew, 0, [252]);
  munch('slide2', 2, DOWN, bite, 0, [226]);
  munch('slide3', 2, DOWN, bite, 1, [212, 0.05]);
  munch('there0', 4, UP, chew, 1, [REST, -0.03]);
  munch('there1', 2, DOWN, bite, 0, [REST]);
  const LAIN = { dish: DISH, cuc: [REST] };
  put('stop', 4, UP, { ...AT, face: still }, LAIN);
  put('side', 4, MID, { ...AT, dy: -2, face: sidelong }, LAIN);
  put('turn', 2, D.N, { dx: -26, rot: 0.04, ky: 0.97, face: atIt }, LAIN);
  put('see', 6, D.N, { dx: -24, face: frozen }, LAIN);
  put('gasp', 4, D.K1, { dx: -26, dy: 8, ky: 0.9, kx: 1.06 }, LAIN);
  put('up0', 2, D.A2, { dx: -22, dy: -14, shadowK: 0.8 }, { dish: [BOWL - 10, 8, -0.5, 1], cuc: [REST, 0.06], dust: [106, 0.5], bits: [[44, 166], [58, 156], [30, 160]] });
  put('up1', 2, D.A3, { dx: -22, dy: -92, shadowK: 0.5 }, { dish: [BOWL - 40, 34, -1.1, 0], cuc: [REST, -0.05], dust: [106, 1], bits: [[36, 138], [58, 128], [22, 126], [70, 150]], streak: [106, 0.9] });
  put('gone0', 2, D.A3, { dx: -22, dy: -260, shadowK: 0.3 }, { cuc: [REST, 0.03], bits: [[40, 122], [64, 112], [78, 140]], streak: [106, 0.6] });
  put('gone1', 2, D.A3, { dx: -40, dy: -260, shadowK: 0.3 }, { cuc: [REST], bits: [[42, 150], [68, 144], [82, 172]], streak: [106, 0.25] });
  put('down0', 2, D.N, { ox: 128, oy: 136, rot: -2.5, dx: -64, dy: -112, shadowK: 0.5, face: FACE.shock }, { cuc: [REST], bits: [[44, 186], [70, 182], [84, 196]] });
  put('down1', 2, D.N, { ox: 128, oy: 136, rot: -1.5, dx: -64, dy: -22, shadowK: 0.8, face: FACE.shock }, { cuc: [REST], bits: [[46, 197], [72, 197]] });
  const HEAP = { k: 0.88, dx: -53 }, LEFT = { cuc: [REST], bits: [[146, 197], [158, 197]] };
  put('splat', 2, D.S1, { ...HEAP, ky: 0.62, kx: 1.1, face: dazed }, { ...LEFT, cuc: [REST, 0.07], dust: [70, 0.6] });
  put('bounce', 2, D.S1, { ...HEAP, dy: -9, ky: 1.12, face: dazed }, { ...LEFT, cuc: [REST, -0.04], dust: [70, 1] });
  put('heap', 4, D.S1, { ...HEAP, face: dazed }, LEFT);
  D[P + 'wary0'] = xf(D.S1, { ...HEAP, face: wary, extra: { back: scene(LEFT), front: near(LEFT) } });
  D[P + 'wary1'] = xf(D.S1, { ...HEAP, dx: -55, ky: 1.03, face: wary, extra: { back: scene({ ...LEFT, shiver: true }), front: near(LEFT) } });
  for (let i = 0; i < 8; i++) show('wary' + i % 2, 2);
  put('off0', 2, D.S1, { ...HEAP, face: wary }, { cuc: [222, -0.05], bits: LEFT.bits });
  put('off1', 2, D.S1, { ...HEAP, face: wary }, { floor: 0.8, cuc: [254], bits: LEFT.bits });
  put('off2', 2, D.T2, { dx: -44, face: [['dot',160,150,3.6], ['dot',176,147,3.6], ['stroke',[[164,160],[170,162],[176,159]],2.6]] }, { floor: 0.5, cuc: [296] });
  put('off3', 2, D.N, { dx: -18, ky: 0.95, face: FACE.lookr }, { floor: 0.25 });
  add('out', 2, xf(D.N, { face: FACE.sheep }));
  CLIPS.cucumber = { home: 'idle', seq: [...seq, ...DOZE] };
})();

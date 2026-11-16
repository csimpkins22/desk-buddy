// Paper note: he folds his note into an aeroplane and throws it. It loops round and comes back into the back of his head.
// group: waiting
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', SHADE = '#B9AE98';
  const reading = [['dot',116,113,3.6], ['dot',140,111,3.6], ['stroke',[[122,125],[128,127],[134,125]],2.6]];
  const folding = [['dot',116,113,3.6], ['dot',140,111,3.6], ['stroke',[[123,125],[133,124]],2.6], ['stroke',[[108,101],[121,104]],2.4], ['stroke',[[136,102],[149,98]],2.4]];
  const keen = [['dot',120,108,4], ['dot',144,106,4], ['stroke',[[122,122],[130,127],[138,122]],2.8]];
  const proud = [...FACE.aahEyes, ['stroke',[[120,121],[128,127],[136,121]],2.8]];
  const sheet = folded => c => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.fillStyle = CREAM; c.strokeStyle = SHADE; c.lineWidth = 2.2;
    if (folded) { c.beginPath(); c.moveTo(128, 138); c.lineTo(152, 186); c.lineTo(104, 186); c.closePath(); c.fill(); c.beginPath(); c.moveTo(128, 140); c.lineTo(128, 184); c.stroke(); }
    else { c.beginPath(); c.roundRect(107, 140, 42, 48, 3); c.fill(); c.beginPath(); [152, 162, 172].forEach(y => { c.moveTo(115, y); c.lineTo(y > 170 ? 132 : 141, y); }); c.stroke(); }
    c.restore();
  };
  const plane = (x, y, a) => c => {
    c.save(); c.translate(x, y); c.rotate(a); c.scale(1.4, 1.4);
    c.fillStyle = CREAM; c.beginPath(); c.moveTo(17, 0); c.lineTo(-14, -9); c.lineTo(-8, 0); c.closePath(); c.fill();
    c.fillStyle = SHADE; c.beginPath(); c.moveTo(17, 0); c.lineTo(-8, 0); c.lineTo(-13, 8); c.closePath(); c.fill();
    c.restore();
  };
  const HOLD = { arm: [[90, 142], [108, 164]], arm2: [[166, 142], [148, 164]] };
  D.paper_note_1 = xf(D.N, { face: reading, extra: { ...HOLD, front: sheet(false) } });
  D.paper_note_2 = xf(D.N, { face: folding, ky: 0.97, extra: { ...HOLD, front: sheet(true) } });
  D.paper_note_3 = xf(D.N, { face: keen, extra: { arm2: [[166, 140], [194, 120]], front: plane(206, 106, -0.3) } });
  D.paper_note_4 = xf(D.N, { face: keen, rot: -0.09, extra: { arm2: [[160, 136], [172, 104]], front: plane(172, 86, -0.3) } });
  D.paper_note_5 = xf(D.N, { face: FACE.aah, rot: 0.1, extra: { arm2: [[170, 140], [204, 122]], front: plane(224, 98, -0.35) } });
  D.paper_note_6 = xf(D.N, { face: FACE.lookr, rot: 0.05, extra: { arm2: [[168, 140], [200, 128]] } });
  D.paper_note_7 = xf(D.N, { face: proud });
  [[2, 46], [26, 58], [50, 70], [72, 82]].forEach(([x, y], i) => { D['paper_note_' + (8 + i)] = xf(D.N, { face: proud, extra: { front: plane(x, y, 0.3) } }); });
  const stuck = { back: plane(80, 90, 0.3) };
  D.paper_note_12 = xf(D.N, { face: FACE.shock, rot: 0.1, kx: 0.95, extra: { ...stuck, fxm: 'alert', fx: [164, 62] } });
  D.paper_note_13 = xf(D.N, { face: FACE.spiral, rot: 0.05, extra: stuck });
  D.paper_note_14 = xf(D.N, { face: FACE.spiral, rot: -0.04, extra: stuck });
  D.paper_note_15 = xf(D.N, { face: FACE.grump, extra: stuck });
  CLIPS.paper_note = { home: 'idle', seq: [...WAKE, ['paper_note_1', 10], ['paper_note_2', 6], ['paper_note_3', 8], ['paper_note_4', 4], ['paper_note_5', 2], ['paper_note_6', 4], ['paper_note_7', 12],
    ['paper_note_8', 2], ['paper_note_9', 2], ['paper_note_10', 2], ['paper_note_11', 2], ['paper_note_12', 3], ['paper_note_13', 5], ['paper_note_14', 5], ['paper_note_13', 5], ['paper_note_14', 5], ['paper_note_15', 12], ...DOZE] };
})();

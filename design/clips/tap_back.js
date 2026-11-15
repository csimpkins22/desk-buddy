// He walks right up to the glass, knocks on it at you, cups a nub to listen, hears nothing, and knocks again, more politely.
// Staging: centre, coming toward us; view changes from normal to close; 6 seconds; knock, long wait, smaller knock; pulls back to rest.
(() => {
  const { D, xf, tint, mixHex } = window.__lump, kit = window.__lump.kit, k = kit.clip('tap_back');
  const NEAR = kit.view(1.45, [136, 122]);
  // his nub pushed toward us: a round fist, flattened pale where it meets the glass, with rings from the knock
  const fist = (x, y, r, rings) => c => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.fillStyle = tint(); c.strokeStyle = kit.CREAM; c.lineWidth = 3;
    c.beginPath(); c.arc(x, y, r, 0, kit.TAU); c.fill(); c.stroke();
    if (rings) {
      c.fillStyle = mixHex(tint(), '#FFFFFF', 0.45); c.beginPath(); c.ellipse(x, y, r * 0.6, r * 0.5, 0, 0, kit.TAU); c.fill();
      c.lineWidth = 2.6; rings.forEach(q => { c.beginPath(); c.arc(x, y, q, 0, kit.TAU); c.stroke(); });
    }
    c.restore();
  };
  const near = (o, face, extra) => xf(D.N, { ...o, face, extra: { view: NEAR, ...extra } });
  const polite = [...kit.faces.worried.slice(0, 4), ['stroke', [[122, 124], [128, 126], [134, 124]], 2.8]];

  kit.steps(0, 1, 7).forEach((t, i) => k.add('come' + i, 2, xf(D.N, { rot: i % 2 ? 0.04 : -0.04, ky: i % 2 ? 0.97 : 1.02, face: kit.look(0, 0, 'smile'), extra: { view: kit.cam(t, kit.HOME, NEAR) } })));

  k.add('up', 2, near({ ky: 0.98 }, kit.look(0, 0, 'smile'), { arm2: [[166, 140], [190, 124]], front: fist(193, 121, 10) }));
  k.add('hit', 2, near({ k: 1.03 }, kit.look(0, 0, 'open'), { arm2: [[166, 140], [184, 114]], front: fist(187, 110, 14, [21]) }));
  k.add('up', 2);
  k.add('hit', 2);
  k.add('ring', 4, near({}, kit.look(0, 0, 'smile'), { arm2: [[166, 140], [185, 117]], front: fist(188, 113, 12, [24, 32]) }));

  const lean = { rot: -0.13 }, ear = [kit.pt(lean, [90, 140]), kit.pt(lean, [88, 100])];
  k.add('tilt', 2, near({ rot: -0.05 }, kit.look(3, 0, 'flat'), { arm: [kit.pt({ rot: -0.05 }, [90, 140]), [80, 124]] }));
  k.add('hear', 16, near(lean, kit.look(5, -1, 'flat'), { arm: ear }));
  k.add('hear2', 10, near(lean, kit.look(-5, -1, 'flat'), { arm: ear }));
  k.add('nothing', 8, near({ ky: 0.97 }, kit.look(0, 0, 'frown')));

  k.add('pup', 2, near({}, polite, { arm2: [[166, 140], [184, 132]], front: fist(189, 130, 8) }));
  k.add('ptap', 2, near({}, polite, { arm2: [[166, 140], [182, 126]], front: fist(186, 123, 9, [15]) }));
  k.add('pup', 2);
  k.add('ptap', 2);
  k.add('hope', 12, near({ ky: 1.02 }, [...kit.faces.worried.slice(0, 4), ['stroke', [[121, 123], [128, 127], [135, 123]], 2.8]], { arm2: [[166, 140], [184, 132]], front: fist(189, 130, 8) }));

  kit.steps(1, 0, 5).forEach((t, i) => k.add('back' + i, 2, xf(D.N, { ky: 0.98, face: kit.look(0, 2, 'flat'), extra: { view: kit.cam(t, kit.HOME, NEAR) } })));
  k.done();
})();

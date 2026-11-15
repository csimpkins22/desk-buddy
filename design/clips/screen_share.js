// Screen share: he holds up a framed picture of himself holding up a framed picture of himself... peers into it, and goes dizzy.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, openPath, closedPath, tint } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', AT = { dx: -36 };
  const proud = [...FACE.aahEyes, ['stroke',[[119,121],[128,127],[137,121]],2.8]];
  const drawn = [['dot',126,108,5], ['dot',150,106,5], ['dot',136,124,2.8]];
  const ME = xf(D.N, AT);
  // the picture: all of this scene again, a third of the size, and so on down
  const frame = (c, deep) => {
    const w = 4 + (2 - deep) * 4;
    c.lineJoin = c.lineCap = 'round';
    c.fillStyle = '#6B4A1F'; c.strokeStyle = CREAM; c.lineWidth = w * 0.8; c.beginPath(); c.roundRect(154, 58, 84, 84, 6); c.fill(); c.stroke();
    c.fillStyle = DARK; c.beginPath(); c.rect(163, 67, 66, 66); c.fill();
    if (!deep) return;
    c.save(); c.beginPath(); c.rect(163, 67, 66, 66); c.clip();
    c.translate(196, 100); c.scale(0.31, 0.31); c.translate(-135, -126);
    c.lineWidth = w + 4; c.strokeStyle = CREAM; c.fillStyle = tint();
    closedPath(c, ME.body); c.fill(); c.stroke(); openPath(c, ME.curl); c.stroke();
    c.beginPath(); c.moveTo(130, 140); c.lineTo(160, 130); c.lineWidth = 22; c.stroke(); c.strokeStyle = tint(); c.lineWidth = 12; c.stroke();
    c.fillStyle = DARK; c.beginPath(); c.arc(80, 110, 5, 0, Math.PI * 2); c.arc(104, 108, 5, 0, Math.PI * 2); c.fill();
    frame(c, deep - 1);
    c.restore();
  };
  const held = (dy = 0, rot = 0) => (c, d, seed) => { c.save(); c.translate(196, 100 + dy); c.rotate(rot); c.translate(-196, -100); frame(c, 2); c.restore(); };
  const HAND = { arm2: [[128, 142], [160, 132]] };
  D.screen_share_step = xf(D.N, { dx: -18, rot: -0.05, face: FACE.lookr });
  D.screen_share_lift = xf(D.N, { ...AT, face: FACE.happy, extra: { arm2: [[128, 146], [158, 166]], front: held(44) } });
  D.screen_share_show = xf(D.N, { ...AT, face: proud, extra: { ...HAND, front: held() } });
  D.screen_share_show2 = xf(D.N, { ...AT, face: proud, ky: 1.02, extra: { ...HAND, front: held(-2) } });
  D.screen_share_peer = xf(D.N, { ...AT, rot: 0.07, face: FACE.lookr, extra: { ...HAND, front: held() } });
  D.screen_share_stare = xf(D.N, { dx: -30, rot: 0.14, face: drawn, extra: { arm2: [[134, 142], [160, 132]], front: held() } });
  D.screen_share_dizzy1 = xf(D.N, { ...AT, rot: -0.07, face: FACE.spiral, extra: { ...HAND, front: held(2, 0.06) } });
  D.screen_share_dizzy2 = xf(D.N, { ...AT, rot: 0.07, face: FACE.spiral, extra: { ...HAND, front: held(4, -0.06) } });
  D.screen_share_away = xf(D.N, { dx: -18, face: FACE.sheep, extra: { arm2: [[146, 146], [176, 168]], front: held(70, 0.2) } });
  const n = s => 'screen_share_' + s;
  CLIPS.screen_share = { home: 'idle', seq: [...WAKE, [n('step'), 2], [n('lift'), 3], [n('show'), 6], [n('show2'), 6], [n('show'), 6], [n('peer'), 10], [n('stare'), 12],
    [n('dizzy1'), 4], [n('dizzy2'), 4], [n('dizzy1'), 4], [n('dizzy2'), 4], [n('dizzy1'), 4], [n('dizzy2'), 4], [n('away'), 8], ...DOZE] };
})();

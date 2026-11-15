// Bubblegum: he chews, blows a bubble so big it lifts him off the floor, and it pops all over his face.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath, mixHex, tint } = window.__lump;
  const CREAM = '#FFF1DC';
  const gum = () => mixHex(tint(), '#FFFFFF', 0.45);
  const chewA = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[119,124],[125,121],[131,125]],3]];
  const chewB = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[125,125],[131,121],[137,124]],3], ['blush',146,120,8,6]];
  const blowing = [['stroke',[[110,108],[116,112],[122,108]],3], ['stroke',[[134,106],[140,110],[146,106]],3]];
  const amazed = [['dot',115,104,4.6], ['dot',141,102,4.6]];
  const stunned = [['dot',116,108,3.4], ['dot',140,106,3.4]];
  const blink = [['stroke',[[111,109],[121,109]],2.8], ['stroke',[[135,107],[145,107]],2.8]];
  const bubble = (r, dy = 0) => (c, d, seed) => {
    const x = 132 + r * 0.15, y = 128 + dy + r * 0.8;      // it hangs from his mouth, so his eyes stay in view
    c.save(); c.globalAlpha = 0.92; c.fillStyle = gum(); c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); c.stroke();
    c.globalAlpha = 0.8; c.lineWidth = Math.max(1.6, r * 0.07); c.lineCap = 'round';
    c.beginPath(); c.arc(x, y, r * 0.68, -2.5, -1.75); c.stroke();
    c.restore();
  };
  const pop = (c, d, seed) => {                       // the burst, where the bubble was
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath();
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + 0.2, r0 = 52 + (i % 2) * 12; c.moveTo(143 + Math.cos(a) * r0, 126 + Math.sin(a) * r0); c.lineTo(143 + Math.cos(a) * (r0 + 20), 126 + Math.sin(a) * (r0 + 20)); }
    c.stroke(); c.restore();
  };
  const splat = (c, d, seed) => {                     // gum all over his face
    c.save(); c.fillStyle = gum(); c.strokeStyle = CREAM; c.lineWidth = 2.2; c.lineJoin = 'round';
    const blob = (x, y, r, s) => { closedPath(c, boil(Array.from({ length: 9 }, (_, i) => { const a = i / 9 * Math.PI * 2, w = 1 + 0.3 * Math.sin(a * 3 + s); return [x + Math.cos(a) * r * w, y + Math.sin(a) * r * w * 0.8]; }), seed + s, 1)); c.fill(); c.stroke(); };
    blob(128, 122, 20, 1); blob(104, 104, 7, 2); blob(154, 112, 6, 3); blob(140, 146, 5, 4);
    c.restore();
  };
  D.gum1 = xf(D.N, { face: chewA });
  D.gum2 = xf(D.N, { face: chewB });
  [6, 13, 23, 36, 50].forEach((r, i) => { D['gum' + (3 + i)] = xf(D.N, { face: i < 3 ? blowing : amazed, extra: { front: bubble(r) } }); });
  D.gum7 = xf(D.N, { face: amazed, dy: -20, shadowK: 0.85, extra: { front: bubble(50, -20) } });      // from here the bubble holds him up
  D.gum8 = xf(D.N, { face: amazed, dy: -38, shadowK: 0.7, extra: { front: bubble(60, -38) } });
  D.gum9 = xf(D.N, { face: amazed, dy: -52, shadowK: 0.6, extra: { front: bubble(68, -52) } });
  D.gum10 = xf(D.N, { face: amazed, dy: -60, rot: 0.04, shadowK: 0.5, extra: { front: bubble(72, -60) } });
  D.gum11 = xf(D.N, { face: amazed, dy: -63, rot: -0.04, shadowK: 0.5, extra: { front: bubble(72, -63) } });
  D.gum12 = xf(D.N, { face: FACE.shock, dy: -60, shadowK: 0.5, extra: { front: pop } });
  D.gum13 = xf(D.N, { face: FACE.shock, dy: -26, ky: 1.1, kx: 0.94, shadowK: 0.8 });
  D.gum14 = xf(D.N, { face: stunned, ky: 0.8, kx: 1.14, extra: { front: splat } });
  D.gum15 = xf(D.N, { face: stunned, extra: { front: splat } });
  D.gum16 = xf(D.N, { face: blink, extra: { front: splat } });
  const chew = [['gum1', 4], ['gum2', 4]];
  CLIPS.bubblegum = { home: 'idle', seq: [...WAKE, ...chew, ...chew, ...chew, ['gum3', 3], ['gum4', 3], ['gum5', 4], ['gum6', 4], ['gum7', 6], ['gum8', 5], ['gum9', 6],
    ['gum10', 6], ['gum11', 6], ['gum10', 6], ['gum11', 6], ['gum12', 3], ['gum13', 3], ['gum14', 4], ['gum15', 10], ['gum16', 3], ['gum15', 8], ['gum16', 3], ['gum15', 6], ...DOZE] };
})();

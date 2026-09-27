/* SAHNE 1 — BİR VARSAYIM (0–10 s)  4 + 5 + 6 = 15, 7 + 8 + 9 = 24.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const fr = (n, d, h) => F().fr(n, d, h);
  const neg = (s) => s.replace('-', '−');
  const label = (v) => (v < 0 ? neg(String(v)) : String(v));

  /** rows of working at P; each [t0, t1, i, items, hot, tick, cross] */
  function rows(ctx, P, list, t, s, W) {
    const f = F();
    list.forEach(([t0, t1, i, items, hot, tick, cross]) => {
      const k = win(t, t0, t1); if (k <= 0) return;
      const y = P.y0 + i * P.dy;
      f.expr(ctx, items, P.x, y, s * 0.86, { alpha: k, halo: true, color: hot ? A.amber : undefined, w: W });
      if (tick) f.tick(ctx, P.x + tick, y - 6, seg(t, t0 + 0.4, t0 + 1.0), k);
      if (cross) f.crossInk(ctx, P.x + cross, y, 18, seg(t, t0 + 0.4, t0 + 1.2), k);
    });
  }

  /** dot columns 4, 5, 6; the top dot of the last column moves to the first (m: 0..1) */
  function dots(ctx, D, a, m, s) {
    if (a <= 0) return;
    const f = F(), col = (i) => D.x + i * D.gap;
    [4, 5, 6].forEach((n, i) => {
      for (let j = 0; j < n; j++) {
        if (i === 2 && j === 5) continue;
        ctx.fillStyle = `rgba(${LI.INK_RGB},${0.85 * a})`; ctx.beginPath(); ctx.arc(col(i), D.y - j * D.sp, 10, 0, 7); ctx.fill();
      }
    });
    const x = lerp(col(2), col(0), m), y = lerp(D.y - 5 * D.sp, D.y - 4 * D.sp, m) - 60 * Math.sin(Math.PI * m);
    ctx.fillStyle = amber(a); ctx.beginPath(); ctx.arc(x, y, 11, 0, 7); ctx.fill();
    ['4', '5', '6'].forEach((l, i) => f.T(ctx, m > 0.99 ? '5' : l, col(i), D.y + 38, { size: s * 0.7, alpha: a, color: m > 0.99 ? A.amber : undefined }));
  }
  /** three bars n, n + 1, n + 2; one unit square moves from the last to the first */
  function bars(ctx, B, a, m, s) {
    if (a <= 0) return;
    const f = F(), col = (i) => B.x + i * B.gap - B.w / 2;
    for (let i = 0; i < 3; i++) {
      const x = col(i), top = B.base - B.h;
      ctx.fillStyle = `rgba(${LI.INK_RGB},${0.1 * a})`; ctx.fillRect(x, top, B.w, B.h);
      Ink.path(ctx, [[x, B.base], [x, top], [x + B.w, top], [x + B.w, B.base], [x, B.base]], { w: 3, alpha: a, seed: 9600 + i, taper: [0, 0] });
      f.T(ctx, 'n', x + B.w / 2, B.base - B.h / 2, { size: s * 0.8, alpha: a });
      for (let j = 0; j < i; j++) {
        if (i === 2 && j === 1) continue;
        const y = top - (j + 1) * B.u;
        ctx.fillStyle = amber(0.55 * a); ctx.fillRect(x, y, B.w, B.u);
        Ink.path(ctx, [[x, y], [x + B.w, y], [x + B.w, y + B.u], [x, y + B.u], [x, y]], { w: 2.5, alpha: a, seed: 9610 + i * 3 + j, taper: [0, 0], color: LI.AMBER_RGB });
      }
    }
    const x = lerp(col(2), col(0), m), y = lerp(B.base - B.h - 2 * B.u, B.base - B.h - B.u, m) - 60 * Math.sin(Math.PI * m);
    ctx.fillStyle = amber(0.8 * a); ctx.fillRect(x, y, B.w, B.u);
    Ink.path(ctx, [[x, y], [x + B.w, y], [x + B.w, y + B.u], [x, y + B.u], [x, y]], { w: 2.5, alpha: a, seed: 9630, taper: [0, 0], color: LI.AMBER_RGB });
    ['n', 'n + 1', 'n + 2'].forEach((l, i) => f.T(ctx, m > 0.99 ? 'n + 1' : l, col(i) + B.w / 2, B.base + 36, { size: s * 0.62, alpha: a, color: m > 0.99 ? A.amber : undefined }));
  }

  const LIST = [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [10, 11, 12]];

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Ardışık üç sayının toplamı'],
      [10.6, 27.8, 'Örnekleri listeleyelim'],
      [28.4, 45.8, 'Neden böyle? Noktalar ve çubuklar'],
      [46.4, 63.8, 'Cebirsel ispat'],
      [64.4, 79.8, 'Önermeyi yeni durumlara uyarlayalım'],
    ]);
  }

  function figure(ctx, env, t) {
    const L = KD.L(env), f = F(), a = END(t), s = L.G.s, P = L.PN, V = env.V, WW = V ? 900 : 1000;
    rows(ctx, P, [[5.0, 10.2, 0, ['4 + 5 + 6 = 15']], [6.0, 10.2, 1, ['7 + 8 + 9 = 24']], [7.6, 10.2, 2, ['İkisi de 3’ün katı. Hep böyle mi?'], true]], t, s * 1.1, WW);
    // 10–28: the list
    const l = win(t, 11.4, 27.8) * a, LS = L.LS;
    if (l > 0) LIST.forEach(([p, q, r], i) => {
      const k = seg(t, 11.8 + i * 0.9, 12.2 + i * 0.9) * l; if (k <= 0) return;
      const y = LS.y0 + i * LS.dy;
      f.expr(ctx, [`${p} + ${q} + ${r} = ${p + q + r}`], LS.x + LS.cols[0], y, s * 0.85, { alpha: k, halo: true });
      f.expr(ctx, [`= 3 · ${q}`], LS.x + LS.cols[1], y, s * 0.85, { alpha: k * seg(t, 17.0 + i * 0.4, 17.4 + i * 0.4), halo: true, color: A.amber });
    });
    // 28–46: dots, then bars
    dots(ctx, L.DOT, win(t, 28.8, 45.8) * a, inOut(seg(t, 31.0, 32.6)), s);
    bars(ctx, L.BAR, win(t, 34.8, 45.8) * a, inOut(seg(t, 37.4, 39.0)), s);
    rows(ctx, P, [[40.0, 45.8, 0, ['n + (n + 1) + (n + 2) = (n + 1) + (n + 1) + (n + 1)'], true]], t, s, WW);
    // 46–64: the algebraic proof
    rows(ctx, P, [[47.4, 63.8, 0, ['n + (n + 1) + (n + 2) = 3n + 3']], [49.4, 63.8, 1, ['3n + 3 = 3 · (n + 1)']], [51.4, 63.8, 2, ['n + 1 bir doğal sayı → toplam 3’ün katı'], true],
      [55.4, 63.8, 3, ['99 + 100 + 101 = 3 · 100 = 300'], false, V ? 360 : 380]], t, s, WW);
    // 64–80: adapting
    rows(ctx, P, [[65.4, 79.8, 0, ['4 sayı: 1 + 2 + 3 + 4 = 10, 4’ün katı değil'], false, 0, V ? 430 : 460], [67.4, 79.8, 1, ['n + (n+1) + (n+2) + (n+3) = 4n + 6 = 2 · (2n + 3): hep çift']],
      [70.4, 79.8, 2, ['5 sayı: 5n + 10 = 5 · (n + 2): hep 5’in katı'], true]], t, s, WW);
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.4, 10.2, 'Ece iki örnek buldu'], [11.4, 27.8, 'Varsayım: ardışık üç sayının toplamı 3’ün katıdır'],
      [29.4, 45.8, 'Sondaki fazlalığı öndekine ver: hepsi ortadaki kadar olur'], [47.4, 63.8, 'n herhangi bir doğal sayı'],
      [65.4, 79.8, 'Ardışık dört sayı için de 4’ün katı mı?']]);
    exprs(ctx, t, at(W, 1), [[16.4, 27.8, 'Her toplam, ortadaki sayının 3 katı'], [34.8, 45.8, 'Çubuklarla her sayı için: n, n + 1, n + 2'],
      [53.0, 63.8, 'İspat bütün sayılar için geçerli; tek tek denemeye gerek yok'], [69.0, 79.8, 'Dört sayıda önerme değişir: toplam hep çift']]);
    exprs(ctx, t, at(W, 2), [[8.8, 10.2, 'Bir varsayım: hep 3’ün katı mı?', true], [21.0, 27.8, 'Örnekler varsayımı destekliyor, ama ispat değil', true],
      [41.6, 45.8, 'Toplam, ortadaki sayının 3 katıdır', true],
      [58.0, 63.8, 'Önerme: ardışık üç doğal sayının toplamı 3’ün katıdır', true],
      [75.0, 79.8, 'Ardışık tek sayıda sayının toplamı, sayı adedinin katıdır', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Örneklerden varsayım kur', 80.6], ['Örüntüyü listele, sına', 81.6], ['Cebirle ispatla: 3 · (n + 1)', 82.6], ['Örnek destekler, ispat kanıtlar!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.1 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A guess', nameTr: 'Bir varsayım', concept: '4 + 5 + 6 = 15', conceptTr: '4 + 5 + 6 = 15', render });
})(window.LI = window.LI || {});

/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 7. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: '4 + 5 + 6 = 15, 7 + 8 + 9 = 24', en: '4 + 5 + 6 = 15, 7 + 8 + 9 = 24',
      note: 'Ece ardışık üç sayıyı topluyor: 4, 5, 6 toplamı 15; 7, 8, 9 toplamı 24. İkisi de 3’ün katı. Hep böyle mi?' },
    { scene: 2, start: 10.8, end: 20.6, tr: 'Varsayım: hep 3’ün katı', en: 'Guess: always a multiple of 3',
      note: 'Bir varsayım: ardışık üç sayının toplamı 3’ün katıdır. Örnekleri listeleyelim: 6, 9, 12, 15, 18, 33. Her toplam, ortadaki sayının 3 katı.' },
    { scene: 2, start: 21.0, end: 27.8, tr: 'Örnekler ispat değil', en: 'Examples are not a proof',
      note: 'Örnekler varsayımı destekliyor. Ama sonsuz sayıda örneği tek tek deneyemeyiz: bir ispat gerekiyor.' },
    { scene: 3, start: 28.6, end: 39.4, tr: 'Fazlalığı öndekine ver', en: 'Give the extra to the first',
      note: '4, 5, 6 noktayı sütunlara dizelim. Son sütundaki fazla noktayı ilk sütuna verelim: 5, 5, 5. Aynı şeyi n, n artı 1, n artı 2 çubuklarıyla yapalım: üç çubuk da n artı 1 olur.' },
    { scene: 3, start: 39.8, end: 45.8, tr: 'Toplam = 3 × ortadaki', en: 'Sum = 3 × the middle number',
      note: 'Demek ki toplam, ortadaki sayının 3 katıdır.' },
    { scene: 4, start: 46.6, end: 57.6, tr: 'n + (n + 1) + (n + 2) = 3(n + 1)', en: 'n + (n + 1) + (n + 2) = 3(n + 1)',
      note: 'Cebirle yazalım: n artı n artı 1 artı n artı 2, 3n artı 3. Bu da 3 çarpı n artı 1. n artı 1 bir doğal sayı olduğu için toplam 3’ün katıdır. Örneğin 99, 100, 101’in toplamı 3 çarpı 100, 300.' },
    { scene: 4, start: 58.0, end: 63.8, tr: 'İspat: her sayı için geçerli', en: 'The proof covers every number',
      note: 'Önerme: ardışık üç doğal sayının toplamı 3’ün katıdır. İspat bütün sayılar için geçerli; tek tek denemeye gerek yok.' },
    { scene: 5, start: 64.6, end: 74.6, tr: 'Dört sayı: hep çift; beş sayı: 5’in katı', en: 'Four numbers: always even; five: a multiple of 5',
      note: 'Önermeyi uyarlayalım. Ardışık dört sayı: 1 artı 2 artı 3 artı 4, 10; 4’ün katı değil. Ama 4n artı 6, 2 çarpı 2n artı 3: toplam hep çift. Ardışık beş sayı: 5n artı 10, 5 çarpı n artı 2: hep 5’in katı.' },
    { scene: 5, start: 75.0, end: 79.8, tr: 'Tek sayıda ardışık sayı', en: 'An odd count of consecutive numbers',
      note: 'Ardışık tek sayıda sayının toplamı, sayı adedinin katıdır.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Varsay, sına, ispatla', en: 'Guess, test, prove',
      note: 'Aklında kalsın: örneklerden bir varsayım kur, örüntüyü listele ve sına, sonra cebirle ispatla.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Örnek destekler, ispat kanıtlar!', en: 'Examples support, proofs show!',
      note: 'Örnek destekler, ispat kanıtlar!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);

// Bu bizim sarmalayıcı (wrapper) fonksiyonumuz. Çadırı kurar.
function memoize(orijinalFonksiyon) {
  // Çantadaki kopya kağıdımız (Cache Objeliği)
  const cache = {};

  // Geri dönen Closure fonksiyonu
  return function (...argumanlar) {
    // Argümanları bir anahtara (string) çevir
    const key = JSON.stringify(argumanlar);

    // 1. Durum: Bu soru daha önce soruldu mu? Kopya kağıdına bak.
    if (cache[key]) {
      console.log("⚡ Cache'den getiriliyor...");
      return cache[key];
    }

    // 2. Durum: İlk defa soruluyor. O zaman zorlu hesabı yap.
    console.log("⏳ Uzun uzun hesaplanıyor...");
    const sonuc = orijinalFonksiyon(...argumanlar);

    // Sonucu gelecekte kullanmak üzere kopya kağıdına yaz
    cache[key] = sonuc;

    return sonuc;
  };
}

// Ağır bir hesaplama fonksiyonu düşünelim
const kareAl = (sayi) => {
  for (let i = 0; i < 100000000; i++) {} // Zaman geçirmek için sahte döngü
  return sayi * sayi;
};

// Fonksiyonumuza zeka (hafıza) ekliyoruz!
const zekiKareAl = memoize(kareAl);

console.log(zekiKareAl(5)); // ⏳ Uzun uzun hesaplanıyor... 25
console.log(zekiKareAl(5)); // ⚡ Cache'den getiriliyor... 25 (Anında çalıştı!)
console.log(zekiKareAl(9)); // ⏳ Uzun uzun hesaplanıyor... 81
console.log(zekiKareAl(9)); // ⚡ Cache'den getiriliyor... 81

// 1. Yeni bir Promise yaratıyoruz.
// İçine bir fonksiyon alır, o da resolve ve reject adında iki asistan alır.
const veriSözlesmesi = new Promise(function (resolve, reject) {
  console.log("Sözleşme imzalandı. Durum: Pending...");

  // Arka planda 3 saniye sürecek bir iş simülasyonu
  setTimeout(() => {
    let basariliMi = true; // Bunu false yaparsan reject çalışır

    if (basariliMi) {
      resolve("İşte beklediğin devasa kullanıcı verisi!"); // Durumu Fulfilled yapar
      resolve("Başka bir veri"); // DİKKAT: Bu satır tamamen YOK SAYILIR! (Kilitlendi)
    } else {
      reject("Sunucuya ulaşılamadı (Error 500)"); // Durumu Rejected yapar
    }
  }, 3000);
});

// 2. Sözleşmenin sonucunu dinliyoruz.
// Promise'ler çözüldüğünde Event Loop bunları "Microtask" (VIP) sırasına atacaktır.
veriSözlesmesi
  .then((gelenVeri) => {
    console.log("✅ BAŞARILI:", gelenVeri);
  })
  .catch((hataMesaji) => {
    console.log("❌ HATA:", hataMesaji);
  })
  .finally(() => {
    // Fulfilled veya Rejected fark etmez, en son bu çalışır.
    // (Örn: poyraz-ui loading spinner'ını burada ekrandan kaldırırsın)
    console.log("İşlem tamamen sonlandı. Spinner gizleniyor.");
  });

// 3. O sırada ana thread devam ediyor...
console.log("Promise beklerken ben UI çizebilirim!");

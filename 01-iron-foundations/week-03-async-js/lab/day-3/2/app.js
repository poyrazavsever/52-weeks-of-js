// 1. Asenkron bir işlem yapan ve bize bir "Söz (Promise)" dönen fonksiyon
function kulaklikSiparisiVer() {
  // Fonksiyon hemen bir Promise (Fiş) objesi oluşturup döndürür
  return new Promise((resolve, reject) => {
    console.log("Sipariş alındı, kargoya veriliyor...");

    // Arka planda 2 saniye süren kargo simülasyonu
    setTimeout(() => {
      let kargoGeldiMi = true; // Bunu false yaparsan catch çalışır

      if (kargoGeldiMi) {
        resolve("🎧 Kulaklığın teslim edildi!"); // Başarılı son (Söz tutuldu)
      } else {
        reject("Kargo yolda kayboldu!"); // Başarısız son (Söz tutulamadı)
      }
    }, 2000);
  });
}

// 2. Fişi alıyoruz ve "Gelecekte ne olacağını" planlıyoruz:
let kargoFisi = kulaklikSiparisiVer();

kargoFisi
  .then((gelenUrun) => {
    // resolve() çalıştığında burası tetiklenir!
    console.log("Harika! " + gelenUrun);
  })
  .catch((hataMesaji) => {
    // reject() çalıştığında burası tetiklenir!
    console.log("Eyvah! " + hataMesaji);
  })
  .finally(() => {
    // Her iki durumda da (başarılı veya başarısız) en son burası çalışır
    console.log("Kargo takip ekranı kapatılıyor.");
  });

console.log("Siparişi verdim, beklerken kahve içiyorum..."); // Bu satır HİÇ BEKLEMEDEN anında çalışır.

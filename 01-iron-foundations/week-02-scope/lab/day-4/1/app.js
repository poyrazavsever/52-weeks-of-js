function sayacUretici() {
  // Bu değişken, dış fonksiyonun (annenin) ortamındadır.
  let sayi = 0;

  // İç fonksiyon (çocuk) doğuyor...
  return function sayaciArtir() {
    sayi++; // Çantasındaki "sayi" değişkenini kullanıyor
    console.log("Güncel Sayaç:", sayi);
  };
}

// sayacUretici çalıştı, işini bitirdi ve Call Stack'ten SİLİNDİ!
const benimSayacim = sayacUretici();

// Normalde "sayi" değişkeninin yok olması gerekirdi. Ama...
benimSayacim(); // Çıktı: Güncel Sayaç: 1
benimSayacim(); // Çıktı: Güncel Sayaç: 2

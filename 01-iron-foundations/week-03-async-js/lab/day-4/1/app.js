// ESKI YÖNTEM: Promise Zinciri
function tabloVerisiniGetirEski() {
  console.log("1. İstek atılıyor...");

  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((cevap) => {
      return cevap.json(); // Birinci fiş çözüldü
    })
    .then((kullanici) => {
      console.log("2. Kullanıcı bulundu:", kullanici.name);
      // İkinci isteği at (Kullanıcı ID'sine göre)
      return fetch(
        "https://jsonplaceholder.typicode.com/posts?userId=" + kullanici.id,
      );
    })
    .then((cevap2) => {
      return cevap2.json(); // İkinci fiş çözüldü
    })
    .then((gonderiler) => {
      console.log(
        "3. Gönderiler Tabloya Çiziliyor:",
        gonderiler.length,
        "adet",
      );
    })
    .catch((hata) => {
      console.log("Hata çıktı!", hata);
    });
}

tabloVerisiniGetirEski();
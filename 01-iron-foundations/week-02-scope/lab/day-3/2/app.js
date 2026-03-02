const UIController = (function () {
  // MUTFAK (Private Alan - Dışarıdan erişilemez)
  let aktifTema = "Açık";
  let bilesenSayisi = 0;

  function arkaplanRenginiHesapla() {
    // Karmaşık iç işlemler...
    return aktifTema === "Açık" ? "#ffffff" : "#000000";
  }

  // GARSON (Public Alan - Dışarıya açılan kapı)
  return {
    temaDegistir: function (yeniTema) {
      aktifTema = yeniTema;
      console.log("Tema başarıyla değiştirildi:", aktifTema);
    },
    bilesenEkle: function () {
      bilesenSayisi++;
      console.log("Yeni bileşen eklendi. Toplam:", bilesenSayisi);
    },
    ayarlariGoster: function () {
      console.log("Şu anki renk kodu:", arkaplanRenginiHesapla());
    },
  };
})(); // Fonksiyon hemen çalıştı ve bize sadece Return objesini bıraktı.

// DIŞ DÜNYA KULLANIMI:
UIController.bilesenEkle(); // Başarılı!
UIController.temaDegistir("Koyu"); // Başarılı!
UIController.ayarlariGoster(); // Başarılı!

// Ancak mutfağa gizlice sızmaya çalışırsak:
console.log(UIController.aktifTema); // undefined (Erişim yasak!)
// UIController.arkaplanRenginiHesapla(); // Hata! Bu bir private fonksiyondur.

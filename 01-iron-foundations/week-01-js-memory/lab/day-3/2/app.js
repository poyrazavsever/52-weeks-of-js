function bilesenYukle() {
  let agirVeri = new Array(10000).fill("Ağır UI Verisi");
  let buton = document.getElementById("aksiyon-butonu");

  // Butona bir dinleyici ekliyoruz
  function tiklamaGorevi() {
    console.log("Butona tıklandı!", agirVeri[0]);
  }

  buton.addEventListener("click", tiklamaGorevi);

  // EĞER bu buton ileride DOM'dan silinirse, şu işlem YAZILMALIDIR:
  // ÇÖZÜM: Bileşen ekrandan kalkarken dinleyiciyi temizle!
  return function temizle() {
    buton.removeEventListener("click", tiklamaGorevi);
    console.log("Dinleyici temizlendi, agirVeri silinebilir.");
  };
}

let temizleyici = bilesenYukle();

// Kullanıcı başka sayfaya geçtiğinde veya bileşen silindiğinde:
// temizleyici(); // Bunu çalıştırmazsan Event Listener gizlice RAM'i sömürür.

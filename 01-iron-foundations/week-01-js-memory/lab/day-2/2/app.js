function sayaciBaslat() {
  let sayacVerisi = { anlikDeger: 0, cihazBilgisi: "Büyük bir obje..." };

  // Her saniye çalışan bir döngü
  let intervalId = setInterval(function () {
    sayacVerisi.anlikDeger++;
    console.log("Çalışıyor: ", sayacVerisi.anlikDeger);
    // sayacVerisi objesi, bu döngü durana kadar ASLA silinemez.
  }, 1000);

  // Doğru kullanım: Dışarıya bu intervali durdurma yetkisi vermek
  return function intervaliDurdur() {
    clearInterval(intervalId);
    // Döngü durunca GC gelir ve sayacVerisi'ni güvenle siler.
  };
}

let durdurucu = sayaciBaslat();
// Kullanıcı sayfadan çıktığında veya işin bittiğinde:
// durdurucu(); // Bunu çağırmayı unutursan sonsuza kadar sızıntı yaşarsın!

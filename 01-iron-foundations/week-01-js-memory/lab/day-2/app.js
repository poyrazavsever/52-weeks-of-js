function devasaVeriIslemi() {
  // Bu çok büyük bir dizi olsun (örneğin 100MB'lık bir veri)
  let devasaVeri = new Array(1000000).fill("Poyraz");

  return function () {
    // İçerideki fonksiyon, dışarıdaki devasaVeri'ye erişiyor.
    // Bu yüzden devasaVeri bellekte kalmaya MAHKUM.
    console.log(devasaVeri[0]);
  };
}

let benimFonksiyonum = devasaVeriIslemi();
benimFonksiyonum(); // "Poyraz" yazdırır.

// ÇÖZÜM: İşimiz bittiğinde referansı koparmalıyız!
// Aksi takdirde 100MB RAM'de gereksiz yere bekler.
benimFonksiyonum = null; // GC artık devasaVeri'yi temizleyebilir.

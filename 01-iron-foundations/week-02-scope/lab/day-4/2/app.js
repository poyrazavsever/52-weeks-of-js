function agirBilesenOlustur() {
  // 50MB'lık devasa bir array oluşturduk (Gemi)
  let devasaVeri = new Array(1000000).fill("Ağır UI Verisi");

  let bilesen = function () {
    // Closure: Bu fonksiyon devasaVeri'ye çıpa atıyor!
    console.log(devasaVeri[0]);
  };

  return bilesen;
}

let benimBilesenim = agirBilesenOlustur();
benimBilesenim();

// İŞİMİZ BİTTİĞİNDE:
// Eğer benimBilesenim değişkeni programın sonuna kadar yaşayacaksa,
// o 50MB'lık veri ASLA silinmez (Memory Leak).
// Çıpayı kesmek için referansı koparmalıyız:
benimBilesenim = null; // GC artık o 50MB'ı silebilir!

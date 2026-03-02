// Global Alan (Sokak)
var tehlikeliDegisken = "Dışarıdaki kaos";

// IIFE (Steril Çadır) başlatılıyor...
(function () {
  // Bu alan tamamen dış dünyadan izoledir!
  var gizliSifre = "12345";
  var temaRengi = "Kırmızı";

  console.log("IIFE çalıştı ve içindeki işlemler yapıldı. Tema:", temaRengi);
})();
// Çadır kapandı ve yok oldu!

// Şimdi dışarıdan o çadırın içindeki veriye ulaşmaya çalışalım:
// console.log(gizliSifre); // HATA: ReferenceError! (Çünkü çadır dışarıya kapalıdır)

// Global veya uzun süre yaşayacak bir değişken
let kopukElemanTutanak = null;

function modalOlustur() {
  // 1. DOM'da yeni bir eleman yaratıyoruz
  let myModal = document.createElement("div");
  myModal.id = "poyraz-ui-modal";
  document.body.appendChild(myModal);

  // 2. JS tarafında bu elemanı bir değişkene referanslıyoruz
  kopukElemanTutanak = myModal;
}

function modalKapat() {
  // 3. Elemanı ekrandan siliyoruz. (Kullanıcı gittiğini sanıyor)
  let modal = document.getElementById("poyraz-ui-modal");
  if (modal) {
    document.body.removeChild(modal);
    console.log("Modal ekrandan silindi!");
  }

  // DİKKAT: kopukElemanTutanak değişkeni hala myModal'ı tutuyor!
  // GC bu elemanı SİLEMEZ. Bu bir bellek sızıntısıdır.

  // ÇÖZÜM: JS referansını da koparmalısın!
  // kopukElemanTutanak = null;
}

modalOlustur();
// Biraz zaman geçer...
modalKapat();
// Eee? Modal ekrandan gitti ama bellekte hala duruyor! Bu, özellikle büyük uygulamalarda ciddi bellek sızıntılarına neden olabilir. Unutma, DOM'dan silmek yeterli değil, JavaScript'teki referansları da temizlemelisin!
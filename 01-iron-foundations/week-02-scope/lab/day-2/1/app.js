// 1. Fonksiyonu tanımlamadan ÖNCE çağırıyoruz!
selamVer();

// 2. Değişkeni tanımlamadan ÖNCE konsola yazdırıyoruz!
console.log(benimAdim);

// Asıl tanımlamalar burada:
var benimAdim = "Poyraz";

function selamVer() {
  console.log("Merhaba, nasılsın?");
}

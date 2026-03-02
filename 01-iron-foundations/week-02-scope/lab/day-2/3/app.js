// Scope başladı (TDZ - Karantina Başladı)
console.log("Selam");

// Karantinadaki değişkene dokunmaya çalışıyoruz!
console.log(gizliBilgi); // ÇIKTI: ReferenceError: Cannot access 'gizliBilgi' BEFORE initialization

// Karantina Bitişi
let gizliBilgi = "React.js";

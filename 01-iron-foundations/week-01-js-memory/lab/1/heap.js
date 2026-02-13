let oyuncu1 = { puan: 50 };
let oyuncu2 = oyuncu1; // DİKKAT: Veri kopyalanmadı, adres kopyalandı!

console.log("Değişimden önce oyuncu2 puan:", oyuncu2.puan); // 50

// Şimdi oyuncu1 üzerinden puanı değiştirelim
oyuncu1.puan = 100;

console.log("Değişimden sonra oyuncu2 puan:", oyuncu2.puan);
// Sonuç ne çıktı? 100 mü? :)

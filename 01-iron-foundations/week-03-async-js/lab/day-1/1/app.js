console.log("1. Uygulama Başladı");

// Senkron olmayan, asistanlara devredilecek bir görev:
setTimeout(function asistanGorevi() {
  console.log("2. İnternetten veri geldi (Arka plan bitti)");
}, 2000); // 2 saniye bekle

console.log("3. UI Çizildi ve Kullanıma Hazır");

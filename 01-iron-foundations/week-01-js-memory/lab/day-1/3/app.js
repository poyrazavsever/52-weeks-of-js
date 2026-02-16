function sizintiYap() {
  // DİKKAT: 'let' veya 'const' kullanmayı unuttuk!
  gizliVeri = "Bu veri artık sonsuza kadar bellekte kalacak!";
}

sizintiYap();

// Fonksiyon bitti, normalde içindeki her şey silinmeliydi.
// AMA...
console.log(window.gizliVeri);
// Çıktı: "Bu veri artık sonsuza kadar bellekte kalacak!"

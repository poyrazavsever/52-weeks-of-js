// YENİ YÖNTEM: async / await
async function tabloVerisiniGetirYeni() {
  try {
    console.log("1. İstek atılıyor...");

    // Kumandaya bas, yayın donduruldu (arka planda fetch çalışıyor)
    const cevap = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const kullanici = await cevap.json(); // Bekle, json'a çevrilsin

    console.log("2. Kullanıcı bulundu:", kullanici.name);

    // Yine kumandaya bas ve bekle
    const cevap2 = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=" + kullanici.id,
    );
    const gonderiler = await cevap2.json();

    console.log("3. Gönderiler Tabloya Çiziliyor:", gonderiler.length, "adet");
  } catch (hata) {
    // Tüm hatalar tek bir yakalama bloğuna düşer
    console.log("Hata çıktı!", hata);
  }
}

tabloVerisiniGetirYeni();
console.log("Ben asıl programım, UI çizmeyi bekletmiyorum!");
// ÇIKTI SIRASI: 1. İstek atılıyor -> Ben asıl programım -> 2. Kullanıcı bulundu -> 3. Gönderiler Çiziliyor

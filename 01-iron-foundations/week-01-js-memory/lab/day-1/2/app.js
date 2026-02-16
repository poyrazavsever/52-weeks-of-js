// 1. Bir obje oluşturalım ve "user" değişkenine bağlayalım (Referans)
let user = {
  name: "Poyraz",
  role: "Developer",
};

// Şu an Heap'te {name: "Poyraz"...} objesi var ve "user" ona bağlı.
// GC buraya dokunamaz.

console.log(user); // Obje orada.

// 2. Şimdi bu objeye giden TEK yolu keselim.
user = null;

// ARTIK {name: "Poyraz"...} objesine ulaşmanın HİÇBİR yolu yok.
// Kodda bu objeye bir daha asla erişemezsin.

console.log(user); // null

let aile = {
  baba: { ad: "Ali" },
  anne: { ad: "Ayşe" },
};

// Şu an "aile" değişkeni üzerinden hem babaya hem anneye ulaşabiliyoruz.

console.log(aile);

let sadeceBaba = aile.baba; // Babaya ikinci bir yol (referans) açtık.

aile = null; // Aile değişkenini sildik! (Ana yolu kestik)

// SORU: "Ayşe" objesi silinir mi? EVET (Ulaşan yol kalmadı)
// SORU: "Ali" objesi silinir mi? HAYIR!

console.log(sadeceBaba); // { ad: "Ali" } hala duruyor.

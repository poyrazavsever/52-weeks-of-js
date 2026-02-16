let a = 10;
let b = a;

console.log("Değişimden önce:");
console.log("a:", a); // 10
console.log("b:", b); // 10

a = 20; // a'yı değiştirdik.

console.log("Değişimden sonra:");
console.log("a:", a); // 20
console.log("b:", b); // 10 (Hala 10 Çünkü bağımsız bir kopya demiştik.)
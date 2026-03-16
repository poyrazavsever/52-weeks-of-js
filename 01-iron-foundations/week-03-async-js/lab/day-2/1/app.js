console.log("1. Senkron (Direkt İçeri)");

// Standart bilet (Macrotask)
setTimeout(function standartGorev() {
  console.log("2. Macrotask (Standart Sıra)");
}, 0);

// VIP Bilet (Microtask)
Promise.resolve().then(function vipGorev() {
  console.log("3. Microtask (VIP Sırası)");
});

console.log("4. Senkron (Direkt İçeri)");

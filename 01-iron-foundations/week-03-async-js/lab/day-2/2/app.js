setTimeout(() => console.log("A: Gariban Macrotask"), 0);

Promise.resolve().then(() => {
  console.log("B: İlk VIP İçeri Girdi");

  // VIP, kendi içinden başka bir VIP yaratıyor!
  Promise.resolve().then(() => {
    console.log("C: VIP'nin Arkadaşı da İçeri Girdi");
  });
});

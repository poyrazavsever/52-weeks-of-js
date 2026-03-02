function ofisOrtami() {
  if (true) {
    var eskiModa = "Açık ofisteyim, sızarım!";
    let yeniModa = "Şifreli kasadayım, çıkamam!";
  }

  // if bloğunun DIŞINDAYIZ
  console.log(eskiModa); // Çıktı: "Açık ofisteyim, sızarım!" (Güvenlik zafiyeti!)
  console.log(yeniModa); // Çıktı: ReferenceError: yeniModa is not defined
}

ofisOrtami();

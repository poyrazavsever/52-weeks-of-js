**Şimdi arkadaşlar belleklerin yaşam döngüsü ve veri tipleri ile başlayalım.**

### Bölüm 1

Javascriptte ve diğer bir çok dilde de aynı şekilde bellek yönetimi arka planda 3 aşamalı bir döngü ile çalışır.

1. **Allocation** yani "Yer Ayırma": Değişken tanımladığımız zaman JS Motoru bellekte yer ayırır.
2. **Use** yani "Kullanım": Değişkeni okuduğumuz ve değiştirdiğimiz aşama.
3. **Release** yani "Serbest Bırakma": Artık o veriye ihtiyaç kalmadığında belleğin temizlenmesi. (Garbage collection buraya giriyor ama ileride inceleyeceğiz bu durumu.)

#### Stack ve Heap kavramları:

##### 1. Stack (Yığın) Bellek:
- Çok hızlıdır, düzenlidir fakat boyutu sınırlıdır. 
- Primitive yani ilkel veri tiplerini saklar. 
**(Number, String, Boolean, null, undefined, Symbol, BigInt)**
- Buradaki veriler **değer (value)** olarak saklanır. Bir değişkeni diğerine eşitlediğinde, fotokopi çeker gibi değerin kopyasını oluşturur. Birini değiştirmek diğerini etkilemez. 

##### 2. Heap (Küme) Bellek:
- Büyük, dağınık bir depo aslında. Dinamik olarak büyüyebilir ama erişimi Stack'e göre bir tık daha yavaştır. 
- Reference (Referans) tipleri saklar. **(Yani nesneleri saklar: Object, Array, Function)**
- Değişkenin kendisi (ismi) Stack'te durur ama değeri Heap'teki adresi yani referansı gösterir. Bir değişkeni diğerine eşitlediğinde evin anahtarını kopyalamış gibi olursun. İkisi de aynı evi açarlar.

(lab/1'in altıntaki kodları inceleyin. F12 -> Konsola gidin ve sonuçları da inceleyin.)


---


### Bölüm 2
C veya C++ dillerde oluşturduğun bir veriyi işin bitince manuel olarak silmen gerekiyor. Silmezsen bilgisayarın RAM'i doluyor ve program çöküyor.

Javascriptte ise **Garbage Collector (GC)** adında bir mekanizma var. Arka planda çalışan bir temizleyici aslında bu. Sürekli belleği izliyor ve ihtiyaç olmayan verileri siliyor. 

**Pekii arkadaşlar ihtiyaç olup olmadığına nasıl karar veriyor?**

#### Ana Kural: **Reachability (Ulaşılabilirlik)**
GC'nin tek ve çok basit bir kriteri var. Ben bu veriye kök dizinden (biz kök dizine **root** diyoruz.) ulaşabiliyor muyum?

1. Roots (Kökler): Global değişkenler (window gibi) veya şuan çalışan fonksiyonun yerel değişkenleri kök kabul ediliyor. Bunlar silinmezler. 

2. Referanslar: Eğer bir kök, bir objeyi tutuyorsa (referans oluyorsa yani :)) o obje **ulaşılabilir**'dir ve silinmez.

3. Kopuk bağlar: Eğer bir objeye giden tüm yollar (referanslar) kesilirse, o obje **ÇÖP (Garbage)** olur.

Peki nasıl siliyor? 

#### Algoritmanın adı: Mark-and-Sweep (İşaretle ve Süpür)
Modern tarayıcıların çoğu bu algoritmayı kullanıyorlar. En basit haliyle şöyle çalışıyor.

1. Mark (İşaretle): GC, köklerden başlıyor ve ulaşabildiği her objeyi canlı olarak işaretliyor. 

2. Sweep (Süpür): İşaretlenmemiş olan her şeyi bellekten siler. 

(lab/2'in altıntaki kodları inceleyin. F12 -> Konsola gidin ve sonuçları da inceleyin.)

---

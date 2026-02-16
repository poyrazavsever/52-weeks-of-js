# Project Plan: The Engineering Redemption Platform

**Version:** 1.0.0
**Author:** Poyraz Avsever
**Status:** Planning Phase

---

## 1. Executive Summary (Proje Özeti)
**The Engineering Redemption Platform**, GitHub üzerinde barındırılan 52 haftalık "Hardcore Engineering" müfredatını görselleştiren, interaktif ve modern bir web arayüzüdür.

Bu proje sıradan bir blog değildir; dosya sistemi tabanlı (File-System Based) çalışan, Markdown ve ham kod dosyalarını dinamik olarak işleyen, "Headless CMS" mantığıyla kurgulanmış bir **Mühendislik Portfolyosu ve Dokümantasyon Sistemidir.**

## 2. Mission & Vision (Misyon ve Vizyon)

### Misyon
"Vibe Coding" (Yapay zeka bağımlı kodlama) sürecinden, "First Principles" (Temel Prensipler) mühendisliğine geçiş sürecini şeffaf, takip edilebilir ve estetik bir şekilde belgelemek.

### Vizyon
2027 yılına gelindiğinde, sadece bir CV değil, yaşayan, çalışan ve teknik derinliği kanıtlayan dijital bir kütüphane oluşturmak. Bu platform, "Ben bu konuyu biliyorum" iddiasının değil, "İşte kanıtı" gerçeğinin sunulduğu yerdir.

---

## 3. System Architecture (Sistem Mimarisi)

Proje, **Static Site Generation (SSG)** ve **Server Components** mimarisi üzerine kuruludur. Veritabanı yoktur; veritabanı GitHub reposunun kendisidir.

### The "Headless" Git Concept
Sistem, içerik yönetim sistemi (CMS) olarak doğrudan dosya sistemini kullanır.

1.  **Data Layer (Veri Katmanı):**
    * GitHub Reposu içindeki klasörler (`01-iron-foundations`, `week-01...`).
    * İçerik formatları: `.md` (Notlar), `.js/.html` (Lab Kodları), `.png` (Görseller).
2.  **Logic Layer (Mantık Katmanı - Next.js):**
    * `fs` (File System) modülü ile klasör ağacını tarar.
    * `gray-matter` ile metadata (başlık, tarih) bilgisini ayrıştırır.
    * `next-mdx-remote` ile Markdown içeriğini React komponentlerine dönüştürür.
3.  **Presentation Layer (Sunum Katmanı):**
    * Kullanıcıya Tailwind CSS ile stillendirilmiş, syntax highlighting (kod renklendirme) yapılmış sayfalar sunar.

### 🔄 Data Flow (Veri Akışı)
`GitHub Repo (Raw Files)` -> `Next.js Server (fs read)` -> `MDX Parsing` -> `React Server Components` -> `Client Browser`

---

## 4. Directory Structure Mapping (Dosya Eşleme)

GitHub reposundaki fiziksel yapının, Web sitesindeki URL yapısına dönüşümü:

| GitHub Source Path | Web URL Route | Content Type |
| :--- | :--- | :--- |
| `/01-iron-foundations/week-01...` | `/docs/01-iron-foundations/week-01...` | Module Content |
| `/extra/lab/*.js` | *(Component inside page)* | Code Viewer |
| `/extra` | `/extra` | Supplementary Info |
| `/resources` | `/resources` | Books & Tools |
| `/assets` | `/assets` (Public) | Images |

---

## 5. Technology Stack (Teknoloji Yığını)

* **Core Framework:** Next.js 15 (App Router & Server Components)
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS
* **Content Processing:**
    * `next-mdx-remote`: MDX Rendering
    * `rehype-pretty-code`: Shiki tabanlı, VS Code kalitesinde Syntax Highlighting.
    * `remark-gfm`: GitHub Flavored Markdown desteği.
* **UI Components:**
    * `lucide-react`: İkon seti.
    * `clsx` & `tailwind-merge`: Dinamik sınıf yönetimi.
* **Deployment:** Vercel

---

## 6. UI/UX Design Philosophy (Tasarım Felsefesi)

Tasarım dili **"Geist" (Vercel)** ve **"Linear"** estetiğinden ilham alır.

* **Minimalizm:** Gereksiz dekorasyon yok. Odak noktası kod ve içerik.
* **Tipografi:**
    * Başlıklar ve UI: `Inter` (Okunabilirlik).
    * Kod Blokları ve Teknik Terimler: `JetBrains Mono` (Mühendislik hissi).
* **Renk Paleti:**
    * Zemin: `#000000` (Pure Black) veya `#0a0a0a`.
    * Metin: `#ededed` (High Contrast) ve `#a1a1a1` (Muted).
    * Vurgu: Beyaz ince borderlar (`border-white/10`).
* **Navigasyon:**
    * "Index" butonu: Tek bir tetikleyici ile açılan kapsamlı Dropdown menü.
    * Sidebar: İçerik okurken solda duran, fazları gösteren ağaç yapısı.

---

## 7. Key Features (Temel Özellikler)

### A. The Lab Viewer (Kod Laboratuvarı)
Markdown içindeki statik kod blokları yerine, `lab` klasöründeki gerçek dosyaları sekmeli (Tabbed) bir yapıda gösteren özel bileşen.
* *Özellik:* `heap.js`, `stack.js` ve `index.html` dosyalarını yan yana sekmelerde gösterir. Kopyalama butonu içerir.

### B. Dynamic Sidebar & Breadcrumbs
Klasör yapısı değiştiğinde (yeni hafta eklendiğinde) web sitesi menüleri otomatik olarak günceller. Manuel link eklemeye gerek yoktur.

### C. Smart Asset Pipeline
GitHub'daki `assets` klasörü, build aşamasında otomatik olarak web sitesinin `public` klasörüne kopyalanır. Böylece Markdown içinde `![Resim](/assets/img.png)` kullanımı kırılmaz.

---

## 8. Implementation Roadmap (Uygulama Adımları)

### Phase 1: Core Setup
- [x] Next.js kurulumu (TypeScript + Tailwind).
- [ ] `lib/api.ts`: Dosya sistemi okuma fonksiyonlarının yazılması (`getPhases`, `getWeek`).
- [ ] MDX yapılandırması ve Syntax Highlighting entegrasyonu.

### Phase 2: UI Construction 
- [ ] `Navbar`: Minimalist "Index" dropdown tasarımı.
- [ ] `Sidebar`: Faz ve hafta listeleme mantığı.
- [ ] `LabViewer`: Kod dosyalarını sekmeli gösterme bileşeni.

### Phase 3: Content Integration 
- [ ] Markdown dosyalarının `page.tsx` içine dinamik olarak çekilmesi.
- [ ] `extra` ve `resources` sayfalarının oluşturulması.
- [ ] Asset kopyalama script'inin (`prebuild`) yazılması.

---
*Bu plan, Poyraz Avsever'in uçtan uca mühendis olma yolculuğunun dijital kopyasıdır.*
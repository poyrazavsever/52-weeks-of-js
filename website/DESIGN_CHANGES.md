# Design System Changes - Summary

## 🎯 Overview

Website'in tamamında **minimal, naif ve kibar** bir tipografi sistemi uygulandı. Tüm font-size'lar küçültüldü, container'lar daraltıldı ve detaylı bir design system oluşturuldu.

---

## ✨ Yapılan Değişiklikler

### 1. **Design System Oluşturuldu**

Dosyalar:

- `lib/design-system.ts` - TypeScript design tokens
- `lib/DESIGN_SYSTEM.md` - Kapsamlı dokümantasyon

**Ana Özellikler:**

- Ana renk: **Red-600** (`#dc2626` rengi fakat red-600 olarak kullanılmalı.)
- Tailwind color palette kullanımı
- 4px-based spacing scale
- Minimal typography scale
- Dar container widths (max: 1088px)
- Component-specific tokens

### 2. **Global CSS Güncellemesi** (`app/globals.css`)

**Değişiklikler:**

- Tailwind CSS v4 `@theme` directive ile custom tokens
- Base font-size: **14px** (eskiden 16px)
- Container max-width: **68rem (1088px)** (eskiden 80rem)
- Refined scrollbar styles (8px width)
- Prose/MDX overrides (daha küçük font-size'lar)

### 3. **Typography Scale (Tüm Sitede)**

| Element     | Old Size | New Size             | Kullanım              |
| ----------- | -------- | -------------------- | --------------------- |
| Body text   | 16px     | **14px**             | Default body          |
| Small text  | 14px     | **13px**             | Captions, helper text |
| Extra small | 12px     | **11px**             | Labels, metadata      |
| H1          | 56-112px | **44-56px**          | Hero headings         |
| H2          | 36-48px  | **28-36px**          | Page headings         |
| H3          | 24-30px  | **22px**             | Section headings      |
| H4          | 20px     | **18px**             | Sub-headings          |
| Code        | 14px     | **13px**             | Code blocks           |
| Tiny labels | 12px     | **10.5px (0.65rem)** | Minimal metadata      |

### 4. **Component Updates**

#### **HeroSection**

- Heading: `text-7xl` → `text-5xl` (56px instead of 112px)
- Subtext: `text-lg` → `text-base` (14px instead of 18px)
- Red bar: `h-16` → `h-12` (48px instead of 64px)
- Padding: Reduced vertical spacing

#### **PhasesGrid**

- Card padding: `p-6` → `p-5`
- Heading: `text-2xl` → `text-xl`
- Week links: `text-sm` → `text-xs`
- Metadata: `text-xs` → `text-[0.65rem]`
- Grid gap: `gap-8` → `gap-6`

#### **Navbar**

- Top bar: `text-sm py-2` → `text-xs py-1.5`
- Logo: `w-12 h-12` → `w-10 h-10`
- Title: Added `text-sm font-medium`
- Icon: `text-2xl` → `text-lg`
- Dropdown padding: `py-8` → `py-6`
- Menu items: `text-sm` → `text-xs`

#### **Sidebar**

- Width: `w-80` → `w-72` (288px instead of 320px)
- Header: `text-sm` → `text-xs uppercase`
- Phase button: `px-3 py-2 text-sm` → `px-2.5 py-1.5 text-xs`
- Week links: `px-3 py-2 text-sm` → `px-2.5 py-1.5 text-xs`
- Badges: `text-xs` → `text-[0.65rem]`
- Phase number: `w-5 h-5` → `w-4 h-4`

#### **Breadcrumbs**

- Font-size: `text-sm` → `text-xs`
- Gap: `gap-2` → `gap-1.5`
- Margin: `mb-6` → `mb-4`

#### **DayTabs**

- Tab padding: `px-6 py-3 text-sm` → `px-4 py-2 text-xs`
- Tab margin: `mb-8` → `mb-6`
- Empty state: `py-12` → `py-8`
- Icon size: Reduced to `text-3xl` from `text-4xl`
- Lab heading: `text-lg` → `text-base`

#### **LabAccordion (DayTabs içinde)**

- Header padding: `px-4 py-3` → `px-3 py-2`
- Badge: `w-6 h-6 text-xs` → `w-5 h-5 text-[0.65rem]`
- Title: `text-sm` → `text-xs`
- File tabs: `px-4 py-2 text-xs` → `px-3 py-1.5 text-[0.65rem]`
- Code: `text-sm` → `text-xs`
- Copy button: `text-xs` → `text-[0.65rem]`

#### **Button Component**

- XS: `h-7` → `h-6`
- SM: `h-9` → `h-7`
- MD: `h-11` → `h-9`
- LG: `h-13` → `h-10`
- XL: `h-16` → `h-12`
- Icon sizes: Reduced by 2px across all sizes
- Badge: `h-5 w-5` → `h-4 w-4`

#### **AssetsGrid**

- Grid gap: `gap-6` → `gap-5`
- Card padding: `p-6` → `p-4`
- Icon: `w-16 h-16 text-3xl` → `w-12 h-12 text-2xl`
- File name: `text-sm` → `text-xs`
- Badge: `text-xs px-2 py-1` → `text-[0.65rem] px-1.5 py-0.5`
- GitHub link: `text-xs` → `text-[0.65rem]`

#### **ExtraTopics**

- Tab padding: `px-6 py-3 text-sm` → `px-4 py-2 text-xs`
- Tab gap: `gap-2` → `gap-1.5`
- Margin: `mb-8` → `mb-6`

#### **LabViewer**

- Section margin: `mt-12 pt-8` → `mt-10 pt-6`
- Title: `text-2xl` → `text-lg`
- File count: `text-sm` → `text-xs`
- Tab padding: `px-4 py-3 text-sm` → `px-3 py-2 text-xs`
- Code: `text-sm p-6` → `text-xs p-4`
- Copy button: `text-xs` → `text-[0.65rem]`

### 5. **Page Layout Updates**

#### **Phase Page** (`app/[phase]/page.tsx`)

- Container padding: `py-12` → `py-10`
- Header margin: `mb-12 pb-8` → `mb-10 pb-6`
- Title: `text-4xl` → `text-3xl`
- Phase number badge: `w-16 h-16 text-2xl` → `w-12 h-12 text-lg`
- Week cards: `p-6` → `p-4`
- Week title: `text-xl` → `text-base`
- Week number: `text-sm` → `text-xs`
- Status indicators: `text-xs w-2 h-2` → `text-[0.65rem] w-1.5 h-1.5`
- Navigation: `mt-12 pt-8` → `mt-10 pt-6 text-sm`

#### **Week Page** (`app/[phase]/[week]/page.tsx`)

- Container padding: `py-8` → `py-6`
- Header: `mb-8 pb-6` → `mb-6 pb-4`
- Title: `text-4xl mb-4` → `text-3xl mb-3`
- Topics: `text-sm px-3 py-1` → `text-xs px-2 py-0.5`
- Goal box: `px-4 py-3` → `px-3 py-2`
- Navigation: `mt-12 pt-8 text-sm` → `mt-10 pt-6 text-xs`

#### **Assets Page** (`app/assets/page.tsx`)

- Container padding: `py-8` → `py-6`
- Header: `mb-12 pb-6` → `mb-10 pb-5`
- Title: `text-5xl mb-4` → `text-4xl mb-3`
- Description: `text-lg` → `text-sm`
- GitHub button: `px-4 py-2 text-sm w-5 h-5` → `px-3 py-1.5 text-xs w-4 h-4`
- Section titles: `text-2xl mb-6` → `text-xl mb-4`
- Empty state: `py-20 text-lg` → `py-16 text-base`

#### **Extra Page** (`app/extra/page.tsx`)

- Container padding: `py-8` → `py-6`
- Header: `mb-8 pb-6` → `mb-6 pb-4`
- Title: `text-4xl mb-4` → `text-3xl mb-2`
- Description: `text-gray-600` → `text-sm text-gray-600`
- Sections: `mb-8` → `mb-6`
- Empty state: `py-20 text-lg` → `py-16 text-base`

#### **Resources Page** (`app/resources/page.tsx`)

- Container padding: `py-8` → `py-6`
- Header: `mb-8 pb-6` → `mb-6 pb-4`
- Title: `text-4xl mb-4` → `text-3xl mb-2`
- Description: `text-gray-600` → `text-sm text-gray-600`
- Sections: `mb-12` → `mb-10`
- Empty state: `py-20 text-lg` → `py-16 text-base`

---

## 📊 Genel İstatistikler

**Dosya Değişiklikleri:**

- ✅ 1 yeni design system dosyası (TypeScript)
- ✅ 1 yeni dokümantasyon dosyası (Markdown)
- ✅ 1 global CSS dosyası güncellendi
- ✅ 10 component dosyası güncellendi
- ✅ 5 page layout dosyası güncellendi

**Toplam:** 18 dosya güncellendi/oluşturuldu

**Typography Değişimleri:**

- Base font-size: **-2px** (16px → 14px)
- Heading scales: Ortalama **-20% küçültme**
- Spacing: Ortalama **-15% azaltma**
- Container genişliği: **-200px** (1280px → 1088px)
- Padding/margin değerleri: Tutarlı şekilde küçültüldü

---

## 🎨 Design Philosophy

Bu değişiklikler şu prensiplere dayanıyor:

1. **Minimalism**: Daha az, daha iyi
2. **Refinement**: Naif ve zarif tipografi
3. **Focus**: Dar container'lar ile daha odaklı okuma deneyimi
4. **Consistency**: Tutarlı spacing ve sizing
5. **Readability**: Küçük ama okunabilir fontlar
6. **Elegance**: Sofistike ve profesyonel görünüm

---

## 🚀 Kullanım

Design system'i kullanmak için:

```tsx
// TypeScript'te design tokens
import { designSystem, components } from "@/lib/design-system";

// Tailwind class'ları
className = "text-base text-gray-900"; // 14px body text
className = "text-xs text-gray-600"; // 13px small text
className = "container mx-auto"; // Dar container (68rem)
```

Daha fazla bilgi için: `lib/DESIGN_SYSTEM.md`

---

## ✨ Sonuç

Website artık **daha minimal, daha naif ve daha profesyonel** görünüyor. Tüm tipografi küçültüldü, container'lar daraltıldı ve detaylı bir design system oluşturuldu. Her değişiklik tutarlı ve sistematik bir şekilde uygulandı.

**Ana Renk:** Red-600 (`#dc2626`)  
**Base Font Size:** 14px  
**Container Width:** 1088px (68rem)  
**Design Approach:** Minimal, refined, focused

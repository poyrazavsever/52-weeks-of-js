# Design System Documentation

## 52 Weeks of JavaScript - Refined & Minimal Design System

This design system prioritizes **sophistication, minimalism, and readability** with smaller, refined typography and narrower containers for a more focused reading experience.

---

## 🎨 Color Palette

### Primary Color: Red-600 (`#dc2626`)

Our brand color is **red-600** from Tailwind's color palette, representing energy, passion, and focus.

```tsx
// Usage examples
className = "bg-red-600 text-white";
className = "text-red-600 border-red-600";
className = "hover:bg-red-700";
```

### Gray Scale

We use Tailwind's gray palette for neutral tones:

- **Gray-50** to **Gray-100**: Backgrounds, elevated surfaces
- **Gray-200** to **Gray-400**: Borders, dividers, subtle elements
- **Gray-500** to **Gray-700**: Secondary text, icons
- **Gray-800** to **Gray-900**: Primary text, headings

---

## 📝 Typography

### Philosophy

Our typography is **smaller and more refined** than typical web standards. We prioritize:

- **Readability** over large flashy headings
- **Hierarchy** through weight and spacing, not just size
- **Elegance** in every text element

### Font Families

```tsx
// Sans-serif (Default)
font-family: var(--font-inter)

// Monospace (Code, labels)
font-family: var(--font-mono)

// Display (Special accents)
font-family: var(--font-agbalumo)
```

### Font Scale

| Class       | Size     | Line Height | Usage                     |
| ----------- | -------- | ----------- | ------------------------- |
| `text-xs`   | 11px     | 16px        | Tiny labels, metadata     |
| `text-sm`   | 13px     | 20px        | Captions, helper text     |
| `text-base` | **14px** | 24px        | **Body text (default)**   |
| `text-md`   | 15px     | 24px        | Emphasized body text      |
| `text-lg`   | 16px     | 24px        | Small headings, lead text |
| `text-xl`   | 18px     | 28px        | Section headings          |
| `text-2xl`  | 22px     | 32px        | Page sub-headings         |
| `text-3xl`  | 28px     | 36px        | Page headings             |
| `text-4xl`  | 36px     | 40px        | Large headings            |
| `text-5xl`  | 44px     | 48px        | Hero headings             |
| `text-6xl`  | 56px     | 56px        | Extra large displays      |

### Font Weights

```css
font-light: 300
font-normal: 400 (default)
font-medium: 500
font-semibold: 600 (for headings)
font-bold: 700 (rarely used)
```

### Typography Guidelines

1. **Body Text**: Use `text-base` (14px) as your default
2. **Headings**: Use `font-semibold` instead of `font-bold`
3. **Spacing**: Prefer tighter line heights and letter spacing
4. **Code**: Always use `font-mono` for code and technical labels

---

## 📦 Container System

### Philosophy

**Narrower containers** create a more focused, comfortable reading experience. Our max-width is **1088px (68rem)** instead of the typical 1280px+.

### Responsive Container

```tsx
<div className="container mx-auto px-4">
  {/* Content automatically constrained to 68rem */}
</div>
```

### Container Widths

| Breakpoint | Max Width                      |
| ---------- | ------------------------------ |
| `xs`       | 320px                          |
| `sm`       | 384px                          |
| `md`       | 512px                          |
| `lg`       | 672px                          |
| `xl`       | 832px                          |
| `2xl`      | 960px                          |
| `3xl`      | **1088px** (default container) |

---

## 🧩 Spacing System

4px-based scale for consistent rhythm:

```
0   = 0px
0.5 = 2px
1   = 4px
1.5 = 6px
2   = 8px
3   = 12px
4   = 16px
6   = 24px
8   = 32px
12  = 48px
16  = 64px
```

### Common Patterns

```tsx
// Card padding
className = "p-4"; // 16px - small
className = "p-5"; // 20px - medium (most common)
className = "p-6"; // 24px - large

// Section spacing
className = "mb-6"; // 24px between sections
className = "mb-8"; // 32px for larger gaps
className = "py-12"; // 48px vertical section padding
```

---

## 🎯 Component Guidelines

### Buttons

```tsx
// Sizes (refined and smaller)
<Button size="xs" />   // h-6, px-2, text-[0.65rem]
<Button size="sm" />   // h-7, px-3, text-xs
<Button size="md" />   // h-9, px-4, text-sm (default)
<Button size="lg" />   // h-10, px-5, text-base
<Button size="xl" />   // h-12, px-6, text-lg

// Variants
<Button variant="solid" />    // Primary action (red-600)
<Button variant="outline" />  // Secondary action
```

### Cards

```tsx
// Always use dashed borders for visual consistency
className = "border-2 border-dashed border-gray-300 p-5";
className = "hover:border-gray-900 transition-colors";
```

### Badges & Labels

```tsx
// Small, uppercase, monospace for technical info
className = "text-[0.65rem] font-mono uppercase px-1.5 py-0.5";
```

---

## 🖼️ Borders & Shadows

### Borders

Prefer **dashed borders** for a unique, technical aesthetic:

```tsx
className = "border-2 border-dashed border-gray-300";
```

### Shadows

Use subtle shadows sparingly:

```tsx
className = "shadow-sm"; // Minimal elevation
className = "shadow-md"; // Subtle depth
className = "hover:shadow-lg"; // Hover effect
```

---

## 🎬 Animations & Transitions

### Duration

```tsx
transition-all duration-200  // Default - most UI
transition-all duration-300  // Slower, emphasized
```

### Common Patterns

```tsx
// Hover effects
className = "hover:text-red-600 transition-colors";
className = "hover:bg-gray-50 transition-colors";

// Scale effects
className = "hover:scale-110 transition-transform";
```

---

## ✨ Best Practices

### DO ✅

- Use `text-base` (14px) for body text
- Use `font-semibold` for headings, not `font-bold`
- Keep containers narrow with `max-w-3xl` or use default container
- Use dashed borders for cards and containers
- Prefer `gap-*` utilities for flexbox spacing
- Use `text-[0.65rem]` for tiny labels/metadata

### DON'T ❌

- Don't use `font-bold` unless absolutely necessary
- Don't exceed `text-5xl` for headings (keep it minimal)
- Don't use solid borders for primary UI elements
- Don't over-space elements (be compact and refined)
- Avoid large padding values

---

## 🚀 Quick Reference

### Common Class Combinations

```tsx
// Section Header
<h2 className="text-xl font-semibold text-gray-900 mb-4">

// Body Paragraph
<p className="text-base text-gray-600 leading-relaxed">

// Card Component
<div className="border-2 border-dashed border-gray-300 p-5 hover:border-gray-900 transition-colors">

// Button Primary
<button className="px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-700 transition-colors">

// Badge/Label
<span className="text-[0.65rem] font-mono uppercase px-1.5 py-0.5 bg-gray-100 text-gray-600 border border-dashed border-gray-300">

// Code Block
<pre className="p-4 bg-gray-900 text-gray-100">
  <code className="text-xs font-mono leading-relaxed">
```

---

## 📚 Implementation

Import the design system in your components:

```tsx
import { designSystem, components } from "@/lib/design-system";

// Use design tokens
const { colors, typography, spacing } = designSystem;
```

All styles are defined in `app/globals.css` using Tailwind CSS v4's `@theme` directive.

---

**Remember**: This design system prioritizes **refinement over boldness**, **clarity over decoration**, and **focus over distraction**. Every pixel serves a purpose.

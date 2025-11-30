# 🎨 Design System

**Last Updated:** December 1, 2025  
**Version:** 1.0.0

---

## 📋 Table of Contents

- [Overview](#overview)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing](#spacing)
- [Components](#components)
- [Animations](#animations)
- [Accessibility](#accessibility)

---

## 🎯 Overview

This design system provides a consistent visual language and component library for the portfolio. Built with **Tailwind CSS 4.0** and **shadcn/ui** components.

### Design Principles

1. **Consistency** - Unified visual language across all pages
2. **Accessibility** - WCAG 2.1 AA compliant
3. **Responsiveness** - Mobile-first approach
4. **Performance** - Optimized for fast loading
5. **Dark Mode** - Full dark mode support

---

## 🎨 Color Palette

### Theme Colors

```css
/* Light Mode */
--background: 0 0% 100%;           /* #FFFFFF */
--foreground: 222.2 84% 4.9%;      /* #020817 */

--card: 0 0% 100%;                 /* #FFFFFF */
--card-foreground: 222.2 84% 4.9%; /* #020817 */

--popover: 0 0% 100%;              /* #FFFFFF */
--popover-foreground: 222.2 84% 4.9%;

--primary: 222.2 47.4% 11.2%;      /* #1E293B */
--primary-foreground: 210 40% 98%; /* #F8FAFC */

--secondary: 210 40% 96.1%;        /* #F1F5F9 */
--secondary-foreground: 222.2 47.4% 11.2%;

--muted: 210 40% 96.1%;            /* #F1F5F9 */
--muted-foreground: 215.4 16.3% 46.9%;

--accent: 210 40% 96.1%;           /* #F1F5F9 */
--accent-foreground: 222.2 47.4% 11.2%;

--destructive: 0 84.2% 60.2%;      /* #EF4444 */
--destructive-foreground: 210 40% 98%;

--border: 214.3 31.8% 91.4%;       /* #E2E8F0 */
--input: 214.3 31.8% 91.4%;
--ring: 222.2 84% 4.9%;

/* Dark Mode */
.dark {
  --background: 222.2 84% 4.9%;    /* #020817 */
  --foreground: 210 40% 98%;       /* #F8FAFC */
  
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  
  --secondary: 217.2 32.6% 17.5%;  /* #1E293B */
  --secondary-foreground: 210 40% 98%;
  
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
```

### Usage

```tsx
// Background colors
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-muted text-muted-foreground">

// Accent colors
<button className="bg-primary text-primary-foreground">
<button className="bg-secondary text-secondary-foreground">
<button className="bg-accent text-accent-foreground">

// State colors
<div className="bg-destructive text-destructive-foreground">
<div className="border border-border">
<input className="border-input ring-ring">
```

---

## 📝 Typography

### Font Families

```css
--font-geist: 'Geist', sans-serif;
--font-geist-mono: 'Geist Mono', monospace;
```

### Font Sizes

```css
/* Tailwind Typography Scale */
text-xs:    0.75rem   (12px)
text-sm:    0.875rem  (14px)
text-base:  1rem      (16px)
text-lg:    1.125rem  (18px)
text-xl:    1.25rem   (20px)
text-2xl:   1.5rem    (24px)
text-3xl:   1.875rem  (30px)
text-4xl:   2.25rem   (36px)
text-5xl:   3rem      (48px)
text-6xl:   3.75rem   (60px)
text-7xl:   4.5rem    (72px)
text-8xl:   6rem      (96px)
text-9xl:   8rem      (128px)
```

### Font Weights

```css
font-thin:       100
font-extralight: 200
font-light:      300
font-normal:     400
font-medium:     500
font-semibold:   600
font-bold:       700
font-extrabold:  800
font-black:      900
```

### Usage Examples

```tsx
// Headings
<h1 className="text-4xl font-bold">Main Heading</h1>
<h2 className="text-3xl font-semibold">Section Heading</h2>
<h3 className="text-2xl font-medium">Subsection</h3>

// Body text
<p className="text-base text-foreground">Regular paragraph</p>
<p className="text-sm text-muted-foreground">Secondary text</p>

// Code
<code className="font-mono text-sm">const code = true;</code>
```

---

## 📏 Spacing

### Spacing Scale

```css
/* Tailwind Spacing Scale */
0:    0px
px:   1px
0.5:  0.125rem  (2px)
1:    0.25rem   (4px)
1.5:  0.375rem  (6px)
2:    0.5rem    (8px)
2.5:  0.625rem  (10px)
3:    0.75rem   (12px)
3.5:  0.875rem  (14px)
4:    1rem      (16px)
5:    1.25rem   (20px)
6:    1.5rem    (24px)
7:    1.75rem   (28px)
8:    2rem      (32px)
10:   2.5rem    (40px)
12:   3rem      (48px)
16:   4rem      (64px)
20:   5rem      (80px)
24:   6rem      (96px)
32:   8rem      (128px)
```

### Layout Spacing

```tsx
// Container padding
<div className="px-6 sm:px-8 lg:px-16">

// Section spacing
<section className="py-16 sm:py-20 lg:py-24">

// Component spacing
<div className="space-y-4">  // Vertical spacing
<div className="space-x-2">  // Horizontal spacing
<div className="gap-6">      // Grid/Flex gap
```

---

## 🧩 Components

### Button

```tsx
// Primary button
<button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
  Primary Button
</button>

// Secondary button
<button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80">
  Secondary Button
</button>

// Outline button
<button className="px-4 py-2 border border-border rounded-lg hover:bg-accent">
  Outline Button
</button>

// Ghost button
<button className="px-4 py-2 hover:bg-accent rounded-lg">
  Ghost Button
</button>
```

### Card

```tsx
<div className="rounded-2xl bg-card border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-muted-foreground">Card content goes here</p>
</div>
```

### Input

```tsx
<input
  type="text"
  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
  placeholder="Enter text..."
/>
```

### Badge

```tsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
  Badge
</span>
```

### Skeleton

```tsx
<div className="h-4 w-full rounded bg-muted/40 animate-pulse" />
```

### Spinner

```tsx
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
```

---

## ✨ Animations

### Transitions

```css
/* Default transition */
transition-all duration-200 ease-in-out

/* Specific properties */
transition-colors duration-200
transition-transform duration-300
transition-opacity duration-150
```

### Hover Effects

```tsx
// Scale on hover
<div className="hover:scale-105 transition-transform">

// Opacity on hover
<div className="hover:opacity-80 transition-opacity">

// Background on hover
<div className="hover:bg-accent transition-colors">

// Shadow on hover
<div className="hover:shadow-lg transition-shadow">
```

### Animations

```css
/* Pulse */
animate-pulse

/* Spin */
animate-spin

/* Bounce */
animate-bounce

/* Fade in */
animate-in fade-in duration-500

/* Slide in */
animate-in slide-in-from-bottom duration-300
```

### Custom Animations

```tsx
// Magnet card effect
<div className="magnet-card">
  {/* Transforms on hover with custom cubic-bezier */}
</div>

// Staggered reveal
<div className="stagger-reveal">
  {/* Children animate in sequence */}
</div>
```

---

## ♿ Accessibility

### Focus States

```tsx
// Visible focus ring
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Accessible Button
</button>

// Focus within
<div className="focus-within:ring-2 focus-within:ring-ring">
  <input />
</div>
```

### ARIA Labels

```tsx
// Navigation
<nav aria-label="Main navigation">
  <a href="/project" aria-label="Navigate to Project">Project</a>
</nav>

// Sections
<section aria-labelledby="work-heading">
  <h2 id="work-heading">Work Experience</h2>
</section>

// Buttons
<button aria-label="Toggle theme">
  <Icon />
</button>
```

### Screen Reader Only

```tsx
<span className="sr-only">
  Screen reader only text
</span>
```

### Skip Links

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
>
  Skip to main content
</a>
```

---

## 📱 Responsive Design

### Breakpoints

```css
sm:   640px   /* Small devices */
md:   768px   /* Medium devices */
lg:   1024px  /* Large devices */
xl:   1280px  /* Extra large devices */
2xl:  1536px  /* 2X large devices */
```

### Usage

```tsx
// Responsive padding
<div className="px-4 sm:px-6 md:px-8 lg:px-16">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Responsive text
<h1 className="text-3xl sm:text-4xl lg:text-5xl">

// Responsive visibility
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>
```

---

## 🎯 Component Library

### Project Card

```tsx
<div className="group relative rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg transition-all">
  <Image
    src="/project.jpg"
    alt="Project"
    className="w-full h-48 object-cover"
  />
  <div className="p-6">
    <h3 className="text-xl font-semibold mb-2">Project Title</h3>
    <p className="text-muted-foreground mb-4">Project description</p>
    <div className="flex flex-wrap gap-2">
      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
        TypeScript
      </span>
    </div>
  </div>
</div>
```

### Navigation

```tsx
<nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
  <div className="max-w-6xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      <a href="/" className="text-xl font-bold">Logo</a>
      <div className="flex items-center gap-6">
        <a href="/project" className="hover:text-primary transition-colors">
          Project
        </a>
      </div>
    </div>
  </div>
</nav>
```

---

## 🎨 Best Practices

### 1. Use Semantic Colors

```tsx
// ✅ Good: Semantic color names
<button className="bg-primary text-primary-foreground">

// ❌ Bad: Hardcoded colors
<button className="bg-blue-500 text-white">
```

### 2. Consistent Spacing

```tsx
// ✅ Good: Use spacing scale
<div className="p-6 space-y-4">

// ❌ Bad: Arbitrary values
<div className="p-[23px] space-y-[17px]">
```

### 3. Responsive First

```tsx
// ✅ Good: Mobile-first approach
<div className="text-base md:text-lg lg:text-xl">

// ❌ Bad: Desktop-first
<div className="text-xl lg:text-lg md:text-base">
```

### 4. Accessible Components

```tsx
// ✅ Good: Proper ARIA and focus states
<button
  aria-label="Close dialog"
  className="focus-visible:ring-2 focus-visible:ring-ring"
>

// ❌ Bad: No accessibility
<div onClick={handleClick}>
```

---

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Maintained by:** trahoangdev  
**Questions?** Open an issue or contact via portfolio

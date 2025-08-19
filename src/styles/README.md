# CreamDash Frontend Styling System

## Overview
This document describes the comprehensive CSS custom properties (variables) system implemented in the CreamDash frontend application.

## Variables Structure

### 📁 File Organization
- `src/styles/_variables.scss` - Main variables file containing all CSS custom properties
- `src/App.scss` - Global styles and utility classes
- Component SCSS files import variables for consistency

### 🎨 Variable Categories

#### **1. Brand Colors**
```css
--lusious-pink: #e11874;           /* Primary brand color */
--lusious-pink-hover: #b8135c;     /* Hover state */
--lusious-pink-light: rgba(225, 24, 116, 0.1);  /* Light variant */
--lusious-pink-focus: rgba(225, 24, 116, 0.25); /* Focus ring */
--lusious-pink-shadow: rgba(225, 24, 116, 0.3); /* Shadow effects */
--secondary-accent: #4ecdc4;       /* Secondary accent color */
```

#### **2. Semantic Colors**
```css
--primary: var(--lusious-pink);
--danger: #dc3545;
--warning: #ffc107;
--success: #198754;
--info: #0dcaf0;
```

#### **3. Typography**
```css
--font-family-primary: -apple-system, BlinkMacSystemFont, ...;
--font-size-xs: 0.7rem;     /* 11.2px */
--font-size-sm: 0.8rem;     /* 12.8px */
--font-size-base: 0.9rem;   /* 14.4px */
--font-size-md: 1rem;       /* 16px */
--font-size-lg: 1.1rem;     /* 17.6px */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

#### **4. Spacing System**
```css
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 0.75rem;    /* 12px */
--spacing-lg: 1rem;       /* 16px */
--spacing-xl: 1.5rem;     /* 24px */
--spacing-2xl: 2rem;      /* 32px */
--spacing-3xl: 3rem;      /* 48px */
--spacing-4xl: 4rem;      /* 64px */
```

#### **5. Shadows & Effects**
```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
--card-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
--card-shadow-hover: 0 8px 25px rgba(0, 0, 0, 0.12);
```

#### **6. Border Radius**
```css
--radius-xs: 0.25rem;     /* 4px */
--radius-sm: 0.375rem;    /* 6px */
--radius-md: 0.5rem;      /* 8px */
--radius-lg: 0.75rem;     /* 12px */
--radius-xl: 1rem;        /* 16px */
--radius-2xl: 1.5rem;     /* 24px */
--radius-full: 50%;       /* Circular */
```

#### **7. Transitions & Animations**
```css
--transition-fast: 0.15s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;
--transition-bounce: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## Usage Examples

### Basic Usage
```scss
// Import variables in your component SCSS file
@import '../../styles/variables';

.my-component {
  color: var(--text-primary);
  background: var(--bg-white);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--card-shadow);
  transition: var(--transition-normal);
  
  &:hover {
    box-shadow: var(--card-shadow-hover);
  }
}
```

### Utility Classes (Available in App.scss)
```html
<!-- Transition utilities -->
<div class="transition-fast">Fast transition</div>
<div class="transition-normal">Normal transition</div>
<div class="transition-slow">Slow transition</div>

<!-- Shadow utilities -->
<div class="shadow-custom">Custom shadow with hover effect</div>

<!-- Border radius -->
<div class="radius-custom">Custom border radius</div>

<!-- Gradients -->
<div class="gradient-primary">Primary gradient background</div>
<div class="gradient-gold">Gold gradient background</div>
```

### Component-Specific Variables
```css
/* Cart-specific variables */
--cart-item-image-size: 80px;
--cart-quantity-control-width: 120px;
--cart-remove-btn-size: 40px;

/* Button-specific variables */
--btn-padding-sm: 0.5rem 1rem;
--btn-padding-md: 0.75rem 1.5rem;
--btn-padding-lg: 1rem 2rem;
```

## Best Practices

### ✅ Do's
- Use CSS custom properties instead of SCSS variables for runtime flexibility
- Import the variables file at the top of component SCSS files
- Use semantic variable names (e.g., `--primary` instead of `--lusious-pink`)
- Utilize spacing system variables for consistent layouts
- Apply transition variables for consistent animations

### ❌ Don'ts
- Don't hard-code color values - use variables
- Don't create component-specific SCSS variables when CSS custom properties exist
- Don't duplicate spacing values - use the spacing system
- Don't forget to import variables in new component files

## Dark Mode Support
The variables file includes automatic dark mode support:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --body-color: var(--dark-bg-primary);
    --text-primary: var(--dark-text-primary);
    --bg-white: var(--dark-bg-secondary);
    /* ... more dark mode overrides */
  }
}
```

## Accessibility
- Includes reduced motion support
- Focus ring variables for consistent focus indicators
- High contrast color relationships
- Semantic color naming for better understanding

## Migration Notes
Components that have been migrated to use the new variable system:
- ✅ `App.scss` - Global styles and utilities
- ✅ `CartItem.scss` - Cart item component
- ✅ `Header.scss` - Already using CSS custom properties
- 🚧 `Cart.scss` - Partially migrated
- ⏳ Other components - To be migrated as needed

## Performance Benefits
- CSS custom properties allow runtime changes without recompilation
- Better browser caching of styles
- Smaller CSS bundle size through variable reuse
- Easier theming and customization

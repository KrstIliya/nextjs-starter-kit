---
name: brand-guidelines
description: Applies the project's official brand styling, colors, typography, and UX rules. Use this skill when making UI improvements, creating new components, or updating pages to ensure they meet the specific accessibility and aesthetic constraints for the platform.
---

# Brand Guidelines & UI Constraints

## Overview

This skill provides the core design system constraints, color tokens, and strict UX rules for the project. The platform is designed to improve cognitive and mental abilities for people with Down Syndrome (Mental age 5–18).

**Primary UX Objective**: Extreme clarity, predictability, and simplicity.
**Theme**: Dark + Space oriented, but subtle and calm.

## Core UX Rules (Non-Negotiable)

When building or modifying UI components, you MUST adhere to the following accessibility and UX rules:

- **Large tap targets**: Minimum 48px height for all interactive elements.
- **High contrast**: WCAG AA minimum contrast ratio.
- **One primary CTA** per section to minimize decision fatigue.
- **Avoid clutter** and keep visual hierarchy clear.
- **Keep it calm**: Avoid complex animations, avoid parallax, avoid busy background noise or star fields.
- **Language**: Simple 5th-grade reading level language.
- **Icons**: Always paired with text labels.
- **Conflict Resolution**: If aesthetics conflict with usability, ALWAYS prioritize usability.

## Design System

### Colors (OKLCH)

The application uses an always-dark space theme powered by specific OKLCH variables. Use the semantic Tailwind classes (`bg-background`, `text-primary`, etc.) rather than hardcoding hex codes.

**Backgrounds & Surfaces:**
- `background`: `oklch(0.14 0.02 260)` - Deep space blue/black.
- `card` / `popover`: `oklch(0.18 0.02 260)`
- `secondary`: `oklch(0.22 0.02 260)`
- **Space Gradient Utility**: Use `.space-gradient-bg` for subtle radial gradients instead of busy star fields.

**Text & Foreground:**
- `foreground`: `oklch(0.95 0.01 250)` - Soft off-white for primary text.
- `muted-foreground`: `oklch(0.65 0.02 250)` - Subdued text.

**Interactive Accents:**
- `primary`: `oklch(68.109% 0.16545 54.405)` - Main calls to action.
- `accent`: `oklch(73.687% 0.11467 62.702)` 
- `destructive`: `oklch(0.6 0.2 25)` - Warning / delete actions.

### Typography

- **Font Family**: Primary font is **Inter** (`font-sans`).
- **Headings** (`h1` - `h6`): Should be `font-semibold` and `tracking-tight`.

### Spacing & Layout

- Use the consistent Tailwind spacing scale. Do not use arbitrary values (e.g., avoid `h-[50px]`, use `h-12` or similar nearest standard token to ensure >= 48px tap targets).
- **Border Radius**: Base radius is `12px` (`rounded-lg` in custom Tailwind config).

## Component Strategy

When creating or modifying pages:

1. **Keep components small and composable**.
2. **Avoid deeply nested JSX**.
3. **Use established reusable components** where appropriate (e.g., `PageContainer`, `SectionContainer`, `PlanetHeader`, `CTAButton`, `Card`, `TestimonialCard`).

## Final Checklist

Before finalizing any UI changes, verify:
- [ ] Are tap targets at least 48px?
- [ ] Is contrast accessible?
- [ ] Is the UI calm (no dizzying animations)?
- [ ] Is navigation predictable and cognitive load minimal?

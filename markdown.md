# Ablio - Project Guidelines & AI Agent Instructions

You are acting as a **Senior Frontend Engineer** and **Senior Product Designer**.
You are working INSIDE an existing **Next.js 15.3.8** (React 19) application using **Tailwind CSS v4**.

## Core Tech Stack
- **Framework:** Next.js 15 (App Router, Turbopack)
- **UI/Styling:** React 19, Tailwind CSS v4, Radix UI Primitives, Framer Motion
- **Database & ORM:** PostgreSQL (Neon), Drizzle ORM
- **Auth & Payments:** Better Auth, Polar SDK
- **Language:** TypeScript

-----------------------------------------
## ⚠️ CRITICAL RULES (NON-NEGOTIABLE)
-----------------------------------------

1. **DO NOT modify:**
   - Routing structure (App Router architecture)
   - Subscription and webhook logic (`@polar-sh/better-auth` integration)
   - Core backend/database schema without explicit instruction
   - Existing pricing table logic

2. **Always prioritize predictability and simplicity:**
   - Target Users: Mental age 5–18 (Down Syndrome).
   - If aesthetics conflict with usability, **usability always wins**.

3. **Modularity & Dependencies:**
   - Only improve UI/UX using the existing stack.
   - **Do not** introduce new dependencies.
   - Keep all improvements modular and reusable.
   - Do not refactor unrelated files.
   - If unsure about underlying logic, preserve it.

-----------------------------------------
## DESIGN SYSTEM CONSTRAINTS (The Gentle Nebula)
-----------------------------------------

The aesthetic is "Dark + Space oriented, but subtle and calm." We reject the clinical, boxed-in feel of traditional accessible interfaces for a digital sanctuary feeling.

### The "No-Line" Rule
- **Strict Mandate:** DO NOT use 1px solid borders to section content.
- Boundaries are defined by:
  - **Background Shifts:** e.g., placing `surface-container-low` against the `surface` base.
  - **Tonal Transitions & Spacing:** Use the spacing scale to create "islands" of info.
- Soft Dividers: Never use a line. Use `spacing-10` (3.5rem) of empty space or surface tone changes.

### Surface Hierarchy & Layering
Treat UI as a series of physical layers (Higher is Closer):
1. **Base Layer:** `surface` (#111224)
2. **Sectioning:** `surface-container-low` (#191a2d)
3. **Interactive/Cards:** `surface-container-high` (#27283c)

### Depth & Elevation
- No harsh Material Drop Shadows.
- Use **Tonal Stacking**: Depth is achieved by placing `surface-container-lowest` inside `surface-container-highest` wrappers.
- **Ambient Shadows:** Reserved for floating actions (32px blur, 0% spread, `on-surface` at 6% opacity).

### Typography
- **Headlines (Plus Jakarta Sans):** For welcoming titles. Use `display-md`.
- **Body (Lexend):** Base size `title-md` (min 18px). Designed to reduce cognitive noise.
- Exaggerate scale shifts (e.g., `headline-lg` paired with `title-sm`) to show explicit hierarchy.
- **NEVER** use all-caps text.

### Component Styling
- **Containers/Cards:** `rounded-lg` (2rem) for large containers. No borders. Internal padding min `spacing-6` (2rem). On hover: background shifts to `surface-bright`.
- **Primary Buttons:** Gradient `primary` to `primary-container`. Min height 48px (56px preferred), `rounded-md` (1.5rem). Always pair with a 24px icon.
- **Focus Chips:** Large, pill-shaped (`rounded-full`) targets replacing checkboxes.
- **Progress Indicators:** Thick 8px bars with `rounded-full` caps.
- **Textures:** Use the "Pulse" Gradient for primary actions. Use "Atmospheric Glass" (60% opacity with 20px blur) for overlays/nav bars.

-----------------------------------------
## CORE UX RULES (Targeting Down Syndrome)
-----------------------------------------

- **Large tap targets:** Minimum 48px height for all interactive elements.
- **High contrast:** WCAG AA minimum against its specific container tier. Avoid pure black or high-contrast white.
- **One primary CTA per section.**
- **Visual Clarity:**
  - Avoid clutter (minimum gap `spacing-4` / 1.4rem).
  - Icons always paired with labels.
  - Use simple, 5th-grade reading level language.
- **Motion & Noise:**
  - Avoid complex animations, parallax, or spring-loaded physics. Stick to simple 200ms "Fade-In".
  - Avoid busy background noise textures or "pure" starfields; use soft gradients.

-----------------------------------------
## COMPONENT & EXECUTION STRATEGY
-----------------------------------------

Before editing pages:
1. Use/create reusable components where appropriate (e.g., `PageContainer`, `SectionContainer`, `CTAButton`, `Card`, `FocusChip`).
2. Keep components small, modular, and composable.
3. Avoid deeply nested JSX (max two levels of nested containers).

**Execution Steps:**
1. Briefly explain the UX improvements being made and why they improve clarity for Down Syndrome users.
2. Build/modify reusable components.
3. Apply changes to specific pages.
4. Confirm routing, subscription, and pricing logics remain untouched.

-----------------------------------------
## PROJECT STRUCTURE & PAGES
-----------------------------------------

**Public/Landing Pages:**
- Landing Page (Header, Hero, About, Offerings, Pricing, Testimonials, Footer)
- Pricing (`/pricing`)
- Auth Flows (`/sign-in`, `/sign-up`, `/success`)
- Legal (`/terms-of-service`, `/privacy-policy`)

**Protected Dashboard (`/dashboard`):**
- Main Dashboard / Earth (default access)
- Journeys (Mars/Moon - subscription locked logic)
- User Settings (`/dashboard/profile` - consolidated billing and profile management)

-----------------------------------------
## PERFORMANCE & CODE QUALITY RULES
-----------------------------------------

- Prevent unnecessary re-renders.
- Next.js 15 optimization: Leverage App Router server components where possible, use `"use client"` only when needed for interactivity.
- Keep accessibility (`aria-` attributes, semantic HTML) properly implemented.
- Use built-in Tailwind v4 modern features; avoid heavy custom CSS overrides when utilities exist.

-----------------------------------------
## FINAL CHECKLIST FOR AI EXECUTIONS
-----------------------------------------

- Are tap targets large enough (min 48px)?
- Is spacing consistent across the UI?
- Is WCAG AA contrast maintained?
- Is the UI calm and predictable?
- Are borders avoided according to the "No-Line" rule?
- Is cognitive load minimized?

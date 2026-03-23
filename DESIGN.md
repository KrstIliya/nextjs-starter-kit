# Design System Documentation: Creative Direction & Implementation

## 1. Overview & Creative North Star: "The Gentle Nebula"
This design system rejects the clinical, "boxed-in" feel of traditional accessible interfaces. Instead, it adopts the **Gentle Nebula**—a creative north star centered on depth, softness, and atmospheric immersion. We are building a digital sanctuary that feels like a warm embrace rather than a computer program.

To move beyond the "template" look, we utilize **Intentional Asymmetry** and **Tonal Layering**. By abandoning rigid 1px borders and harsh grids, we create a fluid environment where content floats in a logical, gravity-defying space. This reduces cognitive load for our users while maintaining a high-end, editorial aesthetic that respects their maturity.

---

## 2. Colors & Surface Architecture
The palette is rooted in deep, cosmic indigos to provide a stable, low-stimulation base, punctuated by high-vibrancy "Light-Givers" (Yellow and Cyan) for navigational clarity.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to section content.
Boundaries must be defined solely through:
- **Background Shifts:** Placing a `surface-container-low` (#191a2d) element against the `surface` (#111224) base.
- **Tonal Transitions:** Using the Spacing Scale (e.g., `spacing-8` or `spacing-10`) to create "islands" of information.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. We use a "Higher is Closer" logic:
1. **Base Layer:** `surface` (#111224).
2. **Sectioning:** `surface-container-low` (#191a2d) for large content areas.
3. **Interactive Elements:** `surface-container-high` (#27283c) for cards or focused tasks.

### Signature Textures: Glass & Gradients
To provide "soul," we avoid flat color blocks.
- **The "Pulse" Gradient:** For primary actions, transition from `primary` (#dbc90a) to `primary-container` (#7e7300). This subtle shift guides the eye without the "vibration" of a single flat neon.
- **Atmospheric Glass:** For overlays or navigation bars, use `surface-bright` (#37374c) at 60% opacity with a `20px` backdrop blur. This allows the "nebula" colors to bleed through, making the interface feel integrated.

---

## 3. Typography: The Editorial Anchor
The system uses a pairing of **Plus Jakarta Sans** (Headlines) and **Lexend** (Body). Lexend was specifically designed to reduce cognitive noise and improve reading speed.

- **Display & Headline (Plus Jakarta Sans):** These are our "anchors." Use `display-md` (2.75rem) for welcoming titles. The tight letter spacing and bold weights provide an authoritative yet friendly voice.
- **Body & Title (Lexend):** All functional text must use Lexend. The base size for general reading is `title-md` (1.125rem/18px+).
- **The Hierarchy Rule:** We use exaggerated scale shifts. A `headline-lg` paired with a `title-sm` creates a clear "What's most important?" signal, crucial for users with Down Syndrome to navigate without confusion.

---

## 4. Elevation & Depth
We eschew traditional Material Design shadows in favor of **Tonal Stacking**.

- **The Layering Principle:** Depth is achieved by placing `surface-container-lowest` (#0b0c1f) elements inside `surface-container-highest` (#323347) wrappers. This "inward" depth creates a sense of security and containment.
- **Ambient Shadows:** Shadows are reserved for "floating" action components only. Use a `32px` blur, `0%` spread, and the `on-surface` (#e1e0fb) color at **6% opacity**. This mimics a soft, moonlit glow rather than a heavy drop shadow.
- **The Ghost Border:** If accessibility testing requires a boundary, use the `outline-variant` (#454651) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Primary Buttons (The "Beacon")
- **Style:** Use the `primary` (#dbc90a) to `primary-container` gradient.
- **Geometry:** Height: `min 48px` (ideally 56px). Radius: `rounded-md` (1.5rem).
- **Rule:** Every button must contain a `24px` icon on the leading edge to provide a non-textual cue for the action.

### Content Cards
- **Style:** No borders. Use `surface-container-high` (#27283c).
- **Spacing:** Internal padding must be `spacing-6` (2rem) to prevent content from feeling "squeezed."
- **Interaction:** On hover/touch, the background shifts to `surface-bright` (#37374c). No movement or lifting.

### Focus Chips
- **Style:** Large, pill-shaped (`rounded-full`) targets using `secondary-container` (#00bacd).
- **Context:** Use for selecting moods or activities. These replace checkboxes to provide a larger, more tactile "hit" area.

### Progress Indicators (The "Journey")
- **Style:** Avoid thin lines. Use a thick `8px` bar with `rounded-full` caps.
- **Colors:** Background `surface-container-highest`; Fill `tertiary` (#f8acff).

### Soft Dividers
- **Strict Rule:** Never use a line. Use `spacing-10` (3.5rem) of empty space or a subtle change in surface tone to separate logical groups of information.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use `rounded-lg` (2rem) for all large containers to evoke a "soft" and "safe" feeling.
- **Do** ensure all text maintains WCAG AA contrast against its specific `surface-container` tier.
- **Do** use `spacing-4` (1.4rem) as your "minimum" gap; anything smaller is considered cluttered.
- **Do** pair every critical instruction with a friendly, simplified icon.

### Don’t:
- **Don’t** use "pure" black (#000000) or high-contrast white. Use our `background` and `on-surface` tokens to prevent eye strain.
- **Don’t** use parallax or spring-loaded animations; they can be disorienting. Stick to simple 200ms "Fade-In" transitions.
- **Don’t** nest more than two levels of containers. If it needs three layers, it belongs on a new screen.
- **Don’t** use all-caps text. It is significantly harder for users with lower mental ages to decode.
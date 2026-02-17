You are acting as a Senior Frontend Engineer and Senior Product Designer.

You are working INSIDE an existing NextJS v16.1.6 application.

-----------------------------------------
⚠️ CRITICAL RULES
-----------------------------------------

1. DO NOT modify:
   - Routing structure
   - Subscription logic
   - Backend logic
   - Existing pricing table logic

2. Only improve UI/UX.
3. Do not introduce new dependencies.
4. Keep all improvements modular and reusable.
5. Do not refactor unrelated files.
6. If unsure about logic, preserve it.

-----------------------------------------
PROJECT PURPOSE
-----------------------------------------

The platform improves cognitive and mental abilities of people with Down Syndrome through interactive games.

Primary UX Objective:
Extreme clarity, predictability, and simplicity.

Target Users:
Mental age 5–18.

-----------------------------------------
CORE UX RULES (NON-NEGOTIABLE)
-----------------------------------------

- Large tap targets (min 48px height)
- High contrast (WCAG AA minimum)
- One primary CTA per section
- Avoid clutter
- Avoid complex animations
- Avoid parallax
- Avoid background noise textures
- Simple 5th-grade reading level language
- Icons always paired with labels
- Clear visual hierarchy
- Minimal decision fatigue

If aesthetics conflict with usability → prioritize usability.

-----------------------------------------
DESIGN SYSTEM CONSTRAINTS
-----------------------------------------

Theme:
Dark + Space oriented, but subtle and calm.

Background:
Use soft gradients instead of busy star fields.

Color System:
- Define primary
- Define secondary
- Define muted
- Define destructive
- Use consistent tokens

Spacing:
- Use consistent Tailwind spacing scale
- Avoid arbitrary values

Buttons:
- Primary
- Secondary
- Ghost
- Disabled
All consistent across project.

-----------------------------------------
COMPONENT STRATEGY
-----------------------------------------

Before editing pages:

1. Create reusable components where appropriate:
   - PageContainer
   - SectionContainer
   - PlanetHeader
   - CTAButton
   - Card
   - TestimonialCard

2. Keep components small and composable.
3. Avoid deeply nested JSX.

-----------------------------------------
EXECUTION PROCESS
-----------------------------------------

Step 1:
Briefly explain:
- UX improvements being made
- Why they improve clarity for Down Syndrome users

Step 2:
Show reusable components.

Step 3:
Show page implementations.

Step 4:
Confirm that:
- Routing unchanged
- Subscription logic untouched
- Pricing logic preserved

-----------------------------------------
PAGES TO IMPLEMENT
-----------------------------------------

Landing Page:
- Header
- Hero
- About
- What We Offer
- Pricing
- Testimonials
- Footer

Dashboard:
Earth (default)
Mars (subscription locked)
Moon (subscription locked)

Additional Pages:
- Pricing
- Sign in
- Sign up
- Profile / Settings
- Terms

-----------------------------------------
PERFORMANCE RULES
-----------------------------------------

- No unnecessary re-renders
- No heavy background images
- Keep accessibility attributes included
- Use semantic HTML

-----------------------------------------
FINAL CHECKLIST
-----------------------------------------

Before finishing:
- Are buttons consistent?
- Is spacing consistent?
- Is contrast accessible?
- Is the UI calm?
- Is navigation predictable?
- Is cognitive load minimal?

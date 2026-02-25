# Project Guidelines — Ablio (nextjs-starter-kit)

## Overview

Ablio is an accessibility-focused educational gaming platform built for people with Down Syndrome. It uses a **dark space theme** with a subscription-gated dashboard.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | **Next.js 15** (App Router) | Turbopack for dev (`next dev --turbopack`) |
| Runtime | **Bun** | Use `bun run dev`, `bun install`, etc. |
| Language | **TypeScript** | `ignoreBuildErrors: true` in `next.config.ts` |
| Styling | **Tailwind CSS v4** | OKLCH color tokens; always-dark theme |
| UI Library | **shadcn/ui** + **Radix UI** | Components in `components/ui/` |
| Auth | **Better Auth** | Google OAuth via `better-auth` + `better-auth/next-js` |
| Payments | **Polar** (sandbox) | `@polar-sh/better-auth` plugin + `@polar-sh/sdk` |
| Database | **Neon PostgreSQL** | Serverless driver via `drizzle-orm/neon-http` |
| ORM | **Drizzle ORM** | Schema in `db/schema.ts`, migrations in `db/migrations/` |
| Animations | **Framer Motion** | Keep animations subtle and calm |


---

## Project Structure

```
├── app/
│   ├── api/
│   ├── dashboard/                  ← Protected (requires subscription)
│   │   ├── layout.tsx              ← Subscription gate (redirects to /pricing)
│   │   ├── mars/                   ← Full Access tier only
│   │   ├── moon/                   ← Full Access tier only
│   │   ├── user-profile/
│   │   └── payment/
│   ├── sign-in/
│   ├── sign-up/
│   └── layout.tsx                  ← Root layout (ThemeProvider, dark-only)
├── components/
│   ├── homepage/                   ← Landing page sections
│   └── ui/                         ← shadcn/ui primitives
├── db/
│   ├── drizzle.ts                  ← Neon DB connection
│   ├── schema.ts                   ← All tables (user, session, account, verification, subscription)
│   └── migrations/
├── lib/
│   └── utils.ts                    ← cn() helper
├── middleware.ts                   ← Auth-based route protection
└── .agents/skills/                 ← AI agent skills (brand, user-management, etc.)
```

---

## Auth & Access Control

### Architecture

- **Server**: `lib/auth.ts` — `betterAuth()` instance with Polar plugin (`checkout`, `webhooks`, `portal`, `usage`)
- **Client**: `lib/auth-client.ts` — `createAuthClient()` with `polarClient()` plugin
- **Middleware**: `middleware.ts` checks for session cookie on `/dashboard/*` routes

### Webhook Endpoint

The Polar webhook endpoint registered by `@polar-sh/better-auth` is:
```
/api/auth/polar/webhooks
```
This is auto-registered — there is **no** separate webhook route file. Configure this URL in the Polar dashboard.

### User Flows

See `.agents/skills/user-management/SKILL.md` for the canonical flows and access matrix.

**Key rules:**
- New users → after sign-up → redirected to `/pricing`
- Users without an active subscription **CANNOT** access `/dashboard/*`
- Subscription gate is in `app/dashboard/layout.tsx`
- Free Access subscribers cannot access `/dashboard/moon` or `/dashboard/mars`

---

## Database

### Connection

```typescript
// db/drizzle.ts
import { drizzle } from 'drizzle-orm/neon-http';
export const db = drizzle(process.env.DATABASE_URL!);
```

### Schema Changes

1. Edit `db/schema.ts`
2. Generate migration: `bunx drizzle-kit generate`
3. Apply migration: `bunx drizzle-kit migrate`

### Tables

| Table | Purpose |
|-------|---------|
| `user` | Better Auth users (id, name, email, image) |
| `session` | Active sessions |
| `account` | OAuth provider accounts (Google) |
| `verification` | Email verification codes |
| `subscription` | Polar subscription data (written by webhook handler) |

---


### Environment Variables

| Variable | Purpose |
|----------|---------|
| `POLAR_ACCESS_TOKEN` | Server-side API key |
| `POLAR_WEBHOOK_SECRET` | Webhook signature verification |
| `POLAR_SUCCESS_URL` | Redirect after checkout (e.g. `/success?checkout_id={CHECKOUT_ID}`) |
| `NEXT_PUBLIC_STARTER_TIER` | Product ID for the paid "Full Access" tier |
| `NEXT_PUBLIC_STARTER_SLUG` | Slug for checkout routing |
| `NEXT_PUBLIC_FREE_TIER` | Product ID for the free tier |
| `NEXT_PUBLIC_FREE_SLUG` | Slug for free tier checkout |

---

## Development Workflow

### Local Development

```bash
bun install
bun run dev        # starts Next.js with Turbopack
```

### Local Webhook Testing

For Polar webhooks to reach localhost, use an **ngrok tunnel** and update:
1. `NEXT_PUBLIC_APP_URL` in `.env` → your ngrok URL
2. Polar dashboard → Settings → Webhooks → endpoint URL → `{ngrok-url}/api/auth/polar/webhooks`

### Key Commands

| Command | Purpose |
|---------|---------|
| `bun run dev` | Start dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run lint` | ESLint check |
| `bunx drizzle-kit generate` | Generate DB migration |
| `bunx drizzle-kit migrate` | Apply migrations |
| `bunx drizzle-kit studio` | Open Drizzle Studio (DB GUI) |

---

## Coding Conventions

### General

- Use `@/` path aliases (maps to project root)
- Prefer **server components** by default; use `"use client"` only when required
- Use Drizzle ORM for all database operations — no raw SQL

### Components

- Place shared UI primitives in `components/ui/`
- Place domain components in `components/{domain}/` (e.g. `homepage/`)

### Styling

- Use semantic Tailwind classes (`bg-background`, `text-primary`, etc.)
- Never hardcode hex/rgb colors — always use OKLCH CSS variables
- **Theme is always dark** — `forcedTheme="dark"` is set in the root layout
- See `.agents/skills/brand-guidelines/SKILL.md` for colors, spacing, and UX rules

### Accessibility (Non-Negotiable)

- **Minimum 48px tap targets** on all interactive elements
- **WCAG AA contrast** on all text
- **One primary CTA** per section
- **Simple language** (5th-grade reading level)
- **Icons always paired with text labels**
- **No busy animations** — keep everything calm and predictable

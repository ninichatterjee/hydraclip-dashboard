# HydraClip dashboard

The organisation side of HydraClip, a wearable hydration sensor for nurses, designed to be PPE-safe and hygienic. Where
the [mobile app](https://github.com/ninichatterjee/hydraclip-mobile-app) is for one nurse, this dashboard is for the
people running a nursing unit: hydration across the team on one screen.

**Status: paused.** This is a prototype on sample data. No sensor was ever connected, and most of the numbers on the
screen are fixed placeholders (listed below).

HydraClip won the Audience Choice Award at Pitch Battles and was one of 9 ventures picked from 42 for the Panther Pitch
final. Case study: [ditthichatterjee.com/work/hydraclip](https://ditthichatterjee.com/work/hydraclip)

## Team

A team of four. I was Chief Technology Officer.

- Hadiqa Sulman, CEO
- Mary Ejairu, COO and clinical advisor
- Yuan Cui, CPO
- Ditthi Chatterjee, CTO

## What it does

- Reads the last 12 hours of `hydration_logs` from Supabase, the same table the mobile app writes its simulated readings
  to, and refreshes every 60 seconds.
- Shows the average of those readings and plots them against a 75% target.
- Adds a three-hour projection to the chart by carrying forward the change between the last two readings. It is
  arithmetic, not a model.

## What is placeholder

Everything else on the screen is fixed text, written to show what the product would report:

- the cards for nurses monitored, hydration alerts and time to hydrate, and their trend arrows
- the risk indicator
- the "AI Forecast" panel, which is hard-coded sample text and not a forecast model
- the hospital name and the department

## Stack

TypeScript, Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui on Radix, Recharts, Supabase. The interface
started from a v0 template.

## Running it

You need Node and a Supabase project with a `hydration_logs` table (`id`, `created_at`, `hydration_level` from 0 to 1,
optional `user_id`). The original project is no longer online.

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Then:

```bash
npm ci
npm run dev
```

With an empty table the chart is empty and the average shows 0%.

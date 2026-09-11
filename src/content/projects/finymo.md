---
title: Finymo
tagline: Fintech for Colombia's informal lending economy — live on Android.
kind: Product
context: Personal product, built with a co-founder
year: 2026
role: Product engineering & architecture
glyph: mobile
featured: true
confidential: false
stack:
  - React Native
  - Expo
  - TypeScript
  - Supabase
  - PostgreSQL
  - Row Level Security
  - AsyncStorage
  - EAS Build
metrics:
  - value: '7'
    label: Loan calculation models
  - value: '30+'
    label: Financial scenarios verified
  - value: '4'
    label: Independent product modules
  - value: 'Android'
    label: Shipped and public
links:
  - label: Google Play
    href: https://play.google.com/store/apps/details?id=com.finymo.app
    kind: store
order: 1
---

## The problem

A large part of Colombia runs on credit that no bank ever touches. Independent
lenders — *prestamistas* — carry their whole business in a paper notebook:
who owes what, which interest rate was agreed, how much late fee has accrued,
who was already reminded this week. Alongside them, *natilleras* — informal
community savings pools that run for a year and then pay out — are administered
by whoever is best at spreadsheets.

Both groups do real financial arithmetic with no tooling, and both lose money to
it.

## What we built

Finymo is a mobile app with four modules a user can switch on independently:
**Cartera** for the loan book, **Natilleras** for community funds, **Mis
Finanzas** for personal income and expenses, and a **calculator** for quoting on
the spot. It computes interest and late fees automatically, warns when a loan
falls due or goes into arrears, and generates a signed-looking PDF or Excel
receipt that can be sent over WhatsApp, Telegram or email in one tap — because
WhatsApp is where collection actually happens.

## Engineering decisions worth defending

**Two separate loan engines, on purpose.** Cartera supports five models — fixed,
daily, French amortisation, German amortisation and open credit. Natilleras
support two. They look similar enough that sharing one engine is tempting, and
the domains diverge in ways that would have made that shared code a permanent
source of subtle bugs. They stay separate, with the differences documented
rather than abstracted away. The behaviour of both is pinned by roughly thirty
verified scenarios covering rounding, partial payments and arrears transitions.

**Local-first, sync as an upgrade.** The loan book lives in on-device storage
and works with no connection at all, which matters when your user is collecting
payments in a neighbourhood with bad signal. Cloud sync to Supabase is a paid
tier, not a requirement for the app to function.

**A rules engine instead of hardcoded policy.** Every natillera runs on
different house rules — fine amounts, interest charged up front or at term,
profits split proportionally or evenly, whether loans are mandatory. All of it
is admin-configurable data. No policy value is baked into the app.

**Multi-tenant security taken seriously.** Access is enforced in PostgreSQL
through Row Level Security rather than in application code. Getting there meant
writing `SECURITY DEFINER` helper functions to break recursive policy
evaluation, and closing real holes — invite codes that were readable by anyone,
chat policies that recursed on themselves.

## Rewriting it once we knew what it was

The first version shipped as a single 1,100-line screen with twenty-odd pieces
of local state and TypeScript checks disabled. It worked, and it was finished.
The second version is a documented, deliberate transplant: business logic
carried over intact while navigation moved to file-based routing, state moved
into layered context providers, and the database gained a hand-maintained typed
schema covering every column. Same product, roughly 227 source files instead of
81, and a codebase that a second engineer can actually join.

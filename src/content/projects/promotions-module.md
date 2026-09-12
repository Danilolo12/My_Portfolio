---
title: Promotions Module
tagline: A small POS domain, delivered the way production software should be.
kind: Engineering study
context: Technical assessment
year: 2026
role: Solo build, full stack
glyph: grid
cover: ./promotions-module.png
coverAlt: Promotions dashboard with discounts in the scheduled, active and finished states
featured: true
confidential: false
stack:
  - TypeScript
  - Node.js
  - Express
  - Zod
  - Prisma
  - PostgreSQL
  - React
  - Vite
  - Docker
  - GitHub Actions
metrics:
  - value: '4 stages'
    label: CI pipeline
  - value: 'One-way'
    label: Promotion state machine
links:
  - label: Source
    href: https://github.com/Danilolo12/Promotions-Module
    kind: repo
order: 9
---

## Summary

Product and category discounts for a point-of-sale system, with promotions
moving through a strictly one-way lifecycle: `Scheduled → Active → Finished`.
Modelling that as an explicit transition map rather than a status column with
free-form updates is the difference between a domain rule and a convention
somebody will eventually break.

The delivery is the actual point. Layered backend — routes, controllers,
services — with Zod validating at the edge, unit tests against a mocked Prisma
client, multi-stage Docker images, and a four-stage GitHub Actions pipeline that
lints, tests, builds, and then boots the whole stack against a real PostgreSQL
container for a smoke test. A green pipeline means the thing genuinely starts,
not just that it compiles.

---
title: Double-Entry Ledger Engine
tagline: Colombian accounting core where the money math is provably exact.
kind: Engineering study
context: Senior technical assessment
year: 2026
role: Solo build, full stack
glyph: ledger
featured: true
confidential: false
stack:
  - Python
  - FastAPI
  - SQLAlchemy
  - PostgreSQL
  - Alembic
  - Next.js
  - React
  - TypeScript
  - TanStack Query
  - Docker
metrics:
  - value: '107'
    label: Tests against real Postgres
  - value: 'NUMERIC(18,2)'
    label: Money, end to end
  - value: '65'
    label: PUC accounts seeded
  - value: 'DIAN 1001'
    label: Tax report generated
links:
  - label: Source
    href: https://github.com/Danilolo12/Prueba-Contable
    kind: repo
order: 5
---

## The problem

Accounting software has an unusual property: a bug is not a degraded
experience, it is a legal problem. Entries must balance, posted history must be
immutable, voucher numbers must be unique and gapless under concurrency, and
cents must never be approximated. Build it on floating point and you will be
wrong by amounts too small to notice and too large to explain.

## What I built

A double-entry engine implementing the Colombian PUC chart of accounts: journal
entries, general ledger, accounting periods, third parties, and the DIAN
*información exógena* format 1001 tax report. FastAPI and PostgreSQL underneath,
a Next.js App Router frontend on top, wired so an evaluator can post a balanced
entry end to end and watch it land in the ledger.

## Engineering decisions worth defending

**`Decimal` from the API boundary to the database column.** Money is
`NUMERIC(18,2)` in Postgres and `Decimal` in Python, and the JSON layer
*rejects* floats rather than silently coercing them. There is no point in the
stack where a value passes through a binary float.

**An ordered lock hierarchy for concurrent posting.** Two users posting entries
to the same period at the same moment is the ordinary case, not the edge case.
Rows are locked with `FOR UPDATE` and `FOR SHARE` in a consistent, documented
order — which both prevents duplicate voucher numbers and makes deadlock
impossible by construction rather than by retry.

**Immutability enforced by the database.** Posted entries cannot be modified,
and that rule lives in PostgreSQL triggers, not in a service method. Application
code can be bypassed by the next developer in a hurry, a migration script, or a
`psql` session. Triggers cannot.

**Ledger balances via window functions.** Running balances are computed in SQL
rather than accumulated in Python, so the ledger stays correct regardless of
pagination and does not require loading a period into memory to render one page
of it.

**Reproducible tax reports.** The generated 1001 XML is persisted, not
regenerated on demand. A report filed in March must still produce byte-identical
output in November, even after the chart of accounts has moved on.

## Outcome

107 integration and unit tests running against a real PostgreSQL instance in
CI — not mocks — plus six documented end-to-end scenarios. The concurrency and
money-precision tests are the ones I would point at first.

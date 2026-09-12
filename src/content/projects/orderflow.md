---
title: OrderFlow
tagline: Event-driven orders and inventory that stay correct when things break.
kind: Engineering study
context: Senior technical assessment
year: 2026
role: Solo build, full stack
glyph: queue
cover: ./orderflow.png
coverAlt: OrderFlow operations panel with orders resolved asynchronously, one rejected for insufficient stock
featured: true
confidential: false
stack:
  - Python
  - FastAPI
  - RabbitMQ
  - SQLAlchemy
  - PostgreSQL
  - React
  - TypeScript
  - Vite
  - Docker
  - pytest
metrics:
  - value: '<100ms'
    label: Typical eventual sync
  - value: 'Exactly once'
    label: Effective event processing
  - value: '8'
    label: Race & idempotency tests
links:
  - label: Source
    href: https://github.com/Danilolo12/q10-orderflow
    kind: repo
order: 6
---

## The problem

Splitting orders and inventory into separate services buys independence and
immediately sells you three new problems: the broker delivers the same message
twice, two workers reserve the last unit simultaneously, and the broker is down
exactly when an order arrives. A system that only works when the network behaves
is not a distributed system, it is a monolith with extra latency.

## What I built

An orders API that publishes `OrderCreated` to RabbitMQ, an inventory worker
that consumes it and reserves stock, and a React interface that polls order
status through its lifecycle. Everything runs from one Docker Compose file.

## Engineering decisions worth defending

**At-least-once delivery, exactly-once effect.** RabbitMQ will redeliver. Rather
than pretending otherwise, every consumed event is recorded in a
`processed_events` table with a unique constraint, and the duplicate path is a
caught `IntegrityError` — the database adjudicates, not application logic racing
against itself.

**Pessimistic locking where the contention actually is.** Stock rows are taken
with `SELECT … FOR UPDATE` before reservation. Optimistic concurrency would be
the wrong trade here: conflicts on a popular product are common, not rare, and
retry storms under load are worse than a short lock.

**An honest state for broker failure.** When RabbitMQ is unreachable, the order
is persisted and moved to an explicit `Failed - Broker Offline` state. It does
not silently succeed, and it does not lose the customer's order. The failure is
visible in the UI, which is the only version of this that an operator can act
on.

**Tests that target the hard parts.** Eight pytest cases exercise duplicate
delivery, concurrent reservation of the last unit, and broker-offline
behaviour — the three things that would take a real system down, and the three
things a happy-path test suite never touches.

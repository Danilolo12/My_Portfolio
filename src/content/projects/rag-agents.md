---
title: Enterprise RAG & Agent Platform
tagline: Retrieval and autonomous agents over messy company data, answering in under three seconds.
kind: Client work
context: Remoti · AI infrastructure
year: 2026
role: Senior engineer & architect
glyph: agent
featured: true
confidential: true
stack:
  - Python
  - FastAPI
  - LangGraph
  - LangChain
  - OpenAI
  - Gemini
  - Qdrant
  - pgvector
  - Pydantic
  - PostgreSQL
  - Docker
metrics:
  - value: '<3s'
    label: End-to-end query response
  - value: 'Hybrid'
    label: Retrieval strategy
  - value: 'Streaming'
    label: SSE & WebSocket delivery
links: []
order: 3
---

## The problem

Companies asking for "a chatbot over our documents" almost always have the same
underlying data: thousands of PDFs, internal documentation with no consistent
structure, and log exports. Naive retrieval over that corpus produces a demo
that impresses in a meeting and falls apart the moment someone asks a real
question.

## What I built

An enterprise RAG platform and a set of autonomous agents on top of it. The
retrieval side ingests unstructured documents and answers queries end to end in
under three seconds. The agent side, built on LangGraph, holds state across
steps and reaches outside the model — querying SQL databases and calling
external REST APIs — with Pydantic schemas enforcing the shape of everything
that crosses the boundary.

## Engineering decisions worth defending

**Chunking is the retrieval strategy.** Fixed-size splitting is the default that
quietly ruins accuracy: it cuts tables in half and separates a claim from its
qualifier. Dynamic chunking that respects document structure, combined with
hybrid search rather than pure vector similarity, was where most of the real
accuracy gain came from — not from swapping models.

**Structured output, not string parsing.** Every tool call an agent makes is
typed with Pydantic. The model proposes; the schema decides whether it is
valid. This turns an entire category of production failure — the model returning
almost-JSON — into a caught validation error instead of a corrupted database
write.

**Perceived latency is a separate problem from real latency.** Server-Sent
Events and WebSocket streaming cut time-to-first-token, so the interface starts
responding while the model is still working. A three-second answer that starts
appearing at 300ms reads as fast; the same answer delivered as one silent block
reads as broken.

**Cost is an engineering metric.** Token consumption, latency distribution and
per-request cost were tracked as first-class operational data, next to the
prompt-security and data-privacy constraints the deployment had to satisfy. LLM
features that nobody measures tend to get switched off when the invoice arrives.

---

*Client engagement. Source is not public; the description above stays at the
architectural level.*

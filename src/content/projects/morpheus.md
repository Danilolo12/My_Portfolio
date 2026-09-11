---
title: Morpheus
tagline: Counter-drone defense that reads the radio spectrum in real time.
kind: Client work
context: Space-Eyes · Defense & security
year: 2026
role: Lead full-stack engineer
glyph: radar
featured: true
confidential: true
stack:
  - Python
  - FastAPI
  - React
  - TypeScript
  - Desktop
  - RF signal processing
  - WebSockets
  - Docker
metrics:
  - value: 'Real time'
    label: RF detection loop
  - value: 'Desktop'
    label: Field-deployed operator app
links: []
order: 2
---

## The problem

Commercial drones are cheap, quiet and increasingly a problem over ports,
airfields and restricted sites. They are also loud in a place most people never
look: the radio spectrum. Every model has a recognisable RF signature in how it
talks to its controller.

## What I built

Morpheus is a desktop application that detects drones from those signatures and
lets an operator respond, including RF countermeasures. I led the full-stack
build: the Python and FastAPI services that ingest and classify RF signal data
and drive countermeasure execution, and the React and TypeScript interface the
operator actually uses.

## Engineering decisions worth defending

**The interface had to be trustworthy under stress.** This is not a dashboard
someone glances at over coffee — it gets used while something is in the air. The
UI streams live detection state over persistent connections rather than
polling, so what the operator sees is what the sensors currently report, with no
ambiguity about staleness. Latency here is a correctness property, not a
performance nicety.

**Signal work belongs in Python, presentation belongs in the browser.** Keeping
classification and countermeasure logic in FastAPI services, with the desktop
shell as a thin real-time client, meant the hard numerical code stayed testable
and independent of the UI. It also made the same backend reusable across the
other systems in the product line.

**Containerised from the start.** Field deployments do not get a friendly
environment. Docker made "it runs on the operator's machine" a build artifact
rather than a support conversation.

## Alongside it

Morpheus was one of four systems I worked on at Space-Eyes. **Mems** attacked
the same problem from a different sensor entirely — classifying UAVs from the
acoustic signature of their motors and rotors, which catches drones that fly
dark on RF.

---

*This was client work in the defense sector. Source and screenshots are not
public; the description above stays at the architectural level.*

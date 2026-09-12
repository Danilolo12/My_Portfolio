---
title: Jarvis Content Engine
tagline: Type a command in Discord, get a finished vertical video back.
kind: Product
context: Personal product
year: 2026
role: Solo build
glyph: pipeline
featured: true
confidential: false
stack:
  - Python
  - FastAPI
  - Discord.py
  - Gemini
  - ElevenLabs
  - faster-whisper
  - Remotion
  - React
  - TypeScript
  - FFmpeg
metrics:
  - value: '5'
    label: Stages, fully automated
  - value: 'Multi-brand'
    label: Config-driven brand registry
  - value: 'Local'
    label: Runs on one laptop
links: []
order: 4
---

## The problem

Short-form video is a production line: find a format that works, write to it,
record it, caption it, render it, post it. Doing that consistently across more
than one brand is a full-time job made of small, repetitive, individually boring
steps — which is the exact shape of a problem worth automating.

## What I built

A pipeline that turns a Discord command into a finished vertical MP4. It pulls a
reference video, analyses its *structure* — pacing, hook placement, segment
lengths, engagement metrics — then generates an original script from that
skeleton with Gemini, synthesises narration through ElevenLabs, force-aligns
word-level subtitles with faster-whisper, and renders the final video
programmatically in Remotion.

Adding a new brand means adding a folder: a config file and a system prompt. No
code changes.

## Engineering decisions worth defending

**Learn the pattern, not the content.** The reference analyser extracts numeric
structure and discards the source material — the scratch download is deleted
after metrics are pulled. What survives is "hook at 0–2s, three beats, payoff at
0:24", never someone else's words. That constraint is what separates a format
study from plagiarism, and it is enforced by the pipeline rather than by good
intentions.

**Video as React.** Rendering through Remotion means the output is a component
tree with real props — subtitle timing, brand palette, safe areas — instead of a
wall of FFmpeg filter arguments. Changing how captions animate is a diff in a
React file, and the same composition renders identically for every brand.

**A job queue, because these stages fail.** Each stage is slow and independently
capable of failing: a download stalls, a TTS call rate-limits, a render runs out
of memory. Work runs through an async queue with persisted state, so a failure
at the alignment step does not mean regenerating the script and paying for the
voice again.

**Discord is the whole interface.** Building a web dashboard for a tool with one
user would have been the actual waste of time. A bot command with progress
updates in a thread is the correct amount of product.

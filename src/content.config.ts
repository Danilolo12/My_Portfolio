import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

/** Small abstract SVG that stands in for a screenshot on confidential work. */
export const GLYPHS = [
  'radar',
  'satellite',
  'pipeline',
  'agent',
  'ledger',
  'queue',
  'mobile',
  'grid',
] as const

const metric = z.object({
  value: z.string(),
  label: z.string(),
})

const link = z.object({
  label: z.string(),
  href: z.url(),
  kind: z.enum(['repo', 'live', 'store', 'docs']),
})

const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.md' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    companyUrl: z.url().optional(),
    location: z.string(),
    arrangement: z.enum(['Remote', 'Hybrid', 'On-site']),
    start: z.date(),
    /** `null` renders as "Present". */
    end: z.date().nullable().default(null),
    summary: z.string(),
    highlights: z.array(z.string()).min(1),
    stack: z.array(z.string()).min(1),
  }),
})

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    /** Drives the badge on the card, so visitors know what they are looking at. */
    kind: z.enum(['Product', 'Client work', 'Engineering study']),
    context: z.string(),
    year: z.number().int(),
    role: z.string(),
    glyph: z.enum(GLYPHS),
    featured: z.boolean().default(false),
    /** Confidential work shows no source links and says so explicitly. */
    confidential: z.boolean().default(false),
    stack: z.array(z.string()).min(1),
    metrics: z.array(metric).max(4).default([]),
    links: z.array(link).default([]),
    /** Lower sorts first within its group. */
    order: z.number().int().default(99),
  }),
})

export const collections = { experience, projects }

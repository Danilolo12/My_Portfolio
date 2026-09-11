import type { APIRoute } from 'astro'
import sharp from 'sharp'

import { profile } from '@/data/site'

const xml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[char]!,
  )

/** Rasterised at build time, so the social card never drifts from site data. */
const card = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bloom" cx="0.5" cy="0" r="0.85">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.22"/>
      <stop offset="55%" stop-color="#22d3ee" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M72 0H0V72" fill="none" stroke="#ffffff" stroke-opacity="0.05"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#0d1014"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#bloom)"/>

  <g font-family="Geist, Inter, Helvetica, Arial, sans-serif">
    <circle cx="88" cy="86" r="6" fill="#4ade80"/>
    <text x="108" y="93" font-size="24" fill="#9aa4b2">${xml(profile.availability)}</text>

    <text x="84" y="290" font-size="104" font-weight="600" letter-spacing="-4" fill="#f5f7fa">
      ${xml(profile.name)}
    </text>
    <text x="84" y="356" font-size="38" fill="#c3cad4">${xml(profile.role)}</text>
    <text x="84" y="410" font-size="38" fill="#22d3ee">${xml(profile.focus)}</text>

    <rect x="84" y="486" width="1032" height="1" fill="#ffffff" fill-opacity="0.1"/>
    <text x="84" y="540" font-size="24" fill="#7c8695" letter-spacing="3">
      ${xml(profile.location.toUpperCase())}
    </text>
    <text x="1116" y="540" font-size="21" fill="#7c8695" letter-spacing="2.5" text-anchor="end">
      PYTHON · TYPESCRIPT · FASTAPI · REACT
    </text>
  </g>
</svg>`

export const GET: APIRoute = async () => {
  const png = await sharp(Buffer.from(card)).png().toBuffer()

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}

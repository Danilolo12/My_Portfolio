/**
 * WCAG relative luminance, used to pick text that stays readable once a chip
 * fills with its brand colour. Computed at build time so the palette can grow
 * without anyone hand-maintaining a second "is this light or dark" field.
 */
export function readableOn(hex: string): string {
  const channels = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255)
  const [r, g, b] = channels.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  ) as [number, number, number]

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance > 0.4 ? '#0d1014' : '#ffffff'
}

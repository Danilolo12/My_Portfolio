const MONTH_YEAR = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatMonth(date: Date): string {
  return MONTH_YEAR.format(date)
}

export function formatRange(start: Date, end: Date | null): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Present'}`
}

/** "1 yr 4 mos" — rounded to whole months, inclusive of the start month. */
export function formatDuration(start: Date, end: Date | null): string {
  const to = end ?? new Date()
  const months =
    (to.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    (to.getUTCMonth() - start.getUTCMonth()) +
    1

  const years = Math.floor(months / 12)
  const rest = months % 12

  const parts: string[] = []
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`)
  return parts.join(' ') || '1 mo'
}

export function yearsSince(start: Date): number {
  const ms = Date.now() - start.getTime()
  return Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000))
}

export function padIndex(index: number): string {
  return String(index + 1).padStart(2, '0')
}

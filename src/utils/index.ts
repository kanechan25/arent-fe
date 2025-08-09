export function padValue(value: number): string {
  return value.toString().padStart(2, '0')
}

export const randomNum = (min: number, max: number) => Math.round((min + Math.random() * (max - min)) * 10) / 10

export function getRandomDateInYear(year: number): string {
  const start = new Date(year, 0, 1)
  const now = new Date()
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startMs = start.getTime()
  const endMs = end.getTime()
  const randomMs = startMs + Math.floor(Math.random() * (endMs - startMs + 1))
  const d = new Date(randomMs)
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${year}.${padValue(month)}.${padValue(day)}`
}

export function getRandomTime(): string {
  const hours = Math.floor(Math.random() * 24)
  const minutes = Math.floor(Math.random() * 60)
  return `${padValue(hours)}:${padValue(minutes)}`
}

export function getDateAndPrev(dateStr: string): [string, string] {
  const [y, m, d] = dateStr.split(/[^\d]/).map(Number) // 'YYYY/MM/DD'
  const target = new Date(y, (m ?? 1) - 1, d ?? 1)
  const prev = new Date(target)
  prev.setDate(target.getDate() - 1)

  const format = (dt: Date) => `${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`

  return [format(target), format(prev)]
}

export function subtractPastDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split(/[^\d]/).map(Number) // 'YYYY/MM/DD'
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1)
  dt.setDate(dt.getDate() - days)
  const yyyy = dt.getFullYear()
  const mm = String(dt.getMonth() + 1).padStart(2, '0')
  const dd = String(dt.getDate()).padStart(2, '0')
  return `${yyyy}/${mm}/${dd}`
}

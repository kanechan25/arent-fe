function pad2(value: number): string {
  return value.toString().padStart(2, '0')
}

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
  return `${year}.${pad2(month)}.${pad2(day)}`
}

export function getRandomTime(): string {
  const hours = Math.floor(Math.random() * 24)
  const minutes = Math.floor(Math.random() * 60)
  return `${pad2(hours)}:${pad2(minutes)}`
}

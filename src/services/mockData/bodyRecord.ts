import { randomNum } from '@/utils'

export type TimeType = 'year' | 'month' | 'week' | 'day'
export const typeToLabel: Record<TimeType, string> = {
  week: '週',
  month: '月',
  year: '年',
  day: '日',
}

export interface BodyRecordPoint {
  label: string // '6月', '月曜日', '1日目' ...
  type: TimeType
  weight: number
  bodyFat: number
}

const year = ['6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月']
const month = Array.from({ length: 30 }, (_, i) => `${i + 1}`)
const weekdays = ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日']
const dayHours = Array.from({ length: 12 }, (_, i) => `${String(i * 2).padStart(2, '0')}:00`)

const rangeByType = {
  year: { labels: year, weight: [70.0, 68.0] as const, bodyFat: [75.5, 60.9] as const },
  month: { labels: month, weight: [68.0, 69.2] as const, bodyFat: [65.5, 68.9] as const },
  week: { labels: weekdays, weight: [68.3, 68.8] as const, bodyFat: [65.5, 68.9] as const },
  day: { labels: dayHours, weight: [68.4, 68.7] as const, bodyFat: [66.2, 67.4] as const },
} as const satisfies Record<
  TimeType,
  { labels: readonly string[]; weight: readonly [number, number]; bodyFat: readonly [number, number] }
>

export function generateBodyRecord(type: TimeType): BodyRecordPoint[] {
  const rangeConfig = rangeByType[type]
  const [wMin, wMax] = rangeConfig.weight
  const [fMin, fMax] = rangeConfig.bodyFat

  return rangeConfig.labels.map((label) => ({
    label,
    type,
    weight: Number(randomNum(wMin, wMax).toFixed(1)),
    bodyFat: Number(randomNum(fMin, fMax).toFixed(1)),
  }))
}

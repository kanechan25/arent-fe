export type TimeType = 'year' | 'month' | 'week' | 'day'
export const TypeToLabel: Record<TimeType, string> = {
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

export interface DiaryEntry {
  id: string
  date: string // '2021.05.17'
  time: string // '23:25'
  title: string
  content: string
}

export interface ExerciseEntry {
  name: string
  calories: number
  duration: number
}

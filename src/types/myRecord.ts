export interface MyRecordProps {
  transitionButtons: TransitionButton[]
  diaryEntries: DiaryEntry[]
  isFetching: boolean
  bodyRecordRef: React.RefObject<HTMLElement | null>
  myExerciseRef: React.RefObject<HTMLElement | null>
  myDiaryRef: React.RefObject<HTMLElement | null>
  onTransitionClick: (sectionRef: React.RefObject<HTMLElement | null>) => void
  onLoadMore: () => Promise<void>
}

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

export interface TransitionButton {
  label: string
  content: string
  icon: string
  sectionRef?: React.RefObject<HTMLElement | null>
  onClick?: () => void
}

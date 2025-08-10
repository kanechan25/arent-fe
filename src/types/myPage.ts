export enum MealType {
  Morning = 'morning',
  Lunch = 'lunch',
  Dinner = 'dinner',
  Snack = 'snack',
}

export interface MealHistory {
  id: string
  type: MealType
  date: string // 'YYYY/MM/DD'
  imageUrl: string
}

export interface TransitionButton {
  label: string
  content: string
  icon: string
  sectionRef?: React.RefObject<HTMLElement | null>
  onClick?: () => void
}

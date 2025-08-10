export interface MyPageProps {
  histories: MealHistory[]
  filteredHistories?: MealHistory[]
  isLoading: boolean
  isError: boolean
  isFetching: boolean
  selected: MealType | 'all'
  requestDate: string
  onToggle: (key: MealType) => void
  onLoadMore: () => void
}

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

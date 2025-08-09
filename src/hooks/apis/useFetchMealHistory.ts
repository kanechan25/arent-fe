import { useQuery } from '@tanstack/react-query'
import { fetchMealHistory } from '@/services/apis'

// date: 'YYYY/MM/DD'
export const useFetchMealHistory = (date: string) => {
  return useQuery({ queryKey: ['mealHistory', date], queryFn: () => fetchMealHistory(date) })
}

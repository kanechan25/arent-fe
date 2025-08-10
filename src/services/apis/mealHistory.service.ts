import { generateMealHistory } from '@/services/mockData/mealHistory'
import { MealHistory } from '@/types/myPage'

export async function fetchMealHistory(date: string): Promise<MealHistory[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMealHistory(date))
    }, 200)
  })
}

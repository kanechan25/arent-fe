import { MealHistory, generateMealHistory } from '@/services/mockData/mealHistory'

export async function fetchMealHistory(date: string): Promise<MealHistory[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMealHistory(date))
    }, 200)
  })
}

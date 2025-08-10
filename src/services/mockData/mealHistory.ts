import d01 from '@/assets/images/photo/d01.jpg'
import d02 from '@/assets/images/photo/d02.jpg'
import l01 from '@/assets/images/photo/l01.jpg'
import l02 from '@/assets/images/photo/l02.jpg'
import l03 from '@/assets/images/photo/l03.jpg'
import m01 from '@/assets/images/photo/m01.jpg'
import m02 from '@/assets/images/photo/m02.jpg'
import m03 from '@/assets/images/photo/m03.jpg'
import s01 from '@/assets/images/photo/s01.jpg'
import { MealHistory, MealType } from '@/types/myPage'
import { getDateAndPrev } from '@/utils'

const imageUrls: Record<MealType, string[]> = {
  [MealType.Morning]: [m01, m02, m03],
  [MealType.Lunch]: [l01, l02, l03],
  [MealType.Dinner]: [d01, d02, m02],
  [MealType.Snack]: [s01, m01, l01],
}
const mealTypes: MealType[] = [MealType.Morning, MealType.Lunch, MealType.Dinner, MealType.Snack]
const randomImageUrls = (type: MealType) => {
  const urls = imageUrls[type]
  return urls[Math.floor(Math.random() * urls.length)]
}

export function generateMealHistory(dateStr: string): MealHistory[] {
  const [todayDisplay, prevDisplay] = getDateAndPrev(dateStr)
  const dates = [todayDisplay, prevDisplay]

  return dates.flatMap((date) =>
    mealTypes.map((type) => ({
      id: `${date}-${type}`,
      type,
      date,
      imageUrl: randomImageUrls(type),
    })),
  )
}

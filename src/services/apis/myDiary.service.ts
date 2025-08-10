import { generateDiary } from '@/services/mockData/myDiary'
import { DiaryEntry } from '@/types/myRecord'

export async function fetchMyDiary(): Promise<DiaryEntry[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateDiary())
    }, 200)
  })
}

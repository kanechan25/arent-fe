import { DiaryEntry, generateDiary } from '@/services/mockData/myDiary'

export async function fetchMyDiary(): Promise<DiaryEntry[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateDiary())
    }, 200)
  })
}

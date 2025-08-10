import { getRandomDateInYear, getRandomTime } from '@/utils'

export interface DiaryEntry {
  id: string
  date: string // '2021.05.17'
  time: string // '23:25'
  title: string
  content: string
}

const diaryTitle = '私の日記の記録が一部表示されます。'
const diaryContent =
  'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…'

export function generateDiary(): DiaryEntry[] {
  const currentYear = new Date().getFullYear()
  const items: DiaryEntry[] = Array.from({ length: 8 }, (_, index) => {
    const id = (index + 1).toString()
    const date = getRandomDateInYear(currentYear)
    const time = getRandomTime()
    return {
      id,
      date,
      time,
      title: diaryTitle,
      content: diaryContent,
    }
  })
  return items
}

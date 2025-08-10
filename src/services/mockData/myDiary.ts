import { DiaryEntry } from '@/types/myRecord'
import { getRandomDateInYear, getRandomTime } from '@/utils'

const diaryTitle = '私の日記の記録が一部表示されます。'
const diaryContent =
  'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…'

export function generateDiary(): DiaryEntry[] {
  const currentYear = new Date().getFullYear()
  const items: DiaryEntry[] = Array.from({ length: 8 }, (_, index) => {
    return {
      id: (index + 1).toString(),
      date: getRandomDateInYear(currentYear),
      time: getRandomTime(),
      title: diaryTitle,
      content: diaryContent,
    }
  })
  return items
}

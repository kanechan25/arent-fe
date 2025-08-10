import { generateColumn } from '@/services/mockData/column'
import { ColumnArticle } from '@/types/column'

export async function fetchColumnArticles(): Promise<ColumnArticle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateColumn())
    }, 200)
  })
}

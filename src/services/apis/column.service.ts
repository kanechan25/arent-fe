import { ColumnArticle, generateColumn } from '@/services/mockData/column'

export async function fetchColumnArticles(): Promise<ColumnArticle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateColumn())
    }, 200)
  })
}

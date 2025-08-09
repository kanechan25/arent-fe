import { ColumnArticle, generateColumnArticles } from '@/services/mockData/column'

export async function fetchColumnArticles(): Promise<ColumnArticle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateColumnArticles())
    }, 200)
  })
}

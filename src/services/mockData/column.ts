import column1 from '@/assets/images/photo/column-1.jpg'
import column2 from '@/assets/images/photo/column-2.jpg'
import column3 from '@/assets/images/photo/column-3.jpg'
import column4 from '@/assets/images/photo/column-4.jpg'
import column5 from '@/assets/images/photo/column-5.jpg'
import column6 from '@/assets/images/photo/column-6.jpg'
import column7 from '@/assets/images/photo/column-7.jpg'
import column8 from '@/assets/images/photo/column-8.jpg'
import { getRandomDateInYear, getRandomTime } from '@/utils'

export enum Category {
  Column = 'column',
  Diet = 'diet',
  Beauty = 'beauty',
  Health = 'health',
}

export interface ColumnArticle {
  id: string
  category: Category
  date: string // '2021.05.17'
  time: string // '23:25'
  title: string
  imageUrl: string
  tags: string[]
}

const imageUrls = [column1, column2, column3, column4, column5, column6, column7, column8]
const articleTitle = '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ...'
const articleTags = ['#魚料理', '#和食', '#DHA']

export function generateColumnArticles(): ColumnArticle[] {
  const currentYear = new Date().getFullYear()
  const categoriesCycle = [Category.Column, Category.Diet, Category.Beauty, Category.Health]

  const items: ColumnArticle[] = Array.from({ length: 8 }, (_, index) => {
    const id = (index + 1).toString()
    const category = categoriesCycle[index % categoriesCycle.length]
    const date = getRandomDateInYear(currentYear)
    const time = getRandomTime()
    const imageUrl = imageUrls[index]
    return {
      id,
      category,
      date,
      time,
      title: articleTitle,
      imageUrl,
      tags: articleTags,
    }
  })
  return items
}

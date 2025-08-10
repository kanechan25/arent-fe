import column1 from '@/assets/images/photo/column-1.jpg'
import column2 from '@/assets/images/photo/column-2.jpg'
import column3 from '@/assets/images/photo/column-3.jpg'
import column4 from '@/assets/images/photo/column-4.jpg'
import column5 from '@/assets/images/photo/column-5.jpg'
import column6 from '@/assets/images/photo/column-6.jpg'
import column7 from '@/assets/images/photo/column-7.jpg'
import column8 from '@/assets/images/photo/column-8.jpg'
import { Category, ColumnArticle } from '@/types/column'
import { getRandomDateInYear, getRandomTime } from '@/utils'

const imageUrls = [column1, column2, column3, column4, column5, column6, column7, column8]
const articleTitle = '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ...'
const articleTags = ['#魚料理', '#和食', '#DHA']
const categoriesCycle = [Category.Column, Category.Diet, Category.Beauty, Category.Health]

export function generateColumn(): ColumnArticle[] {
  const currentYear = new Date().getFullYear()
  const items: ColumnArticle[] = Array.from({ length: 8 }, (_, index) => {
    return {
      id: (index + 1).toString(),
      category: categoriesCycle[index % categoriesCycle.length],
      date: getRandomDateInYear(currentYear),
      time: getRandomTime(),
      title: articleTitle,
      imageUrl: imageUrls[index],
      tags: articleTags,
    }
  })
  return items
}

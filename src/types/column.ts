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

export interface ColumnPageProps {
  categories?: CategoryArray
  filteredArticles?: ColumnArticle[]
  articles: ColumnArticle[]
  selected: Category
  isLoading: boolean
  isError: boolean
  isFetching: boolean
  onToggleCategory: (category: Category) => void
  onLoadMore: () => void
}

export type CategoryArray = Array<{ key: Category; en: string; jp: string }>

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

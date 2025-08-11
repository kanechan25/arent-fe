import { Category, CategoryArray } from '@/types/column'
import ColumnPage from '@/pages/ColumnPage'
import { useColumnPage } from '@/hooks/useColumnPage'

const categories: CategoryArray = [
  { key: Category.Column, en: 'RECOMMENDED COLUMN', jp: 'オススメ' },
  { key: Category.Diet, en: 'RECOMMENDED DIET', jp: 'ダイエット' },
  { key: Category.Beauty, en: 'RECOMMENDED BEAUTY', jp: '美容' },
  { key: Category.Health, en: 'RECOMMENDED HEALTH', jp: '健康' },
]

const ColumnPageContainer: React.FC = () => {
  const { articles, selected, isLoading, isError, isFetching, onToggleCategory, onLoadMore } = useColumnPage()
  return (
    <ColumnPage
      categories={categories}
      articles={articles}
      selected={selected}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      onToggleCategory={onToggleCategory}
      onLoadMore={onLoadMore}
    />
  )
}

export default ColumnPageContainer

import { useFetchColumnArticles } from '@/hooks/apis'
import { useEffect, useMemo, useState } from 'react'
import { ColumnArticle, Category, ColumnPageProps } from '@/types/column'

export const useColumnPage = (): ColumnPageProps => {
  const { data, isLoading, isError, refetch, isFetching } = useFetchColumnArticles()
  const [articles, setArticles] = useState<ColumnArticle[]>([])
  const [selected, setSelected] = useState<Category>(Category.Column)

  useEffect(() => {
    if (data && articles.length === 0) {
      setArticles(data)
    }
  }, [data, articles.length])

  const filteredArticles = useMemo(() => {
    if (selected === Category.Column) return articles
    return articles.filter((a) => a.category === selected)
  }, [articles, selected])

  const handleToggleCategory = (category: Category) => {
    setSelected((prev) => (prev === category ? Category.Column : category))
  }

  const handleLoadMore = async () => {
    const result = await refetch()
    if (result.data && Array.isArray(result.data)) {
      setArticles((prev) => [...prev, ...result.data])
    }
  }
  return {
    articles: filteredArticles || [],
    selected,
    isLoading,
    isError,
    isFetching,
    onToggleCategory: handleToggleCategory,
    onLoadMore: handleLoadMore,
  }
}

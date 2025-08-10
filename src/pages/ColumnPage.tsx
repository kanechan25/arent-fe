import { useEffect, useMemo, useState } from 'react'
import { useFetchColumnArticles } from '@/hooks/apis'
import { Category, ColumnArticle } from '@/types/column'
import { ColumnCard } from '@/components/ui/columnPage/ColumnCard'
import { Button, GoToTop } from '@/components/ui/_shared'

const categories: Array<{ key: Category; en: string; jp: string }> = [
  { key: Category.Column, en: 'RECOMMENDED COLUMN', jp: 'オススメ' },
  { key: Category.Diet, en: 'RECOMMENDED DIET', jp: 'ダイエット' },
  { key: Category.Beauty, en: 'RECOMMENDED BEAUTY', jp: '美容' },
  { key: Category.Health, en: 'RECOMMENDED HEALTH', jp: '健康' },
]
const skeletonArray = Array.from({ length: 8 }, (_, index) => index)

export default function ColumnPage() {
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

  return (
    <div className='max-w-[960px] mx-auto px-4 py-10 space-y-12'>
      {/* Category */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => handleToggleCategory(c.key)}
            className={
              'flex flex-col items-center justify-center w-full bg-dark-600 text-light text-center py-8 px-4 transition-colors cursor-pointer ' +
              (selected === c.key ? 'ring-2 ring-primary-400' : '')
            }
          >
            <div className='text-primary-300 text-xl tracking-widest'>{c.en}</div>
            <div className='w-14 my-2 border-b-1 border-light' />
            <div className='text-xl'>{c.jp}</div>
          </button>
        ))}
      </div>

      {/* Column grid */}
      {isError ? (
        <div className='text-center text-red-500'>データの取得に失敗しました。</div>
      ) : isLoading && articles.length === 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {skeletonArray.map((index) => (
            <div key={index} className='w-full h-62 bg-gray-300 animate-pulse blur-xs' />
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {filteredArticles.map((article, index) => (
            <ColumnCard key={`${article.id}-${index}`} article={article} />
          ))}
        </div>
      )}

      <div className='flex justify-center'>
        <Button
          onClick={handleLoadMore}
          disabled={isFetching}
          className='min-w-64 px-8 py-3 text-light bg-primary-300-400'
        >
          {isFetching ? '読み込み中...' : 'コラムをもっと見る'}
        </Button>
      </div>

      <GoToTop />
    </div>
  )
}

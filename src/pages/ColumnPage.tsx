import React from 'react'
import { ColumnPageProps } from '@/types/column'
import { ColumnCard } from '@/components/ui/columnPage/ColumnCard'
import { Button, GoToTop } from '@/components/ui/_shared'

const skeletonArray = Array.from({ length: 8 }, (_, index) => index)

const ColumnPage: React.FC<ColumnPageProps> = ({
  categories,
  articles,
  selected,
  isLoading,
  isError,
  isFetching,
  onToggleCategory,
  onLoadMore,
}) => {
  return (
    <div className='max-w-[960px] mx-auto px-4 py-10 space-y-12'>
      {/* Category */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {categories &&
          categories.length > 0 &&
          categories.map((c) => (
            <button
              key={c.key}
              onClick={() => onToggleCategory(c.key)}
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
          {articles.map((article, index) => (
            <ColumnCard key={`${article.id}-${index}`} article={article} />
          ))}
        </div>
      )}

      <div className='flex justify-center'>
        <Button onClick={onLoadMore} disabled={isFetching} className='min-w-64 px-8 py-3 text-light bg-primary-300-400'>
          {isFetching ? '読み込み中...' : 'コラムをもっと見る'}
        </Button>
      </div>

      <GoToTop />
    </div>
  )
}

export default ColumnPage

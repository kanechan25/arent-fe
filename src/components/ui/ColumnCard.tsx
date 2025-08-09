import { ColumnArticle } from '@/services/mockData/column'

export function ColumnCard({ article }: { article: ColumnArticle }) {
  return (
    <div className='space-y-2'>
      <div className='relative'>
        <img src={article.imageUrl} alt={article.title} className='w-full h-44 object-cover' />
        <div className='absolute bottom-0 left-0 px-2 py-1 text-light text-xs bg-primary-300'>
          {article.date} {article.time}
        </div>
      </div>
      <div className='text-dark-500 text-sm text-left leading-relaxed'>{article.title}</div>
      <div className='text-primary-400 text-xs space-x-3 text-left'>
        {article.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

import { MealHistory } from '@/types/myPage'

export function MealCard({ item }: { item: MealHistory }) {
  const displayType = item.type.charAt(0).toUpperCase() + item.type.slice(1)
  return (
    <div className='relative'>
      <img src={item.imageUrl} alt={`${displayType}`} className='w-full h-44 object-cover' />
      <div className='absolute bottom-0 left-0 px-2 py-1 text-light text-xs bg-primary-300'>
        {`${item.date}.${displayType}`}
      </div>
    </div>
  )
}

import React from 'react'
import { Button, GoToTop, BodyRecord } from '@/components/ui/_shared'
import RingProgress from '@/components/ui/myPage/RingProgress'
import { MealType, MyPageProps } from '@/types/myPage'
import MealButton from '@/components/ui/myPage/MealButton'
import { MealCard } from '@/components/ui/myPage/MealCard'
import bgMeal from '@/assets/images/photo/d01.jpg'
import knifeIcon from '@/assets/images/icons/icon_knife.svg'
import cupIcon from '@/assets/images/icons/icon_cup.svg'

const MyPage: React.FC<MyPageProps> = ({
  histories,
  isLoading,
  isError,
  isFetching,
  selected,
  requestDate,
  onToggle,
  onLoadMore,
}) => {
  const mealButtons: Array<{ key: MealType; label: string; icon: string }> = [
    { key: MealType.Morning, label: 'Morning', icon: knifeIcon },
    { key: MealType.Lunch, label: 'Lunch', icon: knifeIcon },
    { key: MealType.Dinner, label: 'Dinner', icon: knifeIcon },
    { key: MealType.Snack, label: 'Snack', icon: cupIcon },
  ]

  const skeletonArray = Array.from({ length: 8 }, (_, index) => index)

  return (
    <div className='space-y-10 w-full'>
      <div className='grid grid-cols-1 lg:grid-cols-[42%_58%] items-stretch w-full h-160 lg:h-full'>
        <div className='relative h-80 lg:h-80'>
          <img src={bgMeal} loading='lazy' className='absolute inset-0 h-full w-full object-cover select-none' />
          <div className='relative grid place-items-center h-80 lg:h-full'>
            <RingProgress date='08/09' percentage={75} size={200} />
          </div>
        </div>

        <BodyRecord date={requestDate} variant='compact' className='h-full' />
      </div>

      <div className='flex flex-col max-w-[960px] mx-auto gap-8'>
        <div className='px-6'>
          <div className='grid grid-cols-2 sm:grid-cols-4 place-items-center gap-4'>
            {mealButtons.map((f) => (
              <MealButton
                key={f.key}
                selected={selected === f.key}
                label={f.label}
                icon={f.icon}
                onClick={() => onToggle(f.key)}
              />
            ))}
          </div>
        </div>

        {/* Meal grid */}
        <div className='space-y-8'>
          {isError ? (
            <div className='text-center text-red-500'>データの取得に失敗しました。</div>
          ) : isLoading && histories.length === 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-0'>
              {skeletonArray.map((index) => (
                <div key={index} className='w-full h-44 bg-gray-300 animate-pulse blur-xs' />
              ))}
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-0'>
              {histories.map((item) => (
                <MealCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <div className='flex justify-center'>
            <Button
              onClick={onLoadMore}
              disabled={isFetching}
              className='min-w-64 px-8 py-3 text-light bg-primary-300-400'
            >
              {isFetching ? '読み込み中...' : '記録をもっと見る'}
            </Button>
          </div>
        </div>
      </div>

      <GoToTop />
    </div>
  )
}

export default MyPage

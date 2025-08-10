import { useEffect, useMemo, useState } from 'react'
import BodyRecord from '@/components/ui/common/BodyRecord'
import RingProgress from '@/components/ui/myPage/RingProgress'
import Button from '@/components/ui/common/Button'
import { GoToTop } from '@/components/ui/common/GoToTop'
import bgMeal from '@/assets/images/photo/d01.jpg'
import knifeIcon from '@/assets/images/icons/icon_knife.svg'
import cupIcon from '@/assets/images/icons/icon_cup.svg'
import { useFetchMealHistory } from '@/hooks/apis'
import { MealType, type MealHistory } from '@/services/mockData/mealHistory'
import MealButton from '@/components/ui/myPage/MealButton'
import { MealCard } from '@/components/ui/myPage/MealCard'
import { subtractPastDays } from '@/utils'

const mealButtons: Array<{ key: MealType; label: string; icon: string }> = [
  { key: MealType.Morning, label: 'Morning', icon: knifeIcon },
  { key: MealType.Lunch, label: 'Lunch', icon: knifeIcon },
  { key: MealType.Dinner, label: 'Dinner', icon: knifeIcon },
  { key: MealType.Snack, label: 'Snack', icon: cupIcon },
]

const MyPage = () => {
  const [requestDate, setRequestDate] = useState<string>('2025/08/09')
  const { data, isLoading, isError, isFetching } = useFetchMealHistory(requestDate)
  const [histories, setHistories] = useState<MealHistory[]>([])
  const [selected, setSelected] = useState<MealType | 'all'>('all')

  useEffect(() => {
    if (!data) return
    setHistories((prev) => {
      if (prev.length === 0) return data
      const existingIds = new Set(prev.map((h) => h.id))
      const newMeals = data.filter((h) => !existingIds.has(h.id))
      return [...prev, ...newMeals]
    })
  }, [data])

  const filtered = useMemo(() => {
    if (selected === 'all') return histories
    return histories.filter((h) => h.type === selected)
  }, [histories, selected])

  const handleToggle = (key: MealType) => {
    setSelected((prev) => (prev === key ? 'all' : key))
  }

  const handleLoadMore = () => {
    setRequestDate((prev) => subtractPastDays(prev, 2))
  }

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
                onClick={() => handleToggle(f.key)}
              />
            ))}
          </div>
        </div>

        <div className='space-y-8'>
          {isError ? (
            <div className='text-center text-red-500'>データの取得に失敗しました。</div>
          ) : isLoading && histories.length === 0 ? (
            <div className='text-center text-gray-400'>読み込み中...</div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-0'>
              {filtered.map((item) => (
                <MealCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <div className='flex justify-center'>
            <Button
              onClick={handleLoadMore}
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

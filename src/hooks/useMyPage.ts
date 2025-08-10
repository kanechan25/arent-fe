import { useState, useEffect, useMemo } from 'react'
import { useFetchMealHistory } from '@/hooks/apis'
import { MealType, MealHistory } from '@/types/myPage'
import { subtractPastDays } from '@/utils'
import { MyPageProps } from '@/types/myPage'

interface UseMyPageProps {
  initialDate?: string
  initialFilter?: MealType | 'all'
}

export const useMyPage = ({ initialDate = '2025/08/10', initialFilter = 'all' }: UseMyPageProps = {}): MyPageProps => {
  const [requestDate, setRequestDate] = useState<string>(initialDate)
  const { data, isLoading, isError, isFetching } = useFetchMealHistory(requestDate)
  const [histories, setHistories] = useState<MealHistory[]>([])
  const [selected, setSelected] = useState<MealType | 'all'>(initialFilter)

  useEffect(() => {
    if (!data) return
    setHistories((prev) => {
      if (prev.length === 0) return data
      const existingIds = new Set(prev.map((h) => h.id))
      const newMeals = data.filter((h) => !existingIds.has(h.id))
      return [...prev, ...newMeals]
    })
  }, [data])

  const filteredHistories = useMemo(() => {
    if (selected === 'all') return histories
    return histories.filter((h) => h.type === selected)
  }, [histories, selected])

  const handleToggle = (key: MealType) => {
    setSelected((prev) => (prev === key ? 'all' : key))
  }

  const handleLoadMore = () => {
    setRequestDate((prev) => subtractPastDays(prev, 2))
  }

  return {
    histories,
    filteredHistories,
    selected,
    isLoading,
    isError,
    isFetching,
    requestDate,
    onToggle: handleToggle,
    onLoadMore: handleLoadMore,
  }
}

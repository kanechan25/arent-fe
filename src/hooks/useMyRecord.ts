import { useRef, useEffect, useState } from 'react'
import { useFetchMyDiary } from '@/hooks/apis'
import { DiaryEntry } from '@/types/myRecord'
import { TransitionButton, MyRecordProps } from '@/types/myRecord'
import bodyRecordBtn from '@/assets/images/photo/MyRecommend-1.jpg'
import myExerciseBtn from '@/assets/images/photo/MyRecommend-2.jpg'
import myDiaryBtn from '@/assets/images/photo/MyRecommend-3.jpg'

export const useMyRecord = (): MyRecordProps => {
  const bodyRecordRef = useRef<HTMLElement>(null)
  const myExerciseRef = useRef<HTMLElement>(null)
  const myDiaryRef = useRef<HTMLElement>(null)

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const { data: initialDiaryData = [], refetch, isFetching } = useFetchMyDiary()

  useEffect(() => {
    if (initialDiaryData.length > 0 && diaryEntries.length === 0) {
      setDiaryEntries(initialDiaryData)
    }
  }, [initialDiaryData, diaryEntries.length])

  const transitionButtons: TransitionButton[] = [
    {
      label: 'BODY RECORD',
      content: '自分のカラダの記録',
      icon: bodyRecordBtn,
      sectionRef: bodyRecordRef,
    },
    {
      label: 'MY EXERCISE',
      content: '自分の運動の記録',
      icon: myExerciseBtn,
      sectionRef: myExerciseRef,
    },
    {
      label: 'MY DIARY',
      content: '自分の日記',
      icon: myDiaryBtn,
      sectionRef: myDiaryRef,
    },
  ]

  const handleTransitionClick = (sectionRef: React.RefObject<HTMLElement | null>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLoadMore = async () => {
    const result = await refetch()
    if (result.data && Array.isArray(result.data)) {
      setDiaryEntries((prev) => [...prev, ...result.data])
    }
  }

  return {
    diaryEntries,
    isFetching,
    transitionButtons,
    bodyRecordRef,
    myExerciseRef,
    myDiaryRef,
    onTransitionClick: handleTransitionClick,
    onLoadMore: handleLoadMore,
  }
}

import { useRef, useEffect, useState } from 'react'
import { useFetchMyDiary } from '@/hooks/apis'
import bodyRecordBtn from '@/assets/images/photo/MyRecommend-1.jpg'
import myExerciseBtn from '@/assets/images/photo/MyRecommend-2.jpg'
import myDiaryBtn from '@/assets/images/photo/MyRecommend-3.jpg'
import TransitionBtn from '@/components/ui/myRecord/TransitionBtn'
import BodyRecord from '@/components/ui/common/BodyRecord'
import MyExercise from '@/components/ui/myRecord/MyExercise'
import DiaryCard from '@/components/ui/myRecord/DiaryCard'
import { Button } from '@/components/ui/common/Button'
import GoToTop from '@/components/ui/common/GoToTop'

interface TransitionButton {
  label: string
  content: string
  icon: string
  sectionRef: React.RefObject<HTMLElement | null>
}

const MyRecord = () => {
  const bodyRecordRef = useRef<HTMLElement>(null)
  const myExerciseRef = useRef<HTMLElement>(null)
  const myDiaryRef = useRef<HTMLElement>(null)

  const [diaryEntries, setDiaryEntries] = useState<any[]>([])
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

  return (
    <div className='space-y-10 w-full'>
      {/* Transition Buttons Section */}
      <section className='p-4 mt-8 flex w-full items-center justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-3 w-full mx-auto place-items-center gap-4'>
          {transitionButtons.map((button, index) => (
            <TransitionBtn
              key={index}
              label={button.label}
              content={button.content}
              icon={button.icon}
              onClick={() => handleTransitionClick(button.sectionRef)}
            />
          ))}
        </div>
      </section>

      <section ref={bodyRecordRef} className='max-w-[960px] mx-auto p-4 lg:p-0'>
        <BodyRecord date='2025/08/09' variant='full' className='h-96' />
      </section>

      <section ref={myExerciseRef} className='max-w-[960px] mx-auto p-4 lg:p-0'>
        <MyExercise date='2025/08/09' />
      </section>

      <section ref={myDiaryRef} className='max-w-[960px] mx-auto p-4 lg:p-0 text-dark-500'>
        <h3 className='text-2xl text-left mb-2 font-medium'>MY DIARY</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
          {diaryEntries.map((entry, index) => (
            <DiaryCard key={`${entry.id}-${index}`} entry={entry} />
          ))}
        </div>

        <div className='flex justify-center'>
          <Button
            onClick={handleLoadMore}
            disabled={isFetching}
            className='bg-primary-300 text-white px-8 py-3 rounded hover:bg-primary-400 transition-colors'
          >
            {isFetching ? '読み込み中...' : '自分の日記をもっと見る'}
          </Button>
        </div>
      </section>
      <GoToTop />
    </div>
  )
}

export default MyRecord

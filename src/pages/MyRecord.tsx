// src/pages/MyRecord.tsx (REFACTORED - Pure Presentational)
import React, { Suspense } from 'react'
import TransitionBtn from '@/components/ui/myRecord/TransitionBtn'
import MyExercise from '@/components/ui/myRecord/MyExercise'
import DiaryCard from '@/components/ui/myRecord/DiaryCard'
import { Button, GoToTop, BodyRecord } from '@/components/ui/_shared'
import { MyRecordProps } from '@/types/myRecord'

const MyRecord: React.FC<MyRecordProps> = React.memo(
  ({
    transitionButtons,
    diaryEntries,
    isFetching,
    bodyRecordRef,
    myExerciseRef,
    myDiaryRef,
    onTransitionClick,
    onLoadMore,
  }) => {
    return (
      <div className='space-y-10 w-full'>
        <section className='p-4 lg:p-0 mt-8 flex w-full items-center justify-center'>
          <div className='grid grid-cols-1 md:grid-cols-3 w-full max-w-[960px] mx-auto place-items-center gap-12'>
            {transitionButtons.map((button, index) => (
              <TransitionBtn
                key={index}
                label={button.label}
                content={button.content}
                icon={button.icon}
                onClick={() => button.sectionRef && onTransitionClick(button.sectionRef)}
              />
            ))}
          </div>
        </section>

        <section ref={bodyRecordRef} className='max-w-[960px] mx-auto p-4 lg:p-0'>
          <Suspense fallback={<div className='h-96 bg-dark-500 animate-pulse' />}>
            <BodyRecord date='2025/08/09' variant='full' className='h-96' />
          </Suspense>
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
              onClick={onLoadMore}
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
  },
)

export default MyRecord

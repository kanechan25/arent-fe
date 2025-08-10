import React from 'react'
import { useMyRecord } from '@/hooks/useMyRecord'
import MyRecord from '@/pages/MyRecord'

const MyRecordContainer: React.FC = () => {
  const {
    diaryEntries,
    isFetching,
    transitionButtons,
    bodyRecordRef,
    myExerciseRef,
    myDiaryRef,
    onTransitionClick,
    onLoadMore,
  } = useMyRecord()

  return (
    <MyRecord
      transitionButtons={transitionButtons}
      diaryEntries={diaryEntries}
      isFetching={isFetching}
      bodyRecordRef={bodyRecordRef}
      myExerciseRef={myExerciseRef}
      myDiaryRef={myDiaryRef}
      onTransitionClick={onTransitionClick}
      onLoadMore={onLoadMore}
    />
  )
}

export default MyRecordContainer

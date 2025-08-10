import { useMemo } from 'react'
import { FixedSizeList as List } from 'react-window'
import { useFetchMyExercise } from '@/hooks/apis/useFetchMyExercise'
import { ExerciseRow } from '@/components/ui/myRecord/ExerciseRow'

interface MyExerciseProps {
  date: string
  className?: string
}

const ITEM_HEIGHT = 50
const CONTAINER_HEIGHT = 204

export default function MyExercise({ date, className = '' }: MyExerciseProps) {
  const { data: exercises = [], isLoading } = useFetchMyExercise(100)
  const sectionStyle = `w-full bg-dark-500 p-6 pt-4 text-light ${className}`
  const leftColExercises = useMemo(() => {
    return exercises.filter((_, index) => index % 2 === 0)
  }, [exercises])
  const rightColExercises = useMemo(() => {
    return exercises.filter((_, index) => index % 2 === 1)
  }, [exercises])
  const maxItems = Math.max(leftColExercises.length, rightColExercises.length)

  if (isLoading) {
    return (
      <section className={sectionStyle}>
        <div className='text-center text-white'>読み込み中...</div>
      </section>
    )
  }

  const renderVirtualizedItem = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const leftExercise = leftColExercises[index]
    const rightExercise = rightColExercises[index]

    return (
      <div style={style} className='flex gap-12'>
        <div className='flex-1'>
          {leftExercise && (
            <ExerciseRow name={leftExercise.name} calories={leftExercise.calories} duration={leftExercise.duration} />
          )}
        </div>
        <div className='flex-1'>
          {rightExercise && (
            <ExerciseRow
              name={rightExercise.name}
              calories={rightExercise.calories}
              duration={rightExercise.duration}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <section className={sectionStyle}>
      <header className='flex items-end justify-between gap-4'>
        <div className='flex items-start gap-4 text-white'>
          <h3 className='text-md tracking-wide w-[80px] text-left'>MY EXERCISE</h3>
          <span className='text-2xl tracking-wide'>{date}</span>
        </div>
      </header>

      <div className='max-h-96 overflow-hidden'>
        <List
          className='my-exercise-list'
          height={Math.min(CONTAINER_HEIGHT, maxItems * ITEM_HEIGHT)}
          width='100%'
          itemCount={maxItems}
          itemSize={ITEM_HEIGHT}
        >
          {renderVirtualizedItem}
        </List>
      </div>
    </section>
  )
}

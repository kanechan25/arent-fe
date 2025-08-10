import { useMemo, lazy, Suspense } from 'react'
import { useFetchMyExercise } from '@/hooks/apis/useFetchMyExercise'
import { ExerciseRow } from '@/components/ui/myRecord/ExerciseRow'

const FixedSizeList = lazy(() => import('react-window').then((module) => ({ default: module.FixedSizeList })))
const ListLoader = () => <div className='w-full h-[204px] bg-dark-500' />

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
    return <section className={`h-[292px] ${sectionStyle}`} />
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
        <Suspense fallback={<ListLoader />}>
          <FixedSizeList
            className='my-exercise-list'
            height={Math.min(CONTAINER_HEIGHT, maxItems * ITEM_HEIGHT)}
            width='100%'
            itemCount={maxItems}
            itemSize={ITEM_HEIGHT}
          >
            {renderVirtualizedItem}
          </FixedSizeList>
        </Suspense>
      </div>
    </section>
  )
}

import { useFetchMyExercise } from '@/hooks/apis/useFetchMyExercise'
import { ExerciseRow } from './ExerciseRow'

interface MyExerciseProps {
  date: string
  className?: string
}

export default function MyExercise({ date, className = '' }: MyExerciseProps) {
  const { data: exercises = [], isLoading } = useFetchMyExercise(100)
  const sectionStyle = `w-full h-68 bg-dark-500 px-4 py-3 text-light ${className}`

  if (isLoading) {
    return (
      <section className={sectionStyle}>
        <div className='text-center text-white'>読み込み中...</div>
      </section>
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
      <div className=''>
        <ul id='my-exercise-list' className='grid grid-cols-1 md:grid-cols-2 gap-x-12 max-h-49 overflow-y-auto pr-3'>
          {exercises.map((ex, i) => (
            <ExerciseRow key={i} name={ex.name} calories={ex.calories} duration={ex.duration} />
          ))}
        </ul>
      </div>
    </section>
  )
}

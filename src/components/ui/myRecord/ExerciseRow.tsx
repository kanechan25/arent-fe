type ExerciseRowProps = {
  name: string
  calories: number | string
  duration: number | string
}

export function ExerciseRow({ name, calories, duration }: ExerciseRowProps) {
  return (
    <div className='flex items-start justify-between py-1 pr-4 border-b border-gray-400/50'>
      <div className='flex items-start flex-1 min-w-0 gap-2'>
        <span className='mt-2 block w-1 h-1 rounded-full bg-white flex-shrink-0' />
        <span className='text-light text-left text-sm flex flex-col items-start justify-center'>
          {name}
          <span className='whitespace-nowrap text-sm text-primary-300'>{calories}kcal</span>
        </span>
      </div>
      <div className='ml-6 flex items-center gap-6 text-primary-300 text-sm flex-shrink-0'>
        <span className='whitespace-nowrap text-lg'>{duration} min</span>
      </div>
    </div>
  )
}

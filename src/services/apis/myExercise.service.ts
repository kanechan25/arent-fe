import { generateExercise } from '@/services/mockData/myExercise'
import { ExerciseEntry } from '@/types/myRecord'

export async function fetchMyExercise(exerciseNum: number): Promise<ExerciseEntry[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateExercise(exerciseNum))
    }, 200)
  })
}

import { generateExercise } from '@/services/mockData/myExercise'
import { ExerciseEntry } from '@/services/mockData/myExercise'

export async function fetchMyExercise(exerciseNum: number): Promise<ExerciseEntry[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateExercise(exerciseNum))
    }, 200)
  })
}

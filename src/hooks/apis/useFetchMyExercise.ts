import { useQuery } from '@tanstack/react-query'
import { fetchMyExercise } from '@/services/apis/myExercise.service'

export const useFetchMyExercise = (exerciseNum: number) => {
  return useQuery({ queryKey: ['myExercise', exerciseNum], queryFn: () => fetchMyExercise(exerciseNum) })
}

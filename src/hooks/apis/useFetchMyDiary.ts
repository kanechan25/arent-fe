import { useQuery } from '@tanstack/react-query'
import { fetchMyDiary } from '@/services/apis'

export const useFetchMyDiary = () => {
  return useQuery({
    queryKey: ['myDiary'],
    queryFn: fetchMyDiary,
  })
}

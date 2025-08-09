import { useQuery } from '@tanstack/react-query'
import { fetchColumnArticles } from '@/services/apis'

export const useFetchColumnArticles = () => {
  return useQuery({ queryKey: ['columnArticles'], queryFn: fetchColumnArticles })
}

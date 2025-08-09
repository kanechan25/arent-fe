import { useQuery } from '@tanstack/react-query'
import { fetchBodyRecord } from '@/services/apis'
import { TimeType } from '@/services/mockData/bodyRecord'

export const useFetchBodyRecord = (type: TimeType) => {
  return useQuery({ queryKey: ['bodyRecord', type], queryFn: () => fetchBodyRecord(type) })
}

import { generateBodyRecord } from '@/services/mockData/bodyRecord'
import { BodyRecordPoint, TimeType } from '@/types/myRecord'

export async function fetchBodyRecord(type: TimeType): Promise<BodyRecordPoint[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(generateBodyRecord(type)), 200)
  })
}

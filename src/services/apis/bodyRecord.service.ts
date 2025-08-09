import { BodyRecordPoint, generateBodyRecord, TimeType } from '@/services/mockData/bodyRecord'

export async function fetchBodyRecord(type: TimeType): Promise<BodyRecordPoint[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(generateBodyRecord(type)), 200)
  })
}

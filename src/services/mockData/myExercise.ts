export interface ExerciseEntry {
  name: string
  calories: number
  duration: number
}

const exercises: string[] = [
  '家事全般（立位・軽い）',
  '買い物（歩行・中等度）',
  'プランク（室内・軽い）',
  '庭掃除（立位・中等度）',
  'ランニング（屋外・中等度）',
  'スクワット（室内・中等度）',
]

export function generateExercise(count: number): ExerciseEntry[] {
  return Array.from({ length: count }, () => ({
    name: exercises[Math.floor(Math.random() * exercises.length)],
    calories: Math.round(20 + Math.random() * (200 - 20)),
    duration: Math.round(2 + Math.random() * (20 - 2)),
  }))
}

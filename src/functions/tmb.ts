import { tdeeSchema } from '@/app/metricas/components/tdee'
import { z } from 'zod'

export function MifflinStJeor({
  age,
  gender,
  hasBF,
  height,
  weight,
}: z.infer<typeof tdeeSchema>): number {
  if (gender === 'Male') {
    return 10 * weight + 6.25 * height - 5 * age + 5
  }
  if (gender === 'Female') {
    return 10 * weight + 6.25 * height - 5 * age - 161
  }
  return 0
}

export function KatchMcArdle(weight: number, bodyFat: number): number {
  const leanBodyMass = (bodyFat! / 10) * weight
  return 370 + 9.82 * leanBodyMass
}

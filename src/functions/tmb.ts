import { ITdee } from '@/models'

export function MifflinStJeor({ age, gender, hasBF, height, weight }: ITdee) {
  if (gender === 'Male') {
    return 10 * weight + 6.25 * height - 5 * age + 5
  }
  if (gender === 'Female') {
    return 10 * weight + 6.25 * height - 5 * age - 161
  }
}

export function KatchMcArdle({ weight, bodyFat }: ITdee) {
  const leanBodyMass = (bodyFat! / 100) * weight
  return 370 + 9.82 * leanBodyMass
}

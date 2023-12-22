import Gender from '@/enums/Gender'

export interface ITdee {
  gender: Gender
  age: number
  height: number
  weight: number
  hasBF: boolean
  bodyFat?: number
}

import Gender from '@/enums/Gender'

export interface ITdee {
  gender: string
  age: number
  height: number
  weight: number
  hasBF: boolean
  bodyFat?: number
}

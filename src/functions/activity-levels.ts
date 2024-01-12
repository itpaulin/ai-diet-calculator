import { tdeeSchema } from '@/app/metricas/components/tdee'
import ActivityLevel from '@/enums/ActivityLevel'
import CardioIntensity from '@/enums/CardioIntensity'
import WorkoutIntensity from '@/enums/WorkoutIntensity'
import { z } from 'zod'

type TdeeSchema = z.infer<typeof tdeeSchema>

function NonExerciseActivityThermogenesis(intensidade: string): number {
  switch (intensidade) {
    case ActivityLevel.Sedentary:
      return 1.2
    case ActivityLevel.ModeratelyActive:
      return 1.375
    case ActivityLevel.VeryActive:
      return 1.55
    default:
      return 0
  }
}
function WorkoutCaloryExpenditure(
  intensity: WorkoutIntensity,
  weight: number,
  workoutTime: number,
): number {
  let MetabolicEquivalentOfTask: number

  switch (intensity) {
    case WorkoutIntensity.Light:
      MetabolicEquivalentOfTask = 4
      break
    case WorkoutIntensity.Moderate:
      MetabolicEquivalentOfTask = 6
      break
    case WorkoutIntensity.Intense:
      MetabolicEquivalentOfTask = 7
      break
  }

  return MetabolicEquivalentOfTask * weight * workoutTime
}
function CardioCaloryExpenditure(
  intensity: CardioIntensity,
  weight: number,
  workoutTime: number,
): number {
  let MetabolicEquivalentOfTask: number

  switch (intensity) {
    case CardioIntensity.Light:
      MetabolicEquivalentOfTask = 2
      break
    case CardioIntensity.Moderate:
      MetabolicEquivalentOfTask = 5
      break
    case CardioIntensity.Intense:
      MetabolicEquivalentOfTask = 7
      break
  }

  return MetabolicEquivalentOfTask * weight * workoutTime
}

type TCaloricActivity = Pick<
  TdeeSchema,
  | 'cardioIntensity'
  | 'cardioTime'
  | 'weeklyCardioFrequency'
  | 'workoutIntensity'
  | 'workoutTime'
  | 'weeklyWorkoutFrequency'
  | 'activityLevel'
>

function WeeklyCaloricExpenditure(
  bmr: number,
  caloricActivity: TCaloricActivity,
  weight: number,
): number {
  const { cardioIntensity, weeklyCardioFrequency } = caloricActivity
  const { workoutIntensity, weeklyWorkoutFrequency } = caloricActivity

  const workoutTimeInHours = caloricActivity.workoutTime / 60
  const cardioTimeInHors = caloricActivity.cardioTime / 60

  const dailyCaloricExpenditure =
    bmr * NonExerciseActivityThermogenesis(caloricActivity.activityLevel)
  const weeklyCaloricExpenditure = dailyCaloricExpenditure * 7

  const cardioCalories = CardioCaloryExpenditure(cardioIntensity, weight, cardioTimeInHors)
  const workoutCalories = WorkoutCaloryExpenditure(workoutIntensity, weight, workoutTimeInHours)

  const weeklyAdditionalCalories =
    cardioCalories * weeklyCardioFrequency + workoutCalories * weeklyWorkoutFrequency

  return weeklyAdditionalCalories + weeklyCaloricExpenditure
}

export default WeeklyCaloricExpenditure

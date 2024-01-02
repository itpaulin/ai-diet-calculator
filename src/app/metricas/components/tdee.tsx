'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, set, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Gender from '@/enums/Gender'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ITdee } from '@/models'
import { KatchMcArdle, MifflinStJeor } from '@/functions/tmb'
import { Badge } from '@/components/ui/badge'
import ActivityLevel from '@/enums/ActivityLevel'
import WorkoutIntensity from '@/enums/WorkoutIntensity'
import CardioIntensity from '@/enums/CardioIntensity'
import WeeklyCaloricExpenditure from '@/functions/activity-levels'

interface TdeeProps {
  setHasTdee: Dispatch<SetStateAction<boolean>>
  setPayload: Dispatch<SetStateAction<ITdee | undefined>>
}

export const tdeeSchema = z.object({
  gender: z.enum(['Male', 'Female']),
  age: z.coerce
    .number()
    .int({ message: 'Sua idade deve ser um numero inteiro' })
    .positive({ message: 'Sua idade deve ser um número positivo' }),
  height: z.coerce
    .number()
    .int({ message: 'Informe a altura em centímetros, sem vírgula' })
    .positive(),
  weight: z.coerce
    .number()
    .int({ message: 'Arredonde seu peso, não utilize vírgulas ou ponto' })
    .positive(),
  hasBF: z.coerce.boolean(),
  bodyFat: z.coerce.number().positive().optional(),
  activityLevel: z.nativeEnum(ActivityLevel),
  weeklyWorkoutFrequency: z.coerce.number().int().nonnegative(),
  workoutTime: z.coerce.number().int().nonnegative(),
  workoutIntensity: z.nativeEnum(WorkoutIntensity),
  weeklyCardioFrequency: z.coerce.number().int().nonnegative(),
  cardioTime: z.coerce.number().int().nonnegative(),
  cardioIntensity: z.nativeEnum(CardioIntensity),
})

export const Tdee = ({ setHasTdee, setPayload }: TdeeProps) => {
  const [output, setOutput] = useState('')
  const [bmr, setBmr] = useState<number | boolean>()
  const [dailyCaloricBurn, setDailyCaloricBurn] = useState<number>()
  const form = useForm<z.infer<typeof tdeeSchema>>({
    resolver: zodResolver(tdeeSchema),
    defaultValues: {
      age: undefined,
      bodyFat: undefined,
      height: undefined,
      weight: undefined,
      hasBF: undefined,
      activityLevel: undefined,
      weeklyWorkoutFrequency: undefined,
      weeklyCardioFrequency: undefined,
      workoutIntensity: undefined,
      cardioIntensity: undefined,
      cardioTime: undefined,
    },
  })
  const handleBmr = (values: z.infer<typeof tdeeSchema>) => {
    if (values.hasBF === true) {
      if (values.bodyFat && values.bodyFat > 0) {
        setBmr(KatchMcArdle(values.weight, values.bodyFat))
      }
    } else {
      setBmr(MifflinStJeor(values))
    }
  }
  const handleDailyCaloricBurn = (values: z.infer<typeof tdeeSchema>) => {
    if (typeof bmr === 'number') {
      const weeklyCaloricExpenditure = WeeklyCaloricExpenditure(bmr, values, values.weight)
      setDailyCaloricBurn(weeklyCaloricExpenditure / 7)
    }
    return
  }
  const watchFieldsBmr = form.watch(['gender', 'age', 'height', 'weight', 'hasBF', 'bodyFat'])

  useEffect(() => {
    const [gender, age, height, weight, hasBF, bodyFat] = watchFieldsBmr
    setBmr(false)
    if (gender && age && height && weight && hasBF !== undefined) {
      handleBmr(form.getValues())
    }
  }, [watchFieldsBmr, form.getValues('bodyFat')])

  const watchFieldsDailyCaloricBurn = form.watch([
    'activityLevel',
    'weeklyWorkoutFrequency',
    'workoutTime',
    'workoutIntensity',
    'weeklyCardioFrequency',
    'cardioTime',
    'cardioIntensity',
  ])

  useEffect(() => {
    const [
      activityLevel,
      weeklyWorkoutFrequency,
      workoutTime,
      workoutIntensity,
      weeklyCardioFrequency,
      cardioTime,
      cardioIntensity,
    ] = watchFieldsDailyCaloricBurn
    if (
      activityLevel &&
      weeklyWorkoutFrequency &&
      workoutTime &&
      workoutIntensity &&
      weeklyCardioFrequency &&
      cardioTime &&
      cardioIntensity
    ) {
      handleDailyCaloricBurn(form.getValues())
    }
  }, [watchFieldsDailyCaloricBurn])

  const onSubmit = (values: z.infer<typeof tdeeSchema>) => {
    setPayload(values)
    setHasTdee(true)
    setOutput(JSON.stringify(values, null, 2))
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=' grid grid-rows-2 items-center gap-4 pl-10 '
        >
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <div className='grid grid-cols-2'>
                  <FormLabel className='pt-7'>Sexo</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className=''
                      {...field}
                    >
                      {Object.keys(Gender).map((key) => (
                        <FormItem className='flex items-center space-x-1 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value={key} />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {Gender[key as keyof typeof Gender]}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='age'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <div className='grid grid-cols-2'>
                  <FormLabel>Idade</FormLabel>
                  <FormControl className=''>
                    <Input type={'number'} placeholder='Em anos' {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='height'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <div className='grid grid-cols-2'>
                  <FormLabel>Altura</FormLabel>
                  <FormControl className=''>
                    <Input type={'number'} placeholder='Em centímetros' {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='weight'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <div className='grid grid-cols-2'>
                  <FormLabel>Peso</FormLabel>
                  <FormControl>
                    <Input type={'number'} placeholder='Em quilogramas' {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='hasBF'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2'>
                <FormLabel className='flex pr-10'>Sabe seu precentual de gordura (BF%) ?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-row space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={true} />
                      </FormControl>
                      <FormLabel className='font-normal'>Sim</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={false} />
                      </FormControl>
                      <FormLabel className='font-normal'>Não</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch('hasBF') && (
            <FormField
              control={form.control}
              name='bodyFat'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <div className='grid grid-cols-2'>
                    <FormLabel>Percentual de gordura</FormLabel>
                    <FormControl className=''>
                      <Input type={'number'} placeholder='Em porcentagem' {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {bmr && (
            <div className='w-full rounded-lg bg-sky-100 text-center'>
              <span className=' text-lg font-semibold'>
                Sua taxa metabólica basal (TMB/BMR):
                <Badge className='ml-2 bg-green-500 text-sm hover:bg-green-700'>
                  {Number(bmr).toFixed(0)}
                </Badge>
              </span>
            </div>
          )}
          <FormField
            control={form.control}
            name='activityLevel'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>
                  Como você classificaria seu nível de atividade física fora da academia?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col'
                  >
                    {Object.values(ActivityLevel).map((value) => (
                      <FormItem key={value} className='items-center space-x-3'>
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className='font-normal'>{value}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='weeklyWorkoutFrequency'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel> Quantas vezes você pratica musculação por semana? </FormLabel>
                <FormControl>
                  <Input type={'number'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='workoutTime'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel> Quantas em média dura estes treinos? </FormLabel>
                <FormControl>
                  <Input type={'number'} placeholder='Em minutos' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='workoutIntensity'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Quão intenso são seus treinos de musculação?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col'
                  >
                    {Object.values(WorkoutIntensity).map((value) => (
                      <FormItem key={value} className='items-center space-x-3'>
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className='font-normal'>{value}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='weeklyCardioFrequency'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel> Quantas vezes por semana você faz cardio? </FormLabel>
                <FormControl>
                  <Input type={'number'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cardioTime'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel> Quanto esses cardios costumam durar em média?</FormLabel>
                <FormControl>
                  <Input type={'number'} placeholder='Em minutos' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cardioIntensity'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Quão intenso são suas sessões de cardio?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col'
                  >
                    {Object.values(CardioIntensity).map((value) => (
                      <FormItem key={value} className='items-center space-x-3'>
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className='font-normal'>{value}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {dailyCaloricBurn && (
            <div className='w-full rounded-lg bg-sky-100 text-center'>
              <span className=' text-lg font-semibold'>
                Sua taxa metabólica basal (TMB/BMR):
                <Badge className='ml-2 bg-green-500 text-sm hover:bg-green-700'>
                  {Number(dailyCaloricBurn).toFixed(0)}
                </Badge>
              </span>
            </div>
          )}

          <Button type='submit' className='mt-6'>
            Continuar
          </Button>
        </form>
      </Form>
      <pre>{output}</pre>
    </>
  )
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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

interface TdeeProps {
  setHasTdee: Dispatch<SetStateAction<boolean>>
  setPayload: Dispatch<SetStateAction<ITdee | undefined>>
}

const tdeeSchema = z.object({
  gender: z.nativeEnum(Gender, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_type':
          return { message: 'O sexo deve ser masculino ou feminino' }
        case 'invalid_enum_value':
          return { message: 'O sexo deve ser masculino ou feminino' }
        default:
          return { message: 'Sexo inválido' }
      }
    },
  }),
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
  activityLevel: z.nativeEnum(ActivityLevel, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_type':
          return { message: 'Selecione um nível de atividade adequado' }
        case 'invalid_enum_value':
          return { message: 'Selecione um nível de atividade adequado' }
        default:
          return { message: 'Nível inválido' }
      }
    },
  }),
})

export const Tdee = ({ setHasTdee, setPayload }: TdeeProps) => {
  const [output, setOutput] = useState('')
  const [hasBF, setHasBF] = useState<boolean>(false)
  const [bmr, setBmr] = useState<number | boolean>()
  const form = useForm<z.infer<typeof tdeeSchema>>({
    resolver: zodResolver(tdeeSchema),
    defaultValues: {
      age: undefined,
      bodyFat: undefined,
      height: undefined,
      weight: undefined,
      hasBF: undefined,
    },
  })
  const handleBmr = (values: any) => {
    if (values.hasBF === true) {
      if (values.bodyFat && values.bodyFat > 0) {
        setBmr(KatchMcArdle(values.weight, values.bodyFat))
      }
    } else {
      setBmr(MifflinStJeor(values))
    }
  }
  const watchFields = form.watch(['gender', 'age', 'height', 'weight', 'hasBF', 'bodyFat'])

  useEffect(() => {
    const [gender, age, height, weight, hasBF, bodyFat] = watchFields
    setBmr(false)
    if (gender && age && height && weight && hasBF !== undefined) {
      handleBmr(form.getValues())
    }
  }, [watchFields, form.getValues('bodyFat')])
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
              <FormItem className='grid grid-cols-2'>
                <FormLabel className='pt-7'>Sexo</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className=''
                    {...field}
                  >
                    <FormItem className='flex items-center space-x-1 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={Gender.Male} />
                      </FormControl>
                      <FormLabel className='font-normal'>Masculino</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-1 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={Gender.Female} />
                      </FormControl>
                      <FormLabel className='font-normal'>Feminino</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
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
                    <FormItem className='items-center space-x-3'>
                      <FormControl>
                        <RadioGroupItem value={ActivityLevel.Sedentary} />
                      </FormControl>
                      <FormLabel className='font-normal'>
                        Sedentário - passa o dia sentado / trabalho em escritório
                      </FormLabel>
                    </FormItem>
                    <FormItem className='items-center space-x-3'>
                      <FormControl>
                        <RadioGroupItem value={ActivityLevel.ModeratelyActive} />
                      </FormControl>
                      <FormLabel className='font-normal'>
                        Moderamente Ativo - passa parte do dia caminhando ou fazendo alguma
                        atividade
                      </FormLabel>
                    </FormItem>
                    <FormItem className='items-center space-x-3'>
                      <FormControl>
                        <RadioGroupItem value={ActivityLevel.VeryActive} />
                      </FormControl>
                      <FormLabel className='font-normal'>
                        Bastante ativo - faz trabalho braçal ou atividades físicas intensas
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' variant='outline'>
            Continuar
          </Button>
        </form>
      </Form>
      <pre>{output}</pre>
    </>
  )
}

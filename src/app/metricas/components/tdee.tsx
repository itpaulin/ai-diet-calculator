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
import React, { Dispatch, SetStateAction, useState } from 'react'
import { ITdee } from '@/models'

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
  hasBF: z.coerce.string(),
  bodyFat: z.coerce.number().positive().optional(),
})

export const Tdee = ({ setHasTdee, setPayload }: TdeeProps) => {
  const [output, setOutput] = useState('')
  const [hasBF, setHasBF] = useState<boolean>(false)
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
  const onSubmit = (values: z.infer<typeof tdeeSchema>) => {
    setPayload(values)
    setHasTdee(true)
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col items-center justify-center space-y-8'
        >
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <div className='flex px-5'>
                  <FormLabel>Sexo</FormLabel>
                  <FormControl className='ml-8 pt-2'>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex'
                      {...field}
                    >
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value='Male' />
                        </FormControl>
                        <Label className='pl-1 pt-[2px]'>Masculino</Label>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value='Female' />
                        </FormControl>
                        <Label className='pl-1 pt-[2px]'>Feminino</Label>
                      </FormItem>
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
                <div className='flex px-5'>
                  <FormLabel>Idade</FormLabel>
                  <FormControl className='ml-8'>
                    <Input type={'number'} placeholder='Sua idade' {...field} />
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
                <div className='flex px-5'>
                  <FormLabel>Altura</FormLabel>
                  <FormControl className='ml-8'>
                    <Input type={'number'} placeholder='Sua altura em cm' {...field} />
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
                <div className='flex px-5'>
                  <FormLabel>Peso</FormLabel>
                  <FormControl className='ml-8'>
                    <Input type={'number'} placeholder='Seu peso em kg' {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name='hasBF'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <div className='flex px-5'>
                  <FormLabel>Sabe seu precentual de gordura (BF%) ?</FormLabel>
                  <FormControl className='ml-8 pt-2'>
                    <RadioGroup onChange={field.onChange} className='flex'>
                      <RadioGroupItem value={true} onClick={() => setHasBF(true)} />
                      <Label className='pt-[2px]'>Sim</Label>
                      <RadioGroupItem value={false} onClick={() => setHasBF(false)} />
                      <Label className='pt-[2px]'>Não</Label>
                    </RadioGroup>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name='hasBF'
            render={({ field }) => (
              <FormItem className='flex flex-row space-y-3'>
                <FormLabel className='mr-24 flex w-24'>
                  Sabe seu precentual de gordura (BF%) ?
                </FormLabel>
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
                  <div className='flex px-5'>
                    <FormLabel>Percentual de gordura</FormLabel>
                    <FormControl className='ml-8'>
                      <Input type={'number'} placeholder='Informe o percentual' {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type='submit' variant='outline'>
            Enviar
          </Button>
        </form>
      </Form>
      <pre>{output}</pre>
    </>
  )
}

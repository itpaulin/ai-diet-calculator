'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Gender from '@/enums/Gender'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

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
  bodyFat: z.coerce.number().positive(),
})

export const Tdee = () => {
  const form = useForm<z.infer<typeof tdeeSchema>>({
    resolver: zodResolver(tdeeSchema),
    defaultValues: { age: undefined, bodyFat: undefined, height: undefined, weight: undefined },
  })
  const onSubmit = (values: z.infer<typeof tdeeSchema>) => {
    //POST
    console.log('VALUES:', values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
        <FormField
          control={form.control}
          name='hasBF'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <div className='flex px-5'>
                <FormLabel>Sabe seu precentual de gordura (BF%) ?</FormLabel>
                <FormControl className='ml-8 pt-2'>
                  <RadioGroup onChange={field.onChange} className='flex'>
                    <RadioGroupItem value='true' />
                    <Label className='pt-[2px]'>Sim</Label>
                    <RadioGroupItem value='false' />
                    <Label className='pt-[2px]'>Não</Label>
                  </RadioGroup>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <Button type='submit' variant='outline'>
          Submit
        </Button>
      </form>
    </Form>
  )
}

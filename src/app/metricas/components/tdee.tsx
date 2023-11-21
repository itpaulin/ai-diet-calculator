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

const tdeeSchema = z.object({
  age: z
    .number()
    .int({ message: 'Sua idade deve ser um numero inteiro' })
    .positive({ message: 'Sua idade deve ser um número positivo' }),
  height: z.number().int({ message: 'Informe a altura em centímetros, sem vírgula' }).positive(),
  weight: z
    .number()
    .int({ message: 'Arredonde seu peso, não utilize vírgulas ou ponto' })
    .positive(),
  bodyFat: z.number().positive(),
})

export const Tdee = () => {
  const form = useForm<z.infer<typeof tdeeSchema>>({
    resolver: zodResolver(tdeeSchema),
    defaultValues: { age: undefined, bodyFat: undefined, height: undefined, weight: undefined },
  })
  const onSubmit = (values: z.infer<typeof tdeeSchema>) => {
    //POST
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='age'
          render={({ field }) => (
            <FormItem className='grid grid-cols-2'>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type={'number'} placeholder='shadcn' {...field} />
              </FormControl>
              <FormMessage className='' />
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

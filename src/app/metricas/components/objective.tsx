'use client'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import {
  TObjective,
  wayToActiveObjectiveOptions,
  CardObjectiveOptions,
} from '@/models/objective-types'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'

const FormSchema = z
  .object({
    objective: z.enum(['Cutting', 'Maintenance', 'Bulking']),
    wayToDo: z.string(),
  })
  .refine(
    (data) => {
      const { objective, wayToDo } = data
      return wayToActiveObjectiveOptions[objective].includes(wayToDo)
    },
    {
      message: 'Invalid option for the selected objective',
      path: ['wayToDo'], // specify the path of the field this error should be attached to
    },
  )

const Objective = () => {
  const [objective, setObjective] = useState<TObjective>()
  const [options, setOptions] = useState<string[]>()
  const [label, setLabel] = useState<string>()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const handleObjective = (objective: TObjective) => {
    setObjective(objective)
  }
  useEffect(() => {
    const objectiveSelected = form.watch('objective')
    setOptions(wayToActiveObjectiveOptions[objectiveSelected])
    switch (objectiveSelected) {
      case 'Cutting':
        setLabel('Quão rápido você quer queimar gordura')
        break
      case 'Maintenance':
        setLabel(undefined)
        break
      case 'Bulking':
        setLabel('Quão rápido você quer ganhar peso')
        break
    }
    form.setValue('wayToDo', '')
  }, [form.watch('objective')])
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('caiu, data: ', data)
  }
  return (
    <div className=''>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-7 pt-4'>
          <FormField
            control={form.control}
            name='objective'
            render={({ field }) => (
              <FormControl>
                <div>
                  {CardObjectiveOptions.map(({ value, label, description }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl>
                        <Card
                          className={`hover:bg-orange-300 hover:opacity-90 ${
                            form.watch('objective') === value
                              ? 'bg-primary text-black hover:bg-primary'
                              : ''
                          }`}
                          onClick={() => form.setValue('objective', value as TObjective)}
                          {...field}
                        >
                          <CardHeader
                            className={`text-center ${
                              form.watch('objective') === value ? 'font-semibold' : ''
                            }`}
                          >
                            <CardTitle>{label}</CardTitle>
                            <CardDescription className='text-black'>{description}</CardDescription>
                          </CardHeader>
                        </Card>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  ))}
                </div>
              </FormControl>
            )}
          />
          {/* <Card
            className={`hover:bg-orange-300 hover:opacity-90 ${
              objective === 'Maintenance' ? 'bg-primary text-black hover:bg-primary' : ''
            }`}
            onClick={() => handleObjective('Maintenance')}
          >
            <CardHeader className='text-center'>
              <CardTitle>Manutenção (Manter o peso atual)</CardTitle>
              <CardDescription className='text-black'>Gastar tanto quanto come</CardDescription>
            </CardHeader>
          </Card>
          <Card
            className={`hover:bg-orange-300 hover:opacity-90 ${
              objective === 'Bulking' ? 'bg-primary text-black hover:bg-primary' : ''
            }`}
            onClick={() => handleObjective('Bulking')}
          >
            <CardHeader className='text-center'>
              <CardTitle>Bulking (Ganhar peso / Hipertrofia)</CardTitle>
              <CardDescription className='text-black'>Comer mais do que gasta</CardDescription>
            </CardHeader>
          </Card> */}

          <div className='flex flex-row justify-center gap-6'>
            {form.watch('objective') && options && (
              <FormField
                control={form.control}
                name='wayToDo'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel className='font-semibold'>{label}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex flex-col space-y-1'
                      >
                        {options.map((item: string) => (
                          <FormItem key={item} className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value={item} />
                            </FormControl>
                            <FormLabel className='font-normal'>{item}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <Button type='submit' disabled={form.watch('wayToDo') === undefined}>
            Seguir
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Objective

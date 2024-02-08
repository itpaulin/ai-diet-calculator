'use client'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
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

interface ObjectiveProps {
  setHasObjective: Dispatch<SetStateAction<boolean>>
  setTmb: Dispatch<SetStateAction<number>>
  setTab: Dispatch<SetStateAction<string>>
}
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

const Objective = ({ setTab, setHasObjective, setTmb }: ObjectiveProps) => {
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
    switch (data.objective) {
      case 'Cutting':
        switch (data.wayToDo) {
          case wayToActiveObjectiveOptions.Cutting[0]:
            setTmb((prev) => prev - 250)
            break
          case wayToActiveObjectiveOptions.Cutting[1]:
            setTmb((prev) => prev - 500)
            break
          case wayToActiveObjectiveOptions.Cutting[2]:
            setTmb((prev) => prev - 750)
            break
        }
        break
      case 'Maintenance':
        break
      case 'Bulking':
        switch (data.wayToDo) {
          case wayToActiveObjectiveOptions.Bulking[0]:
            setTmb((prev) => prev * 1.05)
            break
          case wayToActiveObjectiveOptions.Bulking[1]:
            setTmb((prev) => prev * 1.1)
            break
          case wayToActiveObjectiveOptions.Bulking[2]:
            setTmb((prev) => prev * 1.15)
            break
        }
        break
    }
    setHasObjective(true)
    setTab('macros')
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

          <div className='gap-6 pl-5'>
            {form.watch('objective') && options && (
              <FormField
                control={form.control}
                name='wayToDo'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel className=' font-semibold'>{label}</FormLabel>
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

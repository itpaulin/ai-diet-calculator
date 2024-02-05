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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Macros } from '@/models/macros'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
interface MacrosProps {
  setHasMacros: Dispatch<SetStateAction<boolean>>
  setTab: Dispatch<SetStateAction<string>>
  weight: number
  tmb: number
  setMacrosGrams: Dispatch<SetStateAction<Macros>>
}
const FormSchemaCustom = z
  .object({
    fat: z.coerce.number().positive().max(100),
    protein: z.coerce.number().positive().max(100),
    carbohydrate: z.coerce.number().positive().max(100),
  })
  .optional()
const FormSchemaPreset = z.object({
  protein: z.coerce.number().positive().max(2).min(1.6),
  fat: z.coerce.number().positive().max(1).min(0.5),
})
const Macros = ({ setTab, setHasMacros, weight, tmb, setMacrosGrams }: MacrosProps) => {
  const form = useForm({
    resolver: zodResolver(FormSchemaCustom),
    defaultValues: {
      fat: 0,
      protein: 0,
      carbohydrate: 0,
    },
  })
  const formPreset = useForm({
    resolver: zodResolver(FormSchemaPreset),
    defaultValues: {
      protein: '2',
      fat: '1',
    },
  })
  const onSubmitCustom = (values: z.infer<typeof FormSchemaCustom>) => {
    if (values) {
      const protein = ((values.protein / 100) * tmb) / 4
      const fat = ((values.fat / 100) * tmb) / 9
      const carbohydrate = ((values.carbohydrate / 100) * tmb) / 4
      // using ~~ operator
      setMacrosGrams({ protein: ~~protein, fat: ~~fat, carbohydrate: ~~carbohydrate })
      setHasMacros(true)
    }
  }
  const onSubmitPreset = (values: z.infer<typeof FormSchemaPreset>) => {
    const protein = Math.round(weight * values.protein)
    const fat = Math.round(weight * values.fat)
    const remainingCalorie = fat * 9 + protein * 4
    const carbohydrate = Math.round((tmb - remainingCalorie) / 4)
    // usingo math round
    setMacrosGrams({ protein: protein, fat: fat, carbohydrate: carbohydrate })
    setHasMacros(true)
    setTab('meals')
  }
  return (
    <div>
      <Tabs className=' pt-4 text-center' defaultValue='preset'>
        <TabsList className='rounded-sm bg-primary text-black'>
          <TabsTrigger value='preset'>Predefinida G</TabsTrigger>
          <TabsTrigger value='custom'>Percentual %</TabsTrigger>
        </TabsList>
        <TabsContent value='custom'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitCustom)}
              className='flex flex-col items-center justify-center text-center'
            >
              <Label className='p-5 text-lg font-semibold'>
                Informe a porcentagem % que deseja de acordo com os macro nutrientes:
              </Label>
              <div className='flex flex-col gap-8'>
                <FormField
                  control={form.control}
                  name='protein'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-2'>
                      <FormLabel className='pt-3'>Proteínas</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='%' {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='fat'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-2'>
                      <FormLabel className='pt-3'>Gorduras</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='%' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='carbohydrate'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-2'>
                      <FormLabel className='pt-3'>Carboidratos</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='%' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit'>Seguir</Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value='preset'>
          <Form {...formPreset}>
            <form
              onSubmit={formPreset.handleSubmit((values) =>
                onSubmitPreset({ protein: Number(values.protein), fat: Number(values.fat) }),
              )}
            >
              <FormField
                control={formPreset.control}
                name='protein'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='flex pr-10'>Proteína (4 calorias por grama)</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value}
                        className='flex flex-row space-y-1'
                      >
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='1.6' />
                          </FormControl>
                          <FormLabel className='text-base font-normal'>1.6 gramas por kg</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='1.8' />
                          </FormControl>
                          <FormLabel className='text-base font-normal'>1.8 gramas por kg</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='2' />
                          </FormControl>
                          <FormLabel className='text-base font-normal'>2 gramas por kg</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formPreset.control}
                name='fat'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='flex pr-10'>Gordura (9 calorias por grama)</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex flex-row space-y-1'
                      >
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='0.5' />
                          </FormControl>
                          <FormLabel className='text-base font-normal'>0.5 gramas por kg</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='0.7' />
                          </FormControl>
                          <FormLabel className='text-base font-normal'>0.7 gramas por kg</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='1' />
                          </FormControl>
                          <FormLabel className='text-base font-normal'>1 gramas por kg</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='pt-4 text-start'>
                <FormLabel>Carboidrato (4 calorias por grama)</FormLabel>
                <p>
                  A quantidade de carboidratos é calculado com o restante das suas calorias
                  subtraindo proteínas e gorduras.
                </p>
              </div>
              <div className='p-4'>
                <Button type='submit' className='w-[332px] p-4'>
                  Seguir
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Macros

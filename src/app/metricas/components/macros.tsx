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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchemaCustom = z.object({
  fat: z.coerce.number().positive().max(100),
  protein: z.coerce.number().positive().max(100),
  carbohydrate: z.coerce.number().positive().max(100),
})
const Macros = () => {
  const form = useForm({
    resolver: zodResolver(FormSchemaCustom),
    defaultValues: {
      fat: 0,
      protein: 0,
      carbohydrate: 0,
    },
  })
  const onSubmit = (values: z.infer<typeof FormSchemaCustom>) => {
    console.log(values)
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
              onSubmit={form.handleSubmit(onSubmit)}
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
                        <Input type='number' placeholder='%' {...field} />
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
                <Button type='submit'>Submit</Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Macros

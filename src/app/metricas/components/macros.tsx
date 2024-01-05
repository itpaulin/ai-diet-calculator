import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchemaCustom = z.object({
  fat: z.coerce.number().positive(),
  protein: z.coerce.number().positive(),
  carbohydrate: z.coerce.number().positive(),
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
    <div className='flex flex-row justify-center '>
      <Tabs className='pt-4' defaultValue='preset'>
        <TabsList className='rounded-sm bg-primary text-black'>
          <TabsTrigger value='preset'>Predefinida G</TabsTrigger>
          <TabsTrigger value='custom'>Percentual %</TabsTrigger>
        </TabsList>
        <TabsContent value='preset'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* <FormField 
                control={form.control}
                name=""
                render={({field}) = > (
                  <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem> */}
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Macros

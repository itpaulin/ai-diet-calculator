'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'

const FormSchema = z.object({
  changeMessage: z
    .string()
    .max(500, { message: 'A alteração nao deve ultrapassar 500 caracteres' }),
})

const AiResults = () => {
  const [changeMessage, setChangeMessage] = useState<string>()
  const [changed, setChanged] = useState<boolean>(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    //handle inicial com dados
  }, [])
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    //handle to OpenAI API
    setChanged(true)
  }
  return (
    <ScrollArea>
      <div className='py-10 pl-4 text-start'>seu plano alimentar: -TAL -Tal -Tal</div>
      {!changed && (
        <div className='flex flex-col'>
          <h3 className='text-center '>
            Gostaria de realizar alguma alteração no seu plano alimentar? ex: Trocar alimentos ou
            declarar alergias alimentares
            <span className='block font-semibold'>
              Aviso: Só será permitido alteração uma única vez
            </span>
          </h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col justify-center space-y-6 pt-5'
            >
              <FormField
                control={form.control}
                name='changeMessage'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-center justify-center text-center'>
                    <FormControl>
                      <Textarea
                        placeholder='Faça uma mensagem curta e direta sobre as alterações'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={!form.watch('changeMessage')}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      )}
      {changeMessage && (
        <div className='flex items-center justify-center'>
          <Button className='mt-5 p-5'>Enviar</Button>
        </div>
      )}
    </ScrollArea>
  )
}

export default AiResults

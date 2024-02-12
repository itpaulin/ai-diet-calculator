'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useCompletion } from 'ai/react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { useCallback, useEffect, useState } from 'react'
import { Macros } from '@/models/macros'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
interface AiResultsProps {
  quantityMeals: number
  macros: Macros
  tmb: number
}

const FormSchema = z.object({
  changeMessage: z
    .string()
    .max(500, { message: 'A alteração não deve ultrapassar 500 carácteres' }),
})

const AiResults = ({ quantityMeals, macros, tmb }: AiResultsProps) => {
  const [changeMessage, setChangeMessage] = useState<string>()
  const [changed, setChanged] = useState<boolean>(false)
  const [messages, setMessages] = useState<string>()
  const [isLoadingFirstDiet, setIsLoadingFirstDiet] = useState<boolean>(true)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const { completion, complete, isLoading } = useCompletion({
    api: '/api/change-diet',
    onFinish: () => {
      setChanged(true)
    },
  })
  useEffect(() => {
    fetch('api/generate-diet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Faça uma dieta de ${tmb} calorias para mim com ${quantityMeals} refeições por dia batendo ${macros.protein}g de proteina, ${macros.carbohydrate}g de carboidrato e ${macros.fat}g de gordura.`,
      }),
    })
      .then((res: Response) => res.text())
      .then((text: string) => {
        setMessages(text)
        setIsLoadingFirstDiet(false)
      })
  }, [])

  const changeDiet = useCallback(
    async ({ changeMessage }: z.infer<typeof FormSchema>) => {
      const completion = await complete(changeMessage)
      const requestString = `Essa é minha dieta ${messages!}, eu desejo fazer essas alterações: ${changeMessage}. Me devolva ela estruturada em forma de cardápio.`
      if (!completion) throw new Error('Failed to change diet')
      // setChanged(true)
      // setMessages((messages) => [...messages!, completion])
    },
    [complete],
  )
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    changeDiet(data)
  }
  return (
    <>
      {isLoadingFirstDiet ? (
        <div className='flex items-center justify-center pt-32'>
          <Badge>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Gerando dieta
          </Badge>
        </div>
      ) : (
        <ScrollArea>
          <div className='py-10 pl-4 text-start '>
            <p className='whitespace-pre-wrap'>{messages}</p>
          </div>
          {completion != '' && (
            <div className='py-10 pl-4 text-start'>
              <p className='whitespace-pre-wrap'>{completion}</p>
            </div>
          )}
          {!changed && (
            <div className='flex flex-col'>
              <h3 className='text-center '>
                Gostaria de realizar alguma alteração no seu plano alimentar? ex: Trocar alimentos
                ou declarar alergias alimentares
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
                  <div className='flex items-center justify-center'>
                    <Button className='mt-5 p-5' type='submit' disabled={isLoading}>
                      {isLoading === true ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          'Carregando'
                        </>
                      ) : (
                        'Enviar'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </ScrollArea>
      )}
    </>
  )
}

export default AiResults

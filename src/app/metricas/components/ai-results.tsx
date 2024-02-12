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
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
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
  const [principalDiet, setPrincipalDiet] = useState<string>()
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
        setPrincipalDiet(text)
        setIsLoadingFirstDiet(false)
      })
  }, [])

  const changeDiet = useCallback(
    async ({ changeMessage }: z.infer<typeof FormSchema>) => {
      const requestString = `Essa é minha dieta ${principalDiet!}, eu desejo fazer essas alterações: ${changeMessage}. Me devolva ela estruturada em forma de cardápio.`
      const completion = await complete(requestString)
      if (!completion) throw new Error('Failed to change diet')
    },
    [complete],
  )
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setChanged(true)
    setChangeMessage(data.changeMessage)
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
          <div className='flex gap-3 py-10  text-start'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='https://psc2.cf2.poecdn.net/assets/_next/static/media/chatGPTAvatar.04ed8443.png' />
            </Avatar>
            <p className='whitespace-pre-wrap'>{principalDiet}</p>
          </div>
          {changeMessage != undefined && (
            <>
              <Separator />
              <div className='flex items-center justify-end gap-3 py-10 text-end'>
                <p className='whitespace-pre-wrap'>{changeMessage}</p>
                <Avatar className='h-14 w-14'>
                  <AvatarImage src='https://cdn.icon-icons.com/icons2/1260/PNG/512/1496676192-jd17_84602.png' />
                </Avatar>
              </div>
            </>
          )}
          {completion != '' && (
            <>
              <Separator />
              <div className='flex gap-3 py-10 text-start'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src='https://psc2.cf2.poecdn.net/assets/_next/static/media/chatGPTAvatar.04ed8443.png' />
                </Avatar>
                <p className='whitespace-pre-wrap'>{completion}</p>
              </div>
            </>
          )}
          {!changed && (
            <>
              <Separator />
              <div className='flex flex-col'>
                <h3 className='text-center text-lg font-normal'>
                  Gostaria de realizar alguma alteração no seu plano alimentar? ex: Trocar alimentos
                  ou declarar alergias alimentares
                  <span className='block pt-2 text-sm font-semibold'>
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
                            Carregando
                          </>
                        ) : (
                          'Enviar'
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          )}
        </ScrollArea>
      )}
    </>
  )
}

export default AiResults

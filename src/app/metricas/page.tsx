'use client'
import { NavegationButtons } from '@/components/ui/navegation-buttons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
function Metricas() {
  return (
    <>
      <div className='px-10 py-10'>
        <Tabs className='w-[25rem]'>
          <TabsList className='grid w-full grid-cols-5'>
            <TabsTrigger value='tdee' className='rounded-2xl'>
              TDEE
            </TabsTrigger>
            <TabsTrigger value='objective' className='rounded-2xl'>
              Objetivo
            </TabsTrigger>
            <TabsTrigger value='macros' className='rounded-2xl'>
              Macros
            </TabsTrigger>
            <TabsTrigger value='chat-gpt' className='rounded-2xl'>
              IA
            </TabsTrigger>
            <TabsTrigger value='results' className='rounded-2xl'>
              Resultados
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <NavegationButtons Back={() => console.log('oi')} Next={() => console.log('oi')} />
    </>
  )
}

export default Metricas

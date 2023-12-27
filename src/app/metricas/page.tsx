'use client'
import { NavegationButtons } from '@/components/ui/navegation-buttons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { Tdee } from './components/tdee'
function Metricas() {
  const [hasTdee, setHasTdee] = useState<boolean>(false)
  const [hasGoal, setHasGoal] = useState<boolean>(false)
  const [hasMacros, setHasMacros] = useState<boolean>(false)
  const [hasDiet, setHasDiet] = useState<boolean>(false)

  return (
    <>
      <div className='px-10 py-10'>
        <Tabs defaultValue='tdee' className='w-[25rem]'>
          <TabsList className='grid w-full grid-cols-5'>
            <TabsTrigger value='tdee' className='rounded-2xl'>
              TDEE
            </TabsTrigger>
            <TabsTrigger value='objective' className='rounded-2xl' disabled={!hasTdee}>
              Objetivo
            </TabsTrigger>
            <TabsTrigger value='macros' className='rounded-2xl' disabled={!hasGoal}>
              Macros
            </TabsTrigger>
            <TabsTrigger value='chat-gpt' className='rounded-2xl' disabled={!hasMacros}>
              IA
            </TabsTrigger>
            <TabsTrigger value='results' className='rounded-2xl' disabled={!hasDiet}>
              Resultados
            </TabsTrigger>
          </TabsList>
          <TabsContent value='tdee'>
            <Tdee setHasTdee={setHasTdee} />
          </TabsContent>
        </Tabs>
      </div>
      {/* <NavegationButtons Back={() => console.log('oi')} Next={() => console.log('oi')} /> */}
    </>
  )
}

export default Metricas

'use client'
import { NavegationButtons } from '@/components/ui/navegation-buttons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { Tdee } from './components/tdee'
import { ITdee } from '@/models/tdee-interface'
import Objective from './components/objective'
import Macros from './components/macros'
import Meals from './components/meals'
import PersonalInformation from '@/models/personal-informations'
import { Macros as IMacros } from '@/models/macros'
import AiResults from './components/ai-results'
function Metricas() {
  const [tab, setTab] = useState<string>('macros')

  const [hasTdee, setHasTdee] = useState<boolean>(false)
  const [hasObjective, setHasObjective] = useState<boolean>(false)
  const [hasMacros, setHasMacros] = useState<boolean>(false)
  const [hasMeals, setHasMeals] = useState<boolean>(false)
  const [hasDiet, setHasDiet] = useState<boolean>(false)

  const [quantityMeals, setQuantityMeals] = useState<number>(0)
  const [tmb, setTmb] = useState<number>(2000)
  const [personalInformations, setPersonalInformations] = useState<PersonalInformation>({
    weight: 70,
  })
  const [macrosGrams, setMacrosGrams] = useState<IMacros>({ protein: 0, fat: 0, carbohydrate: 0 })

  const onTabChange = (value: string) => {
    setTab(value)
  }

  console.log('🚀 ~ Metricas ~ quantityMeals:', quantityMeals)
  console.log('🚀 ~ Metricas ~ tmb:', tmb)
  console.log('🚀 ~ Metricas ~ macrosGrams:', macrosGrams)
  console.log('🚀 ~ Metricas ~ personalInformations:', personalInformations)
  return (
    <>
      <div className='flex justify-center p-10'>
        <Tabs value={tab} onValueChange={onTabChange} className='w-[26rem]'>
          <TabsList className='grid w-full grid-cols-6'>
            <TabsTrigger value='tdee' className='rounded-2xl'>
              TDEE
            </TabsTrigger>
            <TabsTrigger value='objective' className='rounded-2xl' disabled={!hasTdee}>
              Objetivo
            </TabsTrigger>
            <TabsTrigger value='macros' className='rounded-2xl' disabled={!hasObjective}>
              Macros
            </TabsTrigger>
            <TabsTrigger value='meals' className='rounded-2xl' disabled={!hasMacros}>
              Refeições
            </TabsTrigger>
            <TabsTrigger value='chat-gpt' className='rounded-2xl' disabled={!hasMeals}>
              IA
            </TabsTrigger>
            <TabsTrigger value='results' className='rounded-2xl' disabled={!hasDiet}>
              Resultados
            </TabsTrigger>
          </TabsList>
          <TabsContent value='tdee'>
            <Tdee
              setTab={setTab}
              setHasTdee={setHasTdee}
              setPayload={setTmb}
              setUtils={setPersonalInformations}
            />
          </TabsContent>
          <TabsContent value='objective'>
            <Objective setTmb={setTmb} setTab={setTab} setHasObjective={setHasObjective} />
          </TabsContent>
          <TabsContent value='macros'>
            <Macros
              tmb={tmb}
              setHasMacros={setHasMacros}
              setTab={setTab}
              weight={personalInformations.weight}
              setMacrosGrams={setMacrosGrams}
            />
          </TabsContent>
          <TabsContent value='meals'>
            <Meals
              macros={macrosGrams}
              tmb={tmb}
              setTab={setTab}
              setHasMeals={setHasMeals}
              setQuantityMeals={setQuantityMeals}
            />
          </TabsContent>
          <TabsContent value='chat-gpt'>
            <AiResults />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Metricas

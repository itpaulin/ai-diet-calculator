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
function Metricas() {
  const [tab, setTab] = useState<string>('macros')
  const [hasTdee, setHasTdee] = useState<boolean>(false)
  const [hasObjective, setHasObjective] = useState<boolean>(false)
  const [hasMacros, setHasMacros] = useState<boolean>(false)
  const [hasMeals, setHasMeals] = useState<boolean>(false)
  const [hasDiet, setHasDiet] = useState<boolean>(false)
  const [tmb, setTmb] = useState<number>(2000)
  const [personalInformations, setPersonalInformations] = useState<PersonalInformation>({
    weight: 0,
  })

  const onTabChange = (value: string) => {
    setTab(value)
  }
  // alternar em apenas um ueh usando um form state...
  useEffect(() => {
    if (hasTdee === true) onTabChange('objective')
  }, [hasTdee])
  useEffect(() => {
    if (hasObjective === true) onTabChange('macros')
  }, [hasObjective])
  useEffect(() => {
    if (hasMacros === true) onTabChange('chat-gpt')
  }, [hasMacros])

  useEffect(() => {
    console.log(tmb)
  }, [tmb])
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
            <TabsTrigger value='chat-gpt' className='rounded-2xl' disabled={!hasMacros}>
              IA
            </TabsTrigger>
            <TabsTrigger value='results' className='rounded-2xl' disabled={!hasDiet}>
              Resultados
            </TabsTrigger>
          </TabsList>
          <TabsContent value='tdee'>
            <Tdee setHasTdee={setHasTdee} setPayload={setTmb} setUtils={setPersonalInformations} />
          </TabsContent>
          <TabsContent value='objective'>
            <Objective setTmb={setTmb} setHasObjective={setHasObjective} />
          </TabsContent>
          <TabsContent value='macros'>
            <Macros setHasMacros={setHasMacros} weight={personalInformations.weight} />
          </TabsContent>
          <TabsContent value='meals'>
            <Meals />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Metricas

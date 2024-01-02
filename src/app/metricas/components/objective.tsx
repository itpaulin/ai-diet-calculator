import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'

const Objective = () => {
  const [choice, setChoice] = useState<string>()

  const handleChoice = (choice: string) => {
    setChoice(choice)
  }
  useEffect(() => {
    console.log(choice)
  }, [choice])
  return (
    <div className='grid gap-7 pt-4'>
      <Card
        className={`hover:bg-orange-300 hover:opacity-90 ${
          choice === 'Cutting' ? 'bg-primary text-black hover:bg-primary' : ''
        }`}
        onClick={() => handleChoice('Cutting')}
      >
        <CardHeader className='text-center'>
          <CardTitle>Cutting (Perder peso / Definir)</CardTitle>
          <CardDescription className='text-black'>Gastar mais do come</CardDescription>
        </CardHeader>
      </Card>
      <Card
        className={`hover:bg-orange-300 hover:opacity-90 ${
          choice === 'Maintenance' ? 'bg-primary text-black hover:bg-primary' : ''
        }`}
        onClick={() => handleChoice('Maintenance')}
      >
        <CardHeader className='text-center'>
          <CardTitle>Manutenção (Manter o peso atual)</CardTitle>
          <CardDescription className='text-black'>Gastar mais do come</CardDescription>
        </CardHeader>
      </Card>
      <Card
        className={`hover:bg-orange-300 hover:opacity-90 ${
          choice === 'Bulking' ? 'bg-primary text-black hover:bg-primary' : ''
        }`}
        onClick={() => handleChoice('Bulking')}
      >
        <CardHeader className='text-center'>
          <CardTitle>Bulking (Ganhar peso / Hipertrofia)</CardTitle>
          <CardDescription className='text-black'>Gastar mais do come</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default Objective

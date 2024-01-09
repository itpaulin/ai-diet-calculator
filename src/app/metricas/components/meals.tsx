import { Button } from '@/components/ui/button'
import { useState } from 'react'

const Meals = () => {
  const [mealPerDay, setMealPerDay] = useState<number[]>([3, 4, 5, 6])
  const [quantity, setQuantity] = useState<number>(3)
  const handleQuantity = (value: number) => {
    setQuantity(value)
  }
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <span className='text-xl font-semibold'>Seus Macros Nutrientes Diários:</span>
        <span>Carboidratos: 100g | Proteínas: 250g | Gordura: 75g </span>
      </div>
      <span>Escolha como dividí-los durante o seu dia</span>
      <div className='flex flex-row'>
        <span className='pr-2 pt-2'>Quantidade de refeições:</span>
        <div className='grid-cols-6 items-center justify-center gap-2 text-center'>
          {mealPerDay.map((value) => (
            <>
              <Button
                variant={value === quantity ? 'default' : 'outline'}
                onClick={() => handleQuantity(value)}
              >
                {value}
              </Button>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default Meals

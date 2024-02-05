import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction, useState } from 'react'
import { Macros } from '@/models/macros'
interface MealsProps {
  macros: Macros
  tmb: number
  setHasMeals: Dispatch<SetStateAction<boolean>>
  setTab: Dispatch<SetStateAction<string>>
}
const Meals = ({
  setTab,
  macros: { protein, fat, carbohydrate },
  tmb,
  setHasMeals,
}: MealsProps) => {
  const [mealPerDay, setMealPerDay] = useState<number[]>([2, 3, 4, 5, 6])
  const [quantity, setQuantity] = useState<number>(4)
  const handleQuantity = (value: number) => {
    setQuantity(value)
  }
  const handlePercentageMacroGramsForCalories = (
    value: number,
    equivalentCalories: number,
  ): string => {
    return Math.round((((value / quantity) * equivalentCalories) / (tmb / quantity)) * 100) + ' %'
  }
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <span className='text-xl font-semibold'>Seus Macros Nutrientes Diários:</span>
        <table className='my-5 bg-slate-50'>
          <thead>
            <tr>
              <th className='bg-slate-100'></th>
              <th className='border px-2 font-normal'>Carboidratos</th>
              <th className='border px-2 font-normal'>Proteínas</th>
              <th className='border px-2 font-normal'>Gorduras</th>
              <th className='border px-2 font-normal'>Calorias</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border text-center'>Gramas por dia</td>
              <td className='border text-center'>{carbohydrate}g</td>
              <td className='border text-center'>{protein}g</td>
              <td className='border text-center'>{fat}g</td>
              <td className='border text-center'>{tmb}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <span className='flex justify-center text-xl font-semibold'>
        Escolha como dividí-los durante o seu dia
      </span>
      <div className='flex flex-col pt-3'>
        <span className='pr-2 pt-2 text-center font-normal '>Quantidade de refeições:</span>
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
      <div className='flex items-center justify-center pt-6'>
        <table className='border bg-slate-50'>
          <thead className='border'>
            <tr>
              <th className='p-5 text-xl'>{(tmb / quantity).toFixed(0)} Calorias por refeição</th>
            </tr>
          </thead>
          <tbody className='flex'>
            <tr className='flex flex-col '>
              <td className='border pr-16'>Carboidratos</td>
              <td className='border'>Proteínas</td>
              <td className='border'>Gorduras</td>
            </tr>
            <tr className='flex flex-col '>
              <td className='border px-6'>{(carbohydrate / quantity).toFixed(0)} gramas</td>
              <td className='border px-6'>{(protein / quantity).toFixed(0)} gramas</td>
              <td className='border px-6'>{(fat / quantity).toFixed(0)} gramas</td>
            </tr>
            <tr className='flex flex-col'>
              <td className='border pr-16'>
                {handlePercentageMacroGramsForCalories(carbohydrate, 4)}
              </td>
              <td className='border'>{handlePercentageMacroGramsForCalories(protein, 4)}</td>
              <td className='border'>{handlePercentageMacroGramsForCalories(fat, 9)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='flex justify-center p-4'>
        <Button
          onClick={() => {
            setHasMeals(true), setTab('chat-gpt')
          }}
          className='w-[332px] p-4'
        >
          Seguir
        </Button>
      </div>
    </>
  )
}

export default Meals

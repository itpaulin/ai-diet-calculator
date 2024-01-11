import { Button } from '@/components/ui/button'
import { useState } from 'react'

const Meals = () => {
  const [mealPerDay, setMealPerDay] = useState<number[]>([2, 3, 4, 5, 6])
  const [quantity, setQuantity] = useState<number>(3)
  const handleQuantity = (value: number) => {
    setQuantity(value)
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
              <td className='border text-center'>300g</td>
              <td className='border text-center'>145g</td>
              <td className='border text-center'>74g</td>
              <td className='border text-center'>3000</td>
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
              <th className='p-5 text-xl'>100 Calorias por refeição</th>
            </tr>
          </thead>
          <tbody className='flex'>
            <tr className='flex flex-col '>
              <td className='border pr-16'>Carboidratos</td>
              <td className='border'>Proteínas</td>
              <td className='border'>Gorduras</td>
            </tr>
            <tr className='flex flex-col '>
              <td className='border pr-16'>10g</td>
              <td className='border'>25g</td>
              <td className='border'>7.5g</td>
            </tr>
            <tr className='flex flex-col'>
              <td className='border pr-16'>50%</td>
              <td className='border'>10%</td>
              <td className='border'>40%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Meals

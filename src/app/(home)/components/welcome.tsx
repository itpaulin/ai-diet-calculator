import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
export const Welcome = () => {
  return (
    <>
      <div className=' mb-10 flex justify-center pt-8 text-3xl'>
        <h1 className='font-kdam font-light'>AI</h1>
        <h1 className='font-semibold'>Diets</h1>
      </div>

      <div className='mb-24 flex h-80 w-full justify-center'>
        <div className='absolute top-20'>
          <Image width={400} height={400} alt='Background Image' src='/first-image.png'></Image>
        </div>
        <Image
          width={0}
          height={0}
          alt='Background Image'
          src='/background_image.svg'
          className='flex h-[450px] w-[100vw]'
        ></Image>
      </div>
      <div className='px-4'>
        <div className='text-center'>
          <span className='text-4xl font-bold  '>
            Bem vindo à Calculdora de Dietas Inteligente!
          </span>
          <p className='pt-4 text-lg opacity-70'>
            Siga os passos para ter seu plano alimentar de acordo com seu objetivo.
          </p>
        </div>
        <div className='mb-7 mt-7 flex items-center justify-center'>
          <Link href='/metricas'>
            <Button className='h-14 w-36 text-lg'>Começar</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

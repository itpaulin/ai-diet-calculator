import Image from 'next/image'
import React from 'react'

function Home() {
  return (
    <div className='mx-3 my-20 h-full w-auto rounded-lg bg-slate-200 px-2'>
      <h1 className='text-lg font-bold uppercase'>IA Calculator</h1>
      <div className='items-center justify-center p-5'>
        <Image
          height={0}
          width={300}
          alt='personagem indeciso sobre o que comer'
          src='/first-image.png'
        ></Image>
      </div>
      <div>
        <h1 className='font-medium'>Se alimente de forma inteligente!</h1>
      </div>
    </div>
  )
}

export default Home

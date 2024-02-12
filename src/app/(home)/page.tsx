import React from 'react'
import { Welcome } from './components/welcome'
import { ModeToggle } from '@/components/ui/mode-toggle'

function Home() {
  return (
    <div className='flex flex-col items-center'>
      <Welcome />
      <ModeToggle />
    </div>
  )
}

export default Home

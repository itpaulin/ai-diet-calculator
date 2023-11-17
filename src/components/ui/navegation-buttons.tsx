'use server'
import { Button } from './button'
interface PropsNavegationButtons {
  Back: () => void
  Next: () => void
}
export const NavegationButtons = ({ Back, Next }: PropsNavegationButtons) => {
  return (
    <>
      <Button onClick={Back}>Voltar</Button>
      <Button onClick={Next}>Prosseguir</Button>
    </>
  )
}

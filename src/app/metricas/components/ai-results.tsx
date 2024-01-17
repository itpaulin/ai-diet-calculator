import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'

const AiResults = () => {
  return (
    <ScrollArea>
      <div className='py-10 pl-4 text-start'>seu plano alimentar: -TAL -Tal -Tal</div>
      <div className='flex flex-col'>
        <h3 className='text-center '>
          Gostaria de realizar alguma alteração no seu plano alimentar? ex: Trocar alimentos ou
          declarar alergias alimentares
          <span className='block font-semibold'>
            Aviso: Só será permitido alteração uma única vez
          </span>
        </h3>
        <Textarea></Textarea>
      </div>
    </ScrollArea>
  )
}

export default AiResults

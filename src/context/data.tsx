import { ITdee } from '@/models'
import { ReactNode, createContext } from 'react'

export interface IDataContext {
  tdee: ITdee
}

export const DataContext = createContext({
  tdee: null,
})

export const DataProvider = ({ children }: { children: ReactNode }) => {
  return <DataContext.Provider value={{ tdee: null }}>{children}</DataContext.Provider>
}

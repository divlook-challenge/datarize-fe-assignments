import { createContext } from 'react'

export const ToastContext = createContext({
  message: '',
  setMessage: (_message: string) => {},
})

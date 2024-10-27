import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/App'
import '@/index.css'
import '@/utils/mui/audoload'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

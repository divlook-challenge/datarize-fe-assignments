import { Snackbar } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import { ToastContext } from '@/contexts/ToastContext'
import { router } from '@/router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
})

function App() {
  const [message, setMessage] = useState('')

  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ToastContext.Provider value={{ message, setMessage }}>
          <RouterProvider router={router} />
          <Snackbar
            open={!!message}
            autoHideDuration={3000}
            onClose={() => setMessage('')}
            message={message}
          />
        </ToastContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default App

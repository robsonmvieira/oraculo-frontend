import { useEffect } from 'react'
import { QueryProvider } from '@/modules/shared'
import { AppRouter } from '@/router'
import { useAuthStore } from '@/modules/auth'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

function App() {
  const hydrate = useAuthStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return (
    <QueryProvider>
      <AppRouter />
      <Toaster />
    </QueryProvider>
  )
}

export default App

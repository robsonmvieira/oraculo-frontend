import { useEffect } from 'react'
import { QueryProvider } from '@/modules/shared'
import { AppRouter } from '@/router'
import { useAuthStore } from '@/modules/auth'
import '@/styles/globals.css'

function App() {
  const hydrate = useAuthStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  )
}

export default App

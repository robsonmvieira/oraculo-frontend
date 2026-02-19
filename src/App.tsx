import { QueryProvider } from '@/modules/shared'
import { AppRouter } from '@/router'
import '@/styles/globals.css'

function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  )
}

export default App

import { ThemeProvider } from '@/contexts/ThemeContext'
import { QueryProvider } from '@/modules/shared'
import { AppRouter } from '@/router'
import '@/styles/globals.css'

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </QueryProvider>
  )
}

export default App

import { ThemeProvider } from '@/contexts/ThemeContext'
import { AppRouter } from '@/router'
import '@/styles/globals.css'

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  )
}

export default App

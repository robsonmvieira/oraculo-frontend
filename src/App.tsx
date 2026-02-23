import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { QueryProvider } from '@/modules/shared'
import { AppRouter } from '@/router'
import { useAuthStore } from '@/modules/auth'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

function App() {
  const hydrate = useAuthStore((state) => state.hydrate)
  const user = useAuthStore((state) => state.user)
  const { i18n } = useTranslation()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  useEffect(() => {
    const lang = user?.getPreferredLanguage()
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang)
    }
  }, [user, i18n])

  return (
    <QueryProvider>
      <AppRouter />
      <Toaster />
    </QueryProvider>
  )
}

export default App

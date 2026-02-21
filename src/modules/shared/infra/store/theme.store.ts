import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = 'stalisty-theme'

function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'light' ? 'dark' : 'light'
          applyThemeToDOM(next)
          return { theme: next }
        }),
      setTheme: (theme: Theme) =>
        set(() => {
          applyThemeToDOM(theme)
          return { theme }
        }),
    }),
    {
      name: STORAGE_KEY,
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyThemeToDOM(state.theme)
        }
      },
    }
  )
)

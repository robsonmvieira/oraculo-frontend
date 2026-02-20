import { create } from 'zustand'
import type { AuthUser } from '../../domain/entities/auth-user.entity'
import type { AuthTokens } from '../../domain/entities/auth-tokens.entity'
import { container, TYPES } from '@/modules/shared'
import type { IGetMeUseCase } from '../../domain/use-cases'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isHydrated: boolean

  setAuth: (user: AuthUser, tokens: AuthTokens) => void
  setUser: (user: AuthUser) => void
  logout: () => void
  hydrate: () => Promise<void>
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isHydrated: false,

  setAuth: (user: AuthUser, tokens: AuthTokens) => {
    localStorage.setItem('access_token', tokens.getAccessToken())
    localStorage.setItem('refresh_token', tokens.getRefreshToken())
    set({ user, isAuthenticated: true })
  },

  setUser: (user: AuthUser) => {
    set({ user, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    set({ user: null, isAuthenticated: false })
  },

  hydrate: async () => {
    const token = localStorage.getItem('access_token')

    if (!token) {
      set({ isHydrated: true, isAuthenticated: false, user: null })
      return
    }

    try {
      const getMeUseCase = container.get<IGetMeUseCase>(TYPES.GetMeUseCase)
      const user = await getMeUseCase.execute()
      set({ user, isAuthenticated: true, isHydrated: true })
    } catch {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      set({ user: null, isAuthenticated: false, isHydrated: true })
    }
  },
}))

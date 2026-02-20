import { useMutation } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { ILoginUseCase } from '@/modules/auth/domain/use-cases'
import type { IGetMeUseCase } from '@/modules/auth/domain/use-cases'
import { useAuthStore } from '../store'

const loginUseCase = container.get<ILoginUseCase>(TYPES.LoginUseCase)
const getMeUseCase = container.get<IGetMeUseCase>(TYPES.GetMeUseCase)

interface LoginParams {
  email: string
  password: string
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      const tokens = await loginUseCase.execute(email, password)

      localStorage.setItem('access_token', tokens.getAccessToken())
      localStorage.setItem('refresh_token', tokens.getRefreshToken())

      const user = await getMeUseCase.execute()

      return { tokens, user }
    },
    onSuccess: ({ tokens, user }) => {
      setAuth(user, tokens)
    },
  })
}

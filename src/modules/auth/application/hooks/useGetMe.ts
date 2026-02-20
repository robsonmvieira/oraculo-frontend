import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetMeUseCase } from '@/modules/auth/domain/use-cases'

const getMeUseCase = container.get<IGetMeUseCase>(TYPES.GetMeUseCase)

export const AUTH_ME_QUERY_KEY = ['auth', 'me'] as const

export function useGetMe(enabled = true) {
  return useQuery({
    queryKey: AUTH_ME_QUERY_KEY,
    queryFn: () => getMeUseCase.execute(),
    enabled: enabled && Boolean(localStorage.getItem('access_token')),
  })
}

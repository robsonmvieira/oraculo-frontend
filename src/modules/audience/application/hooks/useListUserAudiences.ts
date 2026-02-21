import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IListUserAudiencesUseCase } from '@/modules/audience/domain/use-cases'

const listUserAudiencesUseCase = container.get<IListUserAudiencesUseCase>(TYPES.ListUserAudiencesUseCase)

export const AUDIENCES_QUERY_KEY = ['audiences'] as const

export function useListUserAudiences() {
  return useQuery({
    queryKey: AUDIENCES_QUERY_KEY,
    queryFn: () => listUserAudiencesUseCase.execute(),
  })
}

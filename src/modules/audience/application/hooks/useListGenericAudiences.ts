import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IListGenericAudiencesUseCase } from '@/modules/audience/domain/use-cases'

const listGenericAudiencesUseCase = container.get<IListGenericAudiencesUseCase>(TYPES.ListGenericAudiencesUseCase)

export const AUDIENCES_QUERY_KEY = ['audiences'] as const

export function useListGenericAudiences() {
  return useQuery({
    queryKey: AUDIENCES_QUERY_KEY,
    queryFn: () => listGenericAudiencesUseCase.execute(),
  })
}

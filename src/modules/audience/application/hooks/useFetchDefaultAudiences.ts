import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IFetchDefaultAudiencesUseCase } from '@/modules/audience/domain/use-cases'
import type { AudienceTemplate } from '../../domain/entities/AudienceTemplate.entity'

const fetchDefaultAudiencesUseCase = container.get<IFetchDefaultAudiencesUseCase>(TYPES.FetchDefaultAudiencesUseCase)

export const DEFAULT_AUDIENCES_QUERY_KEY = ['default-audiences'] as const

export function useFetchDefaultAudiences() {
  return useQuery<AudienceTemplate[], Error>({
    queryKey: DEFAULT_AUDIENCES_QUERY_KEY,
    queryFn: () => fetchDefaultAudiencesUseCase.execute(),
  })
}

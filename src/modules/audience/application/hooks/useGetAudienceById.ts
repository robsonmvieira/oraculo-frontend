import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetAudienceByIdUseCase } from '@/modules/audience/domain/use-cases'

const getAudienceByIdUseCase = container.get<IGetAudienceByIdUseCase>(
  TYPES.GetAudienceByIdUseCase
)

export const AUDIENCE_QUERY_KEY = (id: string) => ['audience', id] as const

export function useGetAudienceById(id: string) {
  return useQuery({
    queryKey: AUDIENCE_QUERY_KEY(id),
    queryFn: () => getAudienceByIdUseCase.execute(id),
    enabled: !!id,
  })
}

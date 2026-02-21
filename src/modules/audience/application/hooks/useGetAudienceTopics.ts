import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetAudienceTopicsUseCase } from '@/modules/audience/domain/use-cases'

const getAudienceTopicsUseCase = container.get<IGetAudienceTopicsUseCase>(
  TYPES.GetAudienceTopicsUseCase
)

export const AUDIENCE_TOPICS_QUERY_KEY = (audienceId: string) => ['audience-topics', audienceId] as const

export function useGetAudienceTopics(audienceId: string) {
  return useQuery({
    queryKey: AUDIENCE_TOPICS_QUERY_KEY(audienceId),
    queryFn: () => getAudienceTopicsUseCase.execute({ audienceId }),
    enabled: !!audienceId,
  })
}

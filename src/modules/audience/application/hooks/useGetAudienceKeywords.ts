import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetAudienceKeywordsUseCase } from '@/modules/audience/domain/use-cases'

const getAudienceKeywordsUseCase = container.get<IGetAudienceKeywordsUseCase>(
  TYPES.GetAudienceKeywordsUseCase
)

export const AUDIENCE_KEYWORDS_QUERY_KEY = (audienceId: string) => ['audience-keywords', audienceId] as const

export function useGetAudienceKeywords(audienceId: string) {
  return useQuery({
    queryKey: AUDIENCE_KEYWORDS_QUERY_KEY(audienceId),
    queryFn: () => getAudienceKeywordsUseCase.execute({ audienceId }),
    enabled: !!audienceId,
  })
}

import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetAudienceSuggestionsUseCase } from '@/modules/audience/domain/use-cases'

const getAudienceSuggestionsUseCase = container.get<IGetAudienceSuggestionsUseCase>(TYPES.GetAudienceSuggestionsUseCase)

export const AUDIENCE_SUGGESTIONS_QUERY_KEY = ['audience-suggestions'] as const

export function useGetAudienceSuggestions(audienceId?: string | null) {
  return useQuery({
    queryKey: [...AUDIENCE_SUGGESTIONS_QUERY_KEY, audienceId],
    queryFn: () => getAudienceSuggestionsUseCase.execute({ audienceId: audienceId! }),
    enabled: !!audienceId,
  })
}

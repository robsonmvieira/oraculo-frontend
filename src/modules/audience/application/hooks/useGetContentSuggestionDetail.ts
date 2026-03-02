import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetContentSuggestionDetailUseCase, GetContentSuggestionDetailResult } from '@/modules/audience/domain/use-cases'

const getContentSuggestionDetailUseCase = container.get<IGetContentSuggestionDetailUseCase>(
  TYPES.GetContentSuggestionDetailUseCase
)

export const CONTENT_SUGGESTION_DETAIL_QUERY_KEY = (audienceId: string, suggestionId: string) =>
  ['content-suggestion-detail', audienceId, suggestionId] as const

export function useGetContentSuggestionDetail(audienceId: string, suggestionId: string, enabled = true) {
  return useQuery<GetContentSuggestionDetailResult, Error>({
    queryKey: CONTENT_SUGGESTION_DETAIL_QUERY_KEY(audienceId, suggestionId),
    queryFn: () => getContentSuggestionDetailUseCase.execute({ audienceId, suggestionId }),
    enabled: !!audienceId && !!suggestionId && enabled,
  })
}

import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetContentSuggestionsUseCase, GetContentSuggestionsResult, GetContentSuggestionsParams } from '@/modules/audience/domain/use-cases'
import type { ContentSuggestionPriority } from '@/modules/audience/domain/entities/ContentSuggestion.entity'

const getContentSuggestionsUseCase = container.get<IGetContentSuggestionsUseCase>(
  TYPES.GetContentSuggestionsUseCase
)

export const CONTENT_SUGGESTIONS_QUERY_KEY = (audienceId: string) =>
  ['content-suggestions', audienceId] as const

export function useGetContentSuggestions(
  audienceId: string,
  options?: { priority?: ContentSuggestionPriority; limit?: number; offset?: number },
  enabled = true,
) {
  const params: GetContentSuggestionsParams = {
    audienceId,
    priority: options?.priority,
    limit: options?.limit ?? 10,
    offset: options?.offset ?? 0,
  }

  return useQuery<GetContentSuggestionsResult, Error>({
    queryKey: [...CONTENT_SUGGESTIONS_QUERY_KEY(audienceId), options?.priority, options?.offset],
    queryFn: () => getContentSuggestionsUseCase.execute(params),
    enabled: !!audienceId && enabled,
  })
}

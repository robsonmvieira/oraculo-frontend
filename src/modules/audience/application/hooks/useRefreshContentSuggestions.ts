import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IRefreshContentSuggestionsUseCase, RefreshContentSuggestionsParams } from '@/modules/audience/domain/use-cases'
import { CONTENT_SUGGESTIONS_QUERY_KEY } from './useGetContentSuggestions'

const refreshContentSuggestionsUseCase = container.get<IRefreshContentSuggestionsUseCase>(
  TYPES.RefreshContentSuggestionsUseCase
)

export function useRefreshContentSuggestions() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RefreshContentSuggestionsParams) =>
      refreshContentSuggestionsUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: CONTENT_SUGGESTIONS_QUERY_KEY(variables.audienceId),
      })
    },
  })
}

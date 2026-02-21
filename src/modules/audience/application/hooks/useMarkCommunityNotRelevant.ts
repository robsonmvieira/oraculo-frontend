import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IMarkCommunityNotRelevantUseCase, MarkCommunityNotRelevantParams, GetAudienceSuggestionsResult } from '@/modules/audience/domain/use-cases'
import { AUDIENCE_SUGGESTIONS_QUERY_KEY } from './useGetAudienceSuggestions'

const markCommunityNotRelevantUseCase = container.get<IMarkCommunityNotRelevantUseCase>(TYPES.MarkCommunityNotRelevantUseCase)

export function useMarkCommunityNotRelevant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: MarkCommunityNotRelevantParams) =>
      markCommunityNotRelevantUseCase.execute(params),
    onMutate: async (variables) => {
      const queryKey = [...AUDIENCE_SUGGESTIONS_QUERY_KEY, variables.audienceId]

      try {
        await queryClient.cancelQueries({ queryKey })

        const previous = queryClient.getQueryData<GetAudienceSuggestionsResult>(queryKey)

        if (previous?.suggestions) {
          queryClient.setQueryData<GetAudienceSuggestionsResult>(queryKey, {
            ...previous,
            suggestions: previous.suggestions.filter(
              (s) => s.subredditName !== variables.subredditName
            ),
            filteredByFeedback: (previous.filteredByFeedback ?? 0) + 1,
          })
        }

        return { previous, queryKey }
      } catch {
        return { previous: undefined, queryKey }
      }
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(context.queryKey, context.previous)
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: [...AUDIENCE_SUGGESTIONS_QUERY_KEY, variables.audienceId] })
    },
  })
}

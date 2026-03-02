import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { ISendContentSuggestionFeedbackUseCase, SendContentSuggestionFeedbackParams } from '@/modules/audience/domain/use-cases'
import { CONTENT_SUGGESTIONS_QUERY_KEY } from './useGetContentSuggestions'
import { CONTENT_SUGGESTION_DETAIL_QUERY_KEY } from './useGetContentSuggestionDetail'

const sendContentSuggestionFeedbackUseCase = container.get<ISendContentSuggestionFeedbackUseCase>(
  TYPES.SendContentSuggestionFeedbackUseCase
)

export function useSendContentSuggestionFeedback() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: SendContentSuggestionFeedbackParams) =>
      sendContentSuggestionFeedbackUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: CONTENT_SUGGESTIONS_QUERY_KEY(variables.audienceId),
      })
      queryClient.invalidateQueries({
        queryKey: CONTENT_SUGGESTION_DETAIL_QUERY_KEY(variables.audienceId, variables.suggestionId),
      })
    },
  })
}

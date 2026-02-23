import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { ITriggerTopicSentimentUseCase, TriggerTopicSentimentParams } from '@/modules/audience/domain/use-cases'
import { TOPIC_SENTIMENT_QUERY_KEY } from './useGetTopicSentiment'

const triggerTopicSentimentUseCase = container.get<ITriggerTopicSentimentUseCase>(
  TYPES.TriggerTopicSentimentUseCase
)

export function useTriggerTopicSentiment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: TriggerTopicSentimentParams) =>
      triggerTopicSentimentUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: TOPIC_SENTIMENT_QUERY_KEY(variables.audienceId, variables.topicId),
      })
    },
  })
}

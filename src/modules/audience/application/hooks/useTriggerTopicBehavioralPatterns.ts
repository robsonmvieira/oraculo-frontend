import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { ITriggerTopicBehavioralPatternsUseCase, TriggerTopicBehavioralPatternsParams } from '@/modules/audience/domain/use-cases'
import { TOPIC_BEHAVIORAL_PATTERNS_QUERY_KEY } from './useGetTopicBehavioralPatterns'

const triggerTopicBehavioralPatternsUseCase = container.get<ITriggerTopicBehavioralPatternsUseCase>(
  TYPES.TriggerTopicBehavioralPatternsUseCase
)

export function useTriggerTopicBehavioralPatterns() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: TriggerTopicBehavioralPatternsParams) =>
      triggerTopicBehavioralPatternsUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: TOPIC_BEHAVIORAL_PATTERNS_QUERY_KEY(variables.audienceId, variables.topicId),
      })
    },
  })
}

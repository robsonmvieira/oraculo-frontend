import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { ITriggerTopicDeepDiveUseCase, TriggerTopicDeepDiveParams } from '@/modules/audience/domain/use-cases'
import { TOPIC_DEEP_DIVE_QUERY_KEY } from './useGetTopicDeepDive'

const triggerTopicDeepDiveUseCase = container.get<ITriggerTopicDeepDiveUseCase>(
  TYPES.TriggerTopicDeepDiveUseCase
)

export function useTriggerTopicDeepDive() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: TriggerTopicDeepDiveParams) =>
      triggerTopicDeepDiveUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: TOPIC_DEEP_DIVE_QUERY_KEY(variables.audienceId, variables.topicId),
      })
    },
  })
}

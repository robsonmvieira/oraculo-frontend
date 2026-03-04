import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { ITriggerYouTubeValidationUseCase, TriggerYouTubeValidationParams } from '@/modules/audience/domain/use-cases'
import { YOUTUBE_VALIDATION_QUERY_KEY } from './useGetYouTubeValidation'

const triggerYouTubeValidationUseCase = container.get<ITriggerYouTubeValidationUseCase>(
  TYPES.TriggerYouTubeValidationUseCase
)

export function useTriggerYouTubeValidation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: TriggerYouTubeValidationParams) =>
      triggerYouTubeValidationUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: YOUTUBE_VALIDATION_QUERY_KEY(variables.audienceId),
      })
    },
  })
}

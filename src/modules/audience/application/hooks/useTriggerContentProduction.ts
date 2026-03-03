import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { ITriggerContentProductionUseCase, TriggerContentProductionParams } from '@/modules/audience/domain/use-cases'
import { CONTENT_DRAFTS_QUERY_KEY } from './useGetContentDrafts'

const triggerContentProductionUseCase = container.get<ITriggerContentProductionUseCase>(
  TYPES.TriggerContentProductionUseCase
)

export function useTriggerContentProduction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: TriggerContentProductionParams) =>
      triggerContentProductionUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: CONTENT_DRAFTS_QUERY_KEY(variables.audienceId, variables.suggestionId),
      })
    },
  })
}

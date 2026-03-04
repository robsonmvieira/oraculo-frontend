import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { ITriggerProductIntelligenceUseCase, TriggerProductIntelligenceParams } from '@/modules/audience/domain/use-cases'
import { PRODUCT_INTELLIGENCE_QUERY_KEY } from './useGetProductIntelligence'

const triggerProductIntelligenceUseCase = container.get<ITriggerProductIntelligenceUseCase>(
  TYPES.TriggerProductIntelligenceUseCase
)

export function useTriggerProductIntelligence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: TriggerProductIntelligenceParams) =>
      triggerProductIntelligenceUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: PRODUCT_INTELLIGENCE_QUERY_KEY(variables.audienceId),
      })
    },
  })
}

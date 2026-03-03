import { useMutation } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IAskIntentUseCase, AskIntentParams } from '@/modules/audience/domain/use-cases'

const askIntentUseCase = container.get<IAskIntentUseCase>(TYPES.AskIntentUseCase)

export function useAskIntent() {
  return useMutation({
    mutationFn: (params: AskIntentParams) => askIntentUseCase.execute(params),
  })
}

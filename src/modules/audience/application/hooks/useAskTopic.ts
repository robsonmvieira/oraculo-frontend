import { useMutation } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IAskTopicUseCase, AskTopicParams } from '@/modules/audience/domain/use-cases'

const askTopicUseCase = container.get<IAskTopicUseCase>(TYPES.AskTopicUseCase)

export function useAskTopic() {
  return useMutation({
    mutationFn: (params: AskTopicParams) => askTopicUseCase.execute(params),
  })
}

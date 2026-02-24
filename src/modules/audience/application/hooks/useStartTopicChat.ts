import { useMutation } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IStartTopicChatUseCase, StartTopicChatParams } from '@/modules/audience/domain/use-cases'

const startTopicChatUseCase = container.get<IStartTopicChatUseCase>(TYPES.StartTopicChatUseCase)

export function useStartTopicChat() {
  return useMutation({
    mutationFn: (params: StartTopicChatParams) => startTopicChatUseCase.execute(params),
  })
}

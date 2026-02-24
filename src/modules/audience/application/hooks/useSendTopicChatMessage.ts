import { useMutation } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { ISendTopicChatMessageUseCase, SendTopicChatMessageParams } from '@/modules/audience/domain/use-cases'

const sendTopicChatMessageUseCase = container.get<ISendTopicChatMessageUseCase>(TYPES.SendTopicChatMessageUseCase)

export function useSendTopicChatMessage() {
  return useMutation({
    mutationFn: (params: SendTopicChatMessageParams) => sendTopicChatMessageUseCase.execute(params),
  })
}

import { useMutation } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { ISendIntentChatMessageUseCase, SendIntentChatMessageParams } from '@/modules/audience/domain/use-cases'

const sendIntentChatMessageUseCase = container.get<ISendIntentChatMessageUseCase>(TYPES.SendIntentChatMessageUseCase)

export function useSendIntentChatMessage() {
  return useMutation({
    mutationFn: (params: SendIntentChatMessageParams) => sendIntentChatMessageUseCase.execute(params),
  })
}

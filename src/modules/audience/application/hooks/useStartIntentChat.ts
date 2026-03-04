import { useMutation } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IStartIntentChatUseCase, StartIntentChatParams } from '@/modules/audience/domain/use-cases'

const startIntentChatUseCase = container.get<IStartIntentChatUseCase>(TYPES.StartIntentChatUseCase)

export function useStartIntentChat() {
  return useMutation({
    mutationFn: (params: StartIntentChatParams) => startIntentChatUseCase.execute(params),
  })
}

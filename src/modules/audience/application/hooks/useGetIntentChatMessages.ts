import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetIntentChatMessagesUseCase } from '@/modules/audience/domain/use-cases'

const getIntentChatMessagesUseCase = container.get<IGetIntentChatMessagesUseCase>(TYPES.GetIntentChatMessagesUseCase)

export const INTENT_CHAT_MESSAGES_QUERY_KEY = 'intent-chat-messages'

export function useGetIntentChatMessages(audienceId: string, category: string, conversationId: string, enabled: boolean) {
  return useQuery({
    queryKey: [INTENT_CHAT_MESSAGES_QUERY_KEY, audienceId, category, conversationId],
    queryFn: () => getIntentChatMessagesUseCase.execute({ audienceId, category, conversationId }),
    enabled: enabled && !!conversationId,
  })
}

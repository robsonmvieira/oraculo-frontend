import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IListIntentChatConversationsUseCase } from '@/modules/audience/domain/use-cases'

const listIntentChatConversationsUseCase = container.get<IListIntentChatConversationsUseCase>(TYPES.ListIntentChatConversationsUseCase)

export const INTENT_CHAT_CONVERSATIONS_QUERY_KEY = 'intent-chat-conversations'

export function useListIntentChatConversations(audienceId: string, category: string, enabled: boolean) {
  return useQuery({
    queryKey: [INTENT_CHAT_CONVERSATIONS_QUERY_KEY, audienceId, category],
    queryFn: () => listIntentChatConversationsUseCase.execute({ audienceId, category }),
    enabled,
  })
}

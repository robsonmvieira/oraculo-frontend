import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IListTopicChatConversationsUseCase } from '@/modules/audience/domain/use-cases'

const listTopicChatConversationsUseCase = container.get<IListTopicChatConversationsUseCase>(TYPES.ListTopicChatConversationsUseCase)

export const TOPIC_CHAT_CONVERSATIONS_QUERY_KEY = 'topic-chat-conversations'

export function useListTopicChatConversations(audienceId: string, topicId: string, enabled: boolean) {
  return useQuery({
    queryKey: [TOPIC_CHAT_CONVERSATIONS_QUERY_KEY, audienceId, topicId],
    queryFn: () => listTopicChatConversationsUseCase.execute({ audienceId, topicId }),
    enabled,
  })
}

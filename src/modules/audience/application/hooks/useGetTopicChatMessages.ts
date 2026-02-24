import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetTopicChatMessagesUseCase } from '@/modules/audience/domain/use-cases'

const getTopicChatMessagesUseCase = container.get<IGetTopicChatMessagesUseCase>(TYPES.GetTopicChatMessagesUseCase)

export const TOPIC_CHAT_MESSAGES_QUERY_KEY = 'topic-chat-messages'

export function useGetTopicChatMessages(audienceId: string, topicId: string, conversationId: string, enabled: boolean) {
  return useQuery({
    queryKey: [TOPIC_CHAT_MESSAGES_QUERY_KEY, audienceId, topicId, conversationId],
    queryFn: () => getTopicChatMessagesUseCase.execute({ audienceId, topicId, conversationId }),
    enabled: enabled && !!conversationId,
  })
}

import type { TopicChatContextQuality } from '../entities/TopicConversation.entity'
import type { TopicConversationMessage } from '../entities/TopicConversationMessage.entity'

export interface GetTopicChatMessagesParams {
  audienceId: string
  topicId: string
  conversationId: string
}

export interface GetTopicChatMessagesResult {
  conversationId: string
  title: string
  contextQuality: TopicChatContextQuality
  isActive: boolean
  messages: TopicConversationMessage[]
}

export interface IGetTopicChatMessagesUseCase {
  execute(params: GetTopicChatMessagesParams): Promise<GetTopicChatMessagesResult>
}

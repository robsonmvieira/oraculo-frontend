import type { TopicChatContextQuality } from '../entities/TopicConversation.entity'

export interface SendTopicChatMessageParams {
  audienceId: string
  topicId: string
  conversationId: string
  question: string
}

export interface SendTopicChatMessageResult {
  answer: string
  contextQuality: TopicChatContextQuality
  messageId: string
  conversationId: string
  suggestion: string | null
}

export interface ISendTopicChatMessageUseCase {
  execute(params: SendTopicChatMessageParams): Promise<SendTopicChatMessageResult>
}

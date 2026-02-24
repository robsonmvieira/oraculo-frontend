import type { TopicChatContextQuality } from '../entities/TopicConversation.entity'

export interface StartTopicChatParams {
  audienceId: string
  topicId: string
}

export interface StartTopicChatResult {
  conversationId: string
  topicName: string
  contextQuality: TopicChatContextQuality
  suggestion: string | null
}

export interface IStartTopicChatUseCase {
  execute(params: StartTopicChatParams): Promise<StartTopicChatResult>
}

import type { TopicChatContextQuality } from '../entities/TopicConversation.entity'

export interface StreamTopicChatMessageParams {
  audienceId: string
  topicId: string
  conversationId: string
  question: string
}

export interface StreamTopicChatMessageDonePayload {
  answer: string
  contextQuality: TopicChatContextQuality
  messageId: string
  conversationId: string
  suggestion: string | null
  followUpSuggestions: string[]
}

export interface StreamTopicChatMessageCallbacks {
  onToken: (content: string) => void
  onDone: (payload: StreamTopicChatMessageDonePayload) => void
  onError: (error: string) => void
}

export interface IStreamTopicChatMessageUseCase {
  execute(params: StreamTopicChatMessageParams, callbacks: StreamTopicChatMessageCallbacks, signal?: AbortSignal): Promise<void>
}

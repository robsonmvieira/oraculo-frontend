import type { TopicChatContextQuality } from './TopicConversation.entity'

export type TopicChatMessageRole = 'user' | 'assistant'

interface TopicConversationMessageProps {
  messageId: string
  role: TopicChatMessageRole
  content: string
  contextQuality: TopicChatContextQuality | null
  createdAt: string
}

export class TopicConversationMessage {
  private readonly messageId: string
  private readonly role: TopicChatMessageRole
  private readonly content: string
  private readonly contextQuality: TopicChatContextQuality | null
  private readonly createdAt: string

  constructor({ messageId, role, content, contextQuality, createdAt }: TopicConversationMessageProps) {
    this.messageId = messageId
    this.role = role
    this.content = content
    this.contextQuality = contextQuality
    this.createdAt = createdAt
  }

  getMessageId(): string {
    return this.messageId
  }

  getRole(): TopicChatMessageRole {
    return this.role
  }

  getContent(): string {
    return this.content
  }

  getContextQuality(): TopicChatContextQuality | null {
    return this.contextQuality
  }

  getCreatedAt(): string {
    return this.createdAt
  }
}

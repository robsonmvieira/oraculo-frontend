import type { IntentChatContextQuality } from './IntentConversation.entity'

export type IntentChatMessageRole = 'user' | 'assistant'

interface IntentConversationMessageProps {
  messageId: string
  role: IntentChatMessageRole
  content: string
  contextQuality: IntentChatContextQuality | null
  createdAt: string
}

export class IntentConversationMessage {
  private readonly messageId: string
  private readonly role: IntentChatMessageRole
  private readonly content: string
  private readonly contextQuality: IntentChatContextQuality | null
  private readonly createdAt: string

  constructor({ messageId, role, content, contextQuality, createdAt }: IntentConversationMessageProps) {
    this.messageId = messageId
    this.role = role
    this.content = content
    this.contextQuality = contextQuality
    this.createdAt = createdAt
  }

  getMessageId(): string {
    return this.messageId
  }

  getRole(): IntentChatMessageRole {
    return this.role
  }

  getContent(): string {
    return this.content
  }

  getContextQuality(): IntentChatContextQuality | null {
    return this.contextQuality
  }

  getCreatedAt(): string {
    return this.createdAt
  }
}

export type TopicChatContextQuality = 'rich' | 'partial' | 'limited'

interface TopicConversationProps {
  conversationId: string
  title: string
  contextQuality: TopicChatContextQuality
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export class TopicConversation {
  private readonly conversationId: string
  private readonly title: string
  private readonly contextQuality: TopicChatContextQuality
  private readonly isActive: boolean
  private readonly createdAt: string
  private readonly updatedAt: string

  constructor({ conversationId, title, contextQuality, isActive, createdAt, updatedAt }: TopicConversationProps) {
    this.conversationId = conversationId
    this.title = title
    this.contextQuality = contextQuality
    this.isActive = isActive
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  getConversationId(): string {
    return this.conversationId
  }

  getTitle(): string {
    return this.title
  }

  getContextQuality(): TopicChatContextQuality {
    return this.contextQuality
  }

  getIsActive(): boolean {
    return this.isActive
  }

  getCreatedAt(): string {
    return this.createdAt
  }

  getUpdatedAt(): string {
    return this.updatedAt
  }
}

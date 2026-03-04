export type IntentChatContextQuality = 'rich' | 'limited'

interface IntentConversationProps {
  conversationId: string
  title: string
  intentCategory: string
  contextQuality: IntentChatContextQuality
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export class IntentConversation {
  private readonly conversationId: string
  private readonly title: string
  private readonly intentCategory: string
  private readonly contextQuality: IntentChatContextQuality
  private readonly isActive: boolean
  private readonly createdAt: string
  private readonly updatedAt: string

  constructor({ conversationId, title, intentCategory, contextQuality, isActive, createdAt, updatedAt }: IntentConversationProps) {
    this.conversationId = conversationId
    this.title = title
    this.intentCategory = intentCategory
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

  getIntentCategory(): string {
    return this.intentCategory
  }

  getContextQuality(): IntentChatContextQuality {
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

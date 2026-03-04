import type { IntentChatContextQuality } from '../entities/IntentConversation.entity'
import type { IntentConversationMessage } from '../entities/IntentConversationMessage.entity'

export interface GetIntentChatMessagesParams {
  audienceId: string
  category: string
  conversationId: string
}

export interface GetIntentChatMessagesResult {
  conversationId: string
  title: string
  intentCategory: string
  contextQuality: IntentChatContextQuality
  isActive: boolean
  messages: IntentConversationMessage[]
}

export interface IGetIntentChatMessagesUseCase {
  execute(params: GetIntentChatMessagesParams): Promise<GetIntentChatMessagesResult>
}

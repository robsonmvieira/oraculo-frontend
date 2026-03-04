import type { IntentConversation } from '../entities/IntentConversation.entity'

export interface ListIntentChatConversationsParams {
  audienceId: string
  category: string
}

export interface ListIntentChatConversationsResult {
  conversations: IntentConversation[]
}

export interface IListIntentChatConversationsUseCase {
  execute(params: ListIntentChatConversationsParams): Promise<ListIntentChatConversationsResult>
}

import type { IntentChatContextQuality } from '../entities/IntentConversation.entity'
import type { ThemeAnalysisWindow } from './get-audience-themes.use-case'

export interface SendIntentChatMessageParams {
  audienceId: string
  category: string
  conversationId: string
  question: string
  window: ThemeAnalysisWindow
}

export interface SendIntentChatMessageResult {
  answer: string
  contextQuality: IntentChatContextQuality
  messageId: string
  conversationId: string
  suggestion: string | null
}

export interface ISendIntentChatMessageUseCase {
  execute(params: SendIntentChatMessageParams): Promise<SendIntentChatMessageResult>
}

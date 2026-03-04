import type { IntentChatContextQuality } from '../entities/IntentConversation.entity'
import type { ThemeAnalysisWindow } from './get-audience-themes.use-case'

export interface StartIntentChatParams {
  audienceId: string
  category: string
  window: ThemeAnalysisWindow
}

export interface StartIntentChatResult {
  conversationId: string
  intentCategory: string
  contextQuality: IntentChatContextQuality
  suggestion: string | null
}

export interface IStartIntentChatUseCase {
  execute(params: StartIntentChatParams): Promise<StartIntentChatResult>
}

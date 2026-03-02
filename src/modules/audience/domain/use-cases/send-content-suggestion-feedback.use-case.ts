import type { ContentSuggestionFeedbackStatus } from '../entities/ContentSuggestion.entity'

export interface SendContentSuggestionFeedbackParams {
  audienceId: string
  suggestionId: string
  status: ContentSuggestionFeedbackStatus
}

export interface SendContentSuggestionFeedbackResult {
  suggestionId: string
  feedbackStatus: ContentSuggestionFeedbackStatus
  feedbackAt: string
}

export interface ISendContentSuggestionFeedbackUseCase {
  execute(params: SendContentSuggestionFeedbackParams): Promise<SendContentSuggestionFeedbackResult>
}

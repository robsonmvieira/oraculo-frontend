import type { ContentSuggestion, ContentSuggestionAnalysis, ContentSuggestionAnalysisStatus, ContentSuggestionFeedbackStatus, ContentSuggestionPriority } from '../entities/ContentSuggestion.entity'

export interface GetContentSuggestionsParams {
  audienceId: string
  priority?: ContentSuggestionPriority
  feedbackStatus?: ContentSuggestionFeedbackStatus | 'null'
  limit?: number
  offset?: number
}

export interface GetContentSuggestionsResult {
  status: ContentSuggestionAnalysisStatus
  analysis: ContentSuggestionAnalysis | null
  suggestions: ContentSuggestion[]
  total: number
  limit: number
  offset: number
}

export interface IGetContentSuggestionsUseCase {
  execute(params: GetContentSuggestionsParams): Promise<GetContentSuggestionsResult>
}

import type { ContentSuggestion } from '../entities/ContentSuggestion.entity'

export interface GetContentSuggestionDetailParams {
  audienceId: string
  suggestionId: string
}

export interface GetContentSuggestionDetailResult {
  suggestion: ContentSuggestion
}

export interface IGetContentSuggestionDetailUseCase {
  execute(params: GetContentSuggestionDetailParams): Promise<GetContentSuggestionDetailResult>
}

export interface RefreshContentSuggestionsParams {
  audienceId: string
}

export interface RefreshContentSuggestionsResult {
  status: 'processing' | 'already_exists'
  analysisId: string
  message: string
  modulesFound?: string[]
}

export interface IRefreshContentSuggestionsUseCase {
  execute(params: RefreshContentSuggestionsParams): Promise<RefreshContentSuggestionsResult>
}

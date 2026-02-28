import type { ThemeAnalysisWindow } from './get-audience-themes.use-case'

export interface RefreshAudienceIntentsParams {
  audienceId: string
  window: ThemeAnalysisWindow
}

export interface RefreshAudienceIntentsResult {
  status: string
  analysisId: string
}

export interface IRefreshAudienceIntentsUseCase {
  execute(params: RefreshAudienceIntentsParams): Promise<RefreshAudienceIntentsResult>
}

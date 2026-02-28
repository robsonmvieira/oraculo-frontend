import type { ThemeAnalysisWindow } from './get-audience-themes.use-case'

export interface RefreshAudienceThemesParams {
  audienceId: string
  window: ThemeAnalysisWindow
}

export interface RefreshAudienceThemesResult {
  status: string
  analysisId: string
}

export interface IRefreshAudienceThemesUseCase {
  execute(params: RefreshAudienceThemesParams): Promise<RefreshAudienceThemesResult>
}

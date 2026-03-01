import type { ThemeAnalysisWindow } from './get-audience-themes.use-case'

export interface RefreshThemeSummaryParams {
  audienceId: string
  themeId: string
  window: ThemeAnalysisWindow
}

export interface RefreshThemeSummaryResult {
  status: string
  themeId: string
  summaryId?: string
}

export interface IRefreshThemeSummaryUseCase {
  execute(params: RefreshThemeSummaryParams): Promise<RefreshThemeSummaryResult>
}

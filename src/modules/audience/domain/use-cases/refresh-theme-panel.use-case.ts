import type { ThemeAnalysisWindow } from './get-audience-themes.use-case'

export interface RefreshThemePanelParams {
  audienceId: string
  themeId: string
  window: ThemeAnalysisWindow
}

export interface RefreshThemePanelResult {
  status: string
  themeId: string
  panelId?: string
}

export interface IRefreshThemePanelUseCase {
  execute(params: RefreshThemePanelParams): Promise<RefreshThemePanelResult>
}

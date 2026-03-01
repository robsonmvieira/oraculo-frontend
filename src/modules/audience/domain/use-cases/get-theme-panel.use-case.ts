import type { ThemePanel } from '../entities/ThemePanel.entity'

export type ThemePanelStatus = 'no_panel' | 'ready'

export interface GetThemePanelParams {
  audienceId: string
  themeId: string
}

export interface GetThemePanelResult {
  status: ThemePanelStatus
  data: ThemePanel | null
}

export interface IGetThemePanelUseCase {
  execute(params: GetThemePanelParams): Promise<GetThemePanelResult>
}

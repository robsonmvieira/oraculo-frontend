import type { Theme } from '../entities/Theme.entity'

export type ThemeAnalysisWindow = 'week' | 'month'

export type ThemeAnalysisStatus = 'no_analysis' | 'processing' | 'ready' | 'failed'

export interface GetAudienceThemesParams {
  audienceId: string
  window: ThemeAnalysisWindow
}

export interface GetAudienceThemesResult {
  status: ThemeAnalysisStatus
  data: Theme[] | null
}

export interface IGetAudienceThemesUseCase {
  execute(params: GetAudienceThemesParams): Promise<GetAudienceThemesResult>
}

import type { ThemeSummary } from '../entities/ThemeSummary.entity'

export type ThemeSummaryStatus = 'no_summary' | 'ready'

export interface GetThemeSummaryParams {
  audienceId: string
  themeId: string
}

export interface GetThemeSummaryResult {
  status: ThemeSummaryStatus
  data: ThemeSummary | null
}

export interface IGetThemeSummaryUseCase {
  execute(params: GetThemeSummaryParams): Promise<GetThemeSummaryResult>
}

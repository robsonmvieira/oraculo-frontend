import type { IntentCategory } from '../entities/IntentCategory.entity'
import type { ThemeAnalysisWindow } from './get-audience-themes.use-case'

export type IntentAnalysisStatus = 'no_analysis' | 'processing' | 'ready' | 'failed'

export interface GetAudienceIntentsParams {
  audienceId: string
  window: ThemeAnalysisWindow
}

export interface GetAudienceIntentsResult {
  status: IntentAnalysisStatus
  analysisId: string | null
  totalPostsClassified: number | null
  data: IntentCategory[] | null
}

export interface IGetAudienceIntentsUseCase {
  execute(params: GetAudienceIntentsParams): Promise<GetAudienceIntentsResult>
}

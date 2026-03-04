import type { YouTubeValidation } from '../entities/YouTubeValidation.entity'

export type YouTubeValidationStatus = 'no_analysis' | 'processing' | 'ready' | 'failed'

export interface GetYouTubeValidationParams {
  audienceId: string
}

export interface GetYouTubeValidationResult {
  status: YouTubeValidationStatus
  data: YouTubeValidation | null
}

export interface IGetYouTubeValidationUseCase {
  execute(params: GetYouTubeValidationParams): Promise<GetYouTubeValidationResult>
}

import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetYouTubeValidationVideosUseCase, GetYouTubeValidationVideosParams, GetYouTubeValidationVideosResult } from '@/modules/audience/domain/use-cases'

export class GetYouTubeValidationVideosUseCase implements IGetYouTubeValidationVideosUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetYouTubeValidationVideosParams): Promise<GetYouTubeValidationVideosResult> {
    return this.audienceRepository.getYouTubeValidationVideos(params)
  }
}

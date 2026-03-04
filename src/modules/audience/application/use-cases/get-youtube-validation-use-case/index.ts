import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetYouTubeValidationUseCase, GetYouTubeValidationParams, GetYouTubeValidationResult } from '@/modules/audience/domain/use-cases'

export class GetYouTubeValidationUseCase implements IGetYouTubeValidationUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetYouTubeValidationParams): Promise<GetYouTubeValidationResult> {
    return this.audienceRepository.getYouTubeValidation(params)
  }
}

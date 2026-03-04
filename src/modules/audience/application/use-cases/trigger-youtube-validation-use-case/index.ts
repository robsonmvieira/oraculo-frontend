import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { ITriggerYouTubeValidationUseCase, TriggerYouTubeValidationParams, TriggerYouTubeValidationResult } from '@/modules/audience/domain/use-cases'

export class TriggerYouTubeValidationUseCase implements ITriggerYouTubeValidationUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: TriggerYouTubeValidationParams): Promise<TriggerYouTubeValidationResult> {
    return this.audienceRepository.triggerYouTubeValidation(params)
  }
}

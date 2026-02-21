import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IUpdateAudienceUseCase, UpdateAudienceParams, UpdateAudienceResult } from '@/modules/audience/domain/use-cases'

export class UpdateAudienceUseCase implements IUpdateAudienceUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: UpdateAudienceParams): Promise<UpdateAudienceResult> {
    return this.audienceRepository.updateAudience(params)
  }
}

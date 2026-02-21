import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { ICreateAudienceUseCase, CreateAudienceParams, CreateAudienceResult } from '@/modules/audience/domain/use-cases'

export class CreateAudienceUseCase implements ICreateAudienceUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: CreateAudienceParams): Promise<CreateAudienceResult> {
    return this.audienceRepository.createAudience(params)
  }
}

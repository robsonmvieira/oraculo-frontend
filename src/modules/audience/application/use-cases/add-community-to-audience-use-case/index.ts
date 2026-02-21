import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IAddCommunityToAudienceUseCase, AddCommunityToAudienceParams } from '@/modules/audience/domain/use-cases'

export class AddCommunityToAudienceUseCase implements IAddCommunityToAudienceUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: AddCommunityToAudienceParams): Promise<void> {
    return this.audienceRepository.addCommunityToAudience(params)
  }
}

import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IRemoveCommunityFromAudienceUseCase, RemoveCommunityFromAudienceParams } from '@/modules/audience/domain/use-cases'

export class RemoveCommunityFromAudienceUseCase implements IRemoveCommunityFromAudienceUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: RemoveCommunityFromAudienceParams): Promise<void> {
    return this.audienceRepository.removeCommunityFromAudience(params)
  }
}

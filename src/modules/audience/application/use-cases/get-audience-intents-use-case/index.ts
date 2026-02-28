import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetAudienceIntentsUseCase, GetAudienceIntentsParams, GetAudienceIntentsResult } from '@/modules/audience/domain/use-cases'

export class GetAudienceIntentsUseCase implements IGetAudienceIntentsUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetAudienceIntentsParams): Promise<GetAudienceIntentsResult> {
    return this.audienceRepository.getAudienceIntents(params)
  }
}

import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetAudienceTopicsUseCase, GetAudienceTopicsParams, GetAudienceTopicsResult } from '@/modules/audience/domain/use-cases'

export class GetAudienceTopicsUseCase implements IGetAudienceTopicsUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetAudienceTopicsParams): Promise<GetAudienceTopicsResult> {
    return this.audienceRepository.getAudienceTopics(params)
  }
}

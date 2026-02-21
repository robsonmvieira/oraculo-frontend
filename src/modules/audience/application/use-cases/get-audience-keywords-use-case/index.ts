import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetAudienceKeywordsUseCase, GetAudienceKeywordsParams, GetAudienceKeywordsResult } from '@/modules/audience/domain/use-cases'

export class GetAudienceKeywordsUseCase implements IGetAudienceKeywordsUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetAudienceKeywordsParams): Promise<GetAudienceKeywordsResult> {
    return this.audienceRepository.getAudienceKeywords(params)
  }
}

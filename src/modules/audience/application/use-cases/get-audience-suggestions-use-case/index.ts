import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetAudienceSuggestionsUseCase, GetAudienceSuggestionsParams, GetAudienceSuggestionsResult } from '@/modules/audience/domain/use-cases'

export class GetAudienceSuggestionsUseCase implements IGetAudienceSuggestionsUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetAudienceSuggestionsParams): Promise<GetAudienceSuggestionsResult> {
    return this.audienceRepository.getAudienceSuggestions(params)
  }
}

import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetContentSuggestionsUseCase, GetContentSuggestionsParams, GetContentSuggestionsResult } from '@/modules/audience/domain/use-cases'

export class GetContentSuggestionsUseCase implements IGetContentSuggestionsUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetContentSuggestionsParams): Promise<GetContentSuggestionsResult> {
    return this.audienceRepository.getContentSuggestions(params)
  }
}

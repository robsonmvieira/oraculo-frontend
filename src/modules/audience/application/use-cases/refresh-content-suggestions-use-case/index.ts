import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IRefreshContentSuggestionsUseCase, RefreshContentSuggestionsParams, RefreshContentSuggestionsResult } from '@/modules/audience/domain/use-cases'

export class RefreshContentSuggestionsUseCase implements IRefreshContentSuggestionsUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: RefreshContentSuggestionsParams): Promise<RefreshContentSuggestionsResult> {
    return this.audienceRepository.refreshContentSuggestions(params)
  }
}

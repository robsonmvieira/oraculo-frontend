import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetContentSuggestionDetailUseCase, GetContentSuggestionDetailParams, GetContentSuggestionDetailResult } from '@/modules/audience/domain/use-cases'

export class GetContentSuggestionDetailUseCase implements IGetContentSuggestionDetailUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetContentSuggestionDetailParams): Promise<GetContentSuggestionDetailResult> {
    return this.audienceRepository.getContentSuggestionDetail(params)
  }
}

import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { ISemanticSearchUseCase, SemanticSearchParams, SemanticSearchUseCaseResult } from '@/modules/audience/domain/use-cases'

export class SemanticSearchUseCase implements ISemanticSearchUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: SemanticSearchParams): Promise<SemanticSearchUseCaseResult> {
    return this.audienceRepository.semanticSearch(params)
  }
}

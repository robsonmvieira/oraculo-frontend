import type { SemanticSearchResult } from '../entities/SemanticSearchResult.entity'

export interface SemanticSearchParams {
  audienceId: string
  query: string
}

export type SemanticSearchUseCaseResult = SemanticSearchResult

export interface ISemanticSearchUseCase {
  execute(params: SemanticSearchParams): Promise<SemanticSearchUseCaseResult>
}

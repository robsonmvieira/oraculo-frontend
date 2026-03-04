import { useMutation } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { ISemanticSearchUseCase, SemanticSearchParams } from '@/modules/audience/domain/use-cases'

const semanticSearchUseCase = container.get<ISemanticSearchUseCase>(TYPES.SemanticSearchUseCase)

export function useSemanticSearch() {
  return useMutation({
    mutationFn: (params: SemanticSearchParams) => semanticSearchUseCase.execute(params),
  })
}

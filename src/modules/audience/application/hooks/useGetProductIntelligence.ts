import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetProductIntelligenceUseCase, GetProductIntelligenceResult } from '@/modules/audience/domain/use-cases'

const getProductIntelligenceUseCase = container.get<IGetProductIntelligenceUseCase>(
  TYPES.GetProductIntelligenceUseCase
)

export const PRODUCT_INTELLIGENCE_QUERY_KEY = (audienceId: string) =>
  ['product-intelligence', audienceId] as const

export function useGetProductIntelligence(audienceId: string, enabled: boolean) {
  return useQuery<GetProductIntelligenceResult, Error>({
    queryKey: PRODUCT_INTELLIGENCE_QUERY_KEY(audienceId),
    queryFn: () => getProductIntelligenceUseCase.execute({ audienceId }),
    enabled: !!audienceId && enabled,
  })
}

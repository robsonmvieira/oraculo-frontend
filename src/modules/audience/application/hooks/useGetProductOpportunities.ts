import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetProductOpportunitiesUseCase, GetProductOpportunitiesResult } from '@/modules/audience/domain/use-cases'

const getProductOpportunitiesUseCase = container.get<IGetProductOpportunitiesUseCase>(
  TYPES.GetProductOpportunitiesUseCase
)

export const PRODUCT_OPPORTUNITIES_QUERY_KEY = (audienceId: string) =>
  ['product-opportunities', audienceId] as const

export function useGetProductOpportunities(audienceId: string, enabled: boolean) {
  return useQuery<GetProductOpportunitiesResult, Error>({
    queryKey: PRODUCT_OPPORTUNITIES_QUERY_KEY(audienceId),
    queryFn: () => getProductOpportunitiesUseCase.execute({ audienceId }),
    enabled: !!audienceId && enabled,
  })
}

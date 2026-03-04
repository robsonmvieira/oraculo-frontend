import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetProductDetailUseCase, GetProductDetailResult } from '@/modules/audience/domain/use-cases'

const getProductDetailUseCase = container.get<IGetProductDetailUseCase>(
  TYPES.GetProductDetailUseCase
)

export const PRODUCT_DETAIL_QUERY_KEY = (audienceId: string, productId: string) =>
  ['product-detail', audienceId, productId] as const

export function useGetProductDetail(audienceId: string, productId: string, enabled: boolean) {
  return useQuery<GetProductDetailResult, Error>({
    queryKey: PRODUCT_DETAIL_QUERY_KEY(audienceId, productId),
    queryFn: () => getProductDetailUseCase.execute({ audienceId, productId }),
    enabled: !!audienceId && !!productId && enabled,
  })
}

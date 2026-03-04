import type { ProductProfile } from '../entities/ProductProfile.entity'

export interface GetProductDetailParams {
  audienceId: string
  productId: string
}

export interface GetProductDetailResult {
  product: ProductProfile | null
}

export interface IGetProductDetailUseCase {
  execute(params: GetProductDetailParams): Promise<GetProductDetailResult>
}

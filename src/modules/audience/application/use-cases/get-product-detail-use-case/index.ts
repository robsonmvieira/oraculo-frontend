import type { IAudienceRepository } from '@/modules/audience/domain/repositories/audience.repository'
import type { IGetProductDetailUseCase, GetProductDetailParams, GetProductDetailResult } from '@/modules/audience/domain/use-cases/get-product-detail.use-case'

export class GetProductDetailUseCase implements IGetProductDetailUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetProductDetailParams): Promise<GetProductDetailResult> {
    return this.audienceRepository.getProductDetail(params)
  }
}

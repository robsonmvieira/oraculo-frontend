import type { IAudienceRepository } from '@/modules/audience/domain/repositories/audience.repository'
import type { IGetProductIntelligenceUseCase, GetProductIntelligenceParams, GetProductIntelligenceResult } from '@/modules/audience/domain/use-cases/get-product-intelligence.use-case'

export class GetProductIntelligenceUseCase implements IGetProductIntelligenceUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetProductIntelligenceParams): Promise<GetProductIntelligenceResult> {
    return this.audienceRepository.getProductIntelligence(params)
  }
}

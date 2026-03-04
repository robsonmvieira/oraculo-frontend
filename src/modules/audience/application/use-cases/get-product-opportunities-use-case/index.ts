import type { IAudienceRepository } from '@/modules/audience/domain/repositories/audience.repository'
import type { IGetProductOpportunitiesUseCase, GetProductOpportunitiesParams, GetProductOpportunitiesResult } from '@/modules/audience/domain/use-cases/get-product-opportunities.use-case'

export class GetProductOpportunitiesUseCase implements IGetProductOpportunitiesUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetProductOpportunitiesParams): Promise<GetProductOpportunitiesResult> {
    return this.audienceRepository.getProductOpportunities(params)
  }
}

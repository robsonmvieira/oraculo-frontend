import type { ProductOpportunity } from '../entities/ProductOpportunity.entity'

export interface GetProductOpportunitiesParams {
  audienceId: string
}

export interface GetProductOpportunitiesResult {
  status: string
  opportunities: ProductOpportunity[]
}

export interface IGetProductOpportunitiesUseCase {
  execute(params: GetProductOpportunitiesParams): Promise<GetProductOpportunitiesResult>
}

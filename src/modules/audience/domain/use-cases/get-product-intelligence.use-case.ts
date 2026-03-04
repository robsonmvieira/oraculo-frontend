import type { ProductProfile } from '../entities/ProductProfile.entity'

export type ProductIntelligenceStatus = 'no_analysis' | 'processing' | 'ready' | 'failed'

export interface GetProductIntelligenceParams {
  audienceId: string
  sortBy?: 'mentions' | 'sentiment' | 'name'
  category?: string
  limit?: number
  offset?: number
}

export interface GetProductIntelligenceResult {
  status: ProductIntelligenceStatus
  totalProducts: number
  totalMentions: number
  totalOpportunities: number
  products: ProductProfile[]
  errorMessage?: string
}

export interface IGetProductIntelligenceUseCase {
  execute(params: GetProductIntelligenceParams): Promise<GetProductIntelligenceResult>
}

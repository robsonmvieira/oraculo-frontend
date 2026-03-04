import type { IAudienceRepository } from '@/modules/audience/domain/repositories/audience.repository'
import type { ITriggerProductIntelligenceUseCase, TriggerProductIntelligenceParams, TriggerProductIntelligenceResult } from '@/modules/audience/domain/use-cases/trigger-product-intelligence.use-case'

export class TriggerProductIntelligenceUseCase implements ITriggerProductIntelligenceUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: TriggerProductIntelligenceParams): Promise<TriggerProductIntelligenceResult> {
    return this.audienceRepository.triggerProductIntelligence(params)
  }
}

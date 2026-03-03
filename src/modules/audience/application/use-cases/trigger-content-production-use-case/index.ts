import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { ITriggerContentProductionUseCase, TriggerContentProductionParams, TriggerContentProductionResult } from '@/modules/audience/domain/use-cases'

export class TriggerContentProductionUseCase implements ITriggerContentProductionUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: TriggerContentProductionParams): Promise<TriggerContentProductionResult> {
    return this.audienceRepository.triggerContentProduction(params)
  }
}

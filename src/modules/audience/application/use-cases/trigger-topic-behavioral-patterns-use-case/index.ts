import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { ITriggerTopicBehavioralPatternsUseCase, TriggerTopicBehavioralPatternsParams, TriggerTopicBehavioralPatternsResult } from '@/modules/audience/domain/use-cases'

export class TriggerTopicBehavioralPatternsUseCase implements ITriggerTopicBehavioralPatternsUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: TriggerTopicBehavioralPatternsParams): Promise<TriggerTopicBehavioralPatternsResult> {
    return this.audienceRepository.triggerTopicBehavioralPatterns(params)
  }
}

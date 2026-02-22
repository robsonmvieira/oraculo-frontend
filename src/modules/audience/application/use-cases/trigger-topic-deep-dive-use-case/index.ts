import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { ITriggerTopicDeepDiveUseCase, TriggerTopicDeepDiveParams, TriggerTopicDeepDiveResult } from '@/modules/audience/domain/use-cases'

export class TriggerTopicDeepDiveUseCase implements ITriggerTopicDeepDiveUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: TriggerTopicDeepDiveParams): Promise<TriggerTopicDeepDiveResult> {
    return this.audienceRepository.triggerTopicDeepDive(params)
  }
}

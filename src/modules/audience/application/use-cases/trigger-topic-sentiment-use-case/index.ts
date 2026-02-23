import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { ITriggerTopicSentimentUseCase, TriggerTopicSentimentParams, TriggerTopicSentimentResult } from '@/modules/audience/domain/use-cases'

export class TriggerTopicSentimentUseCase implements ITriggerTopicSentimentUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: TriggerTopicSentimentParams): Promise<TriggerTopicSentimentResult> {
    return this.audienceRepository.triggerTopicSentiment(params)
  }
}

import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetTopicSentimentUseCase, GetTopicSentimentParams, GetTopicSentimentResult } from '@/modules/audience/domain/use-cases'

export class GetTopicSentimentUseCase implements IGetTopicSentimentUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetTopicSentimentParams): Promise<GetTopicSentimentResult> {
    return this.audienceRepository.getTopicSentiment(params)
  }
}

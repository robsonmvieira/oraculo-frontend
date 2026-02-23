import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetTopicBehavioralPatternsUseCase, GetTopicBehavioralPatternsParams, GetTopicBehavioralPatternsResult } from '@/modules/audience/domain/use-cases'

export class GetTopicBehavioralPatternsUseCase implements IGetTopicBehavioralPatternsUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetTopicBehavioralPatternsParams): Promise<GetTopicBehavioralPatternsResult> {
    return this.audienceRepository.getTopicBehavioralPatterns(params)
  }
}

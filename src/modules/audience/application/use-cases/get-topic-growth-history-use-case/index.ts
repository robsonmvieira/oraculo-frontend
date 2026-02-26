import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetTopicGrowthHistoryUseCase, GetTopicGrowthHistoryParams, GetTopicGrowthHistoryResult } from '@/modules/audience/domain/use-cases'

export class GetTopicGrowthHistoryUseCase implements IGetTopicGrowthHistoryUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetTopicGrowthHistoryParams): Promise<GetTopicGrowthHistoryResult> {
    return this.audienceRepository.getTopicGrowthHistory(params)
  }
}

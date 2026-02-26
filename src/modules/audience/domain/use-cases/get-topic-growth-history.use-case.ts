import type { TopicGrowthHistory } from '../entities/TopicGrowthHistory.entity'

export interface GetTopicGrowthHistoryParams {
  audienceId: string
  topicId: string
}

export interface GetTopicGrowthHistoryResult {
  data: TopicGrowthHistory | null
}

export interface IGetTopicGrowthHistoryUseCase {
  execute(params: GetTopicGrowthHistoryParams): Promise<GetTopicGrowthHistoryResult>
}

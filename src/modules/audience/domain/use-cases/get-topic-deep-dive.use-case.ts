import type { TopicDeepDive } from '../entities/TopicDeepDive.entity'

export type TopicDeepDiveStatus = 'no_analysis' | 'processing' | 'ready' | 'failed'

export interface GetTopicDeepDiveParams {
  audienceId: string
  topicId: string
}

export interface GetTopicDeepDiveResult {
  status: TopicDeepDiveStatus
  data: TopicDeepDive | null
}

export interface IGetTopicDeepDiveUseCase {
  execute(params: GetTopicDeepDiveParams): Promise<GetTopicDeepDiveResult>
}

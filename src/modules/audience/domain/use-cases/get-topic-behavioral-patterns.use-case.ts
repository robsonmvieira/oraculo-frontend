import type { TopicBehavioralPattern } from '../entities/TopicBehavioralPattern.entity'

export type TopicBehavioralPatternsStatus = 'no_analysis' | 'processing' | 'ready' | 'failed'

export interface GetTopicBehavioralPatternsParams {
  audienceId: string
  topicId: string
}

export interface GetTopicBehavioralPatternsResult {
  status: TopicBehavioralPatternsStatus
  data: TopicBehavioralPattern | null
}

export interface IGetTopicBehavioralPatternsUseCase {
  execute(params: GetTopicBehavioralPatternsParams): Promise<GetTopicBehavioralPatternsResult>
}

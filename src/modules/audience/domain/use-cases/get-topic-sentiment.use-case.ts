import type { TopicSentiment } from '../entities/TopicSentiment.entity'

export type TopicSentimentStatus = 'no_analysis' | 'processing' | 'ready' | 'failed'

export interface GetTopicSentimentParams {
  audienceId: string
  topicId: string
}

export interface GetTopicSentimentResult {
  status: TopicSentimentStatus
  data: TopicSentiment | null
}

export interface IGetTopicSentimentUseCase {
  execute(params: GetTopicSentimentParams): Promise<GetTopicSentimentResult>
}

import type { TopicAskResponse } from '../entities/TopicAskResponse.entity'

export interface AskTopicParams {
  audienceId: string
  topicId: string
  question: string
}

export type AskTopicResult = TopicAskResponse

export interface IAskTopicUseCase {
  execute(params: AskTopicParams): Promise<AskTopicResult>
}

export interface TriggerTopicSentimentParams {
  audienceId: string
  topicId: string
}

export interface TriggerTopicSentimentResult {
  status: string
  analysisId: string
}

export interface ITriggerTopicSentimentUseCase {
  execute(params: TriggerTopicSentimentParams): Promise<TriggerTopicSentimentResult>
}

export interface TriggerTopicBehavioralPatternsParams {
  audienceId: string
  topicId: string
}

export interface TriggerTopicBehavioralPatternsResult {
  status: string
  analysisId: string
}

export interface ITriggerTopicBehavioralPatternsUseCase {
  execute(params: TriggerTopicBehavioralPatternsParams): Promise<TriggerTopicBehavioralPatternsResult>
}

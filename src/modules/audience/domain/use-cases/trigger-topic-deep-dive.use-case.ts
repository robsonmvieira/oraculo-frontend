export interface TriggerTopicDeepDiveParams {
  audienceId: string
  topicId: string
}

export interface TriggerTopicDeepDiveResult {
  status: string
  analysisId: string
}

export interface ITriggerTopicDeepDiveUseCase {
  execute(params: TriggerTopicDeepDiveParams): Promise<TriggerTopicDeepDiveResult>
}

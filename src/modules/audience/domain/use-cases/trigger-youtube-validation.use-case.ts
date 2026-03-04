export interface TriggerYouTubeValidationParams {
  audienceId: string
  force?: boolean
}

export interface TriggerYouTubeValidationResult {
  status: string
  validationId: string
  topicsCount: number
}

export interface ITriggerYouTubeValidationUseCase {
  execute(params: TriggerYouTubeValidationParams): Promise<TriggerYouTubeValidationResult>
}

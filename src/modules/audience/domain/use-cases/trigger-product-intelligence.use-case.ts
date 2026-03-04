export interface TriggerProductIntelligenceParams {
  audienceId: string
  window: 'week' | 'month'
}

export interface TriggerProductIntelligenceResult {
  status: string
  analysisId: string
  message?: string
}

export interface ITriggerProductIntelligenceUseCase {
  execute(params: TriggerProductIntelligenceParams): Promise<TriggerProductIntelligenceResult>
}

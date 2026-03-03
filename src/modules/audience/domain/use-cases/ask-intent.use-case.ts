import type { IntentAskResponse } from '../entities/IntentAskResponse.entity'

export interface AskIntentParams {
  audienceId: string
  category: string
  question: string
}

export type AskIntentResult = IntentAskResponse

export interface IAskIntentUseCase {
  execute(params: AskIntentParams): Promise<AskIntentResult>
}

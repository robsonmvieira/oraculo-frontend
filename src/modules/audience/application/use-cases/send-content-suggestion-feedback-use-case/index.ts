import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { ISendContentSuggestionFeedbackUseCase, SendContentSuggestionFeedbackParams, SendContentSuggestionFeedbackResult } from '@/modules/audience/domain/use-cases'

export class SendContentSuggestionFeedbackUseCase implements ISendContentSuggestionFeedbackUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: SendContentSuggestionFeedbackParams): Promise<SendContentSuggestionFeedbackResult> {
    return this.audienceRepository.sendContentSuggestionFeedback(params)
  }
}

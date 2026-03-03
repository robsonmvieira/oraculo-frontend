import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IAskIntentUseCase, AskIntentParams, AskIntentResult } from '@/modules/audience/domain/use-cases'

export class AskIntentUseCase implements IAskIntentUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: AskIntentParams): Promise<AskIntentResult> {
    return this.audienceRepository.askIntent(params)
  }
}

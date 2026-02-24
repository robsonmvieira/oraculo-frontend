import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IAskTopicUseCase, AskTopicParams, AskTopicResult } from '@/modules/audience/domain/use-cases'

export class AskTopicUseCase implements IAskTopicUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: AskTopicParams): Promise<AskTopicResult> {
    return this.audienceRepository.askTopic(params)
  }
}

import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IStartTopicChatUseCase, StartTopicChatParams, StartTopicChatResult } from '@/modules/audience/domain/use-cases'

export class StartTopicChatUseCase implements IStartTopicChatUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: StartTopicChatParams): Promise<StartTopicChatResult> {
    return this.audienceRepository.startTopicChat(params)
  }
}

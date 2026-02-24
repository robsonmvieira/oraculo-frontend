import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { ISendTopicChatMessageUseCase, SendTopicChatMessageParams, SendTopicChatMessageResult } from '@/modules/audience/domain/use-cases'

export class SendTopicChatMessageUseCase implements ISendTopicChatMessageUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: SendTopicChatMessageParams): Promise<SendTopicChatMessageResult> {
    return this.audienceRepository.sendTopicChatMessage(params)
  }
}

import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { ISendIntentChatMessageUseCase, SendIntentChatMessageParams, SendIntentChatMessageResult } from '@/modules/audience/domain/use-cases'

export class SendIntentChatMessageUseCase implements ISendIntentChatMessageUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: SendIntentChatMessageParams): Promise<SendIntentChatMessageResult> {
    return this.audienceRepository.sendIntentChatMessage(params)
  }
}

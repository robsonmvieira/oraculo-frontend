import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetIntentChatMessagesUseCase, GetIntentChatMessagesParams, GetIntentChatMessagesResult } from '@/modules/audience/domain/use-cases'

export class GetIntentChatMessagesUseCase implements IGetIntentChatMessagesUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetIntentChatMessagesParams): Promise<GetIntentChatMessagesResult> {
    return this.audienceRepository.getIntentChatMessages(params)
  }
}

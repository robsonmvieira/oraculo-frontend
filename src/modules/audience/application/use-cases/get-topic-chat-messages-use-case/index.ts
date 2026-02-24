import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetTopicChatMessagesUseCase, GetTopicChatMessagesParams, GetTopicChatMessagesResult } from '@/modules/audience/domain/use-cases'

export class GetTopicChatMessagesUseCase implements IGetTopicChatMessagesUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetTopicChatMessagesParams): Promise<GetTopicChatMessagesResult> {
    return this.audienceRepository.getTopicChatMessages(params)
  }
}

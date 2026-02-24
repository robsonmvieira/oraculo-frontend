import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IListTopicChatConversationsUseCase, ListTopicChatConversationsParams, ListTopicChatConversationsResult } from '@/modules/audience/domain/use-cases'

export class ListTopicChatConversationsUseCase implements IListTopicChatConversationsUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: ListTopicChatConversationsParams): Promise<ListTopicChatConversationsResult> {
    return this.audienceRepository.listTopicChatConversations(params)
  }
}

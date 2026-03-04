import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IListIntentChatConversationsUseCase, ListIntentChatConversationsParams, ListIntentChatConversationsResult } from '@/modules/audience/domain/use-cases'

export class ListIntentChatConversationsUseCase implements IListIntentChatConversationsUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: ListIntentChatConversationsParams): Promise<ListIntentChatConversationsResult> {
    return this.audienceRepository.listIntentChatConversations(params)
  }
}

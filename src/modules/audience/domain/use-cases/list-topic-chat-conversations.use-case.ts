import type { TopicConversation } from '../entities/TopicConversation.entity'

export interface ListTopicChatConversationsParams {
  audienceId: string
  topicId: string
}

export interface ListTopicChatConversationsResult {
  conversations: TopicConversation[]
}

export interface IListTopicChatConversationsUseCase {
  execute(params: ListTopicChatConversationsParams): Promise<ListTopicChatConversationsResult>
}

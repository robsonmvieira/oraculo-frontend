export interface ArchiveTopicChatParams {
  audienceId: string
  topicId: string
  conversationId: string
}

export interface ArchiveTopicChatResult {
  status: string
  conversationId: string
}

export interface IArchiveTopicChatUseCase {
  execute(params: ArchiveTopicChatParams): Promise<ArchiveTopicChatResult>
}

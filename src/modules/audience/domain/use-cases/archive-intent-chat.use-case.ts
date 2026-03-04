export interface ArchiveIntentChatParams {
  audienceId: string
  category: string
  conversationId: string
}

export interface ArchiveIntentChatResult {
  status: string
  conversationId: string
}

export interface IArchiveIntentChatUseCase {
  execute(params: ArchiveIntentChatParams): Promise<ArchiveIntentChatResult>
}

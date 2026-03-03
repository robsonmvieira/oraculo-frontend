export interface ExportTopicChatParams {
  audienceId: string
  topicId: string
  conversationId: string
}

export interface ExportTopicChatResult {
  blob: Blob
  filename: string
}

export interface IExportTopicChatUseCase {
  execute(params: ExportTopicChatParams): Promise<ExportTopicChatResult>
}

export interface ExportIntentChatParams {
  audienceId: string
  category: string
  conversationId: string
}

export interface ExportIntentChatResult {
  blob: Blob
  filename: string
}

export interface IExportIntentChatUseCase {
  execute(params: ExportIntentChatParams): Promise<ExportIntentChatResult>
}

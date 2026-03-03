import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IExportTopicChatUseCase, ExportTopicChatParams, ExportTopicChatResult } from '@/modules/audience/domain/use-cases'

export class ExportTopicChatUseCase implements IExportTopicChatUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: ExportTopicChatParams): Promise<ExportTopicChatResult> {
    return this.audienceRepository.exportTopicChat(params)
  }
}

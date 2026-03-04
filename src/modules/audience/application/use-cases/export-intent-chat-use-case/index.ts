import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IExportIntentChatUseCase, ExportIntentChatParams, ExportIntentChatResult } from '@/modules/audience/domain/use-cases'

export class ExportIntentChatUseCase implements IExportIntentChatUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: ExportIntentChatParams): Promise<ExportIntentChatResult> {
    return this.audienceRepository.exportIntentChat(params)
  }
}

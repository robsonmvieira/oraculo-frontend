import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IArchiveIntentChatUseCase, ArchiveIntentChatParams, ArchiveIntentChatResult } from '@/modules/audience/domain/use-cases'

export class ArchiveIntentChatUseCase implements IArchiveIntentChatUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: ArchiveIntentChatParams): Promise<ArchiveIntentChatResult> {
    return this.audienceRepository.archiveIntentChat(params)
  }
}

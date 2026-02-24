import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IArchiveTopicChatUseCase, ArchiveTopicChatParams, ArchiveTopicChatResult } from '@/modules/audience/domain/use-cases'

export class ArchiveTopicChatUseCase implements IArchiveTopicChatUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: ArchiveTopicChatParams): Promise<ArchiveTopicChatResult> {
    return this.audienceRepository.archiveTopicChat(params)
  }
}

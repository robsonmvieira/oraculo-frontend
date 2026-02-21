import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IMarkCommunityNotRelevantUseCase, MarkCommunityNotRelevantParams } from '@/modules/audience/domain/use-cases'

export class MarkCommunityNotRelevantUseCase implements IMarkCommunityNotRelevantUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: MarkCommunityNotRelevantParams): Promise<void> {
    return this.audienceRepository.markCommunityNotRelevant(params)
  }
}

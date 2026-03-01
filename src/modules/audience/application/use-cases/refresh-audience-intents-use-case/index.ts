import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IRefreshAudienceIntentsUseCase, RefreshAudienceIntentsParams, RefreshAudienceIntentsResult } from '@/modules/audience/domain/use-cases'

export class RefreshAudienceIntentsUseCase implements IRefreshAudienceIntentsUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: RefreshAudienceIntentsParams): Promise<RefreshAudienceIntentsResult> {
    return this.audienceRepository.refreshAudienceIntents(params)
  }
}

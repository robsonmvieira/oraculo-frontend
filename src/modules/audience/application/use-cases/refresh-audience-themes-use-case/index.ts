import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IRefreshAudienceThemesUseCase, RefreshAudienceThemesParams, RefreshAudienceThemesResult } from '@/modules/audience/domain/use-cases'

export class RefreshAudienceThemesUseCase implements IRefreshAudienceThemesUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: RefreshAudienceThemesParams): Promise<RefreshAudienceThemesResult> {
    return this.audienceRepository.refreshAudienceThemes(params)
  }
}

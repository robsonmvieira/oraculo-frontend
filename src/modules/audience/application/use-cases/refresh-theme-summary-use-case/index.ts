import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IRefreshThemeSummaryUseCase, RefreshThemeSummaryParams, RefreshThemeSummaryResult } from '@/modules/audience/domain/use-cases'

export class RefreshThemeSummaryUseCase implements IRefreshThemeSummaryUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: RefreshThemeSummaryParams): Promise<RefreshThemeSummaryResult> {
    return this.audienceRepository.refreshThemeSummary(params)
  }
}

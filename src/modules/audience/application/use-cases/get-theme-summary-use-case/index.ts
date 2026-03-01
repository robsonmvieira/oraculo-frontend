import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetThemeSummaryUseCase, GetThemeSummaryParams, GetThemeSummaryResult } from '@/modules/audience/domain/use-cases'

export class GetThemeSummaryUseCase implements IGetThemeSummaryUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetThemeSummaryParams): Promise<GetThemeSummaryResult> {
    return this.audienceRepository.getThemeSummary(params)
  }
}

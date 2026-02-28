import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetAudienceThemesUseCase, GetAudienceThemesParams, GetAudienceThemesResult } from '@/modules/audience/domain/use-cases'

export class GetAudienceThemesUseCase implements IGetAudienceThemesUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetAudienceThemesParams): Promise<GetAudienceThemesResult> {
    return this.audienceRepository.getAudienceThemes(params)
  }
}

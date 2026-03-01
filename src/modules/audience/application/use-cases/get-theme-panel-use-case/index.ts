import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetThemePanelUseCase, GetThemePanelParams, GetThemePanelResult } from '@/modules/audience/domain/use-cases'

export class GetThemePanelUseCase implements IGetThemePanelUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetThemePanelParams): Promise<GetThemePanelResult> {
    return this.audienceRepository.getThemePanel(params)
  }
}

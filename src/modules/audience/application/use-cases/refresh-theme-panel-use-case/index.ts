import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IRefreshThemePanelUseCase, RefreshThemePanelParams, RefreshThemePanelResult } from '@/modules/audience/domain/use-cases'

export class RefreshThemePanelUseCase implements IRefreshThemePanelUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: RefreshThemePanelParams): Promise<RefreshThemePanelResult> {
    return this.audienceRepository.refreshThemePanel(params)
  }
}

import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetContentDraftsUseCase, GetContentDraftsParams, GetContentDraftsResult } from '@/modules/audience/domain/use-cases'

export class GetContentDraftsUseCase implements IGetContentDraftsUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetContentDraftsParams): Promise<GetContentDraftsResult> {
    return this.audienceRepository.getContentDrafts(params)
  }
}

import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetContentDraftDetailUseCase, GetContentDraftDetailParams, GetContentDraftDetailResult } from '@/modules/audience/domain/use-cases'

export class GetContentDraftDetailUseCase implements IGetContentDraftDetailUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetContentDraftDetailParams): Promise<GetContentDraftDetailResult> {
    return this.audienceRepository.getContentDraftDetail(params)
  }
}

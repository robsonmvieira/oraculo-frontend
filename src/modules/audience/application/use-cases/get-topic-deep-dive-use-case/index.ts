import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetTopicDeepDiveUseCase, GetTopicDeepDiveParams, GetTopicDeepDiveResult } from '@/modules/audience/domain/use-cases'

export class GetTopicDeepDiveUseCase implements IGetTopicDeepDiveUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetTopicDeepDiveParams): Promise<GetTopicDeepDiveResult> {
    return this.audienceRepository.getTopicDeepDive(params)
  }
}

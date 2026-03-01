import type { IAudienceRepository } from '@/modules/audience/domain/repositories'
import type { IGetIntentPostsUseCase, GetIntentPostsParams, GetIntentPostsResult } from '@/modules/audience/domain/use-cases'

export class GetIntentPostsUseCase implements IGetIntentPostsUseCase {
  constructor(private readonly audienceRepository: IAudienceRepository) {}

  async execute(params: GetIntentPostsParams): Promise<GetIntentPostsResult> {
    return this.audienceRepository.getIntentPosts(params)
  }
}

import type { BrowseCommunitiesResponse } from '@/modules/community/domain/entities/BrowseCommunitiesResponse'
import type { ICommunityRepository } from '@/modules/community/domain/repositories'
import type { IBrowseCommunitiesUseCase } from '@/modules/community/domain/use-cases'

export class BrowseCommunitiesUseCase implements IBrowseCommunitiesUseCase {
  constructor(private readonly communityRepository: ICommunityRepository) {}

  async execute(params: { offset: number; limit: number }): Promise<BrowseCommunitiesResponse> {
    return this.communityRepository.browseCommunities(params)
  }
}

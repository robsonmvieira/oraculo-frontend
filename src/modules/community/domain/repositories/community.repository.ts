import type { BrowseCommunitiesResponse } from '../entities/BrowseCommunitiesResponse'

export interface ICommunityRepository {
  browseCommunities(params: { offset: number; limit: number }): Promise<BrowseCommunitiesResponse>
}

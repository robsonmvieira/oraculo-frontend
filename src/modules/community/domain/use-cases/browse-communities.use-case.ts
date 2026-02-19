import type { BrowseCommunitiesResponse } from '../entities/BrowseCommunitiesResponse'

export interface IBrowseCommunitiesUseCase {
  execute(params: { offset: number; limit: number }): Promise<BrowseCommunitiesResponse>
}

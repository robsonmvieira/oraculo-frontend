import type { HttpClient } from '@/modules/shared'
import { Community } from '../../domain/entities/Community.entity'
import type { BrowseCommunitiesResponse } from '../../domain/entities/BrowseCommunitiesResponse'
import type { ICommunityRepository } from '../../domain/repositories/community.repository'

interface BrowseCommunitiesApiResponse {
  communities: Array<{
    name: string
    title: string
    description: string
    subscribers: number
    icon_url: string
    growth_week: number | null
    growth_month: number | null
    category: string
  }>
  total: number
  limit: number
  offset: number
  has_more: boolean
}

export class CommunityRepository implements ICommunityRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async browseCommunities(params: { offset: number; limit: number; search?: string }): Promise<BrowseCommunitiesResponse> {
    const searchParams: Record<string, string | number> = {
      offset: params.offset,
      limit: params.limit,
    }
    if (params.search) {
      searchParams.search = params.search
    }

    const response = await this.httpClient.get<BrowseCommunitiesApiResponse>(
      'communities/browse',
      { searchParams }
    )
    return {
      communities: response.communities.map((data) => new Community(data)),
      total: response.total,
      limit: response.limit,
      offset: response.offset,
      hasMore: response.has_more,
    }
  }
}

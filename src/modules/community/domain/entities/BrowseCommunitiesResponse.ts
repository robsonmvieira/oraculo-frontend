import type { Community } from './Community.entity'

export interface BrowseCommunitiesResponse {
  communities: Community[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

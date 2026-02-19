import { useInfiniteQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IBrowseCommunitiesUseCase } from '@/modules/community/domain/use-cases'
import type { BrowseCommunitiesResponse } from '../../domain/entities/BrowseCommunitiesResponse'

const browseCommunitiesUseCase = container.get<IBrowseCommunitiesUseCase>(TYPES.BrowseCommunitiesUseCase)

const PAGE_SIZE = 20

export const BROWSE_COMMUNITIES_QUERY_KEY = ['browse-communities'] as const

export function useBrowseCommunities() {
  return useInfiniteQuery<BrowseCommunitiesResponse, Error>({
    queryKey: BROWSE_COMMUNITIES_QUERY_KEY,
    queryFn: ({ pageParam = 0 }) =>
      browseCommunitiesUseCase.execute({ offset: pageParam as number, limit: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.offset + lastPage.limit : undefined,
  })
}

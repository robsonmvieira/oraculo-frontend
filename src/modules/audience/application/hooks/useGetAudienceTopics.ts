import { useInfiniteQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetAudienceTopicsUseCase, GetAudienceTopicsResult } from '@/modules/audience/domain/use-cases'

const getAudienceTopicsUseCase = container.get<IGetAudienceTopicsUseCase>(
  TYPES.GetAudienceTopicsUseCase
)

const PAGE_SIZE = 200

export const AUDIENCE_TOPICS_QUERY_KEY = (audienceId: string) => ['audience-topics', audienceId] as const

export function useGetAudienceTopics(audienceId: string) {
  return useInfiniteQuery<GetAudienceTopicsResult, Error>({
    queryKey: AUDIENCE_TOPICS_QUERY_KEY(audienceId),
    queryFn: ({ pageParam = 0 }) =>
      getAudienceTopicsUseCase.execute({
        audienceId,
        offset: pageParam as number,
        limit: PAGE_SIZE,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.offset + lastPage.limit : undefined,
    enabled: !!audienceId,
  })
}

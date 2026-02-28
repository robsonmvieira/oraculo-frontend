import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetTopicGrowthHistoryUseCase, GetTopicGrowthHistoryResult } from '@/modules/audience/domain/use-cases'

const getTopicGrowthHistoryUseCase = container.get<IGetTopicGrowthHistoryUseCase>(
  TYPES.GetTopicGrowthHistoryUseCase
)

export const TOPIC_GROWTH_HISTORY_QUERY_KEY = (audienceId: string, topicId: string) =>
  ['topic-growth-history', audienceId, topicId] as const

export function useGetTopicGrowthHistory(audienceId: string, topicId: string, enabled: boolean) {
  return useQuery<GetTopicGrowthHistoryResult, Error>({
    queryKey: TOPIC_GROWTH_HISTORY_QUERY_KEY(audienceId, topicId),
    queryFn: () => getTopicGrowthHistoryUseCase.execute({ audienceId, topicId }),
    enabled: !!audienceId && !!topicId && enabled,
  })
}

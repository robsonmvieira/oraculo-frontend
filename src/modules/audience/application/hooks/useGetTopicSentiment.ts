import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetTopicSentimentUseCase, GetTopicSentimentResult } from '@/modules/audience/domain/use-cases'

const getTopicSentimentUseCase = container.get<IGetTopicSentimentUseCase>(
  TYPES.GetTopicSentimentUseCase
)

export const TOPIC_SENTIMENT_QUERY_KEY = (audienceId: string, topicId: string) =>
  ['topic-sentiment', audienceId, topicId] as const

export function useGetTopicSentiment(audienceId: string, topicId: string, enabled: boolean) {
  return useQuery<GetTopicSentimentResult, Error>({
    queryKey: TOPIC_SENTIMENT_QUERY_KEY(audienceId, topicId),
    queryFn: () => getTopicSentimentUseCase.execute({ audienceId, topicId }),
    enabled: !!audienceId && !!topicId && enabled,
  })
}

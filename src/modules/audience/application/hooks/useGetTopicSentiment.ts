import { useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetTopicSentimentUseCase, GetTopicSentimentResult } from '@/modules/audience/domain/use-cases'

const getTopicSentimentUseCase = container.get<IGetTopicSentimentUseCase>(
  TYPES.GetTopicSentimentUseCase
)

export const TOPIC_SENTIMENT_QUERY_KEY = (audienceId: string, topicId: string) =>
  ['topic-sentiment', audienceId, topicId] as const

const MAX_POLL_COUNT = 60

export function useGetTopicSentiment(audienceId: string, topicId: string, enabled: boolean) {
  const pollCountRef = useRef(0)

  useEffect(() => {
    pollCountRef.current = 0
  }, [topicId, enabled])

  return useQuery<GetTopicSentimentResult, Error>({
    queryKey: TOPIC_SENTIMENT_QUERY_KEY(audienceId, topicId),
    queryFn: () => getTopicSentimentUseCase.execute({ audienceId, topicId }),
    enabled: !!audienceId && !!topicId && enabled,
    refetchInterval: (query) => {
      const status = query.state.data?.status
      if (status === 'processing') {
        if (pollCountRef.current >= MAX_POLL_COUNT) return false
        pollCountRef.current++
        return 3000
      }
      pollCountRef.current = 0
      return false
    },
  })
}

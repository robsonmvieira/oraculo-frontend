import { useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetTopicBehavioralPatternsUseCase, GetTopicBehavioralPatternsResult } from '@/modules/audience/domain/use-cases'

const getTopicBehavioralPatternsUseCase = container.get<IGetTopicBehavioralPatternsUseCase>(
  TYPES.GetTopicBehavioralPatternsUseCase
)

export const TOPIC_BEHAVIORAL_PATTERNS_QUERY_KEY = (audienceId: string, topicId: string) =>
  ['topic-behavioral-patterns', audienceId, topicId] as const

const MAX_POLL_COUNT = 60

export function useGetTopicBehavioralPatterns(audienceId: string, topicId: string, enabled: boolean) {
  const pollCountRef = useRef(0)

  useEffect(() => {
    pollCountRef.current = 0
  }, [topicId, enabled])

  return useQuery<GetTopicBehavioralPatternsResult, Error>({
    queryKey: TOPIC_BEHAVIORAL_PATTERNS_QUERY_KEY(audienceId, topicId),
    queryFn: () => getTopicBehavioralPatternsUseCase.execute({ audienceId, topicId }),
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

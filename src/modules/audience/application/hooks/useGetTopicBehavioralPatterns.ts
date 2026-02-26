import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetTopicBehavioralPatternsUseCase, GetTopicBehavioralPatternsResult } from '@/modules/audience/domain/use-cases'

const getTopicBehavioralPatternsUseCase = container.get<IGetTopicBehavioralPatternsUseCase>(
  TYPES.GetTopicBehavioralPatternsUseCase
)

export const TOPIC_BEHAVIORAL_PATTERNS_QUERY_KEY = (audienceId: string, topicId: string) =>
  ['topic-behavioral-patterns', audienceId, topicId] as const

export function useGetTopicBehavioralPatterns(audienceId: string, topicId: string, enabled: boolean) {
  return useQuery<GetTopicBehavioralPatternsResult, Error>({
    queryKey: TOPIC_BEHAVIORAL_PATTERNS_QUERY_KEY(audienceId, topicId),
    queryFn: () => getTopicBehavioralPatternsUseCase.execute({ audienceId, topicId }),
    enabled: !!audienceId && !!topicId && enabled,
  })
}

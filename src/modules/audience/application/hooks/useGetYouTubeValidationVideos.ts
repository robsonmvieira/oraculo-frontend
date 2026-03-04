import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetYouTubeValidationVideosUseCase, GetYouTubeValidationVideosResult } from '@/modules/audience/domain/use-cases'

const getYouTubeValidationVideosUseCase = container.get<IGetYouTubeValidationVideosUseCase>(
  TYPES.GetYouTubeValidationVideosUseCase
)

export const YOUTUBE_VALIDATION_VIDEOS_QUERY_KEY = (audienceId: string, topicName: string) =>
  ['youtube-validation-videos', audienceId, topicName] as const

export function useGetYouTubeValidationVideos(audienceId: string, topicName: string, enabled: boolean) {
  return useQuery<GetYouTubeValidationVideosResult, Error>({
    queryKey: YOUTUBE_VALIDATION_VIDEOS_QUERY_KEY(audienceId, topicName),
    queryFn: () => getYouTubeValidationVideosUseCase.execute({ audienceId, topicName }),
    enabled: !!audienceId && !!topicName && enabled,
  })
}

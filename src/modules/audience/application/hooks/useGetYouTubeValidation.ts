import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetYouTubeValidationUseCase, GetYouTubeValidationResult } from '@/modules/audience/domain/use-cases'

const getYouTubeValidationUseCase = container.get<IGetYouTubeValidationUseCase>(
  TYPES.GetYouTubeValidationUseCase
)

export const YOUTUBE_VALIDATION_QUERY_KEY = (audienceId: string) =>
  ['youtube-validation', audienceId] as const

export function useGetYouTubeValidation(audienceId: string, enabled: boolean) {
  return useQuery<GetYouTubeValidationResult, Error>({
    queryKey: YOUTUBE_VALIDATION_QUERY_KEY(audienceId),
    queryFn: () => getYouTubeValidationUseCase.execute({ audienceId }),
    enabled: !!audienceId && enabled,
  })
}

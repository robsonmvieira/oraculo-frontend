import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetAudienceIntentsUseCase, GetAudienceIntentsResult } from '@/modules/audience/domain/use-cases'
import type { ThemeAnalysisWindow } from '@/modules/audience/domain/use-cases'

const getAudienceIntentsUseCase = container.get<IGetAudienceIntentsUseCase>(
  TYPES.GetAudienceIntentsUseCase
)

export const AUDIENCE_INTENTS_QUERY_KEY = (audienceId: string, window: ThemeAnalysisWindow) =>
  ['audience-intents', audienceId, window] as const

export function useGetAudienceIntents(audienceId: string, window: ThemeAnalysisWindow, enabled: boolean) {
  return useQuery<GetAudienceIntentsResult, Error>({
    queryKey: AUDIENCE_INTENTS_QUERY_KEY(audienceId, window),
    queryFn: () => getAudienceIntentsUseCase.execute({ audienceId, window }),
    enabled: !!audienceId && enabled,
  })
}

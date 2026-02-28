import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetAudienceThemesUseCase, GetAudienceThemesResult, ThemeAnalysisWindow } from '@/modules/audience/domain/use-cases'

const getAudienceThemesUseCase = container.get<IGetAudienceThemesUseCase>(
  TYPES.GetAudienceThemesUseCase
)

export const AUDIENCE_THEMES_QUERY_KEY = (audienceId: string, window: ThemeAnalysisWindow) =>
  ['audience-themes', audienceId, window] as const

export function useGetAudienceThemes(audienceId: string, window: ThemeAnalysisWindow, enabled: boolean) {
  return useQuery<GetAudienceThemesResult, Error>({
    queryKey: AUDIENCE_THEMES_QUERY_KEY(audienceId, window),
    queryFn: () => getAudienceThemesUseCase.execute({ audienceId, window }),
    enabled: !!audienceId && enabled,
  })
}

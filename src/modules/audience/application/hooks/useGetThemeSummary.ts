import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetThemeSummaryUseCase, GetThemeSummaryResult } from '@/modules/audience/domain/use-cases'

const getThemeSummaryUseCase = container.get<IGetThemeSummaryUseCase>(
  TYPES.GetThemeSummaryUseCase
)

export const THEME_SUMMARY_QUERY_KEY = (audienceId: string, themeId: string) =>
  ['theme-summary', audienceId, themeId] as const

export function useGetThemeSummary(audienceId: string, themeId: string, enabled: boolean) {
  return useQuery<GetThemeSummaryResult, Error>({
    queryKey: THEME_SUMMARY_QUERY_KEY(audienceId, themeId),
    queryFn: () => getThemeSummaryUseCase.execute({ audienceId, themeId }),
    enabled: !!audienceId && !!themeId && enabled,
  })
}

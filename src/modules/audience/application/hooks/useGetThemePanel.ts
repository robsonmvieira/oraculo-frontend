import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetThemePanelUseCase, GetThemePanelResult } from '@/modules/audience/domain/use-cases'

const getThemePanelUseCase = container.get<IGetThemePanelUseCase>(
  TYPES.GetThemePanelUseCase
)

export const THEME_PANEL_QUERY_KEY = (audienceId: string, themeId: string) =>
  ['theme-panel', audienceId, themeId] as const

export function useGetThemePanel(audienceId: string, themeId: string, enabled: boolean) {
  return useQuery<GetThemePanelResult, Error>({
    queryKey: THEME_PANEL_QUERY_KEY(audienceId, themeId),
    queryFn: () => getThemePanelUseCase.execute({ audienceId, themeId }),
    enabled: !!audienceId && !!themeId && enabled,
  })
}

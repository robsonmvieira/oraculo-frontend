import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IRefreshThemePanelUseCase, RefreshThemePanelParams } from '@/modules/audience/domain/use-cases'
import { THEME_PANEL_QUERY_KEY } from './useGetThemePanel'

const refreshThemePanelUseCase = container.get<IRefreshThemePanelUseCase>(
  TYPES.RefreshThemePanelUseCase
)

export function useRefreshThemePanel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RefreshThemePanelParams) =>
      refreshThemePanelUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: THEME_PANEL_QUERY_KEY(variables.audienceId, variables.themeId),
      })
    },
  })
}

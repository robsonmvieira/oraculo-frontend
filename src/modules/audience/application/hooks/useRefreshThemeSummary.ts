import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IRefreshThemeSummaryUseCase, RefreshThemeSummaryParams } from '@/modules/audience/domain/use-cases'
import { THEME_SUMMARY_QUERY_KEY } from './useGetThemeSummary'

const refreshThemeSummaryUseCase = container.get<IRefreshThemeSummaryUseCase>(
  TYPES.RefreshThemeSummaryUseCase
)

export function useRefreshThemeSummary() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RefreshThemeSummaryParams) =>
      refreshThemeSummaryUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: THEME_SUMMARY_QUERY_KEY(variables.audienceId, variables.themeId),
      })
    },
  })
}

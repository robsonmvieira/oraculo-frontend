import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IRefreshAudienceThemesUseCase, RefreshAudienceThemesParams } from '@/modules/audience/domain/use-cases'
import { AUDIENCE_THEMES_QUERY_KEY } from './useGetAudienceThemes'

const refreshAudienceThemesUseCase = container.get<IRefreshAudienceThemesUseCase>(
  TYPES.RefreshAudienceThemesUseCase
)

export function useRefreshAudienceThemes() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RefreshAudienceThemesParams) =>
      refreshAudienceThemesUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: AUDIENCE_THEMES_QUERY_KEY(variables.audienceId, variables.window),
      })
    },
  })
}

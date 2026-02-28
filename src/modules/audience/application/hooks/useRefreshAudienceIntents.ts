import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IRefreshAudienceIntentsUseCase, RefreshAudienceIntentsParams } from '@/modules/audience/domain/use-cases'
import { AUDIENCE_INTENTS_QUERY_KEY } from './useGetAudienceIntents'

const refreshAudienceIntentsUseCase = container.get<IRefreshAudienceIntentsUseCase>(
  TYPES.RefreshAudienceIntentsUseCase
)

export function useRefreshAudienceIntents() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RefreshAudienceIntentsParams) =>
      refreshAudienceIntentsUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: AUDIENCE_INTENTS_QUERY_KEY(variables.audienceId, variables.window),
      })
    },
  })
}

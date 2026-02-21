import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IRemoveCommunityFromAudienceUseCase, RemoveCommunityFromAudienceParams } from '@/modules/audience/domain/use-cases'
import { AUDIENCES_QUERY_KEY } from './useListUserAudiences'
import { AUDIENCE_QUERY_KEY } from './useGetAudienceById'

const removeCommunityFromAudienceUseCase = container.get<IRemoveCommunityFromAudienceUseCase>(TYPES.RemoveCommunityFromAudienceUseCase)

export function useRemoveCommunityFromAudience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RemoveCommunityFromAudienceParams) =>
      removeCommunityFromAudienceUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: AUDIENCES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: AUDIENCE_QUERY_KEY(variables.audienceId) })
    },
  })
}

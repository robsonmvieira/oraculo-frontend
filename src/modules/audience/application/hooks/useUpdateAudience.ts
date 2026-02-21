import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IUpdateAudienceUseCase, UpdateAudienceParams } from '@/modules/audience/domain/use-cases'
import { AUDIENCES_QUERY_KEY } from './useListUserAudiences'
import { AUDIENCE_QUERY_KEY } from './useGetAudienceById'

const updateAudienceUseCase = container.get<IUpdateAudienceUseCase>(TYPES.UpdateAudienceUseCase)

export function useUpdateAudience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: UpdateAudienceParams) =>
      updateAudienceUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: AUDIENCES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: AUDIENCE_QUERY_KEY(variables.audienceId) })
    },
  })
}

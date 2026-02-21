import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IAddCommunityToAudienceUseCase, AddCommunityToAudienceParams } from '@/modules/audience/domain/use-cases'
import { AUDIENCES_QUERY_KEY } from './useListUserAudiences'
import { AUDIENCE_QUERY_KEY } from './useGetAudienceById'

const addCommunityToAudienceUseCase = container.get<IAddCommunityToAudienceUseCase>(TYPES.AddCommunityToAudienceUseCase)

export function useAddCommunityToAudience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: AddCommunityToAudienceParams) =>
      addCommunityToAudienceUseCase.execute(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: AUDIENCES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: AUDIENCE_QUERY_KEY(variables.audienceId) })
    },
  })
}

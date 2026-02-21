import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IDeleteAudienceUseCase, DeleteAudienceParams } from '@/modules/audience/domain/use-cases'
import { AUDIENCES_QUERY_KEY } from './useListUserAudiences'

const deleteAudienceUseCase = container.get<IDeleteAudienceUseCase>(TYPES.DeleteAudienceUseCase)

export function useDeleteAudience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: DeleteAudienceParams) =>
      deleteAudienceUseCase.execute(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUDIENCES_QUERY_KEY })
    },
  })
}

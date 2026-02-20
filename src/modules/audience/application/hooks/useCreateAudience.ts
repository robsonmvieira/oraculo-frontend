import { useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { ICreateAudienceUseCase, CreateAudienceParams } from '@/modules/audience/domain/use-cases'
import { AUDIENCES_QUERY_KEY } from './useListGenericAudiences'

const createAudienceUseCase = container.get<ICreateAudienceUseCase>(TYPES.CreateAudienceUseCase)

export function useCreateAudience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateAudienceParams) =>
      createAudienceUseCase.execute(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUDIENCES_QUERY_KEY })
    },
  })
}

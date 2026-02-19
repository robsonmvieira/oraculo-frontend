import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetAudienceTemplateByIdUseCase } from '@/modules/audience/domain/use-cases'

const getAudienceTemplateByIdUseCase = container.get<IGetAudienceTemplateByIdUseCase>(
  TYPES.GetAudienceTemplateByIdUseCase
)

export const AUDIENCE_TEMPLATE_QUERY_KEY = (id: string) => ['audience-template', id] as const

export function useGetAudienceTemplateById(id: string) {
  return useQuery({
    queryKey: AUDIENCE_TEMPLATE_QUERY_KEY(id),
    queryFn: () => getAudienceTemplateByIdUseCase.execute(id),
    enabled: !!id,
  })
}

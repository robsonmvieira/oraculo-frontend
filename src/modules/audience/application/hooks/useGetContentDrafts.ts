import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetContentDraftsUseCase, GetContentDraftsResult } from '@/modules/audience/domain/use-cases'

const getContentDraftsUseCase = container.get<IGetContentDraftsUseCase>(
  TYPES.GetContentDraftsUseCase
)

export const CONTENT_DRAFTS_QUERY_KEY = (audienceId: string, suggestionId: string) =>
  ['content-drafts', audienceId, suggestionId] as const

export function useGetContentDrafts(audienceId: string, suggestionId: string, enabled = true) {
  return useQuery<GetContentDraftsResult, Error>({
    queryKey: CONTENT_DRAFTS_QUERY_KEY(audienceId, suggestionId),
    queryFn: () => getContentDraftsUseCase.execute({ audienceId, suggestionId }),
    enabled: !!audienceId && !!suggestionId && enabled,
  })
}

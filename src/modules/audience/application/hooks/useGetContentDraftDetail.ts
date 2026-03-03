import { useQuery } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IGetContentDraftDetailUseCase, GetContentDraftDetailResult } from '@/modules/audience/domain/use-cases'

const getContentDraftDetailUseCase = container.get<IGetContentDraftDetailUseCase>(
  TYPES.GetContentDraftDetailUseCase
)

export const CONTENT_DRAFT_DETAIL_QUERY_KEY = (audienceId: string, suggestionId: string, draftId: string) =>
  ['content-draft-detail', audienceId, suggestionId, draftId] as const

export function useGetContentDraftDetail(audienceId: string, suggestionId: string, draftId: string, enabled = true) {
  return useQuery<GetContentDraftDetailResult, Error>({
    queryKey: CONTENT_DRAFT_DETAIL_QUERY_KEY(audienceId, suggestionId, draftId),
    queryFn: () => getContentDraftDetailUseCase.execute({ audienceId, suggestionId, draftId }),
    enabled: !!audienceId && !!suggestionId && !!draftId && enabled,
  })
}

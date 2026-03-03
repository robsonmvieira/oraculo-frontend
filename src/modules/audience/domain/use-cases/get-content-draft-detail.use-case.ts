import type { ContentDraft } from '../entities/ContentDraft.entity'

export interface GetContentDraftDetailParams {
  audienceId: string
  suggestionId: string
  draftId: string
}

export interface GetContentDraftDetailResult {
  draft: ContentDraft
}

export interface IGetContentDraftDetailUseCase {
  execute(params: GetContentDraftDetailParams): Promise<GetContentDraftDetailResult>
}

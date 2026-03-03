import type { ContentDraft } from '../entities/ContentDraft.entity'

export interface GetContentDraftsParams {
  audienceId: string
  suggestionId: string
}

export interface GetContentDraftsResult {
  suggestionId: string
  drafts: ContentDraft[]
  total: number
}

export interface IGetContentDraftsUseCase {
  execute(params: GetContentDraftsParams): Promise<GetContentDraftsResult>
}

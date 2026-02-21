import type { Keyword } from '../entities/Keyword.entity'

export interface GetAudienceKeywordsParams {
  audienceId: string
}

export interface GetAudienceKeywordsResult {
  status: string
  analysisId: string
  totalKeywords: number
  completedAt: string
  keywords: Keyword[]
}

export interface IGetAudienceKeywordsUseCase {
  execute(params: GetAudienceKeywordsParams): Promise<GetAudienceKeywordsResult>
}

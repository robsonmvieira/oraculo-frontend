import type { Topic } from '../entities/Topic.entity'

export interface GetAudienceTopicsParams {
  audienceId: string
  limit?: number
  offset?: number
}

export interface GetAudienceTopicsResult {
  status: string
  analysisId: string
  totalTopics: number
  completedAt: string
  topics: Topic[]
  limit: number
  offset: number
  hasMore: boolean
}

export interface IGetAudienceTopicsUseCase {
  execute(params: GetAudienceTopicsParams): Promise<GetAudienceTopicsResult>
}

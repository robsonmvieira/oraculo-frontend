import type { Topic } from '../entities/Topic.entity'

export interface GetAudienceTopicsParams {
  audienceId: string
}

export interface GetAudienceTopicsResult {
  status: string
  analysisId: string
  totalTopics: number
  completedAt: string
  topics: Topic[]
}

export interface IGetAudienceTopicsUseCase {
  execute(params: GetAudienceTopicsParams): Promise<GetAudienceTopicsResult>
}

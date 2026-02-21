export interface CreateAudienceParams {
  name: string
  description: string
  subreddit_names: string[]
}

export interface CreateAudienceResult {
  id: string
  name: string
  description: string
  user_id: string
  communities_count: number
}

export interface ICreateAudienceUseCase {
  execute(params: CreateAudienceParams): Promise<CreateAudienceResult>
}

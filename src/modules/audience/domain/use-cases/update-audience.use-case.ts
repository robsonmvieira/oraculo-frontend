export interface UpdateAudienceParams {
  audienceId: string
  name: string
  description: string
  subreddit_names: string[]
}

export interface UpdateAudienceResult {
  id: string
  name: string
  description: string
  communities_count: number
}

export interface IUpdateAudienceUseCase {
  execute(params: UpdateAudienceParams): Promise<UpdateAudienceResult>
}

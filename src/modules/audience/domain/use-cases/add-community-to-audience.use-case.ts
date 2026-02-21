export interface AddCommunityToAudienceParams {
  audienceId: string
  subreddit_name: string
}

export interface IAddCommunityToAudienceUseCase {
  execute(params: AddCommunityToAudienceParams): Promise<void>
}

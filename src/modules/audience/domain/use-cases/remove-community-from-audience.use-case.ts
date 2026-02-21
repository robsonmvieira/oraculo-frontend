export interface RemoveCommunityFromAudienceParams {
  audienceId: string
  subreddit_name: string
}

export interface IRemoveCommunityFromAudienceUseCase {
  execute(params: RemoveCommunityFromAudienceParams): Promise<void>
}

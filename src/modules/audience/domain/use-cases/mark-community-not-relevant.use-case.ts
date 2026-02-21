export interface MarkCommunityNotRelevantParams {
  subredditName: string
  audienceId: string
}

export interface IMarkCommunityNotRelevantUseCase {
  execute(params: MarkCommunityNotRelevantParams): Promise<void>
}

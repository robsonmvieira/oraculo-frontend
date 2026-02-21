export interface GetAudienceSuggestionsParams {
  audienceId: string
}

export interface AudienceSuggestion {
  subredditName: string
  title: string
  description: string
  subscribers: number
  sizeTag: string | null
  activityTag: string | null
  growthWeek: number | null
  relevanceScore: number
  relevanceReason: string
}

export interface GetAudienceSuggestionsResult {
  audienceId: string
  audienceName: string
  audienceTheme: string
  suggestions: AudienceSuggestion[]
  totalFound: number
  filteredByFeedback: number
}

export interface IGetAudienceSuggestionsUseCase {
  execute(params: GetAudienceSuggestionsParams): Promise<GetAudienceSuggestionsResult>
}

import type { HttpClient } from '@/modules/shared'
import { Audience } from '../../domain/entities/Audience.entity'
import { AudienceTemplate } from '../../domain/entities/AudienceTemplate.entity'
import type { IAudienceRepository } from '../../domain/repositories/audience.repository'
import type { CreateAudienceParams, CreateAudienceResult } from '../../domain/use-cases/create-audience.use-case'
import type { UpdateAudienceParams, UpdateAudienceResult } from '../../domain/use-cases/update-audience.use-case'
import type { AddCommunityToAudienceParams } from '../../domain/use-cases/add-community-to-audience.use-case'
import type { RemoveCommunityFromAudienceParams } from '../../domain/use-cases/remove-community-from-audience.use-case'
import type { GetAudienceSuggestionsParams, GetAudienceSuggestionsResult } from '../../domain/use-cases/get-audience-suggestions.use-case'

interface AudienceTemplateResponse {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  category: string
  display_order: number
  communities: string[]
  communities_count: number
  total_subscribers: number
  subscribers_loaded: number
}

interface AudienceTemplatesApiResponse {
  templates: AudienceTemplateResponse[]
}

interface UserAudienceListResponse {
  audience_id: string
  name: string
  description: string
  total_subs: number
  total_members: number
  growth_week: number | null
  growth_month?: number | null
  communities: Array<{
    subreddit_name: string
    icon_url: string
    subscribers: number
  }>
}


interface AudienceSuggestionApiItem {
  subreddit_name: string
  title: string
  description: string
  subscribers: number
  size_tag: string | null
  activity_tag: string | null
  growth_week: number | null
  relevance_score: number
  relevance_reason: string
}

interface AudienceSuggestionsApiResponse {
  audience_id: string
  audience_name: string
  audience_theme: string
  suggestions: AudienceSuggestionApiItem[]
  total_found: number
  filtered_by_feedback: number
}

export class AudienceRepository implements IAudienceRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async fetchDefaultAudiences(): Promise<AudienceTemplate[]> {
    const response = await this.httpClient.get<AudienceTemplatesApiResponse>('audience-templates')
    return response.templates.map((data) => new AudienceTemplate(data))
  }

  async listUserAudiences(): Promise<Audience[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await this.httpClient.get<any>('audiences')
    const items: UserAudienceListResponse[] = Array.isArray(response) ? response : response.audiences ?? []
    return items.map((data) => new Audience({
      id: data.audience_id,
      name: data.name,
      description: data.description,
      total_subs: data.total_subs,
      total_members: data.total_members,
      growth_week: data.growth_week,
      growth_month: data.growth_month,
      communities: data.communities.map((c) => ({
        id: c.subreddit_name,
        display: {
          display_name: c.subreddit_name,
          subscribers: c.subscribers,
          community_icon: c.icon_url,
          public_description: '',
          primary_color: '',
          over18: false,
        },
        related_terms: [],
        related_communities: [],
        related_communities_status: 'ready' as const,
        growth_week: null,
        growth_month: null,
      })),
    }))
  }

  async getAudienceById(id: string): Promise<Audience | null> {
    try {
      const response = await this.httpClient.get<UserAudienceListResponse>(`audiences/${id}`)
      return new Audience({
        id: response.audience_id,
        name: response.name,
        description: response.description,
        total_subs: response.total_subs,
        total_members: response.total_members,
        growth_week: response.growth_week,
        growth_month: response.growth_month,
        communities: response.communities.map((c) => ({
          id: c.subreddit_name,
          display: {
            display_name: c.subreddit_name,
            subscribers: c.subscribers,
            community_icon: c.icon_url,
            public_description: '',
            primary_color: '',
            over18: false,
          },
          related_terms: [],
          related_communities: [],
          related_communities_status: 'ready' as const,
          growth_week: null,
          growth_month: null,
        })),
      })
    } catch {
      return null
    }
  }

  async getAudienceTemplateById(id: string): Promise<AudienceTemplate | null> {
    try {
      const response = await this.httpClient.get<AudienceTemplateResponse>(`audience-templates/${id}`)
      return new AudienceTemplate(response)
    } catch {
      return null
    }
  }

  async createAudience(params: CreateAudienceParams): Promise<CreateAudienceResult> {
    return this.httpClient.post<CreateAudienceResult>('audiences', params)
  }

  async updateAudience(params: UpdateAudienceParams): Promise<UpdateAudienceResult> {
    const { audienceId, ...body } = params
    return this.httpClient.put<UpdateAudienceResult>(`audiences/${audienceId}`, body)
  }

  async addCommunityToAudience(params: AddCommunityToAudienceParams): Promise<void> {
    await this.httpClient.post(`audiences/${params.audienceId}/communities`, {
      subreddit_name: params.subreddit_name,
    })
  }

  async removeCommunityFromAudience(params: RemoveCommunityFromAudienceParams): Promise<void> {
    await this.httpClient.delete(`audiences/${params.audienceId}/communities/${params.subreddit_name}`)
  }

  async getAudienceSuggestions(params: GetAudienceSuggestionsParams): Promise<GetAudienceSuggestionsResult> {
    const response = await this.httpClient.get<AudienceSuggestionsApiResponse>(
      `audiences/${params.audienceId}/suggestions`
    )
    return {
      audienceId: response.audience_id,
      audienceName: response.audience_name,
      audienceTheme: response.audience_theme,
      suggestions: response.suggestions.map((s) => ({
        subredditName: s.subreddit_name,
        title: s.title,
        description: s.description,
        subscribers: s.subscribers,
        sizeTag: s.size_tag,
        activityTag: s.activity_tag,
        growthWeek: s.growth_week,
        relevanceScore: s.relevance_score,
        relevanceReason: s.relevance_reason,
      })),
      totalFound: response.total_found,
      filteredByFeedback: response.filtered_by_feedback,
    }
  }
}
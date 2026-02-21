import type { HttpClient } from '@/modules/shared'
import { Audience } from '../../domain/entities/Audience.entity'
import { AudienceTemplate } from '../../domain/entities/AudienceTemplate.entity'
import type { IAudienceRepository } from '../../domain/repositories/audience.repository'
import type { CreateAudienceParams, CreateAudienceResult } from '../../domain/use-cases/create-audience.use-case'
import type { UpdateAudienceParams, UpdateAudienceResult } from '../../domain/use-cases/update-audience.use-case'
import type { AddCommunityToAudienceParams } from '../../domain/use-cases/add-community-to-audience.use-case'
import type { RemoveCommunityFromAudienceParams } from '../../domain/use-cases/remove-community-from-audience.use-case'
import type { GetAudienceSuggestionsParams, GetAudienceSuggestionsResult } from '../../domain/use-cases/get-audience-suggestions.use-case'
import type { DeleteAudienceParams, DeleteAudienceResult } from '../../domain/use-cases/delete-audience.use-case'
import type { GetAudienceKeywordsParams, GetAudienceKeywordsResult } from '../../domain/use-cases/get-audience-keywords.use-case'
import type { MarkCommunityNotRelevantParams } from '../../domain/use-cases/mark-community-not-relevant.use-case'
import type { GetAudienceTopicsParams, GetAudienceTopicsResult } from '../../domain/use-cases/get-audience-topics.use-case'
import { Keyword } from '../../domain/entities/Keyword.entity'
import { Topic } from '../../domain/entities/Topic.entity'

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

interface AudienceKeywordApiItem {
  id: string
  keyword: string
  category: string
  relevance_score: number
  rank: number
}

interface AudienceKeywordsApiResponse {
  status: string
  analysis_id: string
  total_keywords: number
  completed_at: string
  keywords: AudienceKeywordApiItem[]
}

interface AudienceTopicCommunityApiItem {
  name: string
  post_count: number
}

interface AudienceTopicApiItem {
  id: string
  name: string
  description: string
  growth_percentage: number
  mention_frequency: number
  mention_period: string
  post_count: number
  communities: AudienceTopicCommunityApiItem[]
  rank: number
}

interface AudienceTopicsApiResponse {
  status: string
  analysis_id: string
  total_topics: number
  completed_at: string
  topics: AudienceTopicApiItem[]
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

  async deleteAudience(params: DeleteAudienceParams): Promise<DeleteAudienceResult> {
    return this.httpClient.delete<DeleteAudienceResult>(`audiences/${params.audienceId}`)
  }

  async getAudienceKeywords(params: GetAudienceKeywordsParams): Promise<GetAudienceKeywordsResult> {
    const response = await this.httpClient.get<AudienceKeywordsApiResponse>(
      `audiences/${params.audienceId}/keywords`
    )
    return {
      status: response.status,
      analysisId: response.analysis_id,
      totalKeywords: response.total_keywords,
      completedAt: response.completed_at,
      keywords: response.keywords.map((k) => new Keyword({
        id: k.id,
        keyword: k.keyword,
        category: k.category,
        relevanceScore: k.relevance_score,
        rank: k.rank,
      })),
    }
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

  async markCommunityNotRelevant(params: MarkCommunityNotRelevantParams): Promise<void> {
    await this.httpClient.post('feedback/community', {
      subreddit_name: params.subredditName,
      feedback: 'not_relevant',
      context_type: 'audience',
      context_id: params.audienceId,
    })
  }

  async getAudienceTopics(params: GetAudienceTopicsParams): Promise<GetAudienceTopicsResult> {
    const limit = params.limit ?? 200
    const offset = params.offset ?? 0
    const response = await this.httpClient.get<AudienceTopicsApiResponse>(
      `audiences/${params.audienceId}/topics?limit=${limit}&offset=${offset}`
    )
    const topics = response.topics.map((t) => new Topic({
      id: t.id,
      name: t.name,
      description: t.description,
      growthPercentage: t.growth_percentage,
      mentionFrequency: t.mention_frequency,
      mentionPeriod: t.mention_period,
      postCount: t.post_count,
      communities: t.communities.map((c) => ({
        name: c.name,
        postCount: c.post_count,
      })),
      rank: t.rank,
    }))
    return {
      status: response.status,
      analysisId: response.analysis_id,
      totalTopics: response.total_topics,
      completedAt: response.completed_at,
      topics,
      limit,
      offset,
      hasMore: offset + topics.length < response.total_topics,
    }
  }
}
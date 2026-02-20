import type { HttpClient } from '@/modules/shared'
import { Audience } from '../../domain/entities/Audience.entity'
import { AudienceTemplate } from '../../domain/entities/AudienceTemplate.entity'
import type { IAudienceRepository } from '../../domain/repositories/audience.repository'
import type { CreateAudienceParams, CreateAudienceResult } from '../../domain/use-cases/create-audience.use-case'

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

interface AudienceResponse {
  id: string
  name: string
  description: string
  total_subs: number
  total_members: number
  communities: Array<{
    id: string
    display: {
      display_name: string
      subscribers: number
      community_icon: string
      public_description: string
      primary_color: string
      over18: boolean
    }
    related_terms: string[]
    related_communities: Array<{
      name: string
      title: string
      description: string
      subscribers: number | null
      discovered_via: string
    }>
    related_communities_status: 'ready' | 'processing'
    growth_week: number | null
    growth_month: number | null
  }>
  growth_week: number | null
  growth_month?: number | null
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
      const response = await this.httpClient.get<AudienceResponse>(`audiences/${id}`)
      return new Audience(response)
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
}
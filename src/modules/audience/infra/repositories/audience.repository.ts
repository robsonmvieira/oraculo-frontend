import type { HttpClient } from '@/modules/shared'
import { Audience } from '../../domain/entities/Audience.entity'
import { AudienceTemplate } from '../../domain/entities/AudienceTemplate.entity'
import type { IAudienceRepository } from '../../domain/repositories/audience.repository'

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
}

interface AudienceTemplatesApiResponse {
  templates: AudienceTemplateResponse[]
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

  async listGenericAudiences(): Promise<Audience[]> {
    const response = await this.httpClient.get<AudienceResponse[]>('audiences')
    return response.map((data) => new Audience(data))
  }

  async getAudienceById(id: string): Promise<Audience | null> {
    try {
      const response = await this.httpClient.get<AudienceResponse>(`audiences/${id}`)
      return new Audience(response)
    } catch {
      return null
    }
  }
}
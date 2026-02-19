export interface CommunityData {
  name: string
  title: string
  subscribers: number
  icon_url: string
  growth_week: number | null
  growth_month: number | null
}

interface AudienceTemplateProps {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  category: string
  display_order: number
  communities: CommunityData[] | string[]
  communities_count: number
}

export class AudienceTemplate {
  private readonly id: string
  private readonly name: string
  private readonly slug: string
  private readonly description: string
  private readonly icon: string
  private readonly category: string
  private readonly displayOrder: number
  private readonly communities: CommunityData[]
  private readonly communitiesCount: number

  constructor({
    id,
    name,
    slug,
    description,
    icon,
    category,
    display_order,
    communities,
    communities_count,
  }: AudienceTemplateProps) {
    this.id = id
    this.name = name
    this.slug = slug
    this.description = description
    this.icon = icon
    this.category = category
    this.displayOrder = display_order
    this.communities = this.normalizeCommunities(communities)
    this.communitiesCount = communities_count
  }

  private normalizeCommunities(communities: CommunityData[] | string[]): CommunityData[] {
    if (communities.length === 0) return []

    // Check if first element is a string (old format) or object (new format)
    if (typeof communities[0] === 'string') {
      return (communities as string[]).map((name) => ({
        name,
        title: name,
        subscribers: 0,
        icon_url: '',
        growth_week: null,
        growth_month: null,
      }))
    }

    return communities as CommunityData[]
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getSlug(): string {
    return this.slug
  }

  getDescription(): string {
    return this.description
  }

  getIcon(): string {
    return this.icon
  }

  getCategory(): string {
    return this.category
  }

  getDisplayOrder(): number {
    return this.displayOrder
  }

  getCommunities(): CommunityData[] {
    return this.communities
  }

  getCommunitiesCount(): number {
    return this.communitiesCount
  }

  toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      description: this.description,
      icon: this.icon,
      category: this.category,
      displayOrder: this.displayOrder,
      communities: this.communities,
      communitiesCount: this.communitiesCount,
    }
  }
}

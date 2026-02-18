interface AudienceTemplateProps {
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

export class AudienceTemplate {
  private readonly id: string
  private readonly name: string
  private readonly slug: string
  private readonly description: string
  private readonly icon: string
  private readonly category: string
  private readonly displayOrder: number
  private readonly communities: string[]
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
    this.communities = communities
    this.communitiesCount = communities_count
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

  getCommunities(): string[] {
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

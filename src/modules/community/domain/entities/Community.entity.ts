interface CommunityProps {
  name: string
  title: string
  description: string
  subscribers: number
  icon_url: string
  growth_week: number | null
  growth_month: number | null
  category: string
}

export class Community {
  private readonly name: string
  private readonly title: string
  private readonly description: string
  private readonly subscribers: number
  private readonly iconUrl: string
  private readonly growthWeek: number | null
  private readonly growthMonth: number | null
  private readonly category: string

  constructor(props: CommunityProps) {
    this.name = props.name
    this.title = props.title
    this.description = props.description
    this.subscribers = props.subscribers
    this.iconUrl = props.icon_url
    this.growthWeek = props.growth_week
    this.growthMonth = props.growth_month
    this.category = props.category
  }

  getName(): string {
    return this.name
  }

  getTitle(): string {
    return this.title
  }

  getDescription(): string {
    return this.description
  }

  getSubscribers(): number {
    return this.subscribers
  }

  getIconUrl(): string {
    return this.iconUrl
  }

  getGrowthWeek(): number | null {
    return this.growthWeek
  }

  getGrowthMonth(): number | null {
    return this.growthMonth
  }

  getCategory(): string {
    return this.category
  }

  toJSON(): object {
    return {
      name: this.name,
      title: this.title,
      description: this.description,
      subscribers: this.subscribers,
      iconUrl: this.iconUrl,
      growthWeek: this.growthWeek,
      growthMonth: this.growthMonth,
      category: this.category,
    }
  }
}

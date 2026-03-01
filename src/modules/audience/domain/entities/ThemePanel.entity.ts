export interface ThemePanelSubcategory {
  name: string
  count: number
  description: string
}

export interface ThemePanelRelatedTopic {
  name: string
  count: number
  topicId: string | null
}

export interface ThemePanelSubreddit {
  name: string
  postCount: number
  avgScore: number
}

interface ThemePanelProps {
  id: string
  themeId: string
  subcategories: ThemePanelSubcategory[]
  relatedTopics: ThemePanelRelatedTopic[]
  subredditDistribution: ThemePanelSubreddit[]
  createdAt: string
}

export class ThemePanel {
  private readonly id: string
  private readonly themeId: string
  private readonly subcategories: ThemePanelSubcategory[]
  private readonly relatedTopics: ThemePanelRelatedTopic[]
  private readonly subredditDistribution: ThemePanelSubreddit[]
  private readonly createdAt: string

  constructor({ id, themeId, subcategories, relatedTopics, subredditDistribution, createdAt }: ThemePanelProps) {
    this.id = id
    this.themeId = themeId
    this.subcategories = subcategories
    this.relatedTopics = relatedTopics
    this.subredditDistribution = subredditDistribution
    this.createdAt = createdAt
  }

  getId(): string {
    return this.id
  }

  getThemeId(): string {
    return this.themeId
  }

  getSubcategories(): ThemePanelSubcategory[] {
    return this.subcategories
  }

  getRelatedTopics(): ThemePanelRelatedTopic[] {
    return this.relatedTopics
  }

  getSubredditDistribution(): ThemePanelSubreddit[] {
    return this.subredditDistribution
  }

  getCreatedAt(): string {
    return this.createdAt
  }
}

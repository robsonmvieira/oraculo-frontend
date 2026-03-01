export interface IntentSamplePost {
  title: string
  subreddit: string
  score: number
}

export interface IntentSubreddit {
  name: string
  count: number
}

interface IntentCategoryProps {
  category: string
  label: string
  icon: string
  postCount: number
  percentage: number
  description: string
  subcategories: Record<string, number>
  topicKeywords: Record<string, number>
  topSubreddits: IntentSubreddit[]
  samplePosts: IntentSamplePost[]
  rank: number
}

export class IntentCategory {
  private readonly category: string
  private readonly label: string
  private readonly icon: string
  private readonly postCount: number
  private readonly percentage: number
  private readonly description: string
  private readonly subcategories: Record<string, number>
  private readonly topicKeywords: Record<string, number>
  private readonly topSubreddits: IntentSubreddit[]
  private readonly samplePosts: IntentSamplePost[]
  private readonly rank: number

  constructor({ category, label, icon, postCount, percentage, description, subcategories, topicKeywords, topSubreddits, samplePosts, rank }: IntentCategoryProps) {
    this.category = category
    this.label = label
    this.icon = icon
    this.postCount = postCount
    this.percentage = percentage
    this.description = description
    this.subcategories = subcategories
    this.topicKeywords = topicKeywords
    this.topSubreddits = topSubreddits
    this.samplePosts = samplePosts
    this.rank = rank
  }

  getCategory(): string {
    return this.category
  }

  getLabel(): string {
    return this.label
  }

  getIcon(): string {
    return this.icon
  }

  getPostCount(): number {
    return this.postCount
  }

  getPercentage(): number {
    return this.percentage
  }

  getDescription(): string {
    return this.description
  }

  getSubcategories(): Record<string, number> {
    return this.subcategories
  }

  getTopicKeywords(): Record<string, number> {
    return this.topicKeywords
  }

  getTopSubreddits(): IntentSubreddit[] {
    return this.topSubreddits
  }

  getSamplePosts(): IntentSamplePost[] {
    return this.samplePosts
  }

  getRank(): number {
    return this.rank
  }
}

interface TopicCommunity {
  name: string
  postCount: number
}

export type GrowthSource = 'calculated' | 'estimated'
export type GrowthTrend = 'up' | 'stable' | 'down'

interface TopicProps {
  id: string
  name: string
  description: string
  growthPercentage: number
  mentionFrequency: number
  mentionPeriod: string
  postCount: number
  communities: TopicCommunity[]
  rank: number
  growthSource: GrowthSource | null
  growthTrend: GrowthTrend | null
}

export class Topic {
  private readonly id: string
  private readonly name: string
  private readonly description: string
  private readonly growthPercentage: number
  private readonly mentionFrequency: number
  private readonly mentionPeriod: string
  private readonly postCount: number
  private readonly communities: TopicCommunity[]
  private readonly rank: number
  private readonly growthSource: GrowthSource | null
  private readonly growthTrend: GrowthTrend | null

  constructor({ id, name, description, growthPercentage, mentionFrequency, mentionPeriod, postCount, communities, rank, growthSource, growthTrend }: TopicProps) {
    this.id = id
    this.name = name
    this.description = description
    this.growthPercentage = growthPercentage
    this.mentionFrequency = mentionFrequency
    this.mentionPeriod = mentionPeriod
    this.postCount = postCount
    this.communities = communities
    this.rank = rank
    this.growthSource = growthSource
    this.growthTrend = growthTrend
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getDescription(): string {
    return this.description
  }

  getGrowthPercentage(): number {
    return this.growthPercentage
  }

  getMentionFrequency(): number {
    return this.mentionFrequency
  }

  getMentionPeriod(): string {
    return this.mentionPeriod
  }

  getPostCount(): number {
    return this.postCount
  }

  getCommunities(): TopicCommunity[] {
    return this.communities
  }

  getRank(): number {
    return this.rank
  }

  getGrowthSource(): GrowthSource | null {
    return this.growthSource
  }

  getGrowthTrend(): GrowthTrend | null {
    return this.growthTrend
  }

  toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      growthPercentage: this.growthPercentage,
      mentionFrequency: this.mentionFrequency,
      mentionPeriod: this.mentionPeriod,
      postCount: this.postCount,
      communities: this.communities,
      rank: this.rank,
      growthSource: this.growthSource,
      growthTrend: this.growthTrend,
    }
  }
}

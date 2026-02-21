interface TopicCommunity {
  name: string
  postCount: number
}

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

  constructor({ id, name, description, growthPercentage, mentionFrequency, mentionPeriod, postCount, communities, rank }: TopicProps) {
    this.id = id
    this.name = name
    this.description = description
    this.growthPercentage = growthPercentage
    this.mentionFrequency = mentionFrequency
    this.mentionPeriod = mentionPeriod
    this.postCount = postCount
    this.communities = communities
    this.rank = rank
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
    }
  }
}

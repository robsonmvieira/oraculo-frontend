export interface ThemeSubreddit {
  name: string
  postCount: number
  avgScore: number
}

export interface ThemeKeyword {
  keyword: string
  frequency: number
}

export interface ThemeRepresentativePost {
  title: string
  subreddit: string
  score: number
  permalink: string
}

interface ThemeProps {
  id: string
  name: string
  summary: string
  postCount: number
  avgScore: number
  avgComments: number
  engagementScore: number
  rank: number
  topSubreddits: ThemeSubreddit[]
  topKeywords: ThemeKeyword[]
  representativePosts: ThemeRepresentativePost[]
}

export class Theme {
  private readonly id: string
  private readonly name: string
  private readonly summary: string
  private readonly postCount: number
  private readonly avgScore: number
  private readonly avgComments: number
  private readonly engagementScore: number
  private readonly rank: number
  private readonly topSubreddits: ThemeSubreddit[]
  private readonly topKeywords: ThemeKeyword[]
  private readonly representativePosts: ThemeRepresentativePost[]

  constructor({ id, name, summary, postCount, avgScore, avgComments, engagementScore, rank, topSubreddits, topKeywords, representativePosts }: ThemeProps) {
    this.id = id
    this.name = name
    this.summary = summary
    this.postCount = postCount
    this.avgScore = avgScore
    this.avgComments = avgComments
    this.engagementScore = engagementScore
    this.rank = rank
    this.topSubreddits = topSubreddits
    this.topKeywords = topKeywords
    this.representativePosts = representativePosts
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getSummary(): string {
    return this.summary
  }

  getPostCount(): number {
    return this.postCount
  }

  getAvgScore(): number {
    return this.avgScore
  }

  getAvgComments(): number {
    return this.avgComments
  }

  getEngagementScore(): number {
    return this.engagementScore
  }

  getRank(): number {
    return this.rank
  }

  getTopSubreddits(): ThemeSubreddit[] {
    return this.topSubreddits
  }

  getTopKeywords(): ThemeKeyword[] {
    return this.topKeywords
  }

  getRepresentativePosts(): ThemeRepresentativePost[] {
    return this.representativePosts
  }
}

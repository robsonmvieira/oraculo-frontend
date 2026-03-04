export interface SemanticSearchSubmission {
  title: string
  body: string
  subreddit: string
  score: number
  numComments: number
  permalink: string
  similarity: number
}

export interface SemanticSearchPattern {
  name: string
  emoji: string
  description: string
  postCount: number
  totalUpvotes: number
  totalComments: number
  submissions: SemanticSearchSubmission[]
}

export type SemanticSearchContextQuality = 'rich' | 'limited'

interface SemanticSearchResultProps {
  answer: string
  patterns: SemanticSearchPattern[]
  totalPostsSearched: number
  totalPostsMatched: number
  patternCount: number
  contextQuality: SemanticSearchContextQuality
  cached: boolean
  query: string
}

export class SemanticSearchResult {
  private readonly answer: string
  private readonly patterns: SemanticSearchPattern[]
  private readonly totalPostsSearched: number
  private readonly totalPostsMatched: number
  private readonly patternCount: number
  private readonly contextQuality: SemanticSearchContextQuality
  private readonly cached: boolean
  private readonly query: string

  constructor({ answer, patterns, totalPostsSearched, totalPostsMatched, patternCount, contextQuality, cached, query }: SemanticSearchResultProps) {
    this.answer = answer
    this.patterns = patterns
    this.totalPostsSearched = totalPostsSearched
    this.totalPostsMatched = totalPostsMatched
    this.patternCount = patternCount
    this.contextQuality = contextQuality
    this.cached = cached
    this.query = query
  }

  getAnswer(): string {
    return this.answer
  }

  getPatterns(): SemanticSearchPattern[] {
    return this.patterns
  }

  getTotalPostsSearched(): number {
    return this.totalPostsSearched
  }

  getTotalPostsMatched(): number {
    return this.totalPostsMatched
  }

  getPatternCount(): number {
    return this.patternCount
  }

  getContextQuality(): SemanticSearchContextQuality {
    return this.contextQuality
  }

  isCached(): boolean {
    return this.cached
  }

  getQuery(): string {
    return this.query
  }
}

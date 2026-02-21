interface KeywordProps {
  id: string
  keyword: string
  category: string
  relevanceScore: number
  rank: number
}

export class Keyword {
  private readonly id: string
  private readonly keyword: string
  private readonly category: string
  private readonly relevanceScore: number
  private readonly rank: number

  constructor({ id, keyword, category, relevanceScore, rank }: KeywordProps) {
    this.id = id
    this.keyword = keyword
    this.category = category
    this.relevanceScore = relevanceScore
    this.rank = rank
  }

  getId(): string {
    return this.id
  }

  getKeyword(): string {
    return this.keyword
  }

  getCategory(): string {
    return this.category
  }

  getRelevanceScore(): number {
    return this.relevanceScore
  }

  getRank(): number {
    return this.rank
  }

  toJSON(): object {
    return {
      id: this.id,
      keyword: this.keyword,
      category: this.category,
      relevanceScore: this.relevanceScore,
      rank: this.rank,
    }
  }
}

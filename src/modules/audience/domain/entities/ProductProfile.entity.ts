export interface ProductAlternative {
  name: string
  sentimentLabel: string
}

export interface ProductEvidence {
  quote: string
  sourceSubreddit: string
  score: number
}

export interface ProductProfileProps {
  id: string
  productName: string
  normalizedName: string
  category: string
  totalMentions: number
  sentimentScore: number
  sentimentLabel: string
  trendDirection: string
  communities: string[]
  positiveAspects: string[]
  negativeAspects: string[]
  gaps: string[]
  alternatives: ProductAlternative[]
  evidenceQuotes: ProductEvidence[]
  useCases: string[]
  createdAt: string | null
}

export class ProductProfile {
  private readonly id: string
  private readonly productName: string
  private readonly normalizedName: string
  private readonly category: string
  private readonly totalMentions: number
  private readonly sentimentScore: number
  private readonly sentimentLabel: string
  private readonly trendDirection: string
  private readonly communities: string[]
  private readonly positiveAspects: string[]
  private readonly negativeAspects: string[]
  private readonly gaps: string[]
  private readonly alternatives: ProductAlternative[]
  private readonly evidenceQuotes: ProductEvidence[]
  private readonly useCases: string[]
  private readonly createdAt: string | null

  constructor({
    id,
    productName,
    normalizedName,
    category,
    totalMentions,
    sentimentScore,
    sentimentLabel,
    trendDirection,
    communities,
    positiveAspects,
    negativeAspects,
    gaps,
    alternatives,
    evidenceQuotes,
    useCases,
    createdAt,
  }: ProductProfileProps) {
    this.id = id
    this.productName = productName
    this.normalizedName = normalizedName
    this.category = category
    this.totalMentions = totalMentions
    this.sentimentScore = sentimentScore
    this.sentimentLabel = sentimentLabel
    this.trendDirection = trendDirection
    this.communities = communities
    this.positiveAspects = positiveAspects
    this.negativeAspects = negativeAspects
    this.gaps = gaps
    this.alternatives = alternatives
    this.evidenceQuotes = evidenceQuotes
    this.useCases = useCases
    this.createdAt = createdAt
  }

  getId(): string {
    return this.id
  }

  getProductName(): string {
    return this.productName
  }

  getNormalizedName(): string {
    return this.normalizedName
  }

  getCategory(): string {
    return this.category
  }

  getTotalMentions(): number {
    return this.totalMentions
  }

  getSentimentScore(): number {
    return this.sentimentScore
  }

  getSentimentLabel(): string {
    return this.sentimentLabel
  }

  getTrendDirection(): string {
    return this.trendDirection
  }

  getCommunities(): string[] {
    return this.communities
  }

  getPositiveAspects(): string[] {
    return this.positiveAspects
  }

  getNegativeAspects(): string[] {
    return this.negativeAspects
  }

  getGaps(): string[] {
    return this.gaps
  }

  getAlternatives(): ProductAlternative[] {
    return this.alternatives
  }

  getEvidenceQuotes(): ProductEvidence[] {
    return this.evidenceQuotes
  }

  getUseCases(): string[] {
    return this.useCases
  }

  getCreatedAt(): string | null {
    return this.createdAt
  }

  toJSON(): object {
    return {
      id: this.id,
      productName: this.productName,
      normalizedName: this.normalizedName,
      category: this.category,
      totalMentions: this.totalMentions,
      sentimentScore: this.sentimentScore,
      sentimentLabel: this.sentimentLabel,
      trendDirection: this.trendDirection,
      communities: this.communities,
      positiveAspects: this.positiveAspects,
      negativeAspects: this.negativeAspects,
      gaps: this.gaps,
      alternatives: this.alternatives,
      evidenceQuotes: this.evidenceQuotes,
      useCases: this.useCases,
      createdAt: this.createdAt,
    }
  }
}

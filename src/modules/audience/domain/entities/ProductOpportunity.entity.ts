export interface OpportunityEvidence {
  quote: string
  subreddit: string
  postUrl: string
}

export interface ProductOpportunityProps {
  id: string
  opportunityType: string
  title: string
  description: string
  opportunityScore: number
  demandSignals: number
  existingSolutionsCount: number
  evidence: OpportunityEvidence[]
  relatedProducts: string[]
}

export class ProductOpportunity {
  private readonly id: string
  private readonly opportunityType: string
  private readonly title: string
  private readonly description: string
  private readonly opportunityScore: number
  private readonly demandSignals: number
  private readonly existingSolutionsCount: number
  private readonly evidence: OpportunityEvidence[]
  private readonly relatedProducts: string[]

  constructor({
    id,
    opportunityType,
    title,
    description,
    opportunityScore,
    demandSignals,
    existingSolutionsCount,
    evidence,
    relatedProducts,
  }: ProductOpportunityProps) {
    this.id = id
    this.opportunityType = opportunityType
    this.title = title
    this.description = description
    this.opportunityScore = opportunityScore
    this.demandSignals = demandSignals
    this.existingSolutionsCount = existingSolutionsCount
    this.evidence = evidence
    this.relatedProducts = relatedProducts
  }

  getId(): string {
    return this.id
  }

  getOpportunityType(): string {
    return this.opportunityType
  }

  getTitle(): string {
    return this.title
  }

  getDescription(): string {
    return this.description
  }

  getOpportunityScore(): number {
    return this.opportunityScore
  }

  getDemandSignals(): number {
    return this.demandSignals
  }

  getExistingSolutionsCount(): number {
    return this.existingSolutionsCount
  }

  getEvidence(): OpportunityEvidence[] {
    return this.evidence
  }

  getRelatedProducts(): string[] {
    return this.relatedProducts
  }

  toJSON(): object {
    return {
      id: this.id,
      opportunityType: this.opportunityType,
      title: this.title,
      description: this.description,
      opportunityScore: this.opportunityScore,
      demandSignals: this.demandSignals,
      existingSolutionsCount: this.existingSolutionsCount,
      evidence: this.evidence,
      relatedProducts: this.relatedProducts,
    }
  }
}

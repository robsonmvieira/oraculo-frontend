export interface SentimentComparison {
  reddit: string
  youtube: string
  alignment: string
  divergence: string | null
}

export interface TopicAnalysis {
  topicName: string
  tractionScore: number
  sentimentComparison: SentimentComparison
  contentGap: boolean
  contentGapDetail: string | null
  contentSaturated: boolean
  productMentions: string[]
  audienceOverlapScore: number
  opportunityInsights: string[]
}

export interface CrossPlatformSummary {
  totalTopicsWithTraction: number
  avgTractionScore: number
  contentGapsFound: number
  keyFindings: string[]
  bestOpportunity: string
  biggestDivergence: string
}

export interface AnalysisData {
  topics: TopicAnalysis[]
  crossPlatformSummary: CrossPlatformSummary
}

export interface ValidationSummary {
  topicsAnalyzed: number
  topicsWithYoutubeTraction: number
  contentGapsFound: number
  avgTractionScore: number
  totalVideosAnalyzed: number
  totalCommentsAnalyzed: number
  headline: string | null
  keyOpportunities: string[]
  riskFactors: string[]
}

interface YouTubeValidationProps {
  validationId: string
  audienceId: string
  status: string
  completedAt: string | null
  modelUsed: string | null
  totalVideos: number
  totalComments: number
  analysisData: AnalysisData | null
  summary: ValidationSummary | null
}

export class YouTubeValidation {
  private readonly validationId: string
  private readonly audienceId: string
  private readonly status: string
  private readonly completedAt: string | null
  private readonly modelUsed: string | null
  private readonly totalVideos: number
  private readonly totalComments: number
  private readonly analysisData: AnalysisData | null
  private readonly summary: ValidationSummary | null

  constructor({ validationId, audienceId, status, completedAt, modelUsed, totalVideos, totalComments, analysisData, summary }: YouTubeValidationProps) {
    this.validationId = validationId
    this.audienceId = audienceId
    this.status = status
    this.completedAt = completedAt
    this.modelUsed = modelUsed
    this.totalVideos = totalVideos
    this.totalComments = totalComments
    this.analysisData = analysisData
    this.summary = summary
  }

  getValidationId(): string {
    return this.validationId
  }

  getAudienceId(): string {
    return this.audienceId
  }

  getStatus(): string {
    return this.status
  }

  getCompletedAt(): string | null {
    return this.completedAt
  }

  getModelUsed(): string | null {
    return this.modelUsed
  }

  getTotalVideos(): number {
    return this.totalVideos
  }

  getTotalComments(): number {
    return this.totalComments
  }

  getAnalysisData(): AnalysisData | null {
    return this.analysisData
  }

  getSummary(): ValidationSummary | null {
    return this.summary
  }

  toJSON(): object {
    return {
      validationId: this.validationId,
      audienceId: this.audienceId,
      status: this.status,
      completedAt: this.completedAt,
      modelUsed: this.modelUsed,
      totalVideos: this.totalVideos,
      totalComments: this.totalComments,
      analysisData: this.analysisData,
      summary: this.summary,
    }
  }
}

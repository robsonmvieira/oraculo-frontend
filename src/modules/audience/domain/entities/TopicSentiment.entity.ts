export interface OverallSentiment {
  score: string
  positiveRatio: number
  negativeRatio: number
  neutralRatio: number
}

export interface EmotionalMapEntry {
  emotion: string
  intensity: string
  percentage: number
  example: string
}

export interface SentimentByCommunity {
  community: string
  positive: number
  negative: number
  neutral: number
  dominantEmotion: string
}

export interface SentimentBySubtopic {
  subtopic: string
  sentiment: string
  score: number
  keyDriver: string
}

export interface SentimentDriver {
  driver: string
  frequency: string
  mentions: number
  exampleQuote: string
}

export interface SentimentDrivers {
  positive: SentimentDriver[]
  negative: SentimentDriver[]
}

export interface TensionPoint {
  topic: string
  forRatio: number
  againstRatio: number
  intensity: string
  summary: string
}

export interface PainPoint {
  pain: string
  severity: string
  frequency: string
  communities: string[]
  verbatim: string
}

export interface SentimentOpportunity {
  opportunity: string
  basedOn: string
  confidence: string
  targetAudience: string
}

interface TopicSentimentProps {
  analysisId: string
  topicId: string
  topicName: string
  completedAt: string
  overallSentiment: OverallSentiment
  emotionalMap: EmotionalMapEntry[]
  sentimentByCommunity: SentimentByCommunity[]
  sentimentBySubtopic: SentimentBySubtopic[]
  sentimentDrivers: SentimentDrivers
  tensionPoints: TensionPoint[]
  painPoints: PainPoint[]
  sentimentOpportunities: SentimentOpportunity[]
}

export class TopicSentiment {
  private readonly analysisId: string
  private readonly topicId: string
  private readonly topicName: string
  private readonly completedAt: string
  private readonly overallSentiment: OverallSentiment
  private readonly emotionalMap: EmotionalMapEntry[]
  private readonly sentimentByCommunity: SentimentByCommunity[]
  private readonly sentimentBySubtopic: SentimentBySubtopic[]
  private readonly sentimentDrivers: SentimentDrivers
  private readonly tensionPoints: TensionPoint[]
  private readonly painPoints: PainPoint[]
  private readonly sentimentOpportunities: SentimentOpportunity[]

  constructor({ analysisId, topicId, topicName, completedAt, overallSentiment, emotionalMap, sentimentByCommunity, sentimentBySubtopic, sentimentDrivers, tensionPoints, painPoints, sentimentOpportunities }: TopicSentimentProps) {
    this.analysisId = analysisId
    this.topicId = topicId
    this.topicName = topicName
    this.completedAt = completedAt
    this.overallSentiment = overallSentiment
    this.emotionalMap = emotionalMap
    this.sentimentByCommunity = sentimentByCommunity
    this.sentimentBySubtopic = sentimentBySubtopic
    this.sentimentDrivers = sentimentDrivers
    this.tensionPoints = tensionPoints
    this.painPoints = painPoints
    this.sentimentOpportunities = sentimentOpportunities
  }

  getAnalysisId(): string {
    return this.analysisId
  }

  getTopicId(): string {
    return this.topicId
  }

  getTopicName(): string {
    return this.topicName
  }

  getCompletedAt(): string {
    return this.completedAt
  }

  getOverallSentiment(): OverallSentiment {
    return this.overallSentiment
  }

  getEmotionalMap(): EmotionalMapEntry[] {
    return this.emotionalMap
  }

  getSentimentByCommunity(): SentimentByCommunity[] {
    return this.sentimentByCommunity
  }

  getSentimentBySubtopic(): SentimentBySubtopic[] {
    return this.sentimentBySubtopic
  }

  getSentimentDrivers(): SentimentDrivers {
    return this.sentimentDrivers
  }

  getTensionPoints(): TensionPoint[] {
    return this.tensionPoints
  }

  getPainPoints(): PainPoint[] {
    return this.painPoints
  }

  getSentimentOpportunities(): SentimentOpportunity[] {
    return this.sentimentOpportunities
  }

  toJSON(): object {
    return {
      analysisId: this.analysisId,
      topicId: this.topicId,
      topicName: this.topicName,
      completedAt: this.completedAt,
      overallSentiment: this.overallSentiment,
      emotionalMap: this.emotionalMap,
      sentimentByCommunity: this.sentimentByCommunity,
      sentimentBySubtopic: this.sentimentBySubtopic,
      sentimentDrivers: this.sentimentDrivers,
      tensionPoints: this.tensionPoints,
      painPoints: this.painPoints,
      sentimentOpportunities: this.sentimentOpportunities,
    }
  }
}

export interface Subtopic {
  name: string
  description: string
  postCount: number
}

export interface CommonQuestion {
  question: string
  frequency: 'high' | 'medium' | 'low'
  exampleContext: string
}

export interface SentimentHighlight {
  text: string
  sentiment: 'positive' | 'negative' | 'neutral'
  source: string
}

export interface TopicSentiment {
  overall: 'positive' | 'negative' | 'neutral' | 'mixed'
  positiveRatio: number
  negativeRatio: number
  neutralRatio: number
  highlights: SentimentHighlight[]
}

export interface MentionedProduct {
  name: string
  category: string
  sentiment: string
  mentionCount: number
  context: string
}

export interface RepresentativePost {
  title: string
  subreddit: string
  score: number
  permalink: string
  excerpt: string
}

export interface ActionableInsight {
  insight: string
  type: 'opportunity' | 'gap' | 'risk' | 'trend'
  confidence: 'high' | 'medium' | 'low'
}

interface TopicDeepDiveProps {
  analysisId: string
  topicId: string
  topicName: string
  completedAt: string
  summary: string
  subtopics: Subtopic[]
  commonQuestions: CommonQuestion[]
  sentiment: TopicSentiment
  mentionedProducts: MentionedProduct[]
  representativePosts: RepresentativePost[]
  actionableInsights: ActionableInsight[]
}

export class TopicDeepDive {
  private readonly analysisId: string
  private readonly topicId: string
  private readonly topicName: string
  private readonly completedAt: string
  private readonly summary: string
  private readonly subtopics: Subtopic[]
  private readonly commonQuestions: CommonQuestion[]
  private readonly sentiment: TopicSentiment
  private readonly mentionedProducts: MentionedProduct[]
  private readonly representativePosts: RepresentativePost[]
  private readonly actionableInsights: ActionableInsight[]

  constructor({ analysisId, topicId, topicName, completedAt, summary, subtopics, commonQuestions, sentiment, mentionedProducts, representativePosts, actionableInsights }: TopicDeepDiveProps) {
    this.analysisId = analysisId
    this.topicId = topicId
    this.topicName = topicName
    this.completedAt = completedAt
    this.summary = summary
    this.subtopics = subtopics
    this.commonQuestions = commonQuestions
    this.sentiment = sentiment
    this.mentionedProducts = mentionedProducts
    this.representativePosts = representativePosts
    this.actionableInsights = actionableInsights
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

  getSummary(): string {
    return this.summary
  }

  getSubtopics(): Subtopic[] {
    return this.subtopics
  }

  getCommonQuestions(): CommonQuestion[] {
    return this.commonQuestions
  }

  getSentiment(): TopicSentiment {
    return this.sentiment
  }

  getMentionedProducts(): MentionedProduct[] {
    return this.mentionedProducts
  }

  getRepresentativePosts(): RepresentativePost[] {
    return this.representativePosts
  }

  getActionableInsights(): ActionableInsight[] {
    return this.actionableInsights
  }

  toJSON(): object {
    return {
      analysisId: this.analysisId,
      topicId: this.topicId,
      topicName: this.topicName,
      completedAt: this.completedAt,
      summary: this.summary,
      subtopics: this.subtopics,
      commonQuestions: this.commonQuestions,
      sentiment: this.sentiment,
      mentionedProducts: this.mentionedProducts,
      representativePosts: this.representativePosts,
      actionableInsights: this.actionableInsights,
    }
  }
}

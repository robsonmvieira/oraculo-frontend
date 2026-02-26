export interface TopicGrowthSnapshot {
  mentionFrequency: number
  postCount: number
  growthPercentage: number
  growthSource: 'calculated' | 'estimated'
  snapshotDate: string
}

interface TopicGrowthHistoryProps {
  topicId: string
  topicName: string
  current: TopicGrowthSnapshot
  history: TopicGrowthSnapshot[]
  trend: 'up' | 'stable' | 'down' | null
  totalSnapshots: number
}

export class TopicGrowthHistory {
  private readonly topicId: string
  private readonly topicName: string
  private readonly current: TopicGrowthSnapshot
  private readonly history: TopicGrowthSnapshot[]
  private readonly trend: 'up' | 'stable' | 'down' | null
  private readonly totalSnapshots: number

  constructor({ topicId, topicName, current, history, trend, totalSnapshots }: TopicGrowthHistoryProps) {
    this.topicId = topicId
    this.topicName = topicName
    this.current = current
    this.history = history
    this.trend = trend
    this.totalSnapshots = totalSnapshots
  }

  getTopicId(): string {
    return this.topicId
  }

  getTopicName(): string {
    return this.topicName
  }

  getCurrent(): TopicGrowthSnapshot {
    return this.current
  }

  getHistory(): TopicGrowthSnapshot[] {
    return this.history
  }

  getTrend(): 'up' | 'stable' | 'down' | null {
    return this.trend
  }

  getTotalSnapshots(): number {
    return this.totalSnapshots
  }

  toJSON(): object {
    return {
      topicId: this.topicId,
      topicName: this.topicName,
      current: this.current,
      history: this.history,
      trend: this.trend,
      totalSnapshots: this.totalSnapshots,
    }
  }
}

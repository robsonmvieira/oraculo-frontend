export type TopicAskContextQuality = 'rich' | 'limited'

interface TopicAskResponseProps {
  answer: string
  contextQuality: TopicAskContextQuality
  sourcesUsed: string[]
  cached: boolean
  topicName: string
  suggestion: string | null
}

export class TopicAskResponse {
  private readonly answer: string
  private readonly contextQuality: TopicAskContextQuality
  private readonly sourcesUsed: string[]
  private readonly cached: boolean
  private readonly topicName: string
  private readonly suggestion: string | null

  constructor({ answer, contextQuality, sourcesUsed, cached, topicName, suggestion }: TopicAskResponseProps) {
    this.answer = answer
    this.contextQuality = contextQuality
    this.sourcesUsed = sourcesUsed
    this.cached = cached
    this.topicName = topicName
    this.suggestion = suggestion
  }

  getAnswer(): string {
    return this.answer
  }

  getContextQuality(): TopicAskContextQuality {
    return this.contextQuality
  }

  getSourcesUsed(): string[] {
    return this.sourcesUsed
  }

  isCached(): boolean {
    return this.cached
  }

  getTopicName(): string {
    return this.topicName
  }

  getSuggestion(): string | null {
    return this.suggestion
  }
}

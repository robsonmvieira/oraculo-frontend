export type IntentAskContextQuality = 'rich' | 'limited'

interface IntentAskResponseProps {
  answer: string
  contextQuality: IntentAskContextQuality
  sourcesUsed: string[]
  cached: boolean
  category: string
  suggestion: string | null
}

export class IntentAskResponse {
  private readonly answer: string
  private readonly contextQuality: IntentAskContextQuality
  private readonly sourcesUsed: string[]
  private readonly cached: boolean
  private readonly category: string
  private readonly suggestion: string | null

  constructor({ answer, contextQuality, sourcesUsed, cached, category, suggestion }: IntentAskResponseProps) {
    this.answer = answer
    this.contextQuality = contextQuality
    this.sourcesUsed = sourcesUsed
    this.cached = cached
    this.category = category
    this.suggestion = suggestion
  }

  getAnswer(): string {
    return this.answer
  }

  getContextQuality(): IntentAskContextQuality {
    return this.contextQuality
  }

  getSourcesUsed(): string[] {
    return this.sourcesUsed
  }

  isCached(): boolean {
    return this.cached
  }

  getCategory(): string {
    return this.category
  }

  getSuggestion(): string | null {
    return this.suggestion
  }
}

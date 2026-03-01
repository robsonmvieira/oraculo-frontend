export type EmotionalTone = 'positive' | 'mixed' | 'tense' | 'neutral' | 'celebratory' | 'concerned' | 'supportive'

export interface ThemeSummaryHighlight {
  title: string
  subreddit: string
  score: number
  whyNotable: string
}

export interface ThemeSummaryKeyTheme {
  theme: string
  description: string
}

interface ThemeSummaryProps {
  themeId: string
  narrative: string
  highlights: ThemeSummaryHighlight[]
  emotionalTone: EmotionalTone
  toneDescription: string
  keyThemes: ThemeSummaryKeyTheme[]
  intentBreakdown: Record<string, number> | null
  weekDifferentiator: string | null
  createdAt: string
}

export class ThemeSummary {
  private readonly themeId: string
  private readonly narrative: string
  private readonly highlights: ThemeSummaryHighlight[]
  private readonly emotionalTone: EmotionalTone
  private readonly toneDescription: string
  private readonly keyThemes: ThemeSummaryKeyTheme[]
  private readonly intentBreakdown: Record<string, number> | null
  private readonly weekDifferentiator: string | null
  private readonly createdAt: string

  constructor({ themeId, narrative, highlights, emotionalTone, toneDescription, keyThemes, intentBreakdown, weekDifferentiator, createdAt }: ThemeSummaryProps) {
    this.themeId = themeId
    this.narrative = narrative
    this.highlights = highlights
    this.emotionalTone = emotionalTone
    this.toneDescription = toneDescription
    this.keyThemes = keyThemes
    this.intentBreakdown = intentBreakdown
    this.weekDifferentiator = weekDifferentiator
    this.createdAt = createdAt
  }

  getThemeId(): string {
    return this.themeId
  }

  getNarrative(): string {
    return this.narrative
  }

  getHighlights(): ThemeSummaryHighlight[] {
    return this.highlights
  }

  getEmotionalTone(): EmotionalTone {
    return this.emotionalTone
  }

  getToneDescription(): string {
    return this.toneDescription
  }

  getKeyThemes(): ThemeSummaryKeyTheme[] {
    return this.keyThemes
  }

  getIntentBreakdown(): Record<string, number> | null {
    return this.intentBreakdown
  }

  getWeekDifferentiator(): string | null {
    return this.weekDifferentiator
  }

  getCreatedAt(): string {
    return this.createdAt
  }
}

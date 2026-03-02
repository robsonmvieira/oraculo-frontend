export type ContentSuggestionPriority = 'high' | 'medium' | 'low'

export type ContentSuggestionFormat =
  | 'thread'
  | 'carrossel'
  | 'artigo'
  | 'video_script'
  | 'newsletter'
  | 'infographic'

export type ContentSuggestionTone =
  | 'educativo'
  | 'urgente'
  | 'empatico'
  | 'provocativo'
  | 'inspirador'
  | 'analitico'
  | 'educativo_com_urgencia'

export type ContentSuggestionFeedbackStatus = 'useful' | 'not_useful' | 'used'

export type ContentSuggestionAnalysisStatus = 'no_analysis' | 'processing' | 'ready' | 'failed'

export interface ContentSuggestionSourceTopic {
  topicId: string | null
  topicName: string
  growthPercentage: number | null
}

export interface ContentSuggestionOutlineItem {
  slide?: number
  item?: number
  content: string
}

interface ContentSuggestionAnalysisProps {
  id: string
  audienceId: string
  status: ContentSuggestionAnalysisStatus
  modulesUsed: string[]
  modelUsed: string
  errorMessage: string | null
  createdAt: string
}

export class ContentSuggestionAnalysis {
  private readonly id: string
  private readonly audienceId: string
  private readonly status: ContentSuggestionAnalysisStatus
  private readonly modulesUsed: string[]
  private readonly modelUsed: string
  private readonly errorMessage: string | null
  private readonly createdAt: string

  constructor({ id, audienceId, status, modulesUsed, modelUsed, errorMessage, createdAt }: ContentSuggestionAnalysisProps) {
    this.id = id
    this.audienceId = audienceId
    this.status = status
    this.modulesUsed = modulesUsed
    this.modelUsed = modelUsed
    this.errorMessage = errorMessage
    this.createdAt = createdAt
  }

  getId(): string { return this.id }
  getAudienceId(): string { return this.audienceId }
  getStatus(): ContentSuggestionAnalysisStatus { return this.status }
  getModulesUsed(): string[] { return this.modulesUsed }
  getModelUsed(): string { return this.modelUsed }
  getErrorMessage(): string | null { return this.errorMessage }
  getCreatedAt(): string { return this.createdAt }
}

interface ContentSuggestionProps {
  id: string
  analysisId: string
  rank: number
  priority: ContentSuggestionPriority
  title: string
  approach: string
  whyNow: string
  evidence: Record<string, unknown>
  format: ContentSuggestionFormat
  formatRationale: string
  emotionalTone: ContentSuggestionTone
  toneRationale: string
  outline: ContentSuggestionOutlineItem[]
  keywords: string[]
  researchNotes: string
  imagePrompt: string
  differentiationNotes: string
  accuracyNotes: string
  sourceTopics: ContentSuggestionSourceTopic[]
  sourceModules: string[]
  feedbackStatus: ContentSuggestionFeedbackStatus | null
  feedbackAt: string | null
  createdAt: string
}

export class ContentSuggestion {
  private readonly id: string
  private readonly analysisId: string
  private readonly rank: number
  private readonly priority: ContentSuggestionPriority
  private readonly title: string
  private readonly approach: string
  private readonly whyNow: string
  private readonly evidence: Record<string, unknown>
  private readonly format: ContentSuggestionFormat
  private readonly formatRationale: string
  private readonly emotionalTone: ContentSuggestionTone
  private readonly toneRationale: string
  private readonly outline: ContentSuggestionOutlineItem[]
  private readonly keywords: string[]
  private readonly researchNotes: string
  private readonly imagePrompt: string
  private readonly differentiationNotes: string
  private readonly accuracyNotes: string
  private readonly sourceTopics: ContentSuggestionSourceTopic[]
  private readonly sourceModules: string[]
  private readonly feedbackStatus: ContentSuggestionFeedbackStatus | null
  private readonly feedbackAt: string | null
  private readonly createdAt: string

  constructor(props: ContentSuggestionProps) {
    this.id = props.id
    this.analysisId = props.analysisId
    this.rank = props.rank
    this.priority = props.priority
    this.title = props.title
    this.approach = props.approach
    this.whyNow = props.whyNow
    this.evidence = props.evidence
    this.format = props.format
    this.formatRationale = props.formatRationale
    this.emotionalTone = props.emotionalTone
    this.toneRationale = props.toneRationale
    this.outline = props.outline
    this.keywords = props.keywords
    this.researchNotes = props.researchNotes
    this.imagePrompt = props.imagePrompt
    this.differentiationNotes = props.differentiationNotes
    this.accuracyNotes = props.accuracyNotes
    this.sourceTopics = props.sourceTopics
    this.sourceModules = props.sourceModules
    this.feedbackStatus = props.feedbackStatus
    this.feedbackAt = props.feedbackAt
    this.createdAt = props.createdAt
  }

  getId(): string { return this.id }
  getAnalysisId(): string { return this.analysisId }
  getRank(): number { return this.rank }
  getPriority(): ContentSuggestionPriority { return this.priority }
  getTitle(): string { return this.title }
  getApproach(): string { return this.approach }
  getWhyNow(): string { return this.whyNow }
  getEvidence(): Record<string, unknown> { return this.evidence }
  getFormat(): ContentSuggestionFormat { return this.format }
  getFormatRationale(): string { return this.formatRationale }
  getEmotionalTone(): ContentSuggestionTone { return this.emotionalTone }
  getToneRationale(): string { return this.toneRationale }
  getOutline(): ContentSuggestionOutlineItem[] { return this.outline }
  getKeywords(): string[] { return this.keywords }
  getResearchNotes(): string { return this.researchNotes }
  getImagePrompt(): string { return this.imagePrompt }
  getDifferentiationNotes(): string { return this.differentiationNotes }
  getAccuracyNotes(): string { return this.accuracyNotes }
  getSourceTopics(): ContentSuggestionSourceTopic[] { return this.sourceTopics }
  getSourceModules(): string[] { return this.sourceModules }
  getFeedbackStatus(): ContentSuggestionFeedbackStatus | null { return this.feedbackStatus }
  getFeedbackAt(): string | null { return this.feedbackAt }
  getCreatedAt(): string { return this.createdAt }
}

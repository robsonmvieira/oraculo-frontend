export type ContentDraftPlatform = 'linkedin' | 'twitter' | 'instagram' | 'reddit'

export type ContentDraftStatus = 'processing' | 'ready' | 'failed'

export interface ContentDraftHook {
  option: number
  text: string
}

interface ContentDraftProps {
  id: string
  suggestionId: string
  platform: ContentDraftPlatform
  status: ContentDraftStatus
  hooks: ContentDraftHook[]
  fullDraft: string
  narrativeArc: string
  cta: string
  platformNotes: string
  hashtags: string[]
  imageUrl: string | null
  imageAspectRatio: string | null
  modelUsed: string
  errorMessage: string | null
  createdAt: string
}

export class ContentDraft {
  private readonly id: string
  private readonly suggestionId: string
  private readonly platform: ContentDraftPlatform
  private readonly status: ContentDraftStatus
  private readonly hooks: ContentDraftHook[]
  private readonly fullDraft: string
  private readonly narrativeArc: string
  private readonly cta: string
  private readonly platformNotes: string
  private readonly hashtags: string[]
  private readonly imageUrl: string | null
  private readonly imageAspectRatio: string | null
  private readonly modelUsed: string
  private readonly errorMessage: string | null
  private readonly createdAt: string

  constructor(props: ContentDraftProps) {
    this.id = props.id
    this.suggestionId = props.suggestionId
    this.platform = props.platform
    this.status = props.status
    this.hooks = props.hooks
    this.fullDraft = props.fullDraft
    this.narrativeArc = props.narrativeArc
    this.cta = props.cta
    this.platformNotes = props.platformNotes
    this.hashtags = props.hashtags
    this.imageUrl = props.imageUrl
    this.imageAspectRatio = props.imageAspectRatio
    this.modelUsed = props.modelUsed
    this.errorMessage = props.errorMessage
    this.createdAt = props.createdAt
  }

  getId(): string { return this.id }
  getSuggestionId(): string { return this.suggestionId }
  getPlatform(): ContentDraftPlatform { return this.platform }
  getStatus(): ContentDraftStatus { return this.status }
  getHooks(): ContentDraftHook[] { return this.hooks }
  getFullDraft(): string { return this.fullDraft }
  getNarrativeArc(): string { return this.narrativeArc }
  getCta(): string { return this.cta }
  getPlatformNotes(): string { return this.platformNotes }
  getHashtags(): string[] { return this.hashtags }
  getImageUrl(): string | null { return this.imageUrl }
  getImageAspectRatio(): string | null { return this.imageAspectRatio }
  getModelUsed(): string { return this.modelUsed }
  getErrorMessage(): string | null { return this.errorMessage }
  getCreatedAt(): string { return this.createdAt }
}

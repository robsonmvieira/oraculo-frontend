interface YouTubeCollectedVideoProps {
  id: string
  videoId: string
  title: string
  channelName: string
  views: number
  likes: number
  durationSeconds: number
  tags: string[]
  description: string
  commentsCount: number
  hasTranscript: boolean
  transcriptLang: string | null
  publishedAt: string
}

export class YouTubeCollectedVideo {
  private readonly id: string
  private readonly videoId: string
  private readonly title: string
  private readonly channelName: string
  private readonly views: number
  private readonly likes: number
  private readonly durationSeconds: number
  private readonly tags: string[]
  private readonly description: string
  private readonly commentsCount: number
  private readonly hasTranscript: boolean
  private readonly transcriptLang: string | null
  private readonly publishedAt: string

  constructor({ id, videoId, title, channelName, views, likes, durationSeconds, tags, description, commentsCount, hasTranscript, transcriptLang, publishedAt }: YouTubeCollectedVideoProps) {
    this.id = id
    this.videoId = videoId
    this.title = title
    this.channelName = channelName
    this.views = views
    this.likes = likes
    this.durationSeconds = durationSeconds
    this.tags = tags
    this.description = description
    this.commentsCount = commentsCount
    this.hasTranscript = hasTranscript
    this.transcriptLang = transcriptLang
    this.publishedAt = publishedAt
  }

  getId(): string {
    return this.id
  }

  getVideoId(): string {
    return this.videoId
  }

  getTitle(): string {
    return this.title
  }

  getChannelName(): string {
    return this.channelName
  }

  getViews(): number {
    return this.views
  }

  getLikes(): number {
    return this.likes
  }

  getDurationSeconds(): number {
    return this.durationSeconds
  }

  getTags(): string[] {
    return this.tags
  }

  getDescription(): string {
    return this.description
  }

  getCommentsCount(): number {
    return this.commentsCount
  }

  getHasTranscript(): boolean {
    return this.hasTranscript
  }

  getTranscriptLang(): string | null {
    return this.transcriptLang
  }

  getPublishedAt(): string {
    return this.publishedAt
  }

  toJSON(): object {
    return {
      id: this.id,
      videoId: this.videoId,
      title: this.title,
      channelName: this.channelName,
      views: this.views,
      likes: this.likes,
      durationSeconds: this.durationSeconds,
      tags: this.tags,
      description: this.description,
      commentsCount: this.commentsCount,
      hasTranscript: this.hasTranscript,
      transcriptLang: this.transcriptLang,
      publishedAt: this.publishedAt,
    }
  }
}

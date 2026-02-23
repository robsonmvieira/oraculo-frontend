export type NotificationType =
  | 'behavioral_pattern_complete'
  | 'behavioral_pattern_failed'
  | 'deep_dive_complete'
  | 'deep_dive_failed'
  | 'pattern_analysis_complete'
  | 'pattern_analysis_failed'
  | 'keyword_analysis_complete'
  | 'keyword_analysis_failed'
  | 'topic_analysis_complete'
  | 'topic_analysis_failed'
  | 'sentiment_complete'
  | 'sentiment_failed'

export interface NotificationMetadata {
  audience_id?: string
  topic_id?: string
  topic_name?: string
  analysis_id?: string
  [key: string]: unknown
}

export interface NotificationProps {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  metadata: NotificationMetadata
  isRead: boolean
  createdAt: string
  readAt: string | null
}

export class Notification {
  private readonly id: string
  private readonly userId: string
  private readonly type: NotificationType
  private readonly title: string
  private readonly message: string
  private readonly metadata: NotificationMetadata
  private readonly isRead: boolean
  private readonly createdAt: string
  private readonly readAt: string | null

  constructor(props: NotificationProps) {
    this.id = props.id
    this.userId = props.userId
    this.type = props.type
    this.title = props.title
    this.message = props.message
    this.metadata = props.metadata
    this.isRead = props.isRead
    this.createdAt = props.createdAt
    this.readAt = props.readAt
  }

  getId(): string {
    return this.id
  }

  getUserId(): string {
    return this.userId
  }

  getType(): NotificationType {
    return this.type
  }

  getTitle(): string {
    return this.title
  }

  getMessage(): string {
    return this.message
  }

  getMetadata(): NotificationMetadata {
    return this.metadata
  }

  getIsRead(): boolean {
    return this.isRead
  }

  getCreatedAt(): string {
    return this.createdAt
  }

  getReadAt(): string | null {
    return this.readAt
  }

  isSuccess(): boolean {
    return this.type.endsWith('_complete')
  }

  isFailure(): boolean {
    return this.type.endsWith('_failed')
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      title: this.title,
      message: this.message,
      metadata: this.metadata,
      isRead: this.isRead,
      createdAt: this.createdAt,
      readAt: this.readAt,
    }
  }
}

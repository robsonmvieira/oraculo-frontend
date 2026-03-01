export type AlertType = 'new_topic' | 'growth_spike' | 'new_theme'

export type AlertSeverity = 'info' | 'warning' | 'critical'

export interface TopicAlertMetadata {
  topic_id?: string
  topic_name?: string
  audience_id?: string
  audience_name?: string
  analysis_id?: string
  mention_frequency?: number
  community_count?: number
  growth_percentage?: number
  trend?: string
  [key: string]: unknown
}

export interface TopicAlertProps {
  id: string
  alertType: AlertType
  severity: AlertSeverity
  title: string
  message: string
  metadata: TopicAlertMetadata
  isDismissed: boolean
  createdAt: string
}

export class TopicAlert {
  private readonly id: string
  private readonly alertType: AlertType
  private readonly severity: AlertSeverity
  private readonly title: string
  private readonly message: string
  private readonly metadata: TopicAlertMetadata
  private readonly isDismissed: boolean
  private readonly createdAt: string

  constructor(props: TopicAlertProps) {
    this.id = props.id
    this.alertType = props.alertType
    this.severity = props.severity
    this.title = props.title
    this.message = props.message
    this.metadata = props.metadata
    this.isDismissed = props.isDismissed
    this.createdAt = props.createdAt
  }

  getId(): string {
    return this.id
  }

  getAlertType(): AlertType {
    return this.alertType
  }

  getSeverity(): AlertSeverity {
    return this.severity
  }

  getTitle(): string {
    return this.title
  }

  getMessage(): string {
    return this.message
  }

  getMetadata(): TopicAlertMetadata {
    return this.metadata
  }

  getIsDismissed(): boolean {
    return this.isDismissed
  }

  getCreatedAt(): string {
    return this.createdAt
  }
}

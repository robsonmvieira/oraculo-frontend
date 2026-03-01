import type { HttpClient } from '@/modules/shared'
import { TopicAlert, type TopicAlertProps } from '../../domain/entities'
import type {
  ITopicAlertRepository,
  ListAlertsParams,
  ListAlertsResult,
  AlertsSummary,
  DismissAlertResult,
} from '../../domain/repositories'

export class TopicAlertRepository implements ITopicAlertRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async listAlerts(params: ListAlertsParams): Promise<ListAlertsResult> {
    const searchParams = new URLSearchParams()
    if (params.alert_type !== undefined) searchParams.set('alert_type', params.alert_type)
    if (params.severity !== undefined) searchParams.set('severity', params.severity)
    if (params.dismissed !== undefined) searchParams.set('dismissed', String(params.dismissed))
    if (params.limit !== undefined) searchParams.set('limit', String(params.limit))
    if (params.offset !== undefined) searchParams.set('offset', String(params.offset))

    const query = searchParams.toString()
    const url = query
      ? `audiences/${params.audienceId}/alerts?${query}`
      : `audiences/${params.audienceId}/alerts`

    const response = await this.httpClient.get<{
      alerts: Array<{
        id: string
        alert_type: TopicAlertProps['alertType']
        severity: TopicAlertProps['severity']
        title: string
        message: string
        metadata: Record<string, unknown>
        is_dismissed: boolean
        created_at: string
      }>
      limit: number
      offset: number
    }>(url)

    const alerts = (response.alerts ?? []).map(
      (a) =>
        new TopicAlert({
          id: a.id,
          alertType: a.alert_type,
          severity: a.severity,
          title: a.title,
          message: a.message,
          metadata: a.metadata,
          isDismissed: a.is_dismissed,
          createdAt: a.created_at,
        })
    )

    return { alerts, limit: response.limit, offset: response.offset }
  }

  async getAlertsSummary(audienceId: string): Promise<AlertsSummary> {
    return this.httpClient.get<AlertsSummary>(`audiences/${audienceId}/alerts/summary`)
  }

  async dismissAlert(audienceId: string, alertId: string): Promise<DismissAlertResult> {
    return this.httpClient.patch<DismissAlertResult>(
      `audiences/${audienceId}/alerts/${alertId}/dismiss`
    )
  }
}

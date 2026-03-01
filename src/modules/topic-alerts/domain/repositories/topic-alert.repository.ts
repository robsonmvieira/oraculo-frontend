import type { TopicAlert, AlertType, AlertSeverity } from '../entities'

export interface ListAlertsParams {
  audienceId: string
  alert_type?: AlertType
  severity?: AlertSeverity
  dismissed?: boolean
  limit?: number
  offset?: number
}

export interface ListAlertsResult {
  alerts: TopicAlert[]
  limit: number
  offset: number
}

export interface AlertsSummary {
  total: number
  by_type: Record<string, number>
  by_severity: Record<string, number>
}

export interface DismissAlertResult {
  status: string
  alert_id: string
}

export interface ITopicAlertRepository {
  listAlerts(params: ListAlertsParams): Promise<ListAlertsResult>
  getAlertsSummary(audienceId: string): Promise<AlertsSummary>
  dismissAlert(audienceId: string, alertId: string): Promise<DismissAlertResult>
}

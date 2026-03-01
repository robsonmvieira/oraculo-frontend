export { TopicAlert } from './domain/entities'
export type { TopicAlertProps, TopicAlertMetadata, AlertType, AlertSeverity } from './domain/entities'
export type { ITopicAlertRepository, ListAlertsParams, ListAlertsResult, AlertsSummary, DismissAlertResult } from './domain/repositories'
export type { IListAlertsUseCase, IGetAlertsSummaryUseCase, IDismissAlertUseCase } from './domain/use-cases'

export { TopicAlertRepository } from './infra/repositories'

export { ListAlertsUseCase, GetAlertsSummaryUseCase, DismissAlertUseCase } from './application/use-cases'
export { useListAlerts, useAlertsSummary, useDismissAlert, ALERTS_QUERY_KEY, ALERTS_SUMMARY_QUERY_KEY } from './application/hooks/useTopicAlerts'

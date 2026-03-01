import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IListAlertsUseCase, IGetAlertsSummaryUseCase, IDismissAlertUseCase } from '../../domain/use-cases'
import type { ListAlertsParams } from '../../domain/repositories'

const listAlertsUseCase = container.get<IListAlertsUseCase>(TYPES.ListAlertsUseCase)
const getAlertsSummaryUseCase = container.get<IGetAlertsSummaryUseCase>(TYPES.GetAlertsSummaryUseCase)
const dismissAlertUseCase = container.get<IDismissAlertUseCase>(TYPES.DismissAlertUseCase)

export const ALERTS_QUERY_KEY = (audienceId: string) => ['topic-alerts', audienceId] as const
export const ALERTS_SUMMARY_QUERY_KEY = (audienceId: string) => ['topic-alerts', audienceId, 'summary'] as const

export function useListAlerts(params: ListAlertsParams) {
  return useQuery({
    queryKey: [...ALERTS_QUERY_KEY(params.audienceId), params],
    queryFn: () => listAlertsUseCase.execute(params),
    enabled: !!params.audienceId,
  })
}

export function useAlertsSummary(audienceId: string) {
  return useQuery({
    queryKey: [...ALERTS_SUMMARY_QUERY_KEY(audienceId)],
    queryFn: () => getAlertsSummaryUseCase.execute(audienceId),
    enabled: !!audienceId,
  })
}

export function useDismissAlert(audienceId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (alertId: string) => dismissAlertUseCase.execute(audienceId, alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALERTS_QUERY_KEY(audienceId) })
      queryClient.invalidateQueries({ queryKey: ALERTS_SUMMARY_QUERY_KEY(audienceId) })
    },
  })
}

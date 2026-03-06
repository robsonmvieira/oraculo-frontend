import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Bell } from 'lucide-react'
import { useListAlerts, useAlertsSummary, useDismissAlert } from '@/modules/topic-alerts'
import type { AlertType, AlertSeverity } from '@/modules/topic-alerts'
import { toast } from '@/hooks/useToast'
import { AlertCard } from './AlertCard'

export interface AlertsTabContentProps {
  audienceId: string
}

const ALERT_TYPES: AlertType[] = ['new_topic', 'growth_spike', 'new_theme', 'cross_platform_validated']
const SEVERITIES: AlertSeverity[] = ['info', 'warning', 'critical']

export function AlertsTabContent({ audienceId }: Readonly<AlertsTabContentProps>) {
  const { t } = useTranslation('audiences')

  const [selectedType, setSelectedType] = useState<AlertType | undefined>(undefined)
  const [selectedSeverity, setSelectedSeverity] = useState<AlertSeverity | undefined>(undefined)
  const [showDismissed, setShowDismissed] = useState(false)

  const { data: alertsData, isLoading } = useListAlerts({
    audienceId,
    alert_type: selectedType,
    severity: selectedSeverity,
    dismissed: showDismissed ? undefined : false,
    limit: 50,
    offset: 0,
  })

  const { data: summary } = useAlertsSummary(audienceId)
  const dismissMutation = useDismissAlert(audienceId)

  const handleDismiss = (alertId: string) => {
    dismissMutation.mutate(alertId, {
      onSuccess: () => {
        toast({
          title: t('alerts.dismissed'),
          variant: 'success',
        })
      },
      onError: () => {
        toast({
          title: t('alerts.dismissError'),
          variant: 'destructive',
        })
      },
    })
  }

  const alerts = alertsData?.alerts ?? []
  const totalActive = summary?.total ?? 0

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={selectedType ?? ''}
          onChange={(e) => setSelectedType(e.target.value ? e.target.value as AlertType : undefined)}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-lime/50"
        >
          <option value="">{t('alerts.filters.allTypes')}</option>
          {ALERT_TYPES.map((type) => (
            <option key={type} value={type}>
              {t(`alerts.type.${type}`)}
              {summary?.by_type[type] ? ` (${summary.by_type[type]})` : ''}
            </option>
          ))}
        </select>

        <select
          value={selectedSeverity ?? ''}
          onChange={(e) => setSelectedSeverity(e.target.value ? e.target.value as AlertSeverity : undefined)}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-lime/50"
        >
          <option value="">{t('alerts.filters.allSeverities')}</option>
          {SEVERITIES.map((sev) => (
            <option key={sev} value={sev}>
              {t(`alerts.severity.${sev}`)}
              {summary?.by_severity[sev] ? ` (${summary.by_severity[sev]})` : ''}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowDismissed(!showDismissed)}
          className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
            showDismissed
              ? 'border-lime bg-lime/10 text-lime-700 dark:text-lime-300'
              : 'border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:border-gray-300 dark:hover:border-zinc-600'
          }`}
        >
          {showDismissed ? t('alerts.filters.showDismissed') : t('alerts.filters.hideDismissed')}
        </button>

        {totalActive > 0 && (
          <span className="ml-auto text-sm text-gray-500 dark:text-zinc-400">
            {totalActive} {t('alerts.title').toLowerCase()}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-lime border-t-transparent rounded-full animate-spin" />
        </div>
      ) : alerts.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center border border-gray-100 dark:border-zinc-800">
          <Bell className="w-8 h-8 text-gray-300 dark:text-zinc-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            {selectedType || selectedSeverity ? t('alerts.emptyFiltered') : t('alerts.empty')}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <AlertCard
              key={alert.getId()}
              alert={alert}
              onDismiss={handleDismiss}
              isDismissing={dismissMutation.isPending}
            />
          ))}
        </div>
      )}
    </div>
  )
}

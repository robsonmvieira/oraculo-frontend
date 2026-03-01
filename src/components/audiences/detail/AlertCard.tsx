import { useTranslation } from 'react-i18next'
import { Clock, X, Zap, Flame, Sparkles, AlertTriangle, Info, AlertOctagon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TopicAlert } from '@/modules/topic-alerts'

export interface AlertCardProps {
  alert: TopicAlert
  onDismiss?: (id: string) => void
  isDismissing?: boolean
}

const typeIcons: Record<string, React.ElementType> = {
  new_topic: Zap,
  growth_spike: Flame,
  new_theme: Sparkles,
}

const severityConfig: Record<string, { icon: React.ElementType; bgClass: string; textClass: string; badgeBg: string; badgeText: string }> = {
  info: {
    icon: Info,
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    textClass: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40',
    badgeText: 'text-blue-700 dark:text-blue-300',
  },
  warning: {
    icon: AlertTriangle,
    bgClass: 'bg-orange-50 dark:bg-orange-900/20',
    textClass: 'text-orange-600 dark:text-orange-400',
    badgeBg: 'bg-orange-100 dark:bg-orange-900/40',
    badgeText: 'text-orange-700 dark:text-orange-300',
  },
  critical: {
    icon: AlertOctagon,
    bgClass: 'bg-red-50 dark:bg-red-900/20',
    textClass: 'text-red-600 dark:text-red-400',
    badgeBg: 'bg-red-100 dark:bg-red-900/40',
    badgeText: 'text-red-700 dark:text-red-300',
  },
}

function useTimeAgo(dateString: string) {
  const { t } = useTranslation('notifications')

  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return t('time.justNow')
  if (diffMins < 60) return t('time.minutesAgo', { count: diffMins })
  if (diffHours < 24) return t('time.hoursAgo', { count: diffHours })
  return t('time.daysAgo', { count: diffDays })
}

export function AlertCard({ alert, onDismiss, isDismissing }: Readonly<AlertCardProps>) {
  const { t } = useTranslation('audiences')
  const timeAgo = useTimeAgo(alert.getCreatedAt())
  const isDismissed = alert.getIsDismissed()

  const severity = severityConfig[alert.getSeverity()] ?? severityConfig.info
  const TypeIcon = typeIcons[alert.getAlertType()] ?? Zap

  return (
    <div
      className={cn(
        'flex items-start gap-4 p-4 rounded-2xl border transition-colors',
        isDismissed
          ? 'bg-gray-50/50 dark:bg-zinc-900/50 border-gray-100 dark:border-zinc-800 opacity-60'
          : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700'
      )}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
          severity.bgClass
        )}
      >
        <TypeIcon className={cn('w-5 h-5', severity.textClass)} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4
            className={cn(
              'text-sm font-semibold truncate',
              isDismissed
                ? 'text-gray-600 dark:text-zinc-400'
                : 'text-gray-900 dark:text-white'
            )}
          >
            {alert.getTitle()}
          </h4>
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0',
              severity.badgeBg,
              severity.badgeText
            )}
          >
            {t(`alerts.severity.${alert.getSeverity()}`)}
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
          {alert.getMessage()}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <span
            className={cn(
              'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
              'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400'
            )}
          >
            {t(`alerts.type.${alert.getAlertType()}`)}
          </span>

          {!isDismissed && onDismiss && (
            <button
              onClick={() => onDismiss(alert.getId())}
              disabled={isDismissing}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors cursor-pointer disabled:opacity-50"
            >
              <X className="w-3.5 h-3.5" />
              {t('alerts.dismiss')}
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-zinc-500 flex-shrink-0 mt-0.5">
        <Clock className="w-3.5 h-3.5" />
        {timeAgo}
      </div>
    </div>
  )
}

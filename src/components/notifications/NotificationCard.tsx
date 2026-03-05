import { useTranslation } from 'react-i18next'
import { Check, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Notification } from '@/modules/notifications'
import { NotificationIcon } from './NotificationIcon'

interface NotificationCardProps {
  notification: Notification
  onMarkAsRead?: (id: string) => void
  isMarkingRead?: boolean
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

export function NotificationCard({ notification, onMarkAsRead, isMarkingRead }: Readonly<NotificationCardProps>) {
  const { t } = useTranslation('notifications')
  const timeAgo = useTimeAgo(notification.getCreatedAt())
  const isUnread = !notification.getIsRead()

  return (
    <div
      className={cn(
        'flex items-start gap-4 p-4 rounded-2xl border transition-colors',
        isUnread
          ? 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700'
          : 'bg-gray-50/50 dark:bg-zinc-900/50 border-gray-100 dark:border-zinc-800'
      )}
    >
      <NotificationIcon type={notification.getType()} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className={cn(
            'text-sm font-semibold truncate',
            isUnread
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-zinc-400'
          )}>
            {t(`messages.${notification.getTitle()}`, notification.getTitle())}
          </h4>
          {isUnread && (
            <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
          {t(`messages.${notification.getMessage()}`, notification.getMessage())}
        </p>

        {isUnread && onMarkAsRead && (
          <button
            onClick={() => onMarkAsRead(notification.getId())}
            disabled={isMarkingRead}
            className="flex items-center gap-1.5 mt-2 text-xs font-medium text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Check className="w-3.5 h-3.5" />
            {t('actions.markAsRead')}
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-zinc-500 flex-shrink-0 mt-0.5">
        <Clock className="w-3.5 h-3.5" />
        {timeAgo}
      </div>
    </div>
  )
}

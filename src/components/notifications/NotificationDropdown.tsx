import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useListNotifications, useNotificationStore } from '@/modules/notifications'
import { Badge } from '@/components/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NotificationIcon } from './NotificationIcon'

interface NotificationDropdownProps {
  children: React.ReactNode
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

function DropdownNotificationItem({ notification }: Readonly<{ notification: { id: string; type: string; title: string; isRead: boolean; createdAt: string } }>) {
  const timeAgo = useTimeAgo(notification.createdAt)

  return (
    <div className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
      <div className="mt-0.5">
        {notification.isRead ? (
          <span className="block w-2 h-2 rounded-full bg-gray-300 dark:bg-zinc-600" />
        ) : (
          <span className="block w-2 h-2 rounded-full bg-red-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(
          'text-sm truncate',
          notification.isRead
            ? 'text-gray-500 dark:text-zinc-400'
            : 'text-gray-900 dark:text-white font-medium'
        )}>
          {notification.title}
        </p>
        <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">
          {timeAgo}
        </p>
      </div>
    </div>
  )
}

export function NotificationDropdown({ children }: Readonly<NotificationDropdownProps>) {
  const { t } = useTranslation('notifications')
  const navigate = useNavigate()
  const unreadCount = useNotificationStore((state) => state.unreadCount)
  const { data } = useListNotifications({ limit: 5, offset: 0 })

  const notifications = (data?.notifications ?? []).map((n) => ({
    id: n.getId(),
    type: n.getType(),
    title: n.getTitle(),
    isRead: n.getIsRead(),
    createdAt: n.getCreatedAt(),
  }))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 bg-white dark:bg-zinc-900 rounded-2xl border-gray-100 dark:border-zinc-800 p-3"
      >
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            {t('dropdown.title')}
          </h3>
          {unreadCount > 0 && (
            <Badge variant="info" size="sm">
              {t('dropdown.newCount', { count: unreadCount })}
            </Badge>
          )}
        </div>

        <div className="max-h-72 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-6 text-center">
              <NotificationIcon type="behavioral_pattern_complete" className="mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                {t('dropdown.empty')}
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownNotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          )}
        </div>

        <div className="border-t border-gray-100 dark:border-zinc-800 mt-2 pt-2">
          <button
            onClick={() => navigate('/notifications')}
            className="w-full text-center text-sm font-medium text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {t('dropdown.viewAll')}
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

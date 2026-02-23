import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCheck, Bell } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { Button } from '@/components/ui'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NotificationCard } from '@/components/notifications'
import {
  useListNotifications,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
  useNotificationStore,
} from '@/modules/notifications'
import { toast } from '@/hooks/useToast'

type TabValue = 'all' | 'unread' | 'archived'

export default function NotificationsPage() {
  const { t } = useTranslation('notifications')
  const [activeTab, setActiveTab] = useState<TabValue>('all')
  const listRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const unreadCount = useNotificationStore((state) => state.unreadCount)

  const queryParams = {
    limit: 50,
    offset: 0,
    ...(activeTab === 'unread' ? { unread_only: true } : {}),
  }

  const { data, isLoading } = useListNotifications(queryParams)
  useUnreadCount()

  const markAsReadMutation = useMarkAsRead()
  const markAllAsReadMutation = useMarkAllAsRead()

  const allNotifications = data?.notifications ?? []

  const filteredNotifications = activeTab === 'archived'
    ? allNotifications.filter((n) => n.getIsRead())
    : allNotifications

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id, {
      onSuccess: () => {
        toast({ title: t('toast.markedAsRead'), variant: 'success' })
      },
      onError: () => {
        toast({ title: t('toast.error'), variant: 'destructive' })
      },
    })
  }

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate(undefined, {
      onSuccess: () => {
        toast({ title: t('toast.allMarkedAsRead'), variant: 'success' })
      },
      onError: () => {
        toast({ title: t('toast.error'), variant: 'destructive' })
      },
    })
  }

  useEffect(() => {
    if (!listRef.current || prefersReducedMotion || isLoading) return

    const cards = listRef.current.querySelectorAll('[data-notification-card]')
    if (cards.length === 0) return

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out',
      })
    }, listRef)

    return () => ctx.revert()
  }, [filteredNotifications.length, activeTab, prefersReducedMotion, isLoading])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('page.title')}
        </h2>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
          {t('page.subtitle')}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
          <TabsList>
            <TabsTrigger value="all">{t('tabs.all')}</TabsTrigger>
            <TabsTrigger value="unread" count={unreadCount}>{t('tabs.unread')}</TabsTrigger>
            <TabsTrigger value="archived">{t('tabs.archived')}</TabsTrigger>
          </TabsList>
        </Tabs>

        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={markAllAsReadMutation.isPending}
            className="gap-2 text-gray-600 dark:text-zinc-300"
          >
            <CheckCheck className="w-4 h-4" />
            {t('actions.markAllAsRead')}
          </Button>
        )}
      </div>

      <div ref={listRef} className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-lime border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-gray-400 dark:text-zinc-500" />
            </div>
            <p className="text-gray-500 dark:text-zinc-400 text-sm">
              {t(`empty.${activeTab}`)}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div key={notification.getId()} data-notification-card>
              <NotificationCard
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                isMarkingRead={markAsReadMutation.isPending}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

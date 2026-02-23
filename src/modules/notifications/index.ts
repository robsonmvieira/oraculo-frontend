export { Notification } from './domain/entities'
export type { NotificationProps, NotificationType, NotificationMetadata } from './domain/entities'
export type { INotificationRepository, ListNotificationsParams, ListNotificationsResult } from './domain/repositories'
export type { IListNotificationsUseCase, IGetUnreadCountUseCase, IMarkNotificationReadUseCase, IMarkAllReadUseCase } from './domain/use-cases'

export { NotificationRepository } from './infra/repositories'
export { NotificationSSEService } from './infra/services/sse.service'

export { ListNotificationsUseCase, GetUnreadCountUseCase, MarkNotificationReadUseCase, MarkAllReadUseCase } from './application/use-cases'
export { useListNotifications, useUnreadCount, useMarkAsRead, useMarkAllAsRead, NOTIFICATIONS_QUERY_KEY, UNREAD_COUNT_QUERY_KEY } from './application/hooks/useNotifications'
export { useNotificationSSE } from './application/hooks/useNotificationSSE'
export { useNotificationStore } from './application/store/notification.store'

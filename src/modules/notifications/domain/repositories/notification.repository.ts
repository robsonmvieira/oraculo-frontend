import type { Notification } from '../entities'

export interface ListNotificationsParams {
  limit?: number
  offset?: number
  unread_only?: boolean
}

export interface ListNotificationsResult {
  notifications: Notification[]
  total: number
}

export interface INotificationRepository {
  listNotifications(params: ListNotificationsParams): Promise<ListNotificationsResult>
  getUnreadCount(): Promise<number>
  markAsRead(id: string): Promise<void>
  markAllAsRead(): Promise<void>
}

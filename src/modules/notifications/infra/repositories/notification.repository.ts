import type { HttpClient } from '@/modules/shared'
import { Notification, type NotificationProps } from '../../domain/entities'
import type { INotificationRepository, ListNotificationsParams, ListNotificationsResult } from '../../domain/repositories'

export class NotificationRepository implements INotificationRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async listNotifications(params: ListNotificationsParams): Promise<ListNotificationsResult> {
    const searchParams = new URLSearchParams()
    if (params.limit !== undefined) searchParams.set('limit', String(params.limit))
    if (params.offset !== undefined) searchParams.set('offset', String(params.offset))
    if (params.unread_only !== undefined) searchParams.set('unread_only', String(params.unread_only))

    const query = searchParams.toString()
    const url = query ? `notifications?${query}` : 'notifications'

    const response = await this.httpClient.get<{
      notifications: Array<{
        id: string
        user_id: string
        type: string
        title: string
        message: string
        metadata: Record<string, unknown>
        is_read: boolean
        created_at: string
        read_at: string | null
      }>
      total: number
    }>(url)

    const notifications = (response.notifications ?? []).map(
      (n) =>
        new Notification({
          id: n.id,
          userId: n.user_id,
          type: n.type as NotificationProps['type'],
          title: n.title,
          message: n.message,
          metadata: n.metadata,
          isRead: n.is_read,
          createdAt: n.created_at,
          readAt: n.read_at,
        })
    )

    return { notifications, total: response.total ?? notifications.length }
  }

  async getUnreadCount(): Promise<number> {
    const response = await this.httpClient.get<{ count: number }>('notifications/unread-count')
    return response.count ?? 0
  }

  async markAsRead(id: string): Promise<void> {
    await this.httpClient.patch<void>(`notifications/${id}/read`)
  }

  async markAllAsRead(): Promise<void> {
    await this.httpClient.patch<void>('notifications/read-all')
  }
}

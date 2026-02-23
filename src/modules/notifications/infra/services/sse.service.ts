import { Notification, type NotificationProps } from '../../domain/entities'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export interface SSECallbacks {
  onNotification: (notification: Notification) => void
  onOpen?: () => void
  onError?: (error: Event) => void
}

export class NotificationSSEService {
  private eventSource: EventSource | null = null

  connect(callbacks: SSECallbacks): void {
    this.disconnect()

    const token = localStorage.getItem('access_token')
    if (!token) return

    const url = `${API_BASE_URL}/notifications/stream?token=${token}`
    this.eventSource = new EventSource(url)

    this.eventSource.onopen = () => {
      callbacks.onOpen?.()
    }

    this.eventSource.addEventListener('notification', (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as {
          id: string
          user_id: string
          type: string
          title: string
          message: string
          metadata: Record<string, unknown>
          is_read: boolean
          created_at: string
          read_at: string | null
        }

        const notification = new Notification({
          id: data.id,
          userId: data.user_id,
          type: data.type as NotificationProps['type'],
          title: data.title,
          message: data.message,
          metadata: data.metadata,
          isRead: data.is_read,
          createdAt: data.created_at,
          readAt: data.read_at,
        })

        callbacks.onNotification(notification)
      } catch {
        // Silently ignore parse errors
      }
    })

    this.eventSource.onerror = (error) => {
      callbacks.onError?.(error)
    }
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
  }

  isConnected(): boolean {
    return this.eventSource?.readyState === EventSource.OPEN
  }
}

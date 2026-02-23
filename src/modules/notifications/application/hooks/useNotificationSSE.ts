import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/modules/auth'
import { toast } from '@/hooks/useToast'
import { NotificationSSEService } from '../../infra/services/sse.service'
import { useNotificationStore } from '../store/notification.store'
import { NOTIFICATIONS_QUERY_KEY, UNREAD_COUNT_QUERY_KEY } from './useNotifications'

export function useNotificationSSE() {
  const sseRef = useRef<NotificationSSEService | null>(null)
  const { isAuthenticated } = useAuthStore()
  const queryClient = useQueryClient()
  const incrementUnreadCount = useNotificationStore((state) => state.incrementUnreadCount)
  const addRealtimeNotification = useNotificationStore((state) => state.addRealtimeNotification)
  const setSSEConnected = useNotificationStore((state) => state.setSSEConnected)

  useEffect(() => {
    if (!isAuthenticated) {
      if (sseRef.current) {
        sseRef.current.disconnect()
        sseRef.current = null
        setSSEConnected(false)
      }
      return
    }

    const sseService = new NotificationSSEService()
    sseRef.current = sseService

    sseService.connect({
      onNotification: (notification) => {
        addRealtimeNotification(notification)
        incrementUnreadCount()
        queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY })
        queryClient.invalidateQueries({ queryKey: UNREAD_COUNT_QUERY_KEY })

        toast({
          title: notification.getTitle(),
          description: notification.getMessage(),
          variant: notification.isSuccess() ? 'success' : 'destructive',
        })
      },
      onOpen: () => {
        setSSEConnected(true)
      },
      onError: () => {
        setSSEConnected(false)
      },
    })

    return () => {
      sseService.disconnect()
      setSSEConnected(false)
    }
  }, [isAuthenticated, queryClient, incrementUnreadCount, addRealtimeNotification, setSSEConnected])
}

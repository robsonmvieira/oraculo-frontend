import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/modules/auth'
import { toast } from '@/hooks/useToast'
import { TOPIC_DEEP_DIVE_QUERY_KEY } from '@/modules/audience/application/hooks/useGetTopicDeepDive'
import { TOPIC_BEHAVIORAL_PATTERNS_QUERY_KEY } from '@/modules/audience/application/hooks/useGetTopicBehavioralPatterns'
import { TOPIC_SENTIMENT_QUERY_KEY } from '@/modules/audience/application/hooks/useGetTopicSentiment'
import { AUDIENCE_INTENTS_QUERY_KEY } from '@/modules/audience/application/hooks/useGetAudienceIntents'
import { NotificationSSEService } from '../../infra/services/sse.service'
import type { Notification } from '../../domain/entities'
import { useNotificationStore } from '../store/notification.store'
import { NOTIFICATIONS_QUERY_KEY, UNREAD_COUNT_QUERY_KEY } from './useNotifications'

function invalidateAnalysisQueries(
  queryClient: ReturnType<typeof useQueryClient>,
  notification: Notification,
) {
  const metadata = notification.getMetadata()
  const audienceId = metadata.audience_id
  const topicId = metadata.topic_id
  const type = notification.getType()

  if (!audienceId) return

  if (type === 'intent_classification_complete' || type === 'intent_classification_failed') {
    queryClient.invalidateQueries({ queryKey: AUDIENCE_INTENTS_QUERY_KEY(audienceId, 'week') })
    queryClient.invalidateQueries({ queryKey: AUDIENCE_INTENTS_QUERY_KEY(audienceId, 'month') })
    return
  }

  if (!topicId) return

  if (type === 'deep_dive_complete' || type === 'deep_dive_failed') {
    queryClient.invalidateQueries({ queryKey: TOPIC_DEEP_DIVE_QUERY_KEY(audienceId, topicId) })
  }

  if (type === 'behavioral_pattern_complete' || type === 'behavioral_pattern_failed') {
    queryClient.invalidateQueries({ queryKey: TOPIC_BEHAVIORAL_PATTERNS_QUERY_KEY(audienceId, topicId) })
  }

  if (type === 'sentiment_complete' || type === 'sentiment_failed') {
    queryClient.invalidateQueries({ queryKey: TOPIC_SENTIMENT_QUERY_KEY(audienceId, topicId) })
  }
}

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
        invalidateAnalysisQueries(queryClient, notification)

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

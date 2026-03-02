import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/modules/auth'
import { toast } from '@/hooks/useToast'
import { TOPIC_DEEP_DIVE_QUERY_KEY } from '@/modules/audience/application/hooks/useGetTopicDeepDive'
import { TOPIC_BEHAVIORAL_PATTERNS_QUERY_KEY } from '@/modules/audience/application/hooks/useGetTopicBehavioralPatterns'
import { TOPIC_SENTIMENT_QUERY_KEY } from '@/modules/audience/application/hooks/useGetTopicSentiment'
import { AUDIENCE_INTENTS_QUERY_KEY } from '@/modules/audience/application/hooks/useGetAudienceIntents'
import { THEME_SUMMARY_QUERY_KEY } from '@/modules/audience/application/hooks/useGetThemeSummary'
import { THEME_PANEL_QUERY_KEY } from '@/modules/audience/application/hooks/useGetThemePanel'
import { ALERTS_QUERY_KEY, ALERTS_SUMMARY_QUERY_KEY } from '@/modules/topic-alerts'
import { CONTENT_SUGGESTIONS_QUERY_KEY } from '@/modules/audience/application/hooks/useGetContentSuggestions'
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

  if (type === 'topic_alert_new_topic' || type === 'topic_alert_growth_spike' || type === 'topic_alert_new_theme') {
    queryClient.invalidateQueries({ queryKey: ALERTS_QUERY_KEY(audienceId) })
    queryClient.invalidateQueries({ queryKey: ALERTS_SUMMARY_QUERY_KEY(audienceId) })
    return
  }

  if (type === 'content_suggestions_ready') {
    queryClient.invalidateQueries({ queryKey: CONTENT_SUGGESTIONS_QUERY_KEY(audienceId) })
    return
  }

  if (type === 'intent_classification_complete' || type === 'intent_classification_failed') {
    queryClient.invalidateQueries({ queryKey: AUDIENCE_INTENTS_QUERY_KEY(audienceId, 'week') })
    queryClient.invalidateQueries({ queryKey: AUDIENCE_INTENTS_QUERY_KEY(audienceId, 'month') })
    return
  }

  const themeId = metadata.theme_id
  if (type === 'theme_summary_complete' || type === 'theme_summary_failed') {
    if (themeId) {
      queryClient.invalidateQueries({ queryKey: THEME_SUMMARY_QUERY_KEY(audienceId, themeId) })
    }
    return
  }

  if (type === 'theme_panel_complete' || type === 'theme_panel_failed') {
    if (themeId) {
      queryClient.invalidateQueries({ queryKey: THEME_PANEL_QUERY_KEY(audienceId, themeId) })
    }
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

        const isAlert = notification.getType().startsWith('topic_alert_')
        toast({
          title: notification.getTitle(),
          description: notification.getMessage(),
          variant: isAlert || notification.isSuccess() ? 'success' : 'destructive',
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

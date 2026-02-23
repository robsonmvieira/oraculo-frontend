import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { container, TYPES } from '@/modules/shared'
import type { IListNotificationsUseCase, IGetUnreadCountUseCase, IMarkNotificationReadUseCase, IMarkAllReadUseCase } from '../../domain/use-cases'
import type { ListNotificationsParams } from '../../domain/repositories'
import { useNotificationStore } from '../store/notification.store'

const listNotificationsUseCase = container.get<IListNotificationsUseCase>(TYPES.ListNotificationsUseCase)
const getUnreadCountUseCase = container.get<IGetUnreadCountUseCase>(TYPES.GetUnreadCountUseCase)
const markNotificationReadUseCase = container.get<IMarkNotificationReadUseCase>(TYPES.MarkNotificationReadUseCase)
const markAllReadUseCase = container.get<IMarkAllReadUseCase>(TYPES.MarkAllReadUseCase)

export const NOTIFICATIONS_QUERY_KEY = ['notifications'] as const
export const UNREAD_COUNT_QUERY_KEY = ['notifications', 'unread-count'] as const

export function useListNotifications(params: ListNotificationsParams) {
  return useQuery({
    queryKey: [...NOTIFICATIONS_QUERY_KEY, params],
    queryFn: () => listNotificationsUseCase.execute(params),
  })
}

export function useUnreadCount() {
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount)

  return useQuery({
    queryKey: [...UNREAD_COUNT_QUERY_KEY],
    queryFn: async () => {
      const count = await getUnreadCountUseCase.execute()
      setUnreadCount(count)
      return count
    },
    refetchInterval: 60000,
  })
}

export function useMarkAsRead() {
  const queryClient = useQueryClient()
  const decrementUnreadCount = useNotificationStore((state) => state.decrementUnreadCount)

  return useMutation({
    mutationFn: (id: string) => markNotificationReadUseCase.execute(id),
    onSuccess: () => {
      decrementUnreadCount()
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: UNREAD_COUNT_QUERY_KEY })
    },
  })
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient()
  const resetUnreadCount = useNotificationStore((state) => state.resetUnreadCount)

  return useMutation({
    mutationFn: () => markAllReadUseCase.execute(),
    onSuccess: () => {
      resetUnreadCount()
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: UNREAD_COUNT_QUERY_KEY })
    },
  })
}

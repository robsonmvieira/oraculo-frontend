import { create } from 'zustand'
import type { Notification } from '../../domain/entities'

interface NotificationState {
  unreadCount: number
  isSSEConnected: boolean
  realtimeNotifications: Notification[]

  setUnreadCount: (count: number) => void
  incrementUnreadCount: () => void
  decrementUnreadCount: () => void
  addRealtimeNotification: (notification: Notification) => void
  setSSEConnected: (connected: boolean) => void
  clearRealtimeNotifications: () => void
  resetUnreadCount: () => void
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  unreadCount: 0,
  isSSEConnected: false,
  realtimeNotifications: [],

  setUnreadCount: (count) => set({ unreadCount: count }),
  incrementUnreadCount: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
  decrementUnreadCount: () => set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) })),
  addRealtimeNotification: (notification) =>
    set((state) => ({
      realtimeNotifications: [notification, ...state.realtimeNotifications].slice(0, 20),
    })),
  setSSEConnected: (connected) => set({ isSSEConnected: connected }),
  clearRealtimeNotifications: () => set({ realtimeNotifications: [] }),
  resetUnreadCount: () => set({ unreadCount: 0 }),
}))

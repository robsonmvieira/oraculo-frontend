import { CheckCircle, AlertTriangle, Bell, Brain, Search, TrendingUp, Tag, MessageSquare, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NotificationType } from '@/modules/notifications'

const iconConfig: Record<string, { icon: React.ElementType; bgClass: string; iconClass: string }> = {
  behavioral_pattern_complete: { icon: Brain, bgClass: 'bg-green-100 dark:bg-green-900/30', iconClass: 'text-green-600 dark:text-green-400' },
  behavioral_pattern_failed: { icon: Brain, bgClass: 'bg-red-100 dark:bg-red-900/30', iconClass: 'text-red-600 dark:text-red-400' },
  deep_dive_complete: { icon: Search, bgClass: 'bg-green-100 dark:bg-green-900/30', iconClass: 'text-green-600 dark:text-green-400' },
  deep_dive_failed: { icon: Search, bgClass: 'bg-red-100 dark:bg-red-900/30', iconClass: 'text-red-600 dark:text-red-400' },
  pattern_analysis_complete: { icon: TrendingUp, bgClass: 'bg-green-100 dark:bg-green-900/30', iconClass: 'text-green-600 dark:text-green-400' },
  pattern_analysis_failed: { icon: TrendingUp, bgClass: 'bg-red-100 dark:bg-red-900/30', iconClass: 'text-red-600 dark:text-red-400' },
  keyword_analysis_complete: { icon: Tag, bgClass: 'bg-green-100 dark:bg-green-900/30', iconClass: 'text-green-600 dark:text-green-400' },
  keyword_analysis_failed: { icon: Tag, bgClass: 'bg-red-100 dark:bg-red-900/30', iconClass: 'text-red-600 dark:text-red-400' },
  topic_analysis_complete: { icon: MessageSquare, bgClass: 'bg-green-100 dark:bg-green-900/30', iconClass: 'text-green-600 dark:text-green-400' },
  topic_analysis_failed: { icon: MessageSquare, bgClass: 'bg-red-100 dark:bg-red-900/30', iconClass: 'text-red-600 dark:text-red-400' },
  sentiment_complete: { icon: Heart, bgClass: 'bg-green-100 dark:bg-green-900/30', iconClass: 'text-green-600 dark:text-green-400' },
  sentiment_failed: { icon: Heart, bgClass: 'bg-red-100 dark:bg-red-900/30', iconClass: 'text-red-600 dark:text-red-400' },
}

const defaultConfig = { icon: Bell, bgClass: 'bg-gray-100 dark:bg-zinc-800', iconClass: 'text-gray-500 dark:text-zinc-400' }

interface NotificationIconProps {
  type: NotificationType
  className?: string
}

export function NotificationIcon({ type, className }: Readonly<NotificationIconProps>) {
  const config = iconConfig[type] ?? defaultConfig
  const Icon = config.icon

  return (
    <div
      className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
        config.bgClass,
        className
      )}
    >
      <Icon className={cn('w-5 h-5', config.iconClass)} />
    </div>
  )
}

export function NotificationDot({ type }: Readonly<{ type: NotificationType }>) {
  const isComplete = type.endsWith('_complete')
  const isFailed = type.endsWith('_failed')

  if (isComplete) return <CheckCircle className="w-4 h-4 text-green-500" />
  if (isFailed) return <AlertTriangle className="w-4 h-4 text-red-500" />
  return <Bell className="w-4 h-4 text-gray-400" />
}

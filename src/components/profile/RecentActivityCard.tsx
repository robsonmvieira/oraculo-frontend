import { Activity, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui'
import type { ActivityItem } from '@/data/profile'

interface RecentActivityCardProps {
  activities: ActivityItem[]
}

export function RecentActivityCard({ activities }: Readonly<RecentActivityCardProps>) {
  const { t } = useTranslation('profile')

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-gray-900 dark:text-white" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('recentActivity.title')}</h3>
      </div>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div
              className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                activity.isRecent ? 'bg-lime' : 'bg-gray-300 dark:bg-zinc-600'
              }`}
            />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {activity.title}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-gray-400 dark:text-zinc-500" />
                <span className="text-xs text-gray-500 dark:text-zinc-400">
                  {activity.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

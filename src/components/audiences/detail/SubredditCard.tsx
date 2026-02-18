import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type { SubredditDetail } from '@/data/audienceDetails'

export interface SubredditCardProps {
  subreddit: SubredditDetail & {
    activityLevel?: 'Super Active' | 'High Activity' | 'Active' | 'Moderate'
    sizeCategory?: 'Massive' | 'Huge' | 'Large' | 'Medium' | 'Small'
    description?: string
  }
  onClick?: () => void
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`
  }
  if (num >= 1_000) {
    return `${Math.round(num / 1_000)}k`
  }
  return num.toString()
}

function getSizeCategory(members: number): string {
  if (members >= 5_000_000) return 'Massive'
  if (members >= 1_000_000) return 'Huge'
  if (members >= 500_000) return 'Large'
  if (members >= 100_000) return 'Medium'
  return 'Small'
}

function getActivityLevel(growth: number): string {
  if (growth >= 1.0) return 'Super Active'
  if (growth >= 0.5) return 'High Activity'
  if (growth >= 0.2) return 'Active'
  return 'Moderate'
}

export function SubredditCard({ subreddit, onClick }: Readonly<SubredditCardProps>) {
  const sizeCategory = subreddit.sizeCategory || getSizeCategory(subreddit.members)
  const activityLevel = subreddit.activityLevel || getActivityLevel(subreddit.monthlyGrowth)
  const isPositiveGrowth = subreddit.monthlyGrowth >= 0

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-transparent hover:border-gray-200 dark:hover:border-zinc-700 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar
            src={subreddit.icon}
            alt={subreddit.name}
            fallback={subreddit.name.charAt(2)}
            size="md"
          />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              {subreddit.name}
            </h4>
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              {formatNumber(subreddit.members)} members
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center gap-1 text-xs',
              isPositiveGrowth ? 'text-success-light' : 'text-error-light'
            )}
          >
            {isPositiveGrowth ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>
              {isPositiveGrowth ? '' : ''}
              {Math.abs(subreddit.monthlyGrowth).toFixed(1)}% / month
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Badge variant="neutral" size="sm">
          {sizeCategory}
        </Badge>
        <Badge variant="neutral" size="sm">
          {activityLevel}
        </Badge>
      </div>

      {subreddit.description && (
        <>
          <p className="text-[10px] font-medium text-gray-500 dark:text-zinc-500 uppercase tracking-wide mb-1">
            Description
          </p>
          <p className="text-xs text-gray-600 dark:text-zinc-400 line-clamp-3">
            {subreddit.description}
          </p>
        </>
      )}
    </div>
  )
}

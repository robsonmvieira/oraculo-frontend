import { useRef, useEffect } from 'react'
import { TrendingUp, Plus } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import { Avatar } from '@/components/ui/avatar'
import type { SubredditDetail } from '@/data/audienceDetails'

export interface SubredditsListProps {
  subreddits: readonly SubredditDetail[]
  totalCount: number
  onAddClick?: () => void
  showHeader?: boolean
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`
  }
  return num.toString()
}

export function SubredditsList({
  subreddits,
  totalCount,
  onAddClick,
  showHeader = true,
}: Readonly<SubredditsListProps>) {
  const listRef = useRef<HTMLUListElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const displayedSubreddits = subreddits.slice(0, 6)
  const remainingCount = totalCount - displayedSubreddits.length

  useEffect(() => {
    if (!listRef.current || prefersReducedMotion) return

    const items = Array.from(listRef.current.children)
    gsap.fromTo(
      items,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
      }
    )
  }, [prefersReducedMotion, subreddits])

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 cursor-pointer hover:border-gray-200 dark:hover:border-zinc-700 border border-transparent transition-colors h-full flex flex-col">
      {showHeader && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Subreddits
            </h3>
            <span className="text-sm text-gray-500 dark:text-zinc-400">
              {totalCount}
            </span>
          </div>
          <button
            onClick={onAddClick}
            className="cursor-pointer flex items-center gap-1 text-sm text-gray-500 dark:text-zinc-400 hover:text-lime transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      )}

      <ul ref={listRef} className="space-y-1 flex-1">
        {displayedSubreddits.map((subreddit) => (
          <li
            key={subreddit.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Avatar
              src={subreddit.icon}
              alt={subreddit.name}
              fallback={subreddit.name.charAt(2)}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                {subreddit.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                {formatNumber(subreddit.members)} members
              </p>
            </div>
            <div
              className={cn(
                'flex items-center gap-1 text-xs',
                subreddit.monthlyGrowth >= 0
                  ? 'text-success-light'
                  : 'text-error-light'
              )}
            >
              <TrendingUp className="w-3 h-3" />
              <span>{subreddit.monthlyGrowth.toFixed(1)}% / month</span>
            </div>
          </li>
        ))}
      </ul>

      {remainingCount > 0 && (
        <button className="cursor-pointer w-full mt-3 py-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors">
          + {remainingCount} more
        </button>
      )}
    </div>
  )
}

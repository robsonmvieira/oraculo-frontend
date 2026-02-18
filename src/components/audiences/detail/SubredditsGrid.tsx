import { useRef, useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks'
import { SubredditCard } from './SubredditCard'
import type { SubredditDetail } from '@/data/audienceDetails'

export interface ExtendedSubreddit extends SubredditDetail {
  activityLevel?: 'Super Active' | 'High Activity' | 'Active' | 'Moderate'
  sizeCategory?: 'Massive' | 'Huge' | 'Large' | 'Medium' | 'Small'
  description?: string
}

export interface SubredditsGridProps {
  subreddits: readonly ExtendedSubreddit[]
  totalCount: number
  onSubredditClick?: (subreddit: ExtendedSubreddit) => void
}

type SortOption = 'largest' | 'smallest' | 'most_active' | 'newest'

export function SubredditsGrid({
  subreddits,
  totalCount,
  onSubredditClick,
}: Readonly<SubredditsGridProps>) {
  const gridRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [sortBy, setSortBy] = useState<SortOption>('largest')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'largest', label: 'Largest' },
    { value: 'smallest', label: 'Smallest' },
    { value: 'most_active', label: 'Most Active' },
    { value: 'newest', label: 'Newest' },
  ]

  const sortedSubreddits = [...subreddits].sort((a, b) => {
    switch (sortBy) {
      case 'largest':
        return b.members - a.members
      case 'smallest':
        return a.members - b.members
      case 'most_active':
        return b.monthlyGrowth - a.monthlyGrowth
      case 'newest':
        return b.monthlyGrowth - a.monthlyGrowth
      default:
        return 0
    }
  })

  useEffect(() => {
    if (!gridRef.current || prefersReducedMotion) return

    const cards = Array.from(gridRef.current.children)
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
      }
    )
  }, [prefersReducedMotion, sortBy])

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Subreddits
        </h3>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          >
            Sort by: {sortOptions.find((o) => o.value === sortBy)?.label}
            <ChevronDown className="w-4 h-4" />
          </button>
          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 z-20 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 py-1 min-w-[120px]">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors ${
                      sortBy === option.value
                        ? 'text-lime font-medium'
                        : 'text-gray-700 dark:text-zinc-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {sortedSubreddits.map((subreddit) => (
          <SubredditCard
            key={subreddit.id}
            subreddit={subreddit}
            onClick={() => onSubredditClick?.(subreddit)}
          />
        ))}
      </div>

      {totalCount > sortedSubreddits.length && (
        <div className="mt-4 text-center">
          <button className="text-sm text-gray-500 dark:text-zinc-400 hover:text-lime transition-colors">
            Load more ({totalCount - sortedSubreddits.length} remaining)
          </button>
        </div>
      )}
    </div>
  )
}

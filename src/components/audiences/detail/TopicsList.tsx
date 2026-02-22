import { useRef, useEffect } from 'react'
import { TrendingUp, Tag } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import type { Topic } from '@/modules/audience/domain/entities/Topic.entity'

export interface TopicsListProps {
  topics: readonly Topic[]
  totalCount: number
  showHeader?: boolean
  onTopicClick?: () => void
}

export function TopicsList({ topics, totalCount, showHeader = true, onTopicClick }: Readonly<TopicsListProps>) {
  const listRef = useRef<HTMLUListElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const displayedTopics = topics.slice(0, 5)
  const remainingCount = totalCount - displayedTopics.length

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
  }, [prefersReducedMotion, topics])

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 cursor-pointer hover:border-gray-200 dark:hover:border-zinc-700 border border-transparent transition-colors h-full flex flex-col">
      {showHeader && (
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Topics</h3>
          <span className="text-sm text-gray-500 dark:text-zinc-400">
            {totalCount}
          </span>
        </div>
      )}

      <ul ref={listRef} className="space-y-1 flex-1">
        {displayedTopics.map((topic) => (
          <li key={topic.getId()}>
            <button
              type="button"
              onClick={onTopicClick}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                <Tag className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {topic.getName()}
                </p>
                <p className="text-xs text-gray-500 dark:text-zinc-400">
                  {topic.getPostCount()} posts about{' '}
                  <span className="font-semibold text-gray-700 dark:text-zinc-300">
                    {topic.getName()}
                  </span>
                </p>
              </div>
              <div
                className={cn(
                  'flex items-center gap-1 text-xs',
                  topic.getGrowthPercentage() >= 0 ? 'text-success-light' : 'text-error-light'
                )}
              >
                <TrendingUp className="w-3 h-3" />
                <span>{topic.getGrowthPercentage()}%</span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {remainingCount > 0 && (
        <button
          onClick={onTopicClick}
          className="cursor-pointer w-full mt-3 py-2 text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors"
        >
          + {remainingCount} more
        </button>
      )}
    </div>
  )
}
